import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

//Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonDetailComponent } from './person/person-detail/person-detail.component';
import { PersonNewComponent } from './person/person-new/person-new.component';
import { SearchPersonComponent } from './person/search-person/search-person.component';
import { PersonService } from './person/person.service';

import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { BookingNewComponent } from './booking/booking-new/booking-new.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { SimpleTestComponent } from './test/simple-test/simple-test.component';
import { JlSimpleDirective } from './test/jl-simple.directive';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonDetailComponent,
    PersonNewComponent,
    BookingDetailComponent,
    BookingListComponent,
    PersonNewComponent,
    BookingNewComponent,
    AuthentificationComponent,
    SearchPersonComponent,
    SimpleTestComponent,
    JlSimpleDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   // InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path: 'persons',
        component: PersonListComponent
      },
      {
          path: 'searchPersons',
          component: SearchPersonComponent
      },
      {
          path: 'simpleTest',
          component: SimpleTestComponent
      }, 
      {
        path: 'bookings/:personId',
        component: BookingListComponent
      },
      {
        path: 'authentification',
        component: AuthentificationComponent
      },     
      { /* this is hit on very first loading */
        path: '',
        redirectTo: '/persons',
        pathMatch: 'full'
      },
    ])
  ],
  providers: [
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


