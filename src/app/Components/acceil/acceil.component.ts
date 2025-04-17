import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceil',
  templateUrl: './acceil.component.html',
  styleUrls: ['./acceil.component.css']
})
export class AcceilComponent {
  categories = [
    {
      id: 'science',
      name: 'Science',
      image: 'assets/images/science.jpg'
    },
    {
      id: 'history',
      name: 'Histoire',
      image: 'assets/images/history.jpg'
    },
    {
      id: 'sports',
      name: 'Sport',
      image: 'assets/images/sports.jpg'
    },
    {
      id: 'math',
      name: 'Mathématiques',
      image: 'assets/images/math.jpg'
    }
  ];

  selectedCategoryId: string | null = null;

  constructor(private router: Router) {}

  selectCategory(catId: string) {
    this.selectedCategoryId = catId;
  }

  startQuiz() {
    if (this.selectedCategoryId) {
      this.router.navigate(['/quiz', this.selectedCategoryId]);
    } else {
      alert('Veuillez sélectionner une catégorie 🧐');
    }
  }
}
