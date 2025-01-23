import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service'

@Component({
  selector: 'app-choose-pokemon',
  imports: [],
  templateUrl: './choose-pokemon.component.html',
  styleUrl: './choose-pokemon.component.css'
})
export class ChoosePokemonComponent {
  availablePokemons = ['Pikachu', 'Eevee'];
  playerId = 'player1';

  constructor(private pokemonService: PokemonService) {}

  choosePokemon(pokemon: string){
    this.pokemonService.choosePokemon(this.playerId, pokemon).then(response => alert(response.message)).catch(err => console.error(err));
  }

}
