import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Question } from '../interfaces/questions';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const getQuestionsUrl = 'http://192.168.2.46:8080/questions';

@Injectable({
    providedIn: 'root'
})

export class QuestionsService {
    answer = new Question();
    constructor(private http: HttpClient) { }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }
    //
    getQuestions(): Observable<any> {
        return this.http.get(getQuestionsUrl, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    addQuestion(url: string, question: Question): Observable<Question> {
        return this.http.post<Question>(url, question, httpOptions)
            .pipe(
                // catchError(this.handleError)
            );
    }
    setAnswer(ans: Question) {
        this.answer = ans;
        console.log('question');
        console.log(this.answer);
    }
    getAnswer() {
        return this.answer;
    }
}
