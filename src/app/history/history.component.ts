import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../md/md-table/md-table.component';
import { history } from '../models/history';
import { AuthService } from '../services/auth.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    history$: Observable<history[]>;

  constructor(private historyService: HistoryService, private authService: AuthService) { }

  public tableData1: TableData;
  public tableData2: TableData;
  public tableData3: TableData;

  ngOnInit() {
    this.history$ = this.fetchAll();

      this.tableData1 = {
          
          headerRow: [ 'Name', 'Country', 'City', 'Salary'],
          dataRows: [
              
              ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
              ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
              ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
              ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
              ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
              ['Mason Porter', 'Chile', 'Gloucester', '$78,615']
          ]
       };
       this.tableData2 = {
           headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
           dataRows: [
               ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout' ],
               ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
               ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
               ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
               ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
               ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
           ]
        };
        this.tableData3 = {
            headerRow: [ 'Question', 'Answer',  'Comment', 'Date' ],
            dataRows: [
                ['1', 'Dakota Rice (Success)', '$36,738', 'Niger', 'Oud-Turnhout' ],
                ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
                ['3', 'Sage Rodriguez (Info)', '$56,142', 'Netherlands', 'Baileux' ],
                ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
                ['5', 'Doris Greene (Danger)', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
                ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ],
                ['7', 'Mike Chaney (Warning)', '$38,735', 'Romania', 'Bucharest' ]
            ]
         };
  }

  fetchAll(): Observable<history[]> {
    return this.historyService.fetchAll();
  }

}
