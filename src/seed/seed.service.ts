import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  async executeSeed() {
    let counter = 0;

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');

    const data: PokeResponse = await response.json();
    const result = await data.results.map((pokemon) => {
      counter++;
      return { name: pokemon.name, number: counter };
    });

    return result;
  }
}
