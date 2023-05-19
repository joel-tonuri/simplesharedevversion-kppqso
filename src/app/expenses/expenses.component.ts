import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { DeleteExpenseComponent } from '../deleteexpense/deleteexpense.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {
 displayedColumns: string[] = ['Merchant', 'Amount', 'Date', 'Paid By', 'Actions']; // column ids
  dataSource: MatTableDataSource<ExpensesComponent>;
 searchKey: string;
 @ViewChild(MatSort) sort: MatSort;


// Creates instances of ExpensesService and MatDialog
  constructor(private bs: ExpensesService, public dialog: MatDialog) {
    
  }
  
  expense: any;   // type of expense data

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {    
    this.expense = this.bs.getExpense(); // calls the ExpensesService Method 'getExpense' and relays all the data to 'expense'
    this.dataSource = new MatTableDataSource<expenses>(this.expense);
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  
  clearFilter() {
    this.searchKey = '';
    this.applyFilter();
  }
  openDialog(id: number): void {
    const dialogConfig: MatDialogConfig = {
      width: '500px', // specifies pop up width
      height: '250px', // specifies pop up height
      data: id, // 'id' is passed to the pop up as 'data'
    };

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