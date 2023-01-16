import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Hero } from './../hero/hero';
import { HEROES } from './mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero?: Hero;

  constructor() {}

  ngOnInit(): void {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
