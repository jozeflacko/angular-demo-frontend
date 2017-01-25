import { Component } from '@angular/core';
import { PersonListComponent} from './person/person-list/person-list.component';

@Component({  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents:[PersonListComponent]
})
export class AppComponent {
  title = 'Angular 2 test'; 
}

// 1. main tutorial
//http://stackoverflow.com/questions/39517822/cant-add-a-new-component-to-my-angular-2-app-with-typescript

// 2. adding jquery
// http://stackoverflow.com/questions/30623825/how-to-use-jquery-with-angular2

