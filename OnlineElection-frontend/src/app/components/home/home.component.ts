import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CandidatDivComponent } from '../candidat-div/candidat-div.component';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { VoteService } from '../../services/vote.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ChartModule,
    CandidatDivComponent,
    AnimateOnScrollModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [
    `
      :host {
        @keyframes slidedown-icon {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(20px);
          }

          100% {
            transform: translateY(0);
          }
        }

        .slidedown-icon {
          animation: slidedown-icon;
          animation-duration: 3s;
          animation-iteration-count: infinite;
        }

        .box {
          background-image: radial-gradient(
            var(--primary-300),
            var(--primary-600)
          );
          border-radius: 50% !important;
          color: var(--primary-color-text);
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit, AfterViewChecked {
  data: any;
  options: any;
  candidates: Candidate[] = [];

  constructor(
    private candidateService: CandidateService,
    private voteService: VoteService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.scrollToFragment();
  }

  ngOnInit() {
    this.scrollToFragment();
    this.getCandidates();
  }

  getCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (candidates) => {
        this.candidates = candidates;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Error fetching candidates:', error);
      },
    });
  }

  updateChartData(): void {
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#36A2EB',
      '#9966FF',
    ];
    const hoverBackgroundColor: string[] = [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#36A2EB',
      '#9966FF',
    ];

    let requests = this.candidates.map((candidate, index) => {
      return this.voteService
        .getVotesByCandidate(candidate._id!)
        .toPromise()
        .then((votes) => {
          labels.push(candidate.name);
          data.push(votes!.length);
        });
    });

    Promise.all(requests)
      .then(() => {
        this.data = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColor,
              hoverBackgroundColor: hoverBackgroundColor,
            },
          ],
        };
      })
      .catch((error) => {
        console.error('Error fetching votes:', error);
      });
  }

  private scrollToFragment(): void {
    this.route.fragment?.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
