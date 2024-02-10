import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { authGuard } from '../guards/auth-guard';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { StatisticsComponent } from 'src/app/components/statistics/statistics.component';
import { ActivitiesComponent } from 'src/app/components/activities/activities.component';

const mainLayoutChildren: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard' },
  { path: 'activities', component: ActivitiesComponent, title: 'Activities' } ,
  { path: 'statistics', component: StatisticsComponent, title: 'Statistics' },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: 'settings', component: SettingsComponent, title: 'Settings' },
  { path: 'admin', component: AdminComponent, title: 'Admin' },
];

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: mainLayoutChildren,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  }
];
