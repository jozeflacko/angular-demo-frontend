import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Booking } from '../booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
  providers: [Booking, BookingService]
})
export class BookingListComponent implements OnInit {

	private bookings:Booking[];
	selectedBooking: Booking;
	addNewBookingForPerson:number = -1;
	personId:number = -1; // on add new person I will put this value into addNewBookingForPerson

	constructor(
	  private bookingService: BookingService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}
	
	ngOnInit(): void {	
	  this.selectedBooking = undefined;
	  this.addNewBookingForPerson = -1;

	  this.route.params
	    .switchMap((params: Params) =>  
	    {
	    	let personIdString:string = params['personId'];
	    	this.personId = ( personIdString  !== "all") ? Number(personIdString) : -1; 
	    	
	    	return this.bookingService.getBookings(+params['personId']);
	    })
	    .subscribe(bookings => this.bookings = bookings);
	}
	
    onSelect(booking: Booking) { 
		this.addNewBookingForPerson = -1; 
	    this.selectedBooking = booking;  	  
	}
    newBooking(booking: Booking) {        
    	this.selectedBooking = undefined;  
        this.addNewBookingForPerson = this.personId; 
    } 	
	childBookingNew( onClose : boolean ){ 
		  if ( onClose === true ){
			 this.ngOnInit();
		  }
	}  	
	childBookingDetail( onClose : boolean ){ 
	  if ( onClose === true ){
		 this.ngOnInit();
	  }
	}
	
	goBack(): void {
	  this.location.back();
	}
}
