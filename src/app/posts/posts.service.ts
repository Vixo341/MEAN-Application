import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {
 private posts: Post[] = [];
 private postsUpdated = new Subject<Post[]>();


constructor(private http: HttpClient) {}

  getPosts(){
   this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
   .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
   }))
   .subscribe((changedPost) => {
    this.posts = changedPost;
    this.postsUpdated.next([...this.posts]);
   });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    // tslint:disable-next-line:object-literal-shorthand
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePosts(postId) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      console.log('Post Deleted');
    });
  }
}
