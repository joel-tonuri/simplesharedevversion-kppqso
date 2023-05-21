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
import {HomeComponent} from './home/home.component';
import {AddExpenseComponent} from './addexpense/addexpense.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {EditExpenseComponent} from './editexpense/editexpense.component';
import {DeleteExpenseComponent } from './deleteexpense/deleteexpense.component';
import {ReconcileExpensesComponent} from './reconcileexpenses/reconcileexpenses.component';
import {ReportsComponent} from './reports/reports.component';


// ROUTING
const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'addexpense', component: AddExpenseComponent},
    {path: 'editexpense/:id', component: EditExpenseComponent},
    {path: 'expenses', component: ExpensesComponent},
    {path: 'reconcileexpenses', component: ReconcileExpensesComponent},
    {path: 'reports', component: ReportsComponent},
    {path: '**', component: HomeComponent} 

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
    declarations: [AppComponent, HomeComponent, AddExpenseComponent, ExpensesComponent, EditExpenseComponent, DeleteExpenseComponent, ReconcileExpensesComponent, ReportsComponent],
    bootstrap: [AppComponent],
    providers: [EditExpenseComponent, ExpensesService, [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]], // changes datepicker locale to en_GB
    entryComponents: [DeleteExpenseComponent]
})
export class AppModule {
}

