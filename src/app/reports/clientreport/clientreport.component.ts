import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
@Component({
  selector: 'app-clientreport',
  templateUrl: './clientreport.component.html',
  styleUrls: ['./clientreport.component.css']
})
export class ClientreportComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: any[] = [];
  dataSource;

  hasParam;
  constructor(private authService: AuthService,private router: Router,
    private route: ActivatedRoute) { }

  public dataTable: DataTable;

  ngOnInit() {
    this.hasParam =  localStorage.getItem('takwa-user-id');
    this.getReport();
     

  }


  getReport(){
    //getReports
    let report = {
      'userid':this.hasParam
    };
    //  this.reportsData = [];
    let records = [];
    this.authService.getReports(report).subscribe((res:any) => {
       this.ELEMENT_DATA = res.result;
       this.dataSource  = new MatTableDataSource(this.ELEMENT_DATA);
       this.dataSource.paginator = this.paginator;
    });
  }

  displayedColumns: string[] = ['HostName','Self_Referrel', 'Sessions','Page_View_Platforms', 'Page_Views', 'End_Date', 'Sessions_With_Search','Results_Found', 'ACTION'];
  // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
   selection = new SelectionModel(true, []);
   
   applyFilter(filterValue: string) {
     // alert('ok')
     this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
   
   
  ngAfterViewInit() {
  
  }
}
