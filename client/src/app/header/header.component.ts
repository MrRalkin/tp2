import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from "../weather.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public wttrInfo: any;
  public searchText:any = 'Montreal';

  constructor(private weatherService: WeatherService, private _router: Router) { }

  update(): void {

    if (this.searchText.trim().length > 0)
    {
      this.weatherService.updateWeather(this.searchText).subscribe();
      this._router.navigate(['weather','now'])
    }
  }
}
