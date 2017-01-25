import { Injectable } from '@angular/core';
import { Headers, Http, Response  } from '@angular/http'; // RESPONSE FOR USING OBSERVABLES

import 'rxjs/add/operator/toPromise';

import { Person } from './person';
import { PERSONS } from './mock-persons';



import { Observable } from 'rxjs/Observable'; // FOR USING OBSERVABLES
//Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonService {
  
  private apiUrl = "http://127.0.0.1:8080/RestServiceProject/api/";  
  private headers = new Headers({'Content-Type':'application/json'});   
    
  constructor(private http: Http) { 
    
  }
  
  getPersons(): Promise<Person[]> {
      
      const url = this.apiUrl+"getAllPersons";
      
      return this.http.get(url)
               .toPromise()
               /*.then( (response) => { return response.json() as Person[]; } )    */
               .then(function(response){
                  
                   var stringJson = response.json();
                   var json = JSON.parse(stringJson)
                   return json;
                   
               })
               .catch(this.handleError);
      
      //  return Promise.resolve(PERSONS); mock
  }
  
  getPersonsByName( personName:string ): Promise<Person[]> {
      
      let url:string = this.apiUrl+"getPersonsByName";
     
      if( ! personName) 
          personName = "";
          
      url += "?personName="+personName;
      
      return this.http.get(url)
               .toPromise()               
               .then(function(response){
                  
                   var stringJson = response.json();
                   var json = JSON.parse(stringJson);
                   return json;
                   
               })
               .catch(this.handleError);     
  } 
  
  
  addPerson(person:Person): Promise<Person> {
      
      const url = this.apiUrl+"addPerson";  
      
      let options = JSON.stringify({
          id: 100,
          email: person.email,
          name: person.name, 
          age: person.age
      });      

      return this.http.post(url, options, { headers: this.headers })
        .toPromise()
        .then( (response) => { return response.json(); } )
        .catch(this.handleError);
  }
  
  deletePerson(person:Person): Promise<Person> {
      
      const url = this.apiUrl+"deletePerson";  
      
      let options = JSON.stringify({
          id: person.id,
          email: person.email,
          name: person.name, 
          age: person.age
      });      

      return this.http.post(url, options, { headers: this.headers })
        .toPromise()
        .then( (response) => { return response.json(); } )
        .catch(this.handleError);
  }
  
  updatePerson(person: Person): Promise<Person> {
      const url = this.apiUrl+"updatePerson";
      return this.http
        .post(url, JSON.stringify(person), {headers: this.headers})
        .toPromise()
        .then(() => person)
        .catch(this.handleError);
  }   
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
  
  
  
  
  
  
  /////////////// OBSERVABLES /////////////////////

  getPersonsByNamWithObservable( personName:string ): Observable<Person[]> {
      
      if ( ! personName ) 
          personName ="";  
      
      let url:string = this.apiUrl+"getPersonsByName" + "?personName="+personName;
      
      return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleErrorOnObservable);        
      
      
  } 
  private extractData(response:Response){
      var stringJson = response.json();
      var json = JSON.parse(stringJson);
      return json || { };
  }
  private handleErrorOnObservable (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

}

/* A PROMISE is ... well it's a promise to call us back later when the results are ready. 
 * We ask an asynchronous service to do some work and give it a callback function. It does 
 * that work (somewhere) and eventually it calls our function with the results of the work or an error. */

/* 
 * http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource
 * in cmd: chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
 * */



