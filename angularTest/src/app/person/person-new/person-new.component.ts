import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-new',
  templateUrl: './person-new.component.html',
  styleUrls: ['./person-new.component.css'],
  providers: [Person, PersonService]
})
export class PersonNewComponent implements OnInit {
  
  @Input() show: boolean;
  @Output() childPersonNew = new EventEmitter<boolean>();
  
  person: Person = {id:999, email:"", name:"", age: 0 };
  
  constructor(private personService: PersonService) { }
  
  ngOnInit() {
	
  }  
  addPerson(): void {
	  this.personService.addPerson( this.person )
	  	.then( () => this.close() );
  }  
  close(){
	  this.childPersonNew.emit(true); // if person detail is open
  }


}
