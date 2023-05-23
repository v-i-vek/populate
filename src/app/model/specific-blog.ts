export interface SpecificBlog {
  _id: string;
  title: string;
  content: string;
  createdDate: Date;
  isApproved: Boolean;
  userId: {
    firstName: string;
    lastName: string;
  };
}
