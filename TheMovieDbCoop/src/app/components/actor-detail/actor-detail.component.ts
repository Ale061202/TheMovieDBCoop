import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorDetailResponse } from 'src/app/models/interfaces/actor-detail.interface';
import { Cast } from 'src/app/models/interfaces/movie-credits.interface';
import { ActorService } from 'src/app/services/actor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {

  id: number = 0;
  actorDetail: ActorDetailResponse = {} as ActorDetailResponse;
  movieDetail: Cast[] = [];

  constructor(private actorService: ActorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(resp => {
      this.id = resp['id'];
    });

    this.actorService.getActorDetail(this.id).subscribe(resp => {
      this.actorDetail = resp;
    });
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

  getPhotoUrl(actorPhoto: string){
    return `${environment.apiBaseUrl}/w500/${actorPhoto}`
  }

  getMoviePhotoUrl(poster: Cast){
    return `${environment.posterPath}/w220_and_w330/${poster.poster_path}`
  }

}
