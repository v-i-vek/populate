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
  selector: 'app-delete-tag-dialog',
  templateUrl: './delete-tag-dialog.component.html',
  styleUrls: ['./delete-tag-dialog.component.css'],
})
export class DeleteTagDialogComponent {
  constructor(
    private Admin: AdminService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteTag(id: string) {
    this.Admin.deleteTag(id).subscribe(
      (response) => {
        this.ngxLoader.start();
        this.dialogRef.close();
        this.ngxLoader.stop();
        this.snackBar.open('Tag Deleted!', 'Dismiss', commonSnackBarConfig);
        window.location.reload()
      },
      (error) => {
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
