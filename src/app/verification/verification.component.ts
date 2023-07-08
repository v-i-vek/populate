import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  constructor(private route: ActivatedRoute){}
  Id:any =''
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.Id = params.getAll('id'));
    console.log(this.Id[0])
    
  }

 




}
