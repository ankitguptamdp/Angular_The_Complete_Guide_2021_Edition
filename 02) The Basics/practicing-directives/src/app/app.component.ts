import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayDetails = false;
  displayDetailsButtonClickLog = [];

  onDisplayDetailsButtonClick() {
    this.displayDetails = !this.displayDetails;
    this.displayDetailsButtonClickLog.push(new Date());
  }
}
