import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {

  sessionId = !(localStorage.getItem('session_id')==undefined);

  collapseShow = "hidden";
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
