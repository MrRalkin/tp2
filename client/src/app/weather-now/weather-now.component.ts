import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.css']
})
export class WeatherNowComponent implements OnInit, OnDestroy {

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
}
