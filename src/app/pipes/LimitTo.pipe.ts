import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'LimitTo'
})

export class LimitToPipe implements PipeTransform {
    maxLenghtArticle = 2000;

    transform(value?: string, lenght?: any): any {
        let result = value;
        if (value !== null) {
            if (lenght !== undefined) {
                result = result.substr(0, lenght) + "...";
            }
            else if (value.length > this.maxLenghtArticle) {
                result = result.substr(0, this.maxLenghtArticle) + "...";
            }
        }

        return result;
    }
}