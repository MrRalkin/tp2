import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    //TODO s'abonner au weatherSubject dans le weather.service pour obtenir les dernières informations de météo
  }
  
  ngOnDestroy(): void {
    //TODO se désabonner du weatherSubject
  }

}
