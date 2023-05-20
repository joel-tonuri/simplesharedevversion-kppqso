import { Component, OnInit, Input} from '@angular/core';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent  implements OnInit{
 
  totalExpenseByTenant: { [key: string]: number };

  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    this.calculateTotalExpenseByTenant();
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

clearLocalstorage(){ // clears local storage
localStorage.setItem('expense', '[]');
}

}