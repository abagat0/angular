import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  private wordsUrl = '../assets/answers.json';  // Ścieżka do pliku JSON

  constructor(private http: HttpClient) {}

  getWords(): Observable<string[]> {
    return this.http.get<string[]>(this.wordsUrl);
  }

  getRandomWords(num: number): Observable<string[]> {
    return this.getWords().pipe(
      map(words => {
        const shuffled = words.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      })
    );
  } 
}
