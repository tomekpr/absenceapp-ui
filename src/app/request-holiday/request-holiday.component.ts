import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { HolidayService } from '../services/holiday.service';

// declare var $:JQueryStatic;

@Component({
  selector: 'app-request-holiday',
  templateUrl: './request-holiday.component.html',
  styleUrls: ['./request-holiday.component.css']
})
export class RequestHolidayComponent implements AfterViewInit {

  holidayForm: FormGroup;
  startDate: AbstractControl;
  endDate: AbstractControl;
  returnDate: AbstractControl;
  hasError: boolean;

  constructor(fb: FormBuilder, private holidayService: HolidayService) { 
    this.holidayForm = fb.group({
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'returnDate': ['', Validators.required]
    })

    this.startDate = this.holidayForm.controls['startDate']
    this.endDate = this.holidayForm.controls['endDate']
    this.returnDate = this.holidayForm.controls['returnDate']
  }

  ngAfterViewInit() {
    // jQuery('#startdate').calendar({type: 'date'});
    // jQuery('#enddate').calendar({type:'date'});
    // jQuery('#returndate').calendar({type:'date'});
  }

  pushLeaveRequest(value: FormGroup) : void {

    // let startDate = jQuery("#startdate").calendar('get date');
    // let endDate = jQuery("#enddate").calendar('get date');
    // let returnDate = jQuery("#returndate").calendar('get date');

    // console.log("Start date: ", startDate);
    // console.log("End date: ", endDate);
    // console.log("Return date: ", returnDate);

    this.hasError = false;

    //this.holidayService.requestHoliday(startDate, endDate);
    //.subscribe(ok => this.authService.completeAuth(ok), err => this.hasError = true);    
  }

}
