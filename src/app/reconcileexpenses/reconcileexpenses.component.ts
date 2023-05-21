import { Component } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { EditExpenseComponent } from '../editexpense/editexpense.component'
@Component({
  selector: 'app-reconcileexpenses',
  templateUrl: './reconcileexpenses.component.html',
  styleUrls: ['./reconcileexpenses.component.css']
})
export class ReconcileExpensesComponent {
  expenses: any[] = [];
  tenants: string[] = ['Fred', 'Mary', 'Phillip', 'Ryan', 'Peter'];

  constructor(private bs: ExpensesService) {
    this.expenses = this.bs.getFilteredExpenses(false); // Only get unpaid expenses
  }

  calculateAmountOwed(tenant: string): number {
    let totalAmountOwed = 0;

    for (const expense of this.expenses) {
      if (expense.payer !== tenant) {
        totalAmountOwed += expense.amount / (this.tenants.length - 1);
      }
    }

    return totalAmountOwed;
}
markAsPaid(expense: any): void {
    this.bs.markExpenseAsPaid(expense.id); // Call the markExpenseAsPaid method from ExpensesService
    this.expenses = this.bs.getFilteredExpenses(false); // Update the expenses list after marking as paid
    }
}
