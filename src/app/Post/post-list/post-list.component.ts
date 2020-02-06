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
  isLoading = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.isLoading = true;
    this.postSub = this.postService.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
