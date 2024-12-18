import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-list-users',
  standalone: true,
  imports: [TableModule, ToastModule, SpeedDialModule, DialogModule,CommonModule],
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.css'],
})
export class AdminListUsersComponent implements OnInit {
  loading: boolean = true;
  showDialogue: boolean = false;
  searchValue: string | undefined;
  filteredUsers: User[] = [];
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      },
    });
  }

  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(
        (data) =>
          (data.name ? data.name.toLowerCase().includes(input) : false) ||
          (data.email ? data.email.toLowerCase().includes(input) : false)
      );
    }
  }

  showIt(user: User) {
    this.selectedUser = user;
    this.showDialogue = true;
  }

  cancelSup() {
    this.showDialogue = false;
    this.selectedUser = null;
  }

  deleteUser() {
    if (this.selectedUser) {
      this.userService.deleteUser(this.selectedUser._id!).subscribe({
        next: () => {
          this.users = this.users.filter(
            (u) => u._id !== this.selectedUser!._id
          );
          this.filteredUsers = this.filteredUsers.filter(
            (u) => u._id !== this.selectedUser!._id
          );
          this.showDialogue = false;
          this.selectedUser = null;
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
    }
  }

  addUser() {
    this.router.navigate(['/dashboard/users/add']);
  }

  editUser(user: User) {
    this.router.navigate(['/dashboard/users/edit', user._id]);
  }
}
