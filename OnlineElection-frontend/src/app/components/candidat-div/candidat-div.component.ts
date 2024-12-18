import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-candidat-div',
  standalone: true,
  imports: [],
  templateUrl: './candidat-div.component.html',
  styleUrls: ['./candidat-div.component.css'],
})
export class CandidatDivComponent {
  @Input() candidate!: Candidate;

  constructor(private router: Router) {}

  toDetails() {
    console.log('Navigating to candidate details:', this.candidate._id);
    
    this.router.navigate(['/accueil/candidate', this.candidate._id]);
  }
}
