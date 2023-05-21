import { Component, OnInit, Input} from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { DeleteExpenseComponent } from '../deleteexpense/deleteexpense.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent  implements OnInit{
  selectedReport: string;
  selectedTenant: string;
  totalExpenseByTenant: { [key: string]: number };
  tenants: string[] = ['Fred', 'Mary', 'Phillip', 'Ryan', 'Peter'];
  filteredExpenses: any[] = []; // Array to hold filtered expenses
  expenses: any[] = [];

  constructor(private expensesService: ExpensesService, private bs: ExpensesService) { }

  ngOnInit(): void{
    this.expenses = JSON.parse(localStorage.getItem('expensesDB')) || [];
  }

  availableReports = [
    { label: 'Total Amount per Tenant', value: 'totalExpense' },
    { label: 'Expenses for Tenant', value: 'expensesByTenant' }
  ];

  generateReport() {
    if (this.selectedReport === 'totalExpense') {
      // Generate total expense report
      this.calculateTotalExpenseByTenant();
    }
    if (this.selectedReport === 'expensesByTenant') {
      this.filteredExpenses = this.getExpensesByTenant(this.selectedTenant);
   }
}
  
  calculateTotalExpenseByTenant() {
    const expenses = this.expensesService.getExpense();
    this.totalExpenseByTenant = {};

    expenses.forEach((expense: any) => {
      const tenant = expense.payer;
      const amount = expense.amount;

      if (tenant in this.totalExpenseByTenant) {
        this.totalExpenseByTenant[tenant] += amount;
      } else {
        this.totalExpenseByTenant[tenant] = amount;
      }
    });
  }

  getExpensesByTenant(tenant: string): any[] {
    return this.expenses.filter((expense: any) => expense.payer === tenant);
  }
  

  onTenantSelected(tenant: string): void {
    this.selectedTenant = tenant;
    this.getExpensesByTenant(tenant); // Call the method to filter expenses when tenant is selected
  }

  onTenantChange() {
    this.filteredExpenses = this.expenses.filter((expense: any) => expense.paidBy === this.selectedTenant);
  }
  
clearLocalstorage(){ // clears local storage
localStorage.setItem('expense', '[]');
}

}