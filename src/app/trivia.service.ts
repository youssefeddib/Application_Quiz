import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  constructor(private http: HttpClient) {}

  getQuestions(amount: number, category: string, difficulty: string): Observable<{ results: TriviaQuestion[] }> {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http.get<{ results: TriviaQuestion[] }>(url);
  }
}
