import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageresources',
  templateUrl: './manageresources.component.html',
  styleUrls: ['./manageresources.component.css'],
})
export class ManageresourcesComponent {
  color = 'black';
  constructor(private router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {}
}
