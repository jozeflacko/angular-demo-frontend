import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Booking } from '../booking';
import { BookingService } from '../booking.service';

@Component({  
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css'],
  providers: [Booking, BookingService]
})
export class BookingDetailComponent implements OnInit {

  @Input()  booking: Booking; /* Input say this will be inserted*/
  @Output() childBookingDetail = new EventEmitter<boolean>();	
  
  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
   
  }
  update(){
	  this.bookingService.updateBooking(this.booking)
	     .then ( () => this.close() );	  
  }
  delete() {
	  this.bookingService.deleteBooking(this.booking)
	  	 .then ( () => this.close() );	  
  }  
  cancel(){	  
	  this.close();
  }  
  close(){ 
	  this.childBookingDetail.emit(true);  // say parent I closed
  } 
  goBack(): void {
    this.location.back();
  }
  
}

