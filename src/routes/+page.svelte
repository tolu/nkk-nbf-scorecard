<script lang="ts">
	import { klasseD } from '$lib/bruks';
	import Scorecard from '$lib/components/Scorecard.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let deltagare: Array<Deltager> = [];
	const addPerson = (e: SubmitEvent) => {
		if (e.target instanceof HTMLFormElement) {
			deltagare = [
				...deltagare,
				{
					name: e.target.name.value,
					score: structuredClone(klasseD),
					date: ''
				}
			];
			e.target.reset();
		}
	};
	onMount(() => {
		const state = JSON.parse(localStorage.getItem('nkk.score') ?? 'null');
		if (state && Array.isArray(state)) {
			deltagare = state;
		}
	});
	const persistState = () => {
		console.log('saving', deltagare);
		localStorage.setItem('nkk.score', JSON.stringify(deltagare));
	};
</script>

<main>
	<h1>NKK Brukshundprøver</h1>

	<form on:submit|preventDefault={addPerson}>
		<input class="nrk-input" name="name" type="text" placeholder="Navn" />
		<button class="nrk-button" type="submit">Lägg till deltager</button>
	</form>

	<hr />
	{#each deltagare as person (person.name)}
		<div transition:fly={{ y: 150, duration: 400 }}>
			<Scorecard
				deltager={person}
				on:updated={persistState}
				on:delete={() => {
					deltagare = deltagare.filter((p) => p.name !== person.name);
					persistState();
				}}
			/>
			<hr />
		</div>
	{/each}
</main>

<style>
	main {
		padding-inline: 2rem;
	}
</style>
