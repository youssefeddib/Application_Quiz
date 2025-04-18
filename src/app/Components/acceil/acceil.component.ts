import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acceil.component.html',
  styleUrls: ['./acceil.component.css']
})
export class AcceilComponent {
  categories = [
    { id: 9, name: 'Culture Générale', image: 'assets/general.png' },
    { id: 21, name: 'Sport', image: 'assets/sports.png' },
    { id: 23, name: 'Histoire', image: 'assets/history.png' },
    { id: 17, name: 'Science & Nature', image: 'assets/science.png' },
    { id: 22, name: 'Géographie', image: 'assets/geography.png' },
  ];

  difficulties = ['easy', 'medium', 'hard'];

  selectedCategoryId: number | null = null;
  selectedDifficulty: string = 'easy';

  constructor(private http: HttpClient, private router: Router) {}

  selectCategory(catId: number) {
    this.selectedCategoryId = catId;
  }

  startQuiz() {
    if (!this.selectedCategoryId || !this.selectedDifficulty) {
      alert('Veuillez sélectionner une catégorie et une difficulté.');
      return;
    }

    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${this.selectedCategoryId}&difficulty=${this.selectedDifficulty}&type=multiple`;

    this.http.get(apiUrl).subscribe(
      (res: any) => {
        if (res.response_code === 0) {
          this.router.navigate(
            [`/quiz`, this.selectedCategoryId, this.selectedDifficulty],
            { state: { questions: res.results } }
          );
        } else {
          alert('Aucune question trouvée pour ces critères.');
        }
      },
      error => {
        console.error('Erreur API:', error);
        alert('Impossible de charger les questions.');
      }
    );
  }
}
