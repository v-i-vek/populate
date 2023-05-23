export interface Blog {

  _id: string;
  title: string;
  content: string;
  createdDate: Date;
  //updatedDate:Date;
  isApproved: Boolean;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
  };
}
