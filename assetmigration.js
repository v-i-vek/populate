import fs from "fs";
import path from "path";
import { fetchRecordFromTable, createInsertQuery, db } from "./helper.js";
import { commonUtils, checkExistsById } from "/opt/nodejs/common-utils.js";
const { createBucket } = commonUtils;
import { checkExistsById, getByKey } from "/opt/nodejs/pg-dao.js";

export async function processForOrganizationMigration() {
  try {
    // Fetch Tenant list from DynamoDb
    const tenantList = await fetchRecordFromTable("TenantMaster");

    for (const tenant of tenantList) {
      // Transform raw data to useful data
      const updatdeTenantPayload = TransformTenantData(tenant);
      // Create s3 bucket for newly created organisation with organisationId
      await createBucket(updatdeTenantPayload.id);

      // check wheater the PK already Exist
      const checkDuplicateId = await checkExistsById("organization", updatdeTenantPayload.id);

      // to check with another key if it exist or  not
      // const checkDuplicateName = await getByKey("organization","name",updatdeTenantPayload.tenant_name)

      //pk Exist it will not add in the database
      if (checkDuplicateId) {
        continue;
      }
      // Process on data
      await addOrganization(updatdeTenantPayload);
    }
  } catch (error) {
    console.error("Error while executing processForOrganizationMigration(): \n", error);
  }
}

function TransformTenantData(tenant) {
  try {
    if (tenant.phone_code === undefined && (tenant.country === "USA" || tenant.country === "Canada")) {
      tenant.phone_code = "+1";
    }
    if (tenant.phone_number === 12) {
      tenant.phone_number = tenant.phone_number.slice(2, tenant.phone_number.length);
    }
    return {
      id: tenant.id,
      name: tenant.tenant_name,
      role_id: 2,
      schema: tenant.tenant_name.toLowerCase().replace(/\s+/g, "_"),
      is_active: true,
      email: tenant.email,
      representative_email: tenant.representative_email.split(",").map((email) => email.trim()),
      representative: tenant.company_representative,
      phone_code: tenant.phone_code,
      phone_number: tenant.phone_number,
      street: tenant.street,
      city: tenant.city,
      state: tenant.state,
      country: tenant.country,
      created_on: typeof tenant.created_on === "number" ? tenant.created_on : Math.round(new Date(tenant.created_on).getTime() / 1000),
      updated_on: tenant.updated_on
        ? typeof tenant.updated_on === "number"
          ? tenant.updated_on
          : Math.round(new Date(tenant.updated_on).getTime() / 1000)
        : typeof tenant.created_on === "number"
        ? tenant.created_on
        : Math.round(new Date(tenant.created_on).getTime() / 1000),
      wifi_password: tenant.password || "RHJPdkAybzE3", // Password is in encrypted: DrOv@2o17
      wifi_hidden: tenant.is_wifi_hidden || true,
      wifi_ssh_enabled: tenant.is_ssh_enable || false,
    };
  } catch (error) {
    console.error("Error while executing TransformTenantData(): \n", error);
  }
}

async function addOrganization(organization) {
  try {
    return await db
      .tx(async (t) => {
        const { query, queryValues } = createInsertQuery("organization", organization);
        
        const q1 = await t.query(query, queryValues);
        if (organization.schema) {

          const fileQuery = await createFileQueries(organization);
          const q2 = await t.query(fileQuery);
          return t.batch([q1, q2]);
        } else {
          return q1;
        }
      })
      .then((data) => {
        // success, COMMIT was executed
        console.log("success query::>>", data);
        return data;
      })
      .catch((error) => {
        // failure, ROLLBACK was executed
        console.log("Failed batch query...", error);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

const createFileQueries = async (organization) => {
  const fileContents = {};
  let fileQuery = "";
  const pathToDirectory = "./tenant_specific/";

  try {
    const files = await fs.promises.readdir(pathToDirectory);

    for (const file of files) {
      const filePath = path.join(pathToDirectory, file);
      const fileData = await fs.promises.readFile(filePath, "utf8");
      fileContents[file] = fileData;
    }

    const object = Object.values(fileContents);
    const concateQuery = object.join("\n");
    const regex = new RegExp("\\[schema\\]", "gi");
    fileQuery = concateQuery.replace(regex, organization.schema);
  } catch (error) {
    throw error;
  }

  return fileQuery;
};
