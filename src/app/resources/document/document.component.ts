import { Component, OnInit } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog';
import { DocumentService } from 'src/app/service/document.service';
import { AdddocumentComponent } from '../adddocument/adddocument.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AllDocument } from 'src/app/model/all-document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent {
  docs: AllDocument = {
    _id: '',
    fileName: '',
    createdDate: new Date(),
    isApproved: new Boolean(),
    docData: {
      data : []
    },
    userId: '',
    user:{
      firstName: '',
      lastName: '',
    },
    
  };

  fileName: string = '';
  createdDate: Date = new Date();
  docData!: {
    data: [];
  };
  userId:{};
  

  files: AllDocument[] = [];

  displayedColumns: string[] = [
    'fileName',
    'Owner',
    'createdDate',
  ];
  pageNumber = 1;
  pageSize = 5;
  totalPages:any
  constructor(
    public dialog: MatDialog,
    private documentService: DocumentService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  openDocumentDialog(): void {
    const dialogRef = this.dialog.open(AdddocumentComponent, {
      width: 'auto',
    });
  }

  ngOnInit() {
    this.userId = {
      firstName: '',
      lastName: '',
    };
    this.getAllDocs();
  }

  getAllDocs() {
    this.ngxLoader.start();
    this.documentService.getAllDoc(this.pageNumber, this.pageSize).subscribe(
      (response) => {
        this.files = response;
        this.totalPages = response.length
        this.ngxLoader.stop();
      },
      (err) => {
        console.log(err);
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
