import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserRoleService } from 'src/app/service/user-role.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  blogs: Blog = {
    _id: '',
    title: '',
    content: '',
    createdDate: new Date(), 
   // updatedDate: new Date(),
    isApproved: new Boolean(),
    userId: '',
    user:{
      firstName: '',
      lastName: '',
    },
  };

  _id: string = '';
  title: string = '';
  content: string = '';
  createdDate: Date = new Date();
  userId: {};

  allblogs: Blog[] = [];

  pageNumber = 1;
  pageSize = 8;
  totalPages:any
  
  constructor(
    private router: Router,
    private blogService: BlogService,
    private ngxLoader: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this._id = '';
    this.title = '';
    this.content = '';
    this.createdDate = new Date();
    this.getAllblogs();
  }

  // get all Data Subscribe
  getAllblogs() {
    this.ngxLoader.start();
    this.blogService.getAllBlogs(this.pageNumber, this.pageSize).subscribe(
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

  nextPage(): void {
    this.pageNumber++;
    this.getAllblogs();
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllblogs();
    }
  }
  isCurrentPage() {
    return this.pageNumber;
  }
}
