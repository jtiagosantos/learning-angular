import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../interfaces/housing-location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HousingLocationComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) {}

  ngOnInit() {
    this.housingService.getAllHousingLocations().subscribe({
      next: (data) => {
        this.housingLocationList = data;
        this.filteredLocationList = data;
      }
    })
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.housingService.getHousingLocationsByCity(text).subscribe({
      next: (data) => {
        this.filteredLocationList = data;
      }
    })
  }
}
