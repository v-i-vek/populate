import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProfileService } from 'src/app/service/profile.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';

@Component({
  selector: 'app-delete-forum-dialog',
  templateUrl: './delete-forum-dialog.component.html',
  styleUrls: ['./delete-forum-dialog.component.css'],
})
export class DeleteForumDialogComponent {
  deleteforum: any;
  constructor(
    private profileService: ProfileService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteForumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteForum(_id: string) {
    this.ngxLoader.start();
    this.profileService.deleteForumById(_id).subscribe(
      (res) => {
        this.deleteforum = res;
        this.dialogRef.close();
        window.location.reload();
        this.snackBar.open(
          'Successfully Deleted Forum!!',
          'Dismiss',
          commonSnackBarConfig
        );
        this.ngxLoader.stop();
      },
      (err: any) => {
        console.log(err);
        this.snackBar.open(
          'Sorry, cannot delete Forum.',
          'Dismiss',
          commonSnackBarConfig
        );
        this.ngxLoader.stop();
      }
    );
  }
}
