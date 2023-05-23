import { Component } from '@angular/core';
import { AddTagComponent } from './add-tag/add-tag.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DeleteTagDialogComponent } from './delete-tag-dialog/delete-tag-dialog.component';

@Component({
  selector: 'app-admin-predefined-tags',
  templateUrl: './admin-predefined-tags.component.html',
  styleUrls: ['./admin-predefined-tags.component.css'],
})
export class AdminPredefinedTagsComponent {
  tags: any[];
  constructor(
    private dialog: MatDialog,
    private admin: AdminService,
    private ngxLoader: NgxUiLoaderService
  ) {}
  openAddTagDialog(): void {
    const dialogRef = this.dialog.open(AddTagComponent, {
      width: 'auto',
    });
  }
  getTags() {
    this.ngxLoader.start();
    this.admin.getAllTags().subscribe(
      (response) => {
        this.tags = response.tags;
        console.log(response);
        this.ngxLoader.stop();
      },
      (error) => {
        console.log(error);
        this.ngxLoader.stop();
      }
    );
  }
  deleteTagDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteTagDialogComponent, {
      width: 'auto',
      data: id,
      disableClose: true,
    });
  }

  ngOnInit(): void {
    this.getTags();
  }
}
