import { Component, OnInit } from '@angular/core';

import { BlogService } from 'src/app/service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { __param } from 'tslib';
import { UserRoleService } from 'src/app/service/user-role.service';
import { SpecificBlog } from 'src/app/model/specific-blog';

@Component({
  selector: 'app-specific-blog',
  templateUrl: './specific-blog.component.html',
  styleUrls: ['./specific-blog.component.css'],
})
export class SpecificBlogComponent {

  userId = localStorage.getItem('userId')
  blogs: SpecificBlog = {
    _id: '',
    title: '',
    content: '',
   createdDate: new Date(),
  // updatedDate : new Date(),
    isApproved: new Boolean(),
    userId: 
    {
      firstName: '',
      lastName: '',
    },
  };

  title: string = '';
  content: string = '';
  createdDate: Date = new Date();

  allblogs: SpecificBlog[] = [];


  userRole:string
  public userid: any = localStorage.getItem('userId');
  constructor(
    private router: Router,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private userRoleService: UserRoleService,

  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:any) => {
      const bl:string = params.get('id')
      this.blogService.getBlogById(bl!).subscribe((res) => {
        this.blogs = res;
        console.log()
      },(err) => {
              console.log(err);
            }
      );
    });
  
    this.userRoleService.getUserRole(this.userid).subscribe(
      (response) => {
        this.userRole = response.userRole;
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
