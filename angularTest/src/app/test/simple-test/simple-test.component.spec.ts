/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SimpleTestComponent } from './simple-test.component';

describe('SimpleTestComponent', () => {
  let component: SimpleTestComponent;
  let fixture: ComponentFixture<SimpleTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  
  // LOGIC TEST
  it('should say hello to the person', () => {
	    let simpleTest = new SimpleTestComponent();
	    simpleTest.firstName = "Jozef";
	    simpleTest.lastName = "Lacko";
	    
	    expect( simpleTest.sayHello() ).toBe("Hello Jozef Lacko");
	  
  });
  	

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });
  
  
  
  
  
});
