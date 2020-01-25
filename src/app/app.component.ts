import { Component } from '@angular/core';
import { Post } from './Post/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Storedposts: Post[] = [];

  onPostAdded(post) {
    this.Storedposts.push(post);
  }
}
