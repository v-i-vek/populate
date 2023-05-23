import { Component, Sanitizer } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from 'src/app/service/admin.service';
import { DeleteDialogComponent } from 'src/app/admin/admin-manage-users/delete-dialog/delete-dialog.component'
@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css'],
})
export class AdminManageUsersComponent {
  users: any[];
  constructor(
    private admin: AdminService,
    private ngxLoader: NgxUiLoaderService,
    public dialog: MatDialog,
  ) {}

  getUsers() {
    this.ngxLoader.start();
    this.admin.getAllUsers().subscribe(
      (response) => {
        this.users = response.users;
        console.log(response);
        this.ngxLoader.stop();
      },
      (error) => {
        console.log(error);
        this.ngxLoader.stop();
      }
    );
  }
  deleteUserDialog(userId:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: 'auto',
      data: userId,
      disableClose: true,
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
