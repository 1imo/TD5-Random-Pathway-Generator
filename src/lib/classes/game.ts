import Information from "./data";

interface GameInfo {
    map: String,
    mapDifficulty: String,
    players: Array<Individual>,
    difficulty: String,
}

// Struct for each player
// Holds the name of the player and the characters they can play
interface Individual {
    name: String,
    playables: Array<String>,
}

// Current Game Data
export default class Game {
	map: Array<String>; // Map, Difficulty of the map (see data.js)
	players: Array<Individual>;
    difficulty: String;

    // Constructor for the game
	constructor(players: Array<String>, towerCount: number) {
		this.map =
			Information.maps[
				Math.round(Math.random() * Information.maps.length)
			]; // Random map

        this.difficulty = Information.difficulties[Math.round(Math.random() * Information.difficulties.length)]
        this.players = []; // Empty array instantiated for players

        // For each player, create an individual struct
		players.forEach((name) => {
          const individual: Individual = {
            name: name,
            playables: this.getPlayables(towerCount),
          };
          this.players.push(individual);
        });
	}

    // Get the playable characters for each player
	private getPlayables(
		towerCount: number,
	): Array<String> {
		const towers: Array<String> = [];
		for (let i = 0; i < towerCount; i++) {
			towers.push(
				Information.playableCharacters[
					Math.round(
						Math.random() *
							Information.playableCharacters.length
					)
				]
			);
		}
		return towers;
	}

    // Get the current game
    getGame(): GameInfo {
      return {
        map: this.map[0],
        mapDifficulty: this.map[1],
        players: this.players,
        difficulty: this.difficulty
      }
    }
}