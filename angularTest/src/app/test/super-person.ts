import { Superpower } from './superpower';
import { SimplePerson } from './simple-person';

export class SuperPerson extends Superpower implements SimplePerson{
	private name;   
    constructor(name: string) {
        super();
        this.name = name;        
    }
    getPersonName():string {
        return "I am "+this.name;
    }
    getHelloFromMe():string {
        return ( this.getPersonName()+" and "+this.showWhoAmI() );
    }   
}
