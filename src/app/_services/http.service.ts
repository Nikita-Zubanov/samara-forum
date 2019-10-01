import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    titlesAllArticles: string[] = [
        "art", "attractions", "entertainments", "news"
    ];

    constructor(private http: HttpClient) { }

    getData($filePath: string) {
        return this.http.get($filePath);
    }

    getAllArticles() {
        let allArticles: Observable<any>[] = [];
        this.titlesAllArticles.forEach(titleArticles => {
            allArticles.push(this.http.get('/assets/' + titleArticles + '.json'));
        });

        return allArticles;
    }
}