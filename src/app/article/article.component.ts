import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../_models/article';
import { HttpService } from '../_services/http.service';
import { Commentary } from '../_models/commentary';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { Role } from '../_models/role';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  routeSubscription: Subscription;

  article: Article = {
    title: "",
    category: "",
    text: "",
    imagePreviewUrl: ""
  };

  comments: Commentary[] = [];
  commentText: string = "";
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {
    this.routeSubscription = route.params
      .subscribe(
        params => this.article.category = params['articleCategory']
      );
    this.routeSubscription = route.params
      .subscribe(
        params => this.article.title = params['articleName']
      );
  }

  ngOnInit() {
    this.httpService.getData('/assets/' + this.article.category + '.json')
      .subscribe(
        data => this.article = this.getArticle(data["articlesList"])
      );
  }

  getArticle(articles: Article[]) {
    for (let i = 0; i < articles.length; i++)
      if (articles[i].title == this.article.title)
        return articles[i];
  }

  addComment() {
    this.authenticationService.currentUser
      .subscribe(x => this.currentUser = x);

    if (this.currentUser == null) {
      alert("Вы не авторизированы!");
    }
    else if (this.commentText === "" || this.commentText === null) {
      alert("Ваш комментарий пуст.");
    }
    else {
      this.comments.push({
        article: this.article,
        userName: this.currentUser.username,
        comment: this.commentText
      });
    }
  }

  deleteComment($comment) {
    for (let index = 0; index < this.comments.length; index++)
      if (this.comments[index] == $comment && (
        this.comments[index].userName == this.currentUser.username ||
        this.currentUser.role == Role.Admin)) {
        delete this.comments[index];
      }
  }

  onSubmitForm(from: NgForm) {
    from.resetForm();
  }
}
