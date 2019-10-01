import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../_models/article';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-page-articles',
  templateUrl: './page-articles.component.html',
  styleUrls: ['./page-articles.component.css']
})
export class PageArticlesComponent implements OnInit {
  @Input() categoryName: string;
  routeSubscription: Subscription
  searchText: string;

  title: string = "";
  articlesOnCurrentPage: Article[] = [];
  articlesOnAllPages: Article[][];

  currentNumberPage: number = 0;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {
    this.routeSubscription = route.params
      .subscribe(
        params => {
          if (params['articleCategory'] !== "search")
            this.currentNumberPage = this.getNumberPageFromParam(params['id']);
          else {
            this.categoryName = params['articleCategory'];
            this.searchText = params['articleName'];
          }
        }
      );
  }
  ngOnInit() {
    if (this.categoryName !== "search") {
      this.httpService.getData('/assets/' + this.categoryName + '.json')
        .subscribe(
          data => {
            this.articlesOnAllPages = this.getArticlesOnPages(data["articlesList"])
            this.setCurrentArticlesOnPage(this.articlesOnAllPages, this.currentNumberPage);
          }
        );
      this.httpService.getData('/assets/' + this.categoryName + '.json')
        .subscribe(data => this.title = data["title"]);
    }
    else {
      this.setSearchResult(this.httpService.getAllArticles());
    }
  }

  setSearchResult(allArticles: Observable<any>[]) {
    allArticles.forEach(articles => {
      articles.subscribe(articlesByCategories => {
        articlesByCategories["articlesList"].forEach(article => {
          if (article.title.toLowerCase().indexOf(this.searchText.toLowerCase()) + 1)
            this.articlesOnCurrentPage.push(article);
        });
      });
    });
  }

  getNumberPageFromParam(param: any) {
    if (param == null)
      return 0;
    else
      return param;
  }
  getArticlesOnPages(articles: Article[]) {
    let articlesOnPages: Article[][] = [[]];
    let counterPages: number = 0;
    const numberArticlesOnPage: number = 5;

    for (let j = 0; j < articles.length; j += numberArticlesOnPage) {
      articlesOnPages[counterPages] = [];

      for (let i = 0; i < numberArticlesOnPage; i++)
        if (j + i <= articles.length) {
          articlesOnPages[counterPages][i] = articles[j + i];
        }

      counterPages++;
    }

    return articlesOnPages;
  }

  setCurrentArticlesOnPage(allArticles: Article[][], numberPage: number) {
    this.articlesOnCurrentPage = allArticles[numberPage];
  }

  goToPage() {
    this.setCurrentArticlesOnPage(this.articlesOnAllPages, this.currentNumberPage);
  }

  isCurrentPage(index: number) {
    if (index == this.currentNumberPage)
      return true;
    else
      return false;
  }
  isMoreOnePage() {
    return this.articlesOnAllPages.length > 1;
  }
}
