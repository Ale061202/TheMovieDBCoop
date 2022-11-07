import { Component, Input, OnInit } from '@angular/core';
import { Actors } from 'src/app/models/interfaces/actor-list.interface';
import { ActorService } from 'src/app/services/actor.service';
import { environment } from 'src/environments/environment';
import { Actors } from 'src/app/models/interfaces/actor-list.interface';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  actorsList: Actors[] = [];
  page: number = 1;

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.getActors(this.page);
  }

  getActors(page: number){
    this.actorService.getActors(page).subscribe(resp => {
        this.actorsList = resp.results;
    })
  }

  getPage(pages: number) {
    if(pages > 0){
      this.actorService.getActors(pages).subscribe(resp =>{
        this.actorsList = resp.results;
      })
      this.page = pages;
    }
  }

  getPhotoUrl(poster: Actors){
    return `https://image.tmdb.org/t/p/w500${poster.profile_path}`
  }

  getMovieUrl(poster: string){
    return `https://image.tmdb.org/t/p/w500/${poster}`
  }

  getGender(gender: number){
    if(gender == 1){
      return "Female"
    }else if(gender == 2){
      return "Male"
    }else{
      return "Others"
    }
  }

}
