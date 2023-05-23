export interface AllDocument {
    _id: string;
  fileName: string;
  createdDate: Date;
  isApproved: Boolean;
  docData: {
    data: [];
  };
  userId: string;
  user:{
    firstName: string;
    lastName: string;
  };
}
