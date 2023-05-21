import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { DeleteExpenseComponent } from '../deleteexpense/deleteexpense.component';
import { ViewChild } from '@angular/core';
import { ReportsComponent } from '../reports/reports.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {
 displayedColumns: string[] = ['Merchant', 'Amount', 'Date', 'Paid By', 'Actions']; // column ids
  dataSource: MatTableDataSource<ExpensesComponent>;
  searchKey: string = '';
 @ViewChild(MatSort) sort: MatSort;
startDate: string|number|Date;
endDate: string|number|Date;
dop: string|number|Date;
startDatePicker: any;
endDatePicker: any;
showPaid: boolean = false;
filteredExpenses: any[] = [];
// Creates instances of ExpensesService and MatDialog
  constructor(private bs: ExpensesService, public dialog: MatDialog) {
    
  }
  
  calculateTotalExpenseByTenant(): { [key: string]: number } {
    const totalExpenseByTenant: { [key: string]: number } = {};
  console.log(this.expense)
    this.expense.forEach((expense: any) => {
      const tenant = expense.payer;
      const amount = expense.amount;
  
      if (tenant in totalExpenseByTenant) {
        totalExpenseByTenant[tenant] += amount;
      } else {
        totalExpenseByTenant[tenant] = amount;
      }
    });
  
    return totalExpenseByTenant;
  }
  
  expense: any;   // type of expense data

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {    
    this.expense = this.bs.getExpense(); // calls the ExpensesService Method 'getExpense' and relays all the data to 'expense'
    this.dataSource = new MatTableDataSource<ExpensesComponent>(this.expense);
    this.filteredExpenses = this.expense;
    this.updateFilteredExpenses();

  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  
  
  clearFilter() {
    this.searchKey = '';
    this.applyFilter();
  }
  updateFilteredExpenses(): void {
    this.filteredExpenses = this.bs.getFilteredExpenses(this.showPaid);
    this.dataSource.data = this.filteredExpenses.length > 0 ? this.filteredExpenses : [];
  }
  
  
  
  
  search() {
    console.log('Search function called');
    const startDate = this.startDate;
    const endDate = this.endDate;
    console.log(this.startDate, this.endDate);

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const expenseDate = new Date(data.dop);

      if (
        (!startDate || expenseDate >= startDate) &&
        (!endDate || expenseDate <= endDate)
      ) {
        return true;
      }
      return false;
    };
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

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