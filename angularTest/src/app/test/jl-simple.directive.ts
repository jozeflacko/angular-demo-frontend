import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appJlSimple]' /* gives a name to a directive, it is in brackets */
})
export class JlSimpleDirective { /* look into app.module -> there is declared ! and due this is usable in whole module */

  constructor(el:ElementRef) { 	  
	  el.nativeElement.style.background = 'yellow';	  
  }

}
