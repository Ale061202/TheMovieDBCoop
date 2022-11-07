import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorDetailResponse } from 'src/app/models/interfaces/actor-detail.interface';
import { Actors } from 'src/app/models/interfaces/actor-list.interface';
import { Cast } from 'src/app/models/interfaces/movie-credits.interface';
import { ActorService } from 'src/app/services/actor.service';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {

  id: number = 0;
  actorDetail: ActorDetailResponse = {} as ActorDetailResponse;
  actors: Actors = {} as Actors;
  movieDetail: Cast[] = [];

  constructor(private movieService: MoviesService,private actorService: ActorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(resp => {
      this.id = resp['id'];
    });

    this.actorService.getActorDetail(this.id).subscribe(resp => {
      this.actorDetail = resp;
    });

    this.actorService.getMovies(this.id).subscribe(resp => {
      this.movieDetail = resp.cast;
    })
  }

  getImgActor(profile: string){
    return `${environment.posterPath}/w500/${profile}`;
  }

  getImgMovie(poster: string){
    return `${environment.posterPath}/w500/${poster}`;
  }

  getGender(gender: number){
    if(gender == 1){
      return "Female";
    }else if(gender == 2){
      return "Male";
    }else{
      return "Others";
    }
  }
}
