import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LeagueService } from './providers/league.service';
import { UserService } from './providers/user.service';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilterTeamsComponent } from './filterteams/filterteams.component';
import { TeamService } from './providers/team.service';
import { EditProfileComponent } from './editprofile/editprofile.component';
import { AdminComponent } from './admin/admin.component';
import { DetailsTeamComponent } from './detailsteam/detailsteam.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'filterteams', component: FilterTeamsComponent},
  {path: 'editprofile', component: EditProfileComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'detailsteam', component: DetailsTeamComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    FilterTeamsComponent,
    EditProfileComponent,
    AdminComponent,
    DetailsTeamComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LeagueService,
    UserService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
