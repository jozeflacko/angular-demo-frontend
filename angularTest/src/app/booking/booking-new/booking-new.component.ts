import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';


@Component({
  selector: 'app-booking-new',
  templateUrl: './booking-new.component.html',
  styleUrls: ['./booking-new.component.css'],
  providers: [Booking, BookingService]
})
export class BookingNewComponent implements OnInit {
	 
	  @Input() personId: number;
	  @Output() childBookingNew = new EventEmitter<boolean>();
	  
	  booking: Booking = {id:-1, personId:-1, project:"", description: "", timeFrom: "", timeTo: "" };
	  
	  constructor(private bookingService: BookingService) { }
	  
	  ngOnInit() {
		let a = this.personId;
	  }  
	  addBooking(): void {
		  if (this.personId !== undefined){		  
			  
			  this.booking.id = -1; // does not matter 
			  this.booking.personId = this.personId;
			  this.booking.timeFrom =undefined;
			  this.booking.timeTo = undefined;			  
			  
			  this.bookingService.addBooking( this.booking )
			  	.then( () => this.close() );
		  }		  
	  }  
	  close(){
		  this.childBookingNew.emit(true); 
	  }

}
