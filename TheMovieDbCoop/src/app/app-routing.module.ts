import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./components/movies/movies.component";
import { ActorDetailComponent } from "./components/actor-detail/actor-detail.component";
import { ActorListComponent } from "./components/actor-list/actor-list.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { RatedMoviesComponent } from "./components/rated-movies/rated-movies.component";
import { FavouriteMoviesComponent } from "./components/favourite-movies/favourite-movies.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "actors", component: ActorListComponent},

      { path: 'actor-detail/:id', component: ActorDetailComponent},
      { path: 'movies', component: MoviesComponent},
      { path: 'movie-detail/:id', component: MovieDetailsComponent},

      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  /*{
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },*/
  {path: "", component: IndexComponent },
  {path: 'rated-movies', component: RatedMoviesComponent},

  {path: '',pathMatch: 'full',redirectTo: 'navbar'},
  {path: 'actor-detail/:id', component: ActorDetailComponent},
  {path: 'movie-detail/:id', component: MovieDetailsComponent},
  {path: 'favourite', component: FavouriteMoviesComponent},

  {path: '',pathMatch: 'full',redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
