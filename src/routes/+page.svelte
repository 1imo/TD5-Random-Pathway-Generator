<script lang="ts">
	/**
	 * Import of components
	 * @module $lib/components/ui/
	 */
	import { Button } from "$lib/components/ui/button";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Select from "$lib/components/ui/select";

	/**
	 * Import of custom classes
	 * @module $lib/classes/
	 */
	import Information from "$lib/classes/data";
	import Game from "$lib/classes/game";

	let game: Game | undefined; // Game instance

	// User inputs
	let players: Array<String> = ["1"];
	let towerCount: number = 0;

	// Tab/screen management
	enum Tab {
		Input = "input",
		Output = "output",
	}

	let currentTab: Tab = Tab.Input;

	// Option to add another player
	function addPlayer(): void {
		if (players.length > 1) return;
		players = [...players, (players.length + 1).toString()];
	}

	// Reactive statement to changes in variable value
	$: {
		/**
		 * If the screen has been changed to ouput
		 * Process the input data ready to display
		 * Else switch back to the input screen
		 */
		if (currentTab == Tab.Output) {
			if (players[0] != "1") {
				game = new Game(players, towerCount).getGame(); // Process user input
			} else {
				currentTab = Tab.Input; // Switch back to the input screen
			}
		}
	}
</script>

<main>
	<section>
		<img
			src="https://image.api.playstation.com/cdn/EP2575/CUSA08065_00/Oa99ok2pVqfVXgF6ufew5qvvn20QagdB.jpg"
			alt="Bloons TD5"
		/>
	</section>

	<section>
		<Tabs.Root value={currentTab} class="w-[400px]">
			<Tabs.List>
				<Tabs.Trigger
					on:click={() => (currentTab = Tab.Input)}
					value={Tab.Input}
				>
					Parameters
				</Tabs.Trigger>
				<Tabs.Trigger
					on:click={() => (currentTab = Tab.Output)}
					value={Tab.Output}
				>
					Output
				</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value={Tab.Input}>
				{#each players as player, index}
					<Label for={player}>The username of a player</Label>
					<Input
						id={player}
						label="Username"
						placeholder="Username"
						on:input={(e) => (players[index] = e.target.value)}
					/>
					<p class="text-sm text-muted-foreground">
						This is the username that will be used for a player.
					</p>
				{/each}

				<Button on:click={addPlayer}>Add Player</Button>

				<Label for="char-select">Character Count</Label>
				<Select.Root>
					<Select.Trigger id="char-count" class="w-[180px]">
						<Select.Value placeholder="Playable Character Count" />
					</Select.Trigger>
					<Select.Content>
						{#each Information.playableCharacters as diff, index}
							<Select.Item
								on:click={() => (towerCount = index)}
								value={index}
							>
								{index}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<div>
					<Button on:click={() => (currentTab = Tab.Output)}
						>Continue</Button
					>
					<Button>Cancel</Button>
				</div>
			</Tabs.Content>

			<Tabs.Content value={Tab.Output}>
				{#if game}
					<pre>{JSON.stringify(game, null, 2)}</pre>
				{/if}
			</Tabs.Content>
		</Tabs.Root>
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		width: 100vw;
	}

	section > img {
		height: 100svh;
		width: 100%;
		position: relative;
		right: 0;
		object-fit: cover;
		object-position: right;
	}
</style>
