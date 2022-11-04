import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/interfaces/actor-list.interface';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actorList: Actor[] = [];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.getActors(1);
  }

  getActors(page: number){
    this.actorService.getActors(page).subscribe(resp => {
      this.actorList = resp.results;
    })
  }

}
