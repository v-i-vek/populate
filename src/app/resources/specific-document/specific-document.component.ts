import { Component } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/model/document';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-specific-document',
  templateUrl: './specific-document.component.html',
  styleUrls: ['./specific-document.component.css'],
})
export class SpecificDocumentComponent {
  docs: Document = {
    _id: '',
    fileName: '',
    createdDate: new Date(),
    isApproved: new Boolean(),
    docData: {
      data: [],
    },
    userId:
  {
    firstName: '',
    lastName: ''
   }
  };

  fileName: string = '';
  createdDate: Date = new Date();
  docData!: {
    data: {
      data: [];
    };
  };

  files: Document[] = [];

  public pdfSrc: string = '';

  displayedColumns: string[] = [
    'fileName',
    'Owner',
    'createdDate',
  ];

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private activatedRoute: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.activatedRoute.paramMap.subscribe((params: any) => {
      const doc: string = params.get('_id');
      this.documentService.getDocumentById(doc!).subscribe(
        (res) => {
          const pdfsrc = `data:application/pdf;base64, ${btoa(
            new Uint8Array(res.docData.data).reduce(function (base64, byte) {
              return base64 + String.fromCharCode(byte);
            }, '')
          )}`;
          this.pdfSrc = pdfsrc;
          this.ngxLoader.stop();
        },
        (err) => {
          console.log(err);
          this.ngxLoader.stop();
        }
      );
    });
  }
}
