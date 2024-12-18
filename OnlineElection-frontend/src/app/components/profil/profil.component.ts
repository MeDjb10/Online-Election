import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Candidate } from '../../models/candidate.model';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FavoriteService } from '../../services/favorite.service';
import { VoteService } from '../../services/vote.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    TableModule,
    ToastModule,
    SpeedDialModule,
    DialogModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  changeInfoForm!: FormGroup;
  formSubmitted = false;
  errorMessage: string | null = null;
  show: boolean = false;
  user: User | null = null;
  favoriteCandidates: Candidate[] = [];
  votedCandidateName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private favoriteService: FavoriteService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.changeInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.fetchUserProfile();
    this.fetchFavoriteCandidates();
    this.fetchUserVotes();
  }

  fetchUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.changeInfoForm.patchValue(user);
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      },
    });
  }

  fetchFavoriteCandidates(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (candidates) => {
        this.favoriteCandidates = candidates;
      },
      error: (error) => {
        console.error('Error fetching favorite candidates:', error);
      },
    });
  }

  fetchUserVotes(): void {
    this.voteService.getUserVotes().subscribe({
      next: (votes) => {
        if (votes.length > 0) {
          this.votedCandidateName = votes[0].candidate.name;
        } else {
          this.votedCandidateName = null;
        }
      },
      error: (error) => {
        console.error('Error fetching user votes:', error);
      },
    });
  }

  editUser(): void {
    this.show = !this.show;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.changeInfoForm.invalid) {
      return;
    }

    this.userService.updateUserProfile(this.changeInfoForm.value).subscribe({
      next: (user) => {
        this.user = user;
        this.show = false;
      },
      error: (error) => {
        console.error('Error updating user profile:', error);
        this.errorMessage = 'Failed to update profile. Please try again.';
      },
    });
  }

  cancelCh(): void {
    this.show = !this.show;
  }
}
