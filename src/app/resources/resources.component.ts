import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
  color = 'black';
  constructor(private router: Router) {}
  ngOnInit(): void {}
}
