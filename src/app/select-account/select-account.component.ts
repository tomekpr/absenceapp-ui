import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {

  constructor(@Inject('BRAND_NAME') public brandName:string) { }

  ngOnInit() {
  }

}
