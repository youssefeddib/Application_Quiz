import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  currentQuestionIndex: number = 0;
  questions: Question[] = [];
  selectedOption: string | null = null;
  showResult: boolean = false;
  score: number = 0;

  allQuestions: { [key: string]: Question[] } = {
    science: [
      {
        question: 'Quelle planète est la plus proche du soleil ?',
        options: ['Terre', 'Mars', 'Mercure', 'Vénus'],
        correctAnswer: 'Mercure'
      },
      {
        question: 'Quel est l’élément chimique du symbole "O" ?',
        options: ['Or', 'Oxygène', 'Osmium', 'Ozone'],
        correctAnswer: 'Oxygène'
      }
    ],
    history: [
      {
        question: 'Qui a découvert l’Amérique ?',
        options: ['Napoléon', 'Christophe Colomb', 'Jules César', 'Galilée'],
        correctAnswer: 'Christophe Colomb'
      }
    ],
    sports: [
      {
        question: 'Combien de joueurs dans une équipe de football ?',
        options: ['9', '10', '11', '12'],
        correctAnswer: '11'
      }
    ],
    math: [
      {
        question: 'Combien font 8 x 7 ?',
        options: ['54', '56', '64', '58'],
        correctAnswer: '56'
      }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.questions = this.allQuestions[this.categoryId] || [];
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  nextQuestion() {
    if (this.selectedOption === this.questions[this.currentQuestionIndex].correctAnswer) {
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
}
