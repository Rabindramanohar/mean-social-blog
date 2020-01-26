import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  /* post = [
    {title: 'first post', content: 'This the first post'},
    {title: 'second post', content: 'This the second post'},
    {title: 'third post', content: 'This the third post'}
  ] */

  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost();
  }

}
