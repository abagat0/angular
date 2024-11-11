import { Component , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {
  @Input() timeSpent: number = 0;
  @Output() restart = new EventEmitter<boolean>(); ;
  restartGame(): void {
    this.restart.emit(true);
  }
}
