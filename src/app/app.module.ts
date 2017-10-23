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

@NgModule({
  declarations: [
    AppComponent,
    IskPipe
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
