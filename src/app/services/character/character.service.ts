import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import {
  Character,
  CharacterFilter,
  CharacterResult,
} from 'src/app/interfaces/character.interface';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}
  private handleError() {
    let errorMessage = 'An error occurred';

    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }

  getCharacters(props: CharacterFilter) {
    const { name, status, species, gender, page } = props;
    return this.http
      .get<CharacterResult>(
        `${environment.apiUrl}?page=${page ?? 0}&name=${name ?? ''}&status=${
          status ?? ''
        }&species=${species ?? ''}&gender=${gender ?? ''}`
      )
      .pipe(catchError(this.handleError));
  }

  getCharacter(id: number) {
    return this.http
      .get<Character>(`${environment.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
