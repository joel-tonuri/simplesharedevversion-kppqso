import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl} from '@angular/forms'; // standard form tools
import {COMMA, ENTER} from '@angular/cdk/keycodes'; // used for custom tag entry
import { ExpensesService } from '../services/expenses.service'; // imports ExpensesService
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete'; // used for pre-defined tag selection
import {MatChipInputEvent} from '@angular/material/chips'; // expense form tags

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css'],
})

export class AddExpenseComponent implements OnInit {
  payer = ''; 
  tenantList: string[] = ['Phillip', 'Mary', 'Bill', 'Reuben', 'Kate']; // tenant names are hardcoded, for now

  // Makes my 'expenseForm' a FormGroup
  addexpenseForm: FormGroup;
  valid: any;
  errorMessage: any;

  // Creates instances of FormBuilder and ExpensesService
  constructor(
    private fb: FormBuilder,
    private bs: ExpensesService
  ) 
  
  // allows for expenses to be allocated with a tag by the user
  {     this.filteredTags = this.tagCtrl.valueChanges.pipe(
    startWith(null),
    map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));}


  ngOnInit(): void {
    // defines formcontrolnames
    this.addexpenseForm = this.fb.group(
      {
        merchant: [null, [Validators.maxLength(15)]],
        description: [null, [Validators.maxLength(15)]],
        amount: [null],
        dop: [null],
        payer: [null],
        tagged: [null],
        settled: [false]
      }
    );

// real time observations of data entered in the form, for debugging purposes
    this.addexpenseForm.valueChanges 
      .subscribe((formData) => {
          // logged in console real-time
          console.log(formData.merchant);
      })

  }

  
  // input validation
  submit(): void {  
    this.errorMessage = "";
    this.valid = this.bs.checkAdd(this.addexpenseForm.value);
    if (this.valid == "pass") {
      this.bs.addExpense(this.addexpenseForm.value);
      alert("The expense has been successfully added" ) ;
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
      this.errorMessage = "Please indicate which tenant has paid this expense"
    }

    if (this.valid == "dateFail") {
      this.errorMessage = "Please provide the date for this expense"
    }
}
// miscellaneous
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA]; // these are the actions you can use when adding a custom tag
  tagCtrl = new FormControl; // defines a new formControl section solely for the tag functionality
  filteredTags: Observable<string[]>; // tag filtering using Observable from rxjs
  tags: string[] = []; 
  allTags: string[] = ['Entertainment', 'Furniture', 'Maintenance', 'Groceries', 'Utilities', 'Miscellaneous']; // hardcoded example tag types
  maxDate = new Date(2024, 4, 22); 

  // for the tag function
  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    // you can only add a tag when MatAutocomplete is not already open
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Return input to blank
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  // remove a tag
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}