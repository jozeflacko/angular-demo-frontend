import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css'],
  providers: [Person, PersonService] 
})
export class PersonDetailComponent implements OnInit {

  @Input()  person: Person; /* Input say this will be inserted*/
  @Output() childPersonDetail = new EventEmitter<boolean>();
  
  constructor(private personService: PersonService) {}

  ngOnInit() {	  
	  
  }   
  update(){
	  this.personService.updatePerson(this.person)
	     .then ( () => this.close() );	  
  }
  delete() {
	  this.personService.deletePerson(this.person)
	  	 .then ( () => this.close() );	  
  }  
  cancel(){	  
	  this.close();
  }  
  close(){ 
	  this.childPersonDetail.emit(true);  // say parent I closed
  }  
  
}
