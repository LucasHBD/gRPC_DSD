using System;
using Grpc.Net.Client;
using GrpcClient.Protos;

class Program
{
    static void Main(string[] args)
    {
        var channel = GrpcChannel.ForAddress("http://localhost:50051");
        var client = new PokemonBattle.PokemonBattleClient(channel);

        Console.WriteLine("Bem-vindo ao jogo de batalha Pokémon!");
        Console.Write("Insira seu ID de jogador: ");
        string playerId = Console.ReadLine();

        Console.Write("Escolha seu Pokémon: ");
        string pokemonName = Console.ReadLine();

        // Escolher o Pokémon
        var chooseResponse = client.ChoosePokemon(new ChoosePokemonRequest
        {
            PlayerId = playerId,
            PokemonName = pokemonName
        });
        Console.WriteLine(chooseResponse.Message);

        // Fazer um ataque
        Console.Write("Escolha um movimento para atacar: ");
        string move = Console.ReadLine();

        var attackResponse = client.Attack(new AttackRequest
        {
            PlayerId = playerId,
            Move = move
        });
        Console.WriteLine(attackResponse.Move); // Corrigido para acessar o campo 'Move'

        // Verificar o estado da batalha
        var battleStateResponse = client.GetBattleState(new BattleStateRequest { GameId = "game1" });
        Console.WriteLine($"Jogador 1: {battleStateResponse.Player1} | Pokémon: {battleStateResponse.Pokemon1.Name} (HP: {battleStateResponse.Pokemon1.Hp})");
        Console.WriteLine($"Jogador 2: {battleStateResponse.Player2} | Pokémon: {battleStateResponse.Pokemon2.Name} (HP: {battleStateResponse.Pokemon2.Hp})");
    }
}
