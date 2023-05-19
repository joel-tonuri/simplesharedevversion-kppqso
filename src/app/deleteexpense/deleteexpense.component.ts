import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { ExpensesService } from '../services/expenses.service'; 

@Component({
  selector: 'app-deleteexpense',
  templateUrl: './deleteexpense.component.html',
  styleUrls: ['./deleteexpense.component.css']
})

export class DeleteExpenseComponent implements OnInit {

  constructor(private bs: ExpensesService,
    public dialogRef: MatDialogRef<DeleteExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { } 

  expense: []; // holds the expense data
  id = this.data; // assign to variable "id"
  displayName: string;


  ngOnInit() {
    // calls ExpensesService and assigns it to the expense variable
    this.expense = this.bs.getExpense();
    
  }

  refresh(): void { // refresh after deletion
    window.location.reload();
}

  delete(data) {
    console.log("in delete :" + data)
    this.bs.deleteExpense(this.data);
  }

  close() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(value => {
    });
  }
}