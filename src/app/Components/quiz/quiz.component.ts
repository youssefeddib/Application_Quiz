import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  categoryId: string = '';
  difficulty: string = '';
  currentQuestionIndex: number = 0;
  questions: Question[] = [];
  selectedOption: string | null = null;
  showResult: boolean = false;
  score: number = 0;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('category') || '';
    this.difficulty = this.route.snapshot.paramMap.get('difficulty') || 'easy';

    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${this.categoryId}&difficulty=${this.difficulty}&type=multiple`;

    this.http.get<any>(apiUrl).subscribe(
      (res) => {
        if (res.response_code === 0) {
          this.questions = res.results.map((q: any) => ({
            question: this.decodeHTML(q.question),
            correctAnswer: this.decodeHTML(q.correct_answer),
            options: this.shuffleOptions([
              ...q.incorrect_answers.map((a: string) => this.decodeHTML(a)),
              this.decodeHTML(q.correct_answer)
            ])
          }));
        } else {
          alert('Aucune question disponible pour cette catégorie/difficulté.');
          this.router.navigate(['/categories']);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur de chargement des questions', error);
        alert('Erreur lors du chargement des questions.');
        this.router.navigate(['/categories']);
      }
    );
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  nextQuestion() {
    const current = this.questions[this.currentQuestionIndex];
    if (this.selectedOption === current.correctAnswer) {
      this.score++;
    }
    this.selectedOption = null;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResult = true;
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.score = 0;
    this.showResult = false;
  }

  shuffleOptions(options: string[]): string[] {
    return options.sort(() => Math.random() - 0.5);
  }

  decodeHTML(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
}
