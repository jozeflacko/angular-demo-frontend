import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'; // FOR USING OBSERVABLES

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css'],
  /*providers: [PersonService] dont have to write here because we have it in app.module.ts*/
})
export class SearchPersonComponent implements OnInit {

  numberOfServerCalls = 0;
	
  personsP: Person[];	
  personsO: Person[];	
  personsO2: Observable<Person[]>;	

  private searchTermStream = new Subject<string>();
  search(termObservable2: string) { 
	  this.searchTermStream.next(termObservable2); 
  }
	
  constructor(private personService: PersonService) { 
	  
	  // advantage with observables
	  this.personsO2 = this.searchTermStream
	      .debounceTime(500)
	      .distinctUntilChanged()  
	      .switchMap((term: string) => { 
	    	  this.numberOfServerCalls++;
	    	  return this.personService.getPersonsByNamWithObservable(term);
	  });
  }
  

  ngOnInit() {
  }
  
  searchPersonByName( name:string ){	  
	  if(name && name !== "" ){
		  this.personService.getPersonsByName( name ).then( (data) => { this.numberOfServerCalls++; this.personsP = data; });
		  
	  } else {
		  this.personsP = [];
	  }
  }
  
  getPersonsByNamWithObservables( name:string ){
	  if(name && name !== "" ){
		  this.numberOfServerCalls++;
		  this.personService.getPersonsByNamWithObservable( name )		 
		  .subscribe( personsO => this.personsO = personsO );
	  }	else {
		  this.personsO = [];
	  }  
  }

}
