import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Observable } from "rxjs";

declare var $: any;
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
declare interface TableWithCheckboxes {
    id?: number;
    ischecked?: boolean;
    product_name: string;
    type: string;
    quantity: number;
    price: any;
    amount: string;
}
export interface TableData2 {
  headerRow: string[];
  dataRows: TableWithCheckboxes[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  posts$: Observable<User[]>;


  constructor(private authService: AuthService) { }

  fetchAll(): Observable<User[]> {
    return this.authService.fetchAll();
  }

 
  public tableData3: TableData;
  ngOnInit() {
    

          this.posts$ = this.fetchAll();

    
        this.tableData3 = {
            headerRow: [ '', 'Name', 'Job Position', 'Since', 'Salary', 'Actions', 'AMOUNT'],
            dataRows: [
                ['product1', '#jacket', 'Spring Jacket', 'by Dolce&Gabbana', 'Red', 'M', '549', '1', '549'],
                ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799']
            ]
         };
  }
  getTotal() {
      let total = 0;
      for (let i = 0; i < this.tableData3.dataRows.length; i++) {
          const integer = parseInt(this.tableData3.dataRows[i][8], 10);
          total += integer;
      }
      return total;
  };



  delete(postId: Pick<User, "id">): void {
    this.authService
      .deleteUser(postId)
      .subscribe(() => (this.posts$ = this.fetchAll()));
  }

}
