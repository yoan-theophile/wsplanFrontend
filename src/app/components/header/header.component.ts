import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  name!: string;
  class!: string;
  constructor() { }

  ngOnInit(): void {
    this.isLoggedIn = true;
    this.name = "Tagne";
    this.class = "IRT3";
  }

}
