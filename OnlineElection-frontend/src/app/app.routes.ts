import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CandidatDetailsComponent } from './components/candidat-details/candidat-details.component';
import { AdminListCandidatsComponent } from './components/dashboard/admin-list-candidats/admin-list-candidats.component';
import { AdminListUsersComponent } from './components/dashboard/admin-list-users/admin-list-users.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminFormCandidatsComponent } from './components/dashboard/admin-form-candidats/admin-form-candidats.component';

export const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'candidate/:id', component: CandidatDetailsComponent },
      { path: 'profile', component: ProfilComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'candidates', component: AdminListCandidatsComponent },
      { path: 'candidates/add', component: AdminFormCandidatsComponent },
      { path: 'candidates/edit/:id', component: AdminFormCandidatsComponent },
      { path: 'users', component: AdminListUsersComponent },
      { path: '**', redirectTo: 'candidates' },
    ],
  },
  { path: '**', redirectTo: 'accueil' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 50],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
