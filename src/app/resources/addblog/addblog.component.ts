import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';

export interface tags {
  name: string;
}

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css'],
})
export class AddblogComponent {

  userId = localStorage.getItem('userId');
  public Editor = ClassicEditor;
  AddBlogForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(119),
      Validators.pattern('^[\\S]([\\wéáíóúñÑ,.:-¿?!() ])+$')
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(1500),
    ]),
  });

  blogs: Blog = {
    _id: '',
    title: '',
    content: '',
    createdDate: new Date(),
    //updatedDate: new Date(),
    isApproved: new Boolean(),
    userId: '',
    user:{
      firstName: '',
      lastName: '',
    },
  };
  public title: any;
  public content: any;
  _id: string = '';
  createdDate: Date = new Date();
  allblogs: Blog[] = [];

  constructor(
    private router: Router,
    private blogService: BlogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.title = this.blogs.title;
    this.content = this.blogs.content;
  }

  get valide() {
    return this.AddBlogForm.controls;
  }
  createBlogData() {
    this.blogs.title = this.title;
    this.blogs.content = this.content;
    this.userId;
    this.createdDate = new Date();
    this.blogService.createBlog(this.blogs).subscribe(
      (res) => {
        console.log(res);
        this.allblogs = [];
        this.ngOnInit();
        this.snackBar.open(
          "Your blog will be posted after Admin's approval!!",
          'Dismiss',
          commonSnackBarConfig
        );
        this.router.navigate(['/resources']);
      },
      (err) => {
        console.log(err);
        console.log(this.blogs.content);
        this.snackBar.open(
          'Sorry, cannot add this blog.Try a valid Blog!!',
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }
}
