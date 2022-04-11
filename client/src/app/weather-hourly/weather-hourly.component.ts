import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from "../weather.service"

@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit, OnDestroy {

  public wttrInfo: any;
  private subscribed:Subscription = {} as Subscription;
  
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    //TODO s'abonner au weatherSubject dans le weather.service pour obtenir les dernières informations de météo
    this.subscribed = this.weatherService.weatherSubject.subscribe({
      error:(err) => console.log(err),
      next:(value) => this.wttrInfo = value,
      complete: () => console.log('complété.')
    });
  }
  
  ngOnDestroy(): void {
    //TODO se désabonner du weatherSubject
    this.subscribed.unsubscribe();
  }

  convert(s:string) {

    var t = '';

    for (var i = 0; i < (4 - s.length); i++)
    {
        t += '0'
    }
    
    t += s;

    return t.substring(0,2) + 'h' + t.substring(2,4);
  }
}
