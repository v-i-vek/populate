import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from 'src/app/service/blog.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  deleteblog: any;

  constructor(
    private Admin: AdminService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteUser(userId: string) {
    this.Admin.deleteUser(userId).subscribe(
      (response) => {
        this.ngxLoader.start();
        console.log(response);
        this.dialogRef.close();
        this.ngxLoader.stop();
        this.snackBar.open('User Deleted!', 'Dismiss', commonSnackBarConfig);
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.ngxLoader.stop();
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }
}
