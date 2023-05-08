import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { ExpensesService } from '../services/expenses.service'; // imports ExpensesService

@Component({
  selector: 'app-deleteexpense',
  templateUrl: './deleteexpense.component.html',
  styleUrls: ['./deleteexpense.component.css']
})

export class DeleteExpenseComponent implements OnInit {

  constructor(private bs: ExpensesService,
    public dialogRef: MatDialogRef<DeleteExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { } // injects data

  expense: []; // holds the expense data
  id = this.data; // assign to variable "id"
  displayName:string; // variable to display name


  ngOnInit() {
    // calls ExpensesService and assigns it to the expense variable
    this.expense = this.bs.getExpense();
    // sets the variable "displayName" to the expenses array at ID
  }

  refresh(): void { // function that is called to completely refresh the webpage after an expense is deleted
    window.location.reload();
}

  delete(data) { // deletes an expense
    console.log("in delete :" + data)
    this.bs.deleteExpense(this.data);
  }

  close() { // dismisses the prompt 
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(value => {
    });
  }
  
}