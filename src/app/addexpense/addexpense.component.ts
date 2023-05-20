import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl} from '@angular/forms'; // standard form tools
import {COMMA, ENTER} from '@angular/cdk/keycodes'; // used for custom tag entry
import { ExpensesService } from '../services/expenses.service'; // imports ExpensesService
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css'],
})

export class AddExpenseComponent implements OnInit {
  payer = ''; 
  tenantList: string[] = ['Fred', 'Mary', 'Phillip', 'Ryan', 'Peter']; // tenant names are hardcoded, for now

  // Makes my 'expenseForm' a FormGroup
  addexpenseForm: FormGroup;
  valid: any;
  errorMessage: any;

  // Creates instances of FormBuilder and ExpensesService
  constructor(
    private fb: FormBuilder,
    private bs: ExpensesService) {}
  
  ngOnInit(): void {
    // defines formcontrolnames
    this.addexpenseForm = this.fb.group(
      {
        merchant: [null, [Validators.maxLength(15)]],
        description: [null, [Validators.maxLength(15)]],
        amount: [null],
        dop: [null],
        payer: [null],
        category: [null],
        settled: [false],
      }
    );

// for debugging
    this.addexpenseForm.valueChanges 
      .subscribe((formData) => {
          // logged in console real-time
          console.log("Merchant:",formData.merchant);
          console.log("Description:",formData.description);
          console.log("$:",formData.amount);
          console.log("DOP:",formData.dop);
          console.log("Payer:",formData.payer);
          console.log("Category:",formData.categorised);


      })
  }

  // input validation
  submit(): void {  
    this.errorMessage = "";
    this.valid = this.bs.checkAdd(this.addexpenseForm.value);
    if (this.valid == "pass") {
      this.bs.addExpense(this.addexpenseForm.value);
      alert("The expense has been added" ) ;
      this.addexpenseForm.reset();
    }

    // if validation fails, halt and display error
    if (this.valid == "merchantFail") {
      this.errorMessage = "Invalid merchant name";
    }    

    if (this.valid == "amountFail") {
      this.errorMessage = "Invalid amount";
    }    

    if (this.valid == "payerFail") {
      this.errorMessage = "Please indicate which tenant incurred this expense"
    }

    if (this.valid == "dateFail") {
      this.errorMessage = "Please provide the date for this expense"
    }
}
// miscellaneous
  customCategory: string; 
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA]; 
  categoryCtrl = new FormControl; 
  filteredCategories: Observable<string[]>; // tag filtering using Observable from rxjs
  categories: string[] ; 
  predefinedCategories: string[] = ['Entertainment', 'Furniture', 'Maintenance', 'Groceries', 'Utilities', 'Miscellaneous']; // hardcoded examples
  allCategories: string[] = [];
  maxDate = new Date(2024, 4, 22); 

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const separatorKeys = [',', ' ']; 

    // Check if a category has already been selected
    if (this.allCategories.length > 0) {
      // Clear the input value
      event.input.value = '';
      return; // Exit the function if a category has already been selected
    }
  
    // Check if the entered value is not empty and is separated by a separator key
    if (value && separatorKeys.indexOf(event.value)) {
      const categories = value.split(new RegExp(`[${separatorKeys.join('')}]`));
  
      // Add each category to the selectedCategories array
      categories.forEach(category => {
        const trimmedCategory = category.trim();
        if (trimmedCategory && this.allCategories.indexOf(trimmedCategory) === -1) {
          this.allCategories.push(trimmedCategory);
        }
      });
    } else if (value && this.allCategories.indexOf(value) === -1) {
      // Add the custom category if it is not empty and does not already exist
      this.allCategories.push(value);
    }
  
    // Clear the input value
    event.input.value = '';
  }
  

  removeCategory(category: string): void {
    const index = this.allCategories.indexOf(category);
    if (index !== -1) {
      this.allCategories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const category = event.option.value;
    if (this.allCategories.indexOf(category) === -1) {
      this.allCategories.push(category);
    }
    this.categoryCtrl.setValue('');
  }
}