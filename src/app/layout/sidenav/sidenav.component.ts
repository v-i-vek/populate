import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserRoleService } from 'src/app/service/user-role.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  userRole: string;
  constructor(private userRoleService: UserRoleService) {}
  public userId: any = localStorage.getItem('userId');
  ngOnInit() {
    this.userRoleService.getUserRole(this.userId).subscribe(
      (response) => {
        this.userRole = response.userRole;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
  public onASidenavClose = () => {
    this.sidenavClose.emit();
  };
}
