import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HolidayService } from '../services/holiday.service';
import { UiLeaveRequestDto } from '../services/contracts/ui_leave_request_dto';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent implements OnInit {

  leaveRequests: Array<UiLeaveRequestDto>;

  constructor(
      private authService: AuthService, 
      private holidayService: HolidayService) { 

    this.leaveRequests = new Array<UiLeaveRequestDto>();
    let userId = authService.getUserId();
    this.loadHolidays(userId);
  }

  ngOnInit() {
  }

  // This could be easily tdd I reckon.
  loadHolidays(userId: string) {
    this.holidayService.getLeaveRequests(userId)
    .flatMap(response => response.json() as UiLeaveRequestDto[])
    .filter(item => item.approval_status === 'Pending approval')
    .subscribe(r => {
      this.leaveRequests.push(r);
    }, err => {console.log(err)})
  }

  hasPendingRequests(): boolean {
    return this.leaveRequests != null && this.leaveRequests.length > 0;
  }

}
