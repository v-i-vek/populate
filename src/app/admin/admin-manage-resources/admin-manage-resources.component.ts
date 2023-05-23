import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';
import { Document } from 'src/app/model/document';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DeleteBlogDialogComponent } from './delete-blog-dialog/delete-blog-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdddocumentComponent } from 'src/app/resources/adddocument/adddocument.component';
import { SpecificBlog } from 'src/app/model/specific-blog';

@Component({
  selector: 'app-admin-manage-resources',
  templateUrl: './admin-manage-resources.component.html',
  styleUrls: ['./admin-manage-resources.component.css'],
})
export class AdminManageResourcesComponent {
  blogs: Blog = {
    _id: '',
    title: '',
    content: '',
    createdDate: new Date(),   
    // updatedDate : new Date(),
    isApproved: new Boolean(),
    userId: '',
    user:{
      firstName: '',
      lastName: '',
    },
  };

  docs: Document = {
    _id: '',
    fileName: '',
    createdDate: new Date(),
    isApproved: Boolean(),
    docData: {
      data: [],
    },
    userId: {
      firstName: '',
      lastName: '',
    },
  };

  _id: string = '';
  title: string = '';
  content: string = '';
  userId: {};
  isApproved: Boolean = Boolean();

  allblogs: Blog[] = [];

  fileName: string = '';
  docData!: {
    data: [];
  };

  files: Document[] = [];
  data: Boolean;
  value: boolean;
  pageNumber = 1;
  pageSize = 8;
  totalPages:any
  constructor(
    private blogService: BlogService,
    private ngxLoader: NgxUiLoaderService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllBlogs();
  }
  
  getAllBlogs() {
    this.ngxLoader.start();
    this.blogService.getAllAdminBlogs(this.pageNumber, this.pageSize).subscribe(
      (response) => {
        this.allblogs = response;
        this.totalPages=response.length
        this.ngxLoader.stop();
      },
      (err) => {
        console.log(err);
        this.ngxLoader.stop();
      }
    );
  }
  deleteBlogDialog(_id: any): void {
    const dialogRef = this.dialog.open(DeleteBlogDialogComponent, {
      width: 'auto',
      data: _id,
      disableClose: true,
    });
  }

  approveblogs(_id: string) {
    this.ngxLoader.start();
    this.blogService.approveBlog(_id).subscribe(
      (res) => {
        console.log(res)
        this.getAllBlogs();
        this.snackBar.open(
          'Successfully approved Blog!!',
          'Dismiss',
          commonSnackBarConfig
        );
        this.ngxLoader.stop();
      },
      (err) => {
        console.log(err);
        this.ngxLoader.stop();
      }
    );
  }
  nextPage(): void {
    this.pageNumber++;
    this.getAllBlogs();
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllBlogs();
    }
  }
  isCurrentPage() {
    return this.pageNumber;
  }
}
