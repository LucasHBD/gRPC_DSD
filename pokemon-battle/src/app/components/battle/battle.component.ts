import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-battle',
  imports: [],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.css'
})

export class BattleComponent {
  availableMoves = ["Thunderbolt", "Swift", "Electroball", "Quick Attack", "Iron Tail", "Tackle", "Take Down"];
  playerId = 'player1';

  constructor(private pokemonService: PokemonService){}
  
  attack(move: string){
    this.pokemonService.attack(this.playerId, move).then(response => alert(response.message)).catch(err => console.error(err));
  }

}
