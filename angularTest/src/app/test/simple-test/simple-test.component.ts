import { Component, OnInit, Input } from '@angular/core';
import { SuperPerson } from '../super-person';
import { SimplePerson } from '../simple-person';

@Component({
  selector: 'app-simple-test',
  templateUrl: './simple-test.component.html',
  styleUrls: ['./simple-test.component.css'],  
})
export class SimpleTestComponent implements OnInit {

  @Input() firstName:string;
  @Input() lastName:string;
  
  person:SuperPerson;
  show:string;
  label:string;
  message:string;
 
  constructor() { 
	  this.person = new SuperPerson("Clark Kent");	
	  
	  this.show = "clark-kent";
	  this.label = "See my secret";
	  this.message = "";
  }

  ngOnInit() {
	  
	  //let p:SimplePerson = {  name:"Me", getPersonName(){    } };
	  
  }
  
  sayHello(){
	  return "Hello "+this.firstName+" "+this.lastName;
  }
  
  sayHellofromSuperhero(){
	 this.togglePerson();	
  }
  
  private togglePerson(){
	  if ( this.show === "superman"){
		  this.show = "clark-kent";
		  this.label = "See my secret";
		  this.message = "";
	  }
	  else {
		  this.show = "superman";
		  this.label = "Quickly hide!";
		  this.message = this.person.getHelloFromMe();
	  }			
  }
  

}
