/// <reference path="../../../typings/globals/jquery/index.d.ts" />

import {Component, ElementRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { HolidayService } from '../services/holiday.service';
import { AuthService } from '../services/auth.service';

import {RequestHolidayDto} from '../services/contracts/request.holiday.dto';

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
  description:AbstractControl;
  hasError: boolean;

  selectedHolidayType: string;

  constructor(fb: FormBuilder, private holidayService: HolidayService, private authService: AuthService) { 
    this.holidayForm = fb.group({
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'returnDate': ['', Validators.required],
      'description': ['', Validators.required]
    })

    this.startDate = this.holidayForm.controls['startDate']
    this.endDate = this.holidayForm.controls['endDate']
    this.returnDate = this.holidayForm.controls['returnDate']
    this.description = this.holidayForm.controls['description']
  }

  ngAfterViewInit() {
    jQuery('#startdate').calendar({type: 'date'});
    jQuery('#enddate').calendar({type:'date'});
    jQuery('#returndate').calendar({type:'date'});

    jQuery('select.dropdown').dropdown();
  }

  onChange(deviceValue) {
    this.selectedHolidayType = deviceValue;
  }

  pushLeaveRequest(value: FormGroup) : void {

    let startDate = jQuery("#startdate").calendar('get date');
    let endDate = jQuery("#enddate").calendar('get date');
    let returnDate = jQuery("#returndate").calendar('get date');

    console.log("Start date: ", startDate);
    console.log("End date: ", endDate);
    console.log("Return date: ", returnDate);

    this.hasError = false;

    let userId = this.authService.getProfile().id;

    let type = this.selectedHolidayType == null || this.selectedHolidayType == '' ? 'AN' : this.selectedHolidayType
    var dto = new RequestHolidayDto(userId,startDate,endDate,returnDate,value['description'],type)

    this.holidayService.requestHoliday(dto)
    .subscribe(ok => {
    }, err => {
      console.log(err);
      this.hasError = true;
    })
  }

}
