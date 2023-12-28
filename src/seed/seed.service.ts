import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();
    // const insertPokemonArray = [];

    const pokemonToInsert: { name: string; number: number }[] = [];

    let counter = 0;

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=650');

    const data: PokeResponse = await response.json();
    await data.results.forEach((pokemon) => {
      counter++;
      const pokemonToInsertInDB = { name: pokemon.name, number: counter };

      pokemonToInsert.push(pokemonToInsertInDB);
      // this.pokemonModel.create(pokemonToInsertInDB);

      // insertPokemonArray.push(this.pokemonModel.create(pokemonToInsertInDB));
    });

    // await Promise.all(insertPokemonArray);

    this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
