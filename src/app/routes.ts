import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from 'src/app/layouts/sidebar-layout/sidebar-layout.component';
import { ActivitiesComponent } from 'src/app/pages/activities/activities.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ExchangeTokenComponent } from 'src/app/pages/exchange-token/exchange-token.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { StatisticsComponent } from 'src/app/pages/statistics/statistics.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth-guard';

const mainLayoutChildren: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
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
  { path: 'login', component: LoginComponent },
  { path: 'exchange-token', component: ExchangeTokenComponent },
  { path: '**', component: LoginComponent }
];
