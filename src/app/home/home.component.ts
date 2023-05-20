import { Component, OnInit} from '@angular/core';
import { ExpensesComponent } from '../expenses/expenses.component';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentExpenses: ExpensesComponent[];

  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    this.getRecentExpenses();
  }

  getRecentExpenses() {
    this.recentExpenses = this.expensesService.getRecentExpenses();
  }
clearLocalstorage(){ // clears local storage
localStorage.setItem('expense', '[]');
}

}