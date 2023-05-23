import { Component, Inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DocumentService } from 'src/app/service/document.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-document-dialog',
  templateUrl: './delete-document-dialog.component.html',
  styleUrls: ['./delete-document-dialog.component.css'],
})
export class DeleteDocumentDialogComponent {
  deletedocument: any;

  constructor(
    private documentService: DocumentService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteFile(id: string) {
    this.documentService.deleteDocumentById(id).subscribe(
      (res: any) => {
        console.log(res);
        this.deletedocument = res;
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
