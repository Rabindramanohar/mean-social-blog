import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  post = [
    {title: 'first post', content: 'This the first post'},
    {title: 'second post', content: 'This the second post'},
    {title: 'third post', content: 'This the third post'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
