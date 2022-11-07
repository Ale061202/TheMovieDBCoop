import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSessionDto } from 'src/app/models/dto/create-session.dto';
import { DeleteSessionDto } from 'src/app/models/dto/delete-session.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;
  reqToken = '';
  approved = false;
  sessionId : string;
  username = '';
  avatar : string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sessionId=localStorage.getItem('session_Id')
    if (this.sessionId != null){
      this.authService.getAccountDetail(this.sessionId).subscribe(res => {
        this.username = res.username;
        this.avatar = `https://www.themoviedb.org/t/p/w32_and_h32_face/${res.avatar.tmdb.avatar_path}`
      })
    }else{
      this.createSession();
    }


  }
  requestToken(){
    this.authService.createRequestToken().subscribe((res) => {
      this.reqToken = res.request_token;
      console.log(this.reqToken);
      window.location.href = `https://www.themoviedb.org/authenticate/${this.reqToken}?redirect_to=http://localhost:4200/navbar`
    })
  }
  logout() {
    let deleteSessionDto = new DeleteSessionDto();
    if (localStorage.getItem('session_id') != null) {
      deleteSessionDto.session_id = localStorage.getItem('session_id')!;
      this.authService.deleteSession(deleteSessionDto).subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('session_id');
          this.approved = false;
        }
      });
    }
  }
  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
  createSession() {
    this.route.queryParams.subscribe((qParams) => {
      const ap = qParams['approved'];
      const rToken = qParams['request_token'];
      this.approved = ap == 'true' ? true : false;

      if (this.approved) {
        let session = new CreateSessionDto();
        session.request_token = rToken;
        this.authService.createSession(session).subscribe((resp) => {
          localStorage.setItem('session_id', resp.session_id);
          console.log('Session id: ' + resp.session_id);
        });
      } else {
        if (localStorage.getItem('session_id') != null) {
          console.log('Session id: ' + localStorage.getItem('session_id'));
          this.approved = true;
        }
      }
    });
  }

}
