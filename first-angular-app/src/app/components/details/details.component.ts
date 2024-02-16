import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../interfaces/housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private housingService: HousingService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const housingLocationId = Number(this.route.snapshot.params['id'])

    this.housingService.getHousingLocationById(housingLocationId).subscribe({
      next: (data) => {
        this.housingLocation = data;
      }
    })
  }

  submitApplication() {
    this.housingService.submitApplication({
      firstName: this.applyForm.value.firstName ?? '',
      lastName: this.applyForm.value.lastName ?? '',
      email: this.applyForm.value.email ?? '',
    });
    this.applyForm.reset();
  }
}
