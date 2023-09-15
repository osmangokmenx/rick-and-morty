import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {
  CharacterFilter,
  CharacterResult,
} from 'src/app/interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  getCharacters(props: CharacterFilter) {
    const { name, status, species, gender, page } = props;
    return this.http.get<CharacterResult>(
      `${environment.apiUrl}?page=${page ?? 0}&name=${name ?? ''}&status=${
        status ?? ''
      }&species=${species ?? ''}&gender=${gender ?? ''}`
    );
  }
}
