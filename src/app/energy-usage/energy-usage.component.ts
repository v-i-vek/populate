import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DevicesService } from '../Services/devices.service';

@Component({
  selector: 'app-energy-usage',
  templateUrl: './energy-usage.component.html',
  styleUrls: ['./energy-usage.component.scss'],
})
export class EnergyUsageComponent {
  displayedColumns: string[] = ['thingName', 'location', 'unit', 'fruit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: DevicesService) {
    this.getAllDeviceData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAllDeviceData(){
    this.http.getDevices().subscribe({next:(res:any)=>{
      this.dataSource = new MatTableDataSource(res.data.Items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort

    }})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
