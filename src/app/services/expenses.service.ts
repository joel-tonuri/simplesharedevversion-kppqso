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

  getRecentExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expensesDB'));
    // Sort the expenses by date in descending order
    const sortedExpenses = expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Return the 10 most recent expenses
    return sortedExpenses.slice(0, 10);
  }

  // this FUNCTION accepts 'one' parameter, 'expense', which is an object
  // and pushes this parameter into the expenses array
  addExpense(expense): void {
    let expenses = JSON.parse(localStorage.getItem('expensesDB'));
    expense.repaid = false;
    expenses.push(expense);  // add the object to the end of the array
    localStorage.setItem('expensesDB', JSON.stringify(expenses));
  
    // Update the expenses array in the service
    this.expenses = expenses;
  }
  

// this function edits the data already stored in expensesDB
editExpense(expense, id): void {
  let expenses = this.getExpense();
  expenses[id].repaid = expense.repaid; // Update the 'repaid' property of the expense
  localStorage.setItem('expensesDB', JSON.stringify(expenses));
}


  deleteExpense(id): void {
    let expenses = this.getExpense()
    expenses.splice(id, 1);  // deletes the expense at array position ID
    localStorage.setItem('expensesDB', JSON.stringify(expenses));
  }

  getExpenseById(id: string): any {
    const expenses = JSON.parse(localStorage.getItem('expensesDB')) || [];
    return expenses.find((expense: any) => expense.id === id);
  }
  updateExpense(updatedExpense: any): void {
    const expenses = JSON.parse(localStorage.getItem('expensesDB')) || [];
    const expenseIndex = expenses.findIndex((expense: any) => expense.id === updatedExpense.id);
    if (expenseIndex !== -1) {
      expenses[expenseIndex] = updatedExpense;
      localStorage.setItem('expensesDB', JSON.stringify(expenses));
    }
  }
  getFilteredExpenses(showPaid: boolean): any[] {
    const expenses = this.getExpense();
    if (showPaid) {
      return expenses;
    } else {
      return expenses.filter((expense: any) => !expense.repaid);
    }
  }
  
  markExpenseAsPaid(expenseId: string): void {
    const expenses = this.getExpense();
    const expense = expenses.find((expense: any) => expense.id === expenseId);
    if (expense) {
      expense.repaid = true;
      this.updateExpense(expense);
    }
  }

  
  checkAdd(addValues): void {
    // checks if inputs in the expenseForm are valid
    this.valid = "pass";
    if (typeof addValues.merchant === 'undefined' || addValues.merchant == null || addValues.merchant == "") { 
      this.valid = "merchantFail";
    }

    if (typeof addValues.amount === 'undefined' || addValues.amount == null || addValues.amount == "") { 
      this.valid = "amountFail";
    }

    if (typeof addValues.payer === 'undefined' || addValues.payer == null || addValues.payer == "") {
      this.valid = "payerFail";
    }

    if (typeof addValues.dop === 'undefined' || addValues.dop == null || addValues.dop == "") {
      this.valid = "dateFail";
    }

    console.log("payee is " + addValues.payee); // debugging
    console.log("valid is inside check " + this.valid);

    return this.valid;
  }
}