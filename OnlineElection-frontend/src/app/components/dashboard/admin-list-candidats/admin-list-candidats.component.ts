import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { Candidate } from '../../../models/candidate.model';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-admin-list-candidats',
  standalone: true,
  imports: [TableModule, ToastModule, SpeedDialModule, DialogModule],
  templateUrl: './admin-list-candidats.component.html',
  styleUrls: ['./admin-list-candidats.component.css'],
})
export class AdminListCandidatsComponent implements OnInit {
  loading: boolean = true;
  showDialogue: boolean = false;
  searchValue: string | undefined;
  filteredCandidates: Candidate[] = [];
  candidates: Candidate[] = [];
  selectedCandidate: Candidate | null = null;

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCandidates();
  }

  fetchCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (candidates) => {
        this.candidates = candidates;
        this.filteredCandidates = candidates;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching candidates:', error);
        this.loading = false;
      },
    });
  }

  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input === '') {
      this.filteredCandidates = this.candidates;
    } else {
      this.filteredCandidates = this.candidates.filter(
        (data) =>
          (data.name ? data.name.toLowerCase().includes(input) : false) ||
          (data.party ? data.party.toLowerCase().includes(input) : false)
      );
    }
  }

  showIt(candidate: Candidate) {
    this.selectedCandidate = candidate;
    this.showDialogue = true;
  }

  cancelSup() {
    this.showDialogue = false;
    this.selectedCandidate = null;
  }

  deleteCandidate() {
    if (this.selectedCandidate) {
      this.candidateService
        .deleteCandidate(this.selectedCandidate._id!)
        .subscribe({
          next: () => {
            this.candidates = this.candidates.filter(
              (c) => c._id !== this.selectedCandidate!._id
            );
            this.filteredCandidates = this.filteredCandidates.filter(
              (c) => c._id !== this.selectedCandidate!._id
            );
            this.showDialogue = false;
            this.selectedCandidate = null;
          },
          error: (error) => {
            console.error('Error deleting candidate:', error);
          },
        });
    }
  }

  addCandidate() {
    this.router.navigate(['/dashboard/candidates/add']);
  }

  editCandidate(candidate: Candidate) {
    this.router.navigate(['/dashboard/candidates/edit', candidate._id]);
  }
}
