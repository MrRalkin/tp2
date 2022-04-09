import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../weather.service"

@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit, OnDestroy {

  public wttrInfo: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    //TODO s'abonner au weatherSubject dans le weather.service pour obtenir les dernières informations de météo
    this.weatherService.weatherSubject.subscribe({
      error:(err) => console.log(err),
      next:(value) => this.wttrInfo = value,
      complete: () => console.log('complété.')
    });
  }
  
  ngOnDestroy(): void {
    //TODO se désabonner du weatherSubject
    this.weatherService.weatherSubject.unsubscribe();
  }

}
