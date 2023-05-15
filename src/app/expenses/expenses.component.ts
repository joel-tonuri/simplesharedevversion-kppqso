import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DeleteExpenseComponent } from '../deleteexpense/deleteexpense.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {
 displayedColumns: string[] = ['Merchant', 'Amount', 'Date', 'Paid By', 'Actions']; // column ids
 dataSource = new MatTableDataSource();
 merchantFilter = new FormControl('');
 filterValues = {
  merchant: '',
};

// Creates instances of ExpensesService and MatDialog
  constructor(private bs: ExpensesService, public dialog: MatDialog) {
    
  }
  
  expense: any;   // type of expense data


  ngOnInit() {    
    this.expense = this.bs.getExpense(); // calls the ExpensesService Method 'getExpense' and relays all the data to 'expense'
    this.dataSource = this.expense; // table data is sourced from 'expense'

  }
 
// delete expense dialog
// this is actioned when a user clicks on the delete icon
  openDialog(id: number): void {
    const dialogConfig: MatDialogConfig = {
      width: '500px', // specifies pop up width
      height: '250px', // specifies pop up height
      data: id, // 'id' is passed to the pop up as 'data'
    };

     // presents dialog
    this.dialog.open(DeleteExpenseComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          // not accessed
        } else {
          this.expense = this.bs.getExpense();
        }
      }
    );
  }

}