import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();
  
  onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const post = {
      title: form.value.title,
      content: form.value.content
    };

    this.postCreated.emit(post);
  }

  ngOnInit() {
  }

}
