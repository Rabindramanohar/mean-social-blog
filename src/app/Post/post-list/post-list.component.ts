import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  /* post = [
    {title: 'first post', content: 'This the first post'},
    {title: 'second post', content: 'This the second post'},
    {title: 'third post', content: 'This the third post'}
  ] */

  posts: Post[] = [];
  postSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getPost();
    this.postSub = this.postService.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
