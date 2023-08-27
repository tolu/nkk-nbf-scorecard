<script lang="ts">
	import { klasseD } from '$lib/bruks';
	import type { DScore } from '$lib/bruks';
	import Results from '$lib/components/Results.svelte';
	import { onMount } from 'svelte';

	let deltagare: Array<{ name: string; score: DScore }> = [];
	const addPerson = (e: SubmitEvent) => {
		if (e.target instanceof HTMLFormElement) {
			deltagare = [
				...deltagare,
				{
					name: e.target.name.value,
					score: structuredClone(klasseD)
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
		window.addEventListener('nkk.res.change', persistState);
	});
	const persistState = () => {
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
	{#each deltagare as person}
		<Results
			name={person.name}
			temp={person.score}
			on:delete={() => {
				deltagare = deltagare.filter((p) => p.name !== person.name);
				persistState();
			}}
		/>
		<hr />
	{/each}
</main>

<style>
	main {
		padding-inline: 2rem;
	}
</style>
