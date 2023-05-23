import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css'],
})
export class AddTagComponent {
  addTagForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    public dialogRef: MatDialogRef<AddTagComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ngxLoader: NgxUiLoaderService,
  ) {}
  openAddTagDialog(): void {
    const dialogRef = this.dialog.open(AddTagComponent, {
      width: 'auto',
    });
  }
  createTag(): void {
    this.addTagForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  addTag() {
    this.ngxLoader.start();
    this.admin.addTag(this.addTagForm.value).subscribe(
      (res) => {
        this.dialogRef.close();
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.createTag();
  }
}
