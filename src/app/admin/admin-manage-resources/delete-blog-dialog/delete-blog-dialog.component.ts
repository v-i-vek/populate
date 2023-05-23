import { Component, Inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from 'src/app/service/blog.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-blog-dialog',
  templateUrl: './delete-blog-dialog.component.html',
  styleUrls: ['./delete-blog-dialog.component.css'],
})
export class DeleteBlogDialogComponent {
  deleteblog: any;

  constructor(
    private blogService: BlogService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteBlogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteBlog(_id: string) {
    this.ngxLoader.start();
    this.blogService.deleteBlogById(_id).subscribe(
      (res) => {
        console.log(res);
        this.deleteblog = res;
        this.dialogRef.close();
        window.location.reload();
        this.snackBar.open(
          'Successfully Deleted Blog!!',
          'Dismiss',
          commonSnackBarConfig
        );
        this.ngxLoader.stop();
      },
      (err: any) => {
        console.log(err);
        this.snackBar.open(
          'Sorry, cannot delete Blog.',
          'Dismiss',
          commonSnackBarConfig
        );
        this.ngxLoader.stop();
      }
    );
  }
}
