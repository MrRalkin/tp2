import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.css']
})
export class WeatherNowComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    //TODO s'abonner au weatherSubject dans le weather.service pour obtenir les dernières informations de météo
  }

  ngOnDestroy(): void {
    //TODO se désabonner du weatherSubject
  }
}
