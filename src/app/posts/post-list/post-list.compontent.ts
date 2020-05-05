import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.compontent.html',
  styleUrls: ['./post-list.compontent.css']
})
export class PostListComponent implements OnInit, OnDestroy {

posts: Post[] = [];
private postsSub: Subscription;


constructor(public postsService: PostsService) {}

ngOnInit() {
  this.postsService.getPosts();
  this.postsSub = this.postsService.getPostUpdateListener()
  .subscribe((posts: Post[]) => {
    this.posts = posts;
  });
}

onDelete(postId: string){
  this.postsService.deletePosts(postId);
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
}
}
