import grpc
from concurrent import futures
import random
import pokemon_pb2
import pokemon_pb2_grpc


class PokemonBattleService(pokemon_pb2_grpc.PokemonBattleService):
    def __init__(self):
        self.battles = {}

    def ChoosePokemon(self, request, context):
        if request.player_id not in self.battles:
            self.battles[request.player_id] = {
                "pokemon": {
                    "name": request.pokemon_name,
                    "hp": 100,
                    "moves": ["Thunderbolt", "Swift", "Electroball", "Quick Attack", "Iron Tail", "Tackle", "Take Down"]
                }
            }
            return pokemon_pb2.ChoosePokemonResponse(
                status="Success", message=f"{request.pokemon_name} escolhido!"
            )
        return pokemon_pb2.ChoosePokemonResponse(
            status="Error", message="Você já escolheu um Pokémon!"
        )

    def Attack(self, request, context):
        attacker = self.battles.get(request.player_id)
        if not attacker:
            return pokemon_pb2.AttackResponse(status="Error", message="Jogador não encontrado!")

        # Identificar o oponente
        opponent_id = [id for id in self.battles if id != request.player_id]
        if not opponent_id:
            return pokemon_pb2.AttackResponse(status="Error", message="Nenhum oponente encontrado!")
        
        opponent = self.battles[opponent_id[0]]

        # Calcular dano e reduzir HP do oponente
        damage = random.randint(10, 30)
        opponent["pokemon"]["hp"] -= damage
        if opponent["pokemon"]["hp"] < 0:
            opponent["pokemon"]["hp"] = 0

        return pokemon_pb2.AttackResponse(
            status="Success",
            message=f"{attacker['pokemon']['name']} usou {request.move}! Causou {damage} de dano!"
        )

    def GetBattleState(self, request, context):
        players = list(self.battles.keys())

        if len(players) < 2:
            return pokemon_pb2.BattleStateResponse(
                player1="", player2="", pokemon1=None, pokemon2=None
            )

        player1 = players[0]
        player2 = players[1]

        return pokemon_pb2.BattleStateResponse(
            player1=player1,
            player2=player2,
            pokemon1=self._to_pokemon_state(self.battles[player1]["pokemon"]),
            pokemon2=self._to_pokemon_state(self.battles[player2]["pokemon"]),
        )

    def _to_pokemon_state(self, pokemon):
        return pokemon_pb2.PokemonState(
            name=pokemon["name"], hp=pokemon["hp"], moves=pokemon["moves"]
        )


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pokemon_pb2_grpc.add_PokemonBattleServicer_to_server(PokemonBattleService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Servidor gRPC rodando em localhost:50051...")
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
