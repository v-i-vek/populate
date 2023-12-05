import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent, map, debounceTime, Observable } from 'rxjs';
import { PaginationService } from './service/pagination.service';
import { pagination } from './store/effect';
import { Store, createSelector } from '@ngrx/store';
import { onCallOfPage, onSuccessCallOfPage } from './store/action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit,OnInit{
  
  search:String='';
  val:any = []
  displayedColumns: string[] = ['question', 'questionDescribe', 'tags'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  @ViewChild('myInput') myInput !: ElementRef;
  datavalue$!:Observable<any>
  constructor(public http:PaginationService,private store :Store<pagination>){}
  // value:any ={page:this.paginator.pageIndex+1,pageSize:this.paginator.pageSize,search:this.search}
  ngOnInit(){
    // this.getquestionwithPagination()
  }
  ngAfterViewInit() {
    this.getquestionwithPagination()
    

    const searchTerm = fromEvent<any>(this.myInput.nativeElement, 'keyup').pipe(
      map((event) => event.target.value),
      debounceTime(2000)
    );
    searchTerm.subscribe((res) => {
      this.getquestionwithPagination()
      console.log(res);
    });
  }


 


  getquestionwithPagination(){
    const data = {page:this.paginator.pageIndex+1,pageSize:this.paginator.pageSize,search:this.search}

    this.store.dispatch(onCallOfPage({data}));
   
    // console.log("from store",this.datavalue$.Store);
    


    this.http.paginatate(this.paginator.pageIndex+1,this.paginator.pageSize,this.search).subscribe((res:any)=>{
      console.log(this.search)
      this.dataSource.data  = res.data
      this.paginator.length = res.totalPages 
      this.val = res.data
      // console.log("=++++++++++++++++=",this.dataSource)
      // console.log("==========",this.dataSource.data)
    })
  }
  onPageChange(event:any){
    console.log(event);
    
    this.getquestionwithPagination()
  }
  
  searchValue(event:any){
    console.log(event)
    this.getquestionwithPagination();
  }
  
  
  


}
