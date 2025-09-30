import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiService, PostDto } from "../services/api.service";


@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './posts.component.html',
})
export class PostsComponent{
    posts: PostDto[] = [];
        newContent: string = '';
        newStatus: string = 'HAPPY';
        error = '';

    constructor(private apiService: ApiService) {}

    ngOnInit() {
      this.loadPosts();
    }


    loadPosts() {
      this.apiService.getPosts().subscribe({
        next: (data) => this.posts = data,
        error: (err) => this.error = err.message
      });
      console.log(this.posts);
        }



    addPost() {
      if (!this.newContent) return;

      this.apiService.newPost(this.newContent, this.newStatus).subscribe({
        next: (post) => {
          this.posts.push(post); 
          this.newContent = '';
        },
        error: () => this.error = "Failed to add post: "
      });
    }
}
