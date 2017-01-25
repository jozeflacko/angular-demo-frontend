import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Booking } from './booking';

@Injectable()
export class BookingService {
  
  private apiUrl = "http://127.0.0.1:8080/RestServiceProject/api/booking/";  
  private headers = new Headers({'Content-Type':'application/json'});   
	
//  private bookings:Booking[] = [
//   {id:1, project:"aaa", personId:2, description:"hoho",      timeFrom:"1", timeTo:"2" },
//   {id:2, project:"aaa", personId:2, description:"hoho",      timeFrom:"1", timeTo:"2" },
//   {id:3, project:"aaa", personId:2, description:"hoho",      timeFrom:"1", timeTo:"2" },
//   {id:5, project:"aaa", personId:5, description:"hoho",      timeFrom:"1", timeTo:"2" },
//   {id:5, project:"aaa", personId:5, description:"hoho",      timeFrom:"1", timeTo:"2" },
//   {id:4, project:"aaa", personId:4, description:"fgf",       timeFrom:"1", timeTo:"2" },
//   {id:3, project:"aaa", personId:3, description:"hosdffsho", timeFrom:"1", timeTo:"2" },
//   {id:2, project:"aaa", personId:2, description:"hosdffsho", timeFrom:"1", timeTo:"2" },
//   {id:1, project:"aaa", personId:1, description:"hosdffsho", timeFrom:"1", timeTo:"2" },
//  ];
  
  constructor(private http: Http) { 
    
  }  
  getBookings(personId): Promise<Booking[]> {      
	  
	  const url = this.apiUrl+"getBookings";
	  var sendThisUrl:string = url;
	  
	  if ( isNaN(personId) ){
	      // do nothing
		  
      } else {    	 
    	  sendThisUrl += "?personId="+personId;
      } 
	  
	  return this.http.get(sendThisUrl).toPromise().then(function(response){	                  
          var stringJson = response.json();
          var json = JSON.parse(stringJson)
          return json;	                   
      }).catch(this.handleError);
	  
  }
  addBooking(booking: Booking): Promise<Booking> {
      
      const url = this.apiUrl+"addBooking";        
      let options = this.createOptions(booking);   

      return this.http.post(url, options, { headers: this.headers })
        .toPromise()
        .then( (response) => { return response.json(); } )
        .catch(this.handleError);
  }  
  deleteBooking(booking: Booking): Promise<Booking> {
      
      const url = this.apiUrl+"deleteBooking"; 
      //let options = this.createOptions(booking);
      let options = JSON.stringify({
    	  id: booking.id // just id is needed
      }); 	  

      return this.http.post(url, options, { headers: this.headers })
        .toPromise()
        .then( (response) => { return response.json(); } )
        .catch(this.handleError);
  }  
  updateBooking(booking: Booking): Promise<Booking> {
      const url = this.apiUrl+"updateBooking";
      return this.http
        .post(url, JSON.stringify(booking), {headers: this.headers})
        .toPromise()
        .then(() => booking)
        .catch(this.handleError);
  } 
  private createOptions(booking : Booking){
	  
	  let options = JSON.stringify({
    	  id: booking.id,
          personId: booking.personId,
          project: booking.project, 
          description: booking.description,
          timeFrom: booking.timeFrom,
          timeTo: booking.timeTo,
      }); 	  
	  return options;
  }
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}

/* A PROMISE is ... well it's a promise to call us back later when the results are ready. 
 * We ask an asynchronous service to do some work and give it a callback function. It does 
 * that work (somewhere) and eventually it calls our function with the results of the work or an error. */
