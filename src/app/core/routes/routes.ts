import { Routes } from '@angular/router';
import { ActivitiesComponent } from 'src/app/components/activities/activities.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { StatisticsComponent } from 'src/app/components/statistics/statistics.component';
import { SidebarLayoutComponent } from 'src/app/layouts/sidebar-layout/sidebar-layout.component';
import { ExchangeTokenComponent } from 'src/app/pages/exchange-token/exchange-token.component';
import { LoginComponent } from '../../pages/login/login.component';
import { authGuard } from '../guards/auth-guard';

const mainLayoutChildren: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard' },
  { path: 'activities', component: ActivitiesComponent, title: 'Activities' },
  { path: 'statistics', component: StatisticsComponent, title: 'Statistics' },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: 'settings', component: SettingsComponent, title: 'Settings' },
  { path: 'admin', component: AdminComponent, title: 'Admin' },
];

export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    canActivate: [authGuard],
    children: mainLayoutChildren,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'exchange-token',
    component: ExchangeTokenComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  }
];
