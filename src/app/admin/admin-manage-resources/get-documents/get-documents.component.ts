import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DocumentService } from 'src/app/service/document.service';
import { DeleteDocumentDialogComponent } from '../delete-document-dialog/delete-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { AllDocument } from 'src/app/model/all-document';

@Component({
  selector: 'app-get-documents',
  templateUrl: './get-documents.component.html',
  styleUrls: ['./get-documents.component.css'],
})
export class GetDocumentsComponent {
 
  docs: AllDocument = {
    _id: '',
    fileName: '',
    createdDate: new Date(),
    isApproved: new Boolean(),
    docData: {
      data: [],
    },
    userId: '',
    user: {
      firstName: '',
      lastName: '',
    },
  };

  _id: string = '';
  userId: {};
  isApproved: Boolean = Boolean();
  fileName: string = '';
  docData!: {
    data: [];
  };
  data: Boolean;
  createdDate: Date = new Date();
  

  files: AllDocument[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages:any
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private documentService: DocumentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllDocs();
  }

  getAllDocs() {
    this.ngxLoader.start();
    this.documentService.getAllAdminDoc(this.pageNumber, this.pageSize).subscribe(
      (response) => {
        this.files = response;
        this.totalPages = response.length
        this.ngxLoader.stop();
      },
      (err) => {
        console.log(err);
        this.ngxLoader.stop();
      }
    );
  }

  deleteFileDialog(_id: any): void {
    const dialogRef = this.dialog.open(DeleteDocumentDialogComponent, {
      width: 'auto',
      data: _id,
      disableClose: true,
    });
  }

  approvefiles(_id: string) {
    this.ngxLoader.start();
    this.documentService.approveDocument(_id).subscribe(
      (res) => {
        console.log(res);
        this.files = [];
        this.snackBar.open(
          'Successfully approved Document!!',
          'Dismiss',
          commonSnackBarConfig
        );
        window.location.reload();
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
    this.getAllDocs();
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllDocs();
    }
  }
  isCurrentPage() {
    return this.pageNumber;
  }
}
