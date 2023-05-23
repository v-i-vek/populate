export interface Document {
  _id: string;
  fileName: string;
  createdDate: Date;
  isApproved: Boolean;
  docData: {
    data: [];
  };
  userId: {
    firstName: string;
    lastName: string;
  };
}
