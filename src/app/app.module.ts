import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MAT_DATE_LOCALE} from '@angular/material'; // allows me to change datepicker locale to en_GB
import {NgxCurrencyInputModule} from 'ngx-currency-input'; // currency masker for form inputs
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {ExpensesService} from './services/expenses.service';


// COMPONENTS
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component'; // homepage
import {AddExpenseComponent} from './addexpense/addexpense.component'; // add expense page
import {ExpensesComponent} from './expenses/expenses.component'; // view expense page
import {EditExpenseComponent} from './editexpense/editexpense.component'; // edit expense page
import {DeleteExpenseComponent } from './deleteexpense/deleteexpense.component'; // delete expense confirmation popup
import {ReportsComponent} from './reports/reports.component'; // reports


// ROUTING
const appRoutes: Routes = [
    {path: 'home', component: HomeComponent}, // homepage
    {path: 'addexpense', component: AddExpenseComponent}, // add expense page
    {path: 'editexpense/:id', component: EditExpenseComponent}, // edit expense page, grabs the id of specific expense to edit
    {path: 'expenses', component: ExpensesComponent}, // view expense page
    {path: 'reports', component: ReportsComponent}, // edit expense page, grabs the id of specific expense to edit
    {path: '**', component: HomeComponent} // wildcard to homepage

];




// MODULES
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MatChipsModule, // for tags on add expense form
        FormsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        NgxCurrencyInputModule, // regulates input for currency form fields
        // ROUTING
        RouterModule.forRoot(
            appRoutes,
        )
    ],  // end imports
    declarations: [AppComponent, HomeComponent, AddExpenseComponent, ExpensesComponent, EditExpenseComponent, DeleteExpenseComponent, ReportsComponent],
    bootstrap: [AppComponent],
    providers: [ExpensesService, [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]], // changes datepicker locale to en_GB
    entryComponents: [DeleteExpenseComponent]
})
export class AppModule {
}

