import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { Injectable } from '@angular/core';

const PROTO_PATH = 'src/assets/proto/pokemon.proto';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private client: any;

  constructor() {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      arrays: true
    });
    const proto: any = grpc.loadPackageDefinition(packageDefinition);
    this.client = new proto.PokemonBattle('localhost:50051', grpc.credentials.createInsecure());
  }
  
  choosePokemon(playerId: string, pokemonName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.ChoosePokemon({player_id: playerId, pokemon_name: pokemonName}, (err: any, response: any) =>{
        if (err) reject(err);
        else resolve(response);
      });
    });
  }

  attack(playerId: string, move: string): Promise<any> {
     return new Promise((resolve, reject) => {
      this.client.Attack({player_id: playerId, move}, (err: any, response: any) =>{
        if(err) reject(err);
        else resolve(response);
      });
     });
  }

  getBattleState(gameId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.GetBattleState({game_id: gameId}, (err: any, response: any) =>{
        if(err) reject(err);
        else resolve(response);
      })
    })
  }
}
