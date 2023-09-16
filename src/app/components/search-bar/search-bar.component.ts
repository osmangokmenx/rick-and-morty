import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() queryChange = new EventEmitter<any>();
  timeout: any;
  name = '';
  species = '';
  status = '';
  gender = '';

  constructor() {}

  onQueryChange(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.queryChange.emit({
        name: this.name,
        species: this.species,
        gender: this.gender,
        status: this.status,
      });
    }, 400);
  }
  clearFilters(): void {
    this.name = '';
    this.species = '';
    this.status = '';
    this.gender = '';

    this.queryChange.emit({
      name: this.name,
      species: this.species,
      gender: this.gender,
      status: this.status,
    });
  }
}
