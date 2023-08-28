<script lang="ts">
	import { klasseD } from '$lib/bruks';
	import type { DScore } from '$lib/bruks';
	import Scorecard from '$lib/components/Scorecard.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

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
		<div transition:fade>
			<Scorecard
				name={person.name}
				temp={person.score}
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
