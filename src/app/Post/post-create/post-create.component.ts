import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostService, private route: ActivatedRoute) { }
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Post;

  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  
  onSavePost() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content, imagePath: null
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    /* console.log(file);
    console.log(this.form); */
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
