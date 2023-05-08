import { Component} from '@angular/core';

@Component({
  selector: 'app-searchexpenses',
  templateUrl: './searchexpenses.component.html',
  styleUrls: ['./searchexpenses.component.css']
})
export class SearchExpensesComponent  {

clearLocalstorage(){ // clears local storage
localStorage.setItem('expense', '[]');
}

}