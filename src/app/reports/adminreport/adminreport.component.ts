import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as xlsx from 'xlsx';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
@Component({
  selector: 'app-adminreport',
  templateUrl: './adminreport.component.html',
  styleUrls: ['./adminreport.component.css']
})
export class AdminreportComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: any[] = [];
  dataSource;

  
 data : [][]
 hasParam;
 reportsData = [];
  constructor( private authService: AuthService,private router: Router,
    private route: ActivatedRoute) { }

  public dataTable:DataTable;

  ngOnInit() {
 
    this.getDataFromUrl();
    
   
    
  }



 
 

  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer> (evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: xlsx.WorkBook = xlsx.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: xlsx.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (xlsx.utils.sheet_to_json(ws, { header: 1 }));

      if(this.data){
        this.uploadReport();
      }


    };

    reader.readAsBinaryString(target.files[0]);
    // if(this.data){
    //   this.uploadReport();
    // }
    

  }

  getDataFromUrl(){
    // id from url
    this.route.params.subscribe((data) => {
      this.hasParam = data['id'.toString()];
      if(this.hasParam > 0){
        this.getReport();
      }
    });
   
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


       
      // this.dataTable = {
      //   headerRow: ['HostName', 'Self Referrel', 'Sessions', 'Page View Platforms', 'Page Views', 'End Date','Sessions With Search','Results Found','Actions' ],
      //   footerRow: [ 'HostName', 'Self Referrel', 'Sessions', 'Page View Platforms', 'Page Views', 'End Date','Sessions With Search','Results Found','Actions' ],
      //   dataRows:res.UserReport
      //  };
      //  this.reportsData = res.UserReport;
      //  if(this.reportsData){
      //   console.log('here data');
      //   console.log(this.reportsData);
      //   this.initDataTable();
      // }


      // / let records = [];
        // res.UserReport.forEach((item, index) => {
        //   records.push(item);
        
        // });
        // records = res.UserReport;
        

        // this.dataTable.dataRows = res.UserReport;

        
        // console.log(res);
         
        

        // console.log(this.reportsData);

      

        // console.log(this.dataTable);


      // this.reportsData = res.result;
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
  

  uploadReport(){
    console.log(JSON.stringify(this.data));
    let report = {
      'report': JSON.stringify(this.data),
      'userid':this.hasParam
    };
    // console.log(report);
    this.authService.saveReport(report).subscribe((res:any) => {
      this.getReport();
      // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/reportadmin/'+this.hasParam]);
      // }); 
    });
  }



  initDataTable(){
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function(e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      e.preventDefault();
    });

    // Delete a record
    table.on('click', '.remove', function(e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function(e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }



  

  ngAfterViewInit() {
    console.log('ngAfterViewInit');

    
   
  }

 }

