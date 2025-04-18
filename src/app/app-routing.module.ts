import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AcceilComponent } from './Components/acceil/acceil.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { ResultatComponent } from './Components/resultat/resultat.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: AcceilComponent },
  { path: 'quiz/:category/:difficulty', component: QuizComponent },
  { path: 'result/:score/:total', component: ResultatComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
