import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Document } from 'src/app/model/document';
import { ProfileService } from 'src/app/service/profile.service';
import { AdddocumentComponent } from 'src/app/resources/adddocument/adddocument.component';
import { DeleteDocumentDialogComponent } from 'src/app/admin/admin-manage-resources/delete-document-dialog/delete-document-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-resourcesdocument',
  templateUrl: './resourcesdocument.component.html',
  styleUrls: ['./resourcesdocument.component.css'],
})
export class ResourcesdocumentComponent {
  document: Document = {
    _id: '',
    fileName: '',
    createdDate: new Date(),
    isApproved: new Boolean(),
    docData: {
      data: [],
    },
    userId: {
      firstName: '',
      lastName: '',
    },
  };

  fileName: string = '';
  createdDate: Date = new Date();

  docData!: {
    data: [];
  };
  userId: {};

  files: any[] = [this.document];

  displayedColumns: string[] = ['fileName', 'createdDate', 'Delete', 'Owner'];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteDocumentDialogComponent>,
    private profileservice: ProfileService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  getDocumentById() {
    this.ngxLoader.start();
    const id: any = localStorage.getItem('userId');
    // console.log(id)
    this.profileservice.getDocumentById(id).subscribe(
      (files) => {
        this.files = files;
        this.ngxLoader.stop();
        //  console.log(files);
      },
      (err) => {
        console.log(err);
        this.ngxLoader.stop();
      }
    );
  }
  openDocumentDialog(): void {
    const dialogRef = this.dialog.open(AdddocumentComponent, {
      width: 'auto',
    });
  }
  ngOnInit(): void {
    this.userId = {
      firstName: '',
      lastName: '',
    };
    this.getDocumentById();
  }

  clickMethod(id: string) {
    this.profileservice.DeleteDocumentById(id).subscribe(
      (res: any) => {
        this.deleteFile = res;
        this.dialogRef.close();
        window.location.reload();
        // console.log(this.deleteFile);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  deleteFile(questionId: any) {
    const dialogRef = this.dialog.open(DeleteDocumentDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: questionId,
    });
  }
}
