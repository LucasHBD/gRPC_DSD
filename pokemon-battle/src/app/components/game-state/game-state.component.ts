import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service'

@Component({
  selector: 'app-game-state',
  imports: [],
  templateUrl: './game-state.component.html',
  styleUrl: './game-state.component.css'
})
export class GameStateComponent {
  battleState: any;
  
    constructor(private pokemonService: PokemonService){ }
  
    fetchBattleState(){
      this.pokemonService.getBattleState('game1').then(response => this.battleState = response).catch(err => console.error(err));
    }
  
}
