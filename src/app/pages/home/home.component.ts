import { ViewportScroller } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Character,
  CharacterFilter,
  CharacterResult,
} from 'src/app/interfaces/character.interface';
import { CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private CharacterService: CharacterService) {}
  private readonly viewport = inject(ViewportScroller);
  characters: Character[] = [];
  page = 1;
  maxPage = 0;
  loading = true;
  isGoToTopActive = false;

  // filter
  name = '';
  species = '';
  gender = '';
  status = '';

  fetchCharacters(props: CharacterFilter): Observable<Character[]> {
    const { page, name, status, species, gender } = props;

    return this.CharacterService.getCharacters({
      page,
      name,
      status,
      species,
      gender,
    }).pipe(
      map((data: CharacterResult): Character[] => {
        this.maxPage = data.info.pages;
        setTimeout(() => {
          this.loading = false;
        }, 400);
        return data.results;
      })
    );
  }

  ngOnInit() {
    this.fetchCharacters({}).subscribe((data) => {
      this.characters = data;
    });
  }

  search(query: any): void {
    const { name, status, species, gender } = query;
    this.name = name;
    this.status = status;
    this.species = species;
    this.gender = gender;
    this.page = 0;

    this.fetchCharacters({
      name: this.name,
      status: this.status,
      species: this.species,
      gender: this.gender,
    }).subscribe((data) => {
      this.characters = data;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.page == this.maxPage) return;

    if (this.bottomReached()) {
      this.page++;

      this.fetchCharacters({
        page: this.page,
        name: this.name,
        status: this.status,
        species: this.species,
        gender: this.gender,
      }).subscribe((data) => {
        this.characters = [...this.characters, ...data];
      });
    }
    if (this.leavedTop()) {
      this.isGoToTopActive = true;
    } else {
      this.isGoToTopActive = false;
    }
  }

  bottomReached(): boolean {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }
  leavedTop(): boolean {
    return window.scrollY >= 500;
  }
  scrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  ngOnDestroy() {
    this.characters = [];
  }
}
