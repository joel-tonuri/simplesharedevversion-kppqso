import { Injectable , OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// this is a rebranded version of peopleservices
// which has been *slightly* modified


export class ExpensesService   {
  expenses=[];  // expenses array setup to hold data from expensesDB
  valid: any;
  constructor() {
      /* ====LOCALSTORAGE========
    Local storage stores data as key-value pairs, and the values are stored as "strings". 
    So, if we must JSON.stringify when we put them into LocalStorage and we must 'parse' the string into a valid object, when we retrieve it.

    This inictial checks to see if the expensesDB in local storage exsits, if it doesn't it creates a blank db in lcoal storage called expensesDB
    */
    if (localStorage.expensesDB == null ) {
        localStorage.setItem('expensesDB', JSON.stringify(this.expenses));
    }

  } // end constructor

  // this function extacts data from the expensesDB and puts it in the array expense
  getExpense() {
    let expenses = JSON.parse(localStorage.getItem('expensesDB'));
    return expenses;
  }

  

  // this FUNCTION accepts 'one' parameter, 'expense', which is an object
  // and pushes this parameter into the expenses array
  addExpense(expense): void {
    let expenses = JSON.parse(localStorage.getItem('expensesDB'));
    expenses.push(expense);  // add the object to the end of the array
    localStorage.setItem('expensesDB', JSON.stringify(expenses));
  }

// this function edits the data already stored in expensesDB
  editExpense(expense, id): void {
    let expenses = JSON.parse(localStorage.getItem('expensesDB'));
    expenses[id] = expense; // changes the objects at array position id
    localStorage.setItem('expensesDB', JSON.stringify(expenses));
  }

  deleteExpense(id): void {
    let expenses = this.getExpense()
    expenses.splice(id, 1);  // deletes the expense at array position ID
    localStorage.setItem('expensesDB', JSON.stringify(expenses));
  }

  checkAdd(addValues): void {
    // checks if inputs in the expenseForm are valid
    this.valid = "pass";
    if (typeof addValues.merchant === 'undefined' || addValues.merchant == null || addValues.merchant == "") { // this checks that the merchant field is valid
      this.valid = "merchantFail";
    }

    if (typeof addValues.amount === 'undefined' || addValues.amount == null || addValues.amount == "") { // this checks that the amount field is valid
      this.valid = "amountFail";
    }

    if (typeof addValues.payer === 'undefined' || addValues.payer == null || addValues.payer == "") { // this checks that the "who paid this expense" field is valid
      this.valid = "payerFail";
    }

    if (typeof addValues.dop === 'undefined' || addValues.dop == null || addValues.dop == "") { // this checks that the date field is valid
      this.valid = "dateFail";
    }

    console.log("payee is " + addValues.payee); // for debugging purposes
    console.log("valid is inside check " + this.valid); // for debugging purposes

    return this.valid;

    
  }



}