import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ExpensesService } from '../services/expenses.service'; // imports ExpensesService

@Component({
  selector: 'app-editexpense',
  templateUrl: './editexpense.component.html',
  styleUrls: ['./editexpense.component.css']
})

export class EditExpenseComponent implements OnInit, OnDestroy {

  // Creates instances of ActivatedRoute, FormBuilder and ExpensesService
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private bs: ExpensesService) { }

  // Makes my 'expenseForm' a FormGroup
  expenseForm: FormGroup;

  // router
  id: number;
  private sub: any;
  // expenses array
  expenses: any
  expense: any = {};
  showPaid: boolean = false;

  ngOnInit() {
    // call the ExpensesServices Method 'getExpenseArray'
    // returns all the expenses data
    this.expenses = this.bs.getExpense();

    // the following code grabs the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    });


    this.initialiseForm(this.expenses, this.id);
  }

  message: string = "";
  editShowBut: boolean = true;
  bntStyle: string = '';
  maxDate = new Date(2022, 4, 26);

  submitEdit() {
    // pull the edited values from the form
    const form = this.expenseForm.value;

    // uses editExpense function from ExpensesServices
    this.bs.editExpense(form, this.id);
    this.expenses = this.bs.getExpense();
    this.message = "The details of this expense have been updated";
    this.bntStyle = 'mat-fab';
  }

  markAsPaid(): void {
    this.expense.repaid = true;
    this.bs.editExpense(this.expense, this.id);
    this.router.navigate(['/expenses']);
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  // populates form from values already held in local storage
  initialiseForm(expenses, id): void {
    this.expenseForm = this.fb.group(
      {
        merchant: [this.expenses[id].merchant],
        amount: [this.expenses[id].amount],
        dop: [this.expenses[id].dop],
        payer: [this.expenses[id].payer],

      }
    );

  }

}

