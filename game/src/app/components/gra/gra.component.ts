import { Component, OnInit } from '@angular/core';
import { FileApiService } from '../../services/file-api.service';
import { FinishComponent } from '../finish/finish.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { GameOverComponent } from '../game-over/game-over.component';
@Component({
  selector: 'app-gra',
  standalone: true,
  providers: [FileApiService],
  imports: [FinishComponent, CommonModule, HttpClientModule, GameOverComponent],
  templateUrl: './gra.component.html',
  styleUrl: './gra.component.scss'
})
export class GraComponent implements OnInit{

  words: string[] = [];
  currentWord: string = '';
  guessedLetters: string[] = [];
  remainingTries: number = 6;
  currentStage: number = 1;
  gameCompleted: boolean = false;
  gameFailed: boolean = false;
  startTime: number = 0;
  timeSpent: number = 0;

  constructor(public wordService: FileApiService) {}

  ngOnInit(): void {
    this.startGame();
  }
  startGame():void {
    this.startTime = Date.now();
    this.wordService.getRandomWords(5).subscribe(words => {
      this.words = words;
      this.loadNextStage();
    });
  }

  restartGame(restart:boolean): void {
    this.words = [];
    this.currentWord = '';
    this.guessedLetters = [];
    this.remainingTries = 6;
    this.currentStage= 1;
    this.gameCompleted = false;
    this.gameFailed = false;
    this.startTime = 0;
    this.timeSpent = 0;
    this.startGame();
  }

  loadNextStage(): void {
    if (this.currentStage > 5) {
      this.gameCompleted = true;
      this.timeSpent = Math.floor((Date.now() - this.startTime) / 1000); // Czas w sekundach
      return;
    }

    this.currentWord = this.words[this.currentStage - 1];
    this.guessedLetters = [];
    this.remainingTries = 6;
  }

  makeGuess(letter: string): void {
    if (this.gameCompleted) return;
    if(this.remainingTries <= 0 && !this.gameCompleted) {
      this.gameFailed = true;
      return;
    }
    if (!this.guessedLetters.includes(letter)) {
      this.guessedLetters.push(letter);
      if (!this.currentWord.includes(letter)) {
        this.remainingTries--;
      }
    }

    if (this.checkWordGuessed()) {
      this.currentStage++;
      this.loadNextStage();
    }
  }

  checkWordGuessed(): boolean {
    return this.currentWord.split('').every(letter => this.guessedLetters.includes(letter));
  }

  getWordDisplay(): string {
    return this.currentWord.split('').map(letter => this.guessedLetters.includes(letter) ? letter : '_').join(' ');
  }

  getHangmanImage(): string {
    const hangmanStages = [
      'hang0.jpg', 'hang1.jpg', 'hang2.jpg', 'hang3.jpg', 'hang4.jpg', 'hang5.jpg', 'hang6.jpg'
    ];
    return `assets/${hangmanStages[6 - this.remainingTries]}`;
  }

}
