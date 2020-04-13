import { Component, Input } from '@angular/core';

@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.compontent.html',
  styleUrls: ['./post-list.compontent.css']
})
export class PostListComponent {
// posts = [
// {title: 'First Post', content: 'This is First Post!'},
// {title: 'Second Post', content: 'This is Second Post!'},
// {title: 'Third Post', content: 'This is Third Post!'},
//];
@Input() posts = [];

}
