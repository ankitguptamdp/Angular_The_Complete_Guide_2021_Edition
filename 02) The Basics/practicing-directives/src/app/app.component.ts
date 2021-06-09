import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayDetails = false;
  displayDetailsButtonClickLog = [];
  displayDetailsButtonClickCount = 0;

  getTime() {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    // ISTTime now represents the time in IST coordinates
    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var secondsIST = ISTTime.getSeconds();
    return hoursIST + ":" + minutesIST + ":" + secondsIST;
  }

  getColor(count: number){
    if(count>=5){
      return 'blue';
    }
    else{
      return 'white';
    }
  }

  onDisplayDetailsButtonClick() {
    this.displayDetails = !this.displayDetails;
    this.displayDetailsButtonClickLog.push([++this.displayDetailsButtonClickCount, this.getTime()])
  }
}
