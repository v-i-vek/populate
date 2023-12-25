const { queryResult } = require("pg-promise");

const initOptions = {
  // promiseLib: promise // overriding the default (ES6 Promise);
};
const pgp = require("pg-promise")({});

const cn = {
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "2095",
  database: "postgres",
  // to auto-exit on idle, without having to shut-down the pool;
  // see https://github.com/vitaly-t/pg-promise#library-de-initialization
  allowExitOnIdle: true,
};

const db = pgp(cn); // database instance;

// db.any('select * from products where category_id = $1', [2])
//     .then(data => {
//         console.log('DATA:', data);
//     })
//     .catch(error => {
//         console.log('ERROR:', error);
//     });

const obj1 = {
  product_id: 23,
  product_name: "pneer of tofu",
  category_id: 3,
  unit: "10-200g pkgs",
  price: "100",
};
const obj2 = {
    product_id: 25,
    product_name: "pneer of tofu",
    category_id: 3,
    unit: "10-200g pkgs",
    price: "100",
  };
// db.any(
//   `insert into products("product_id","product_name","category_id","unit","price") values($1,$2,$3,$4,$5) on conflict ("product_id") do nothing`,
//   [obj.product_id, obj.product_name, obj.category_id, obj.unit, obj.price]
// )
//   .then((data) => {
//     console.log("DAta", data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// db.any(
//   `insert into products("product_id","product_name","category_id","unit","price") values($1,$2,$3,$4,$5) on conflict ("product_id") do nothing`,
//   [obj.product_id, obj.product_name, obj.category_id, obj.unit, obj.price]
// )
//   .then((data) => {
//     console.log("DAta", data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
db.tx(async (t) => {
    const query1 = `insert into products("product_id", "product_name", "category_id", "unit", "price") values($1, $2, $3, $4, $5) on conflict ("product_id") do nothing` ;
    const queryValues1 = [obj1.product_id, obj1.product_name, obj1.category_id, obj1.unit, obj1.price];

    const query2 = `insert into products("product_id", "product_name", "category_id", "unit", "price") values($1, $2, $3, $4, $5) on conflict ("product_id") do nothing`;
    const queryValues2 = [obj2.product_id, obj2.product_name, obj2.category_id, obj2.unit, obj2.price];

    // Create an array of queries and values
    const queries = [
      t.none(query1, queryValues1),
      t.none(query2, queryValues2)
    ];

    // Execute all queries in a batch within the transaction
  const result =   await t.batch(queries);
  return result

}).then(data=>{console.log(data)}).catch(err=>{console.log(err)});
