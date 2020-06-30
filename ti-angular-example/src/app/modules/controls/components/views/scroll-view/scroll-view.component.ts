import { Component } from '@angular/core'
import { WithTiGlobal } from 'titanium-angular'

interface Post {
    id: number,
    user: {
        username: string
    },
    date: string,
    likes: number
    liked: boolean
    comments: number
}

@Component({
    templateUrl: './scroll-view.component.html'
})
export class ScrollViewComponent extends WithTiGlobal() {
    posts: Post[]

    ngOnInit() {
        this.posts = [{
            id: 1,
            user: {
                username: 'Jon'
            },
            date: 'a few minutes ago',
            likes: 3,
            liked: false,
            comments: 1
          }, {
            id: 2,
            user: {
                username: 'Ellen'
            },
            date: '24 minutes ago',
            likes: 509,
            liked: true,
            comments: 20
          }, {
            id: 3,
            user: {
                username: 'Max'
            },
            date: '3 hours ago',
            likes: 3409,
            liked: false,
            comments: 72
        }]
    }

    toggleLike(post: Post) {
        if (post.liked) {
            post.liked = false;
            post.likes -= 1;
        } else {
            post.liked = true;
            post.likes += 1;
        }

        // Here would be a good place to update your remote data source
    }
}