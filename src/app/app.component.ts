import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options = {
    direction: 'row',
    mainAxis: 'space-around',
    crossAxis: 'center'
  };

  layoutAlign() {
    return `${this.options.mainAxis} items-${this.options.crossAxis}`;
  }
}
