import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent, map, debounceTime } from 'rxjs';
import { PaginationService } from './service/pagination.service';

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

  ngOnInit(){
    this.getquestionwithPagination()
  }
  // reqData: any;  
  ngAfterViewInit() {
    this.getquestionwithPagination()
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    const searchTerm = fromEvent<any>(this.myInput.nativeElement, 'keyup').pipe(
      map((event) => event.target.value),
      debounceTime(2000)
    );
    searchTerm.subscribe((res) => {
      this.getquestionwithPagination()
      console.log(res);
      // this.reqData = res;
    });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
 
  constructor(public http:PaginationService){}


  getquestionwithPagination(){
    this.http.paginatate(this.paginator.pageIndex+1,this.paginator.pageSize,this.search).subscribe((res:any)=>{
      console.log(this.search)
      this.dataSource.data  = res.data
      this.paginator.length = res.totalPages 
      this.val = res.data
      console.log("=++++++++++++++++=",this.dataSource)
      console.log("==========",this.dataSource.data)
    })
  }
  onPageChange(event:any){
    this.getquestionwithPagination()
  }
  
  searchValue(event:any){
    console.log(event)
    // this.search  = 
    this.getquestionwithPagination();
  }
  
  
  


}
