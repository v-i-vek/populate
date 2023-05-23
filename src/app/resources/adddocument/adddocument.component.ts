import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/service/document.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css'],
})
export class AdddocumentComponent {
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file

  // Inject service
  constructor(
    private Documentservice: DocumentService,
    public dialogRef: MatDialogRef<AdddocumentComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.Documentservice.upload(this.file).subscribe(
      (response) => {
        console.log(response)
        if (typeof event === 'object') {
          this.loading = false; // Flag variable
          
          this.snackBar.open( 'Your file will be uploaded after admins approval!!',
            'Dismiss',
            commonSnackBarConfig
          );
          this.dialogRef.close()
        }
      },
      (error) => {
        this.snackBar.open(
          'Sorry, cannot upload this file.Try a valid file or try again later!!',
          'Dismiss',
          commonSnackBarConfig
        );
        this.loading = false;
      }
    );
  }
}
