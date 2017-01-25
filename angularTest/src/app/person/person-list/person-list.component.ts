import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { PersonNewComponent } from '../person-new/person-new.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  entryComponents:[PersonDetailComponent, PersonNewComponent],
  providers: [PersonService]  
})
export class PersonListComponent implements OnInit {

  persons: Person[];
  selectedPerson: Person;
  btnNewPersonClicked: boolean = false;
  
  constructor(private personService: PersonService) {
    
    /* The constructor is for simple initializations like wiring constructor 
     * parameters to properties. It's not for heavy lifting. We do not call 
     * service here but in ngOnInit! */    
  }

  ngOnInit() {
	this.selectedPerson = undefined;
	this.btnNewPersonClicked = false; 
    this.getAllPersons(); 
  }
  
  onSelect(person: Person) { 
	this.btnNewPersonClicked = false; // close create new person 
    this.selectedPerson = person;  	  // open detail person
  }
   
  newPerson(person: Person) {        
	this.selectedPerson = undefined;  // close detail
    this.btnNewPersonClicked = true;  // open create person
  } 
  getAllPersons(): void {  
      this.personService.getPersons().then( (data) => { this.persons = data; });
  }  
  
  //on open or close
  childPersonNew( onClose : boolean ){ 
	  if ( onClose === true ){
		 this.ngOnInit();
	  }
  }
  
  //on open or close
  childPersonDetail( onClose : boolean ){ 
	  if ( onClose === true ){
		 this.ngOnInit();
	  }
  }
  
}
