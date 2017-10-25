import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AutoCompleteModule, ButtonModule, ChartModule, ContextMenuModule, DataTableModule, DialogModule, DropdownModule, SharedModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BootstrapSwitchModule} from 'angular2-bootstrap-switch';

import {AppComponent} from './component/app.component';
import {IskPipe} from './pipe/isk.pipe';
import {OrderModule} from 'ngx-order-pipe';
import {HistoryDialogComponent} from './component/dialog/history-dialog/history-dialog.component';
import {AboutDialogComponent} from './component/dialog/about-dialog/about-dialog.component';
import {LegalDialogComponent} from './component/dialog/legal-dialog/legal-dialog.component';
import {ActiveCharsDialogComponent} from './component/dialog/active-chars-dialog/active-chars-dialog.component';
import {TimezoneDialogComponent} from './component/dialog/timezone-dialog/timezone-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IskPipe,
    HistoryDialogComponent,
    AboutDialogComponent,
    LegalDialogComponent,
    ActiveCharsDialogComponent,
    TimezoneDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    ButtonModule,
    ContextMenuModule,
    DropdownModule,
    AutoCompleteModule,
    ChartModule,
    OrderModule,
    BrowserAnimationsModule,
    BootstrapSwitchModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
