import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { CommentService } from '../../services/comment.service';
import { FavoriteService } from '../../services/favorite.service';
import { VoteService } from '../../services/vote.service';
import { Candidate } from '../../models/candidate.model';
import { Comment } from '../../models/comment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { log } from 'console';

@Component({
  selector: 'app-candidat-details',
  standalone: true,
  imports: [DialogModule, CommonModule, TooltipModule, FormsModule],
  templateUrl: './candidat-details.component.html',
  styleUrls: ['./candidat-details.component.css'],
  providers: [CandidateService, CommentService, FavoriteService, VoteService],
})
export class CandidatDetailsComponent implements OnInit {
  candidate?: Candidate;
  comments: Comment[] = [];
  alreadyFavorite: boolean = false;
  hasVoted: boolean = false;
  votedForCurrentCandidate: boolean = false;
  visible: boolean = false;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private commentService: CommentService,
    private favoriteService: FavoriteService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    const candidateId = this.route.snapshot.paramMap.get('id')!;
    this.getCandidate(candidateId);
    this.getComments(candidateId);
    this.checkFavorite(candidateId);
    this.checkVote(candidateId);
    console.log(this.hasVoted);
  }

  getCandidate(id: string): void {
    this.candidateService.getCandidate(id).subscribe({
      next: (candidate) => {
        this.candidate = candidate;
      },
      error: (error) => {
        console.error('Error fetching candidate:', error);
      },
    });
  }

  getComments(candidateId: string): void {
    this.commentService.getComments(candidateId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      },
    });
  }

  checkFavorite(candidateId: string): void {
    this.favoriteService.getFavorites().subscribe({
      next: (favorites) => {
        this.alreadyFavorite = favorites.some(
          (favorite) => favorite._id === candidateId
        );
      },
      error: (error) => {
        console.error('Error checking favorites:', error);
      },
    });
  }

  checkVote(candidateId: string): void {
    this.voteService.getUserVotes().subscribe({
      next: (votes) => {
        console.log('Votes:', votes);

        this.hasVoted = votes.length > 0;
        console.log('Has voted:', this.hasVoted);

        // User has voted for the current candidate if there is a vote with the current candidate ID
        this.votedForCurrentCandidate = votes.some(
          (vote) => vote.candidate._id === candidateId
        );
      },
      error: (error) => {
        console.error('Error checking votes:', error);
      },
    });
  }

  addComment(): void {
    if (!this.candidate) {
      console.error('Candidate is not defined');
      return;
    }

    this.commentService
      .addComment(this.candidate._id!, this.newComment)
      .subscribe({
        next: (response) => {
          const newComment = response.comment;
          console.log('New comment added:', newComment);

          // Fetch the user details for the new comment
          this.commentService.getComment(newComment._id!).subscribe({
            next: (fetchedComment) => {
              this.comments.push(fetchedComment);
              this.newComment = '';
            },
            error: (error) => {
              console.error('Error fetching new comment:', error);
            },
          });
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        },
      });
  }

  toggleFavorite(): void {
    if (this.alreadyFavorite) {
      this.favoriteService.removeFavorite(this.candidate?._id!).subscribe({
        next: () => {
          this.alreadyFavorite = false;
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        },
      });
    } else {
      this.favoriteService.addFavorite(this.candidate?._id!).subscribe({
        next: () => {
          this.alreadyFavorite = true;
        },
        error: (error) => {
          console.error('Error adding favorite:', error);
        },
      });
    }
  }

  confirmVote(): void {
    this.visible = !this.visible;
  }

  castVote(): void {
    if (!this.candidate) {
      console.error('Candidate is not defined');
      return;
    }

    this.voteService.castVote(this.candidate._id!).subscribe({
      next: (response) => {
        console.log('Vote cast successfully:', response);
        this.hasVoted = true;
        this.votedForCurrentCandidate = true;
        this.visible = false;
      },
      error: (error) => {
        console.error('Error casting vote:', error);
      },
    });
  }
}
