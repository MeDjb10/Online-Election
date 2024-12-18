import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';
import { Candidate } from '../../../models/candidate.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-form-candidats',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-form-candidats.component.html',
  styleUrls: ['./admin-form-candidats.component.css'],
})
export class AdminFormCandidatsComponent implements OnInit {
  candidateForm: FormGroup;
  candidateId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService
  ) {
    this.candidateForm = this.fb.group({
      name: ['', Validators.required],
      party: ['', Validators.required],
      biography: ['', Validators.required],
      electoralProgram: ['', Validators.required],
      profilePicture: [''],
    });
  }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get('id');
    if (this.candidateId) {
      this.candidateService.getCandidate(this.candidateId).subscribe({
        next: (candidate) => {
          this.candidateForm.patchValue(candidate);
        },
        error: (error) => {
          console.error('Error fetching candidate:', error);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      if (this.candidateId) {
        this.candidateService
          .updateCandidate(this.candidateId, this.candidateForm.value)
          .subscribe({
            next: () => {
              alert('Candidate updated successfully!');
              this.router.navigate(['/dashboard/candidates']);
            },
            error: (error) => {
              console.error('Error updating candidate:', error);
            },
          });
      } else {
        this.candidateService
          .createCandidate(this.candidateForm.value)
          .subscribe({
            next: () => {
              alert('Candidate added successfully!');
              this.router.navigate(['/dashboard/candidates']);
            },
            error: (error) => {
              console.error('Error adding candidate:', error);
            },
          });
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
