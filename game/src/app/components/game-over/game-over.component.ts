import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {
  @Output() restart = new EventEmitter<boolean>(); ;
  restartGame(): void {
    this.restart.emit(true);
  }
}
