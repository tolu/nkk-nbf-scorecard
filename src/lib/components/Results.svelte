<script lang="ts">
	import { calculateResults, resultEmojiMap } from '$lib/calculator';

	export let score: DScore;
	$: results = calculateResults(score);
</script>

<section>
	<header>
		<h2>Resultat</h2>
	</header>
	<table>
		<thead>
			<tr>
				<td><b>Lydighet</b></td>
				<td><b>Spesialøvelser</b></td>
				<td><b>SUM</b></td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{resultEmojiMap.godkjennt} {score.lydighet.godkjennt} for godkjennt</td>
				<td>{resultEmojiMap.godkjennt} {score.specialØvelser.godkjennt} for godkjennt</td>
				<td />
			</tr>
			<tr>
				<td>{resultEmojiMap.opprykk} {score.lydighet.opprykk} for opprykk</td>
				<td>{resultEmojiMap.opprykk} {score.specialØvelser.opprykk} for opprykk</td>
				<td />
			</tr>
			<tr
				><td
					class="result"
					class:opprykk={results.lydighet.opprykk}
					class:godkjennt={results.lydighet.godkjennt}
				>
					<b>
						{results.lydighet.score}
					</b>
				</td>
				<td
					class="result"
					class:opprykk={results.spesial.opprykk}
					class:godkjennt={results.spesial.godkjennt}
					><b>
						{results.spesial.score}
					</b>
				</td>
				<td class="result" class:opprykk={results.opprykk} class:godkjennt={results.godkjennt}
					><b>
						{results.total}
					</b>
				</td>
			</tr>
		</tbody>
	</table>
</section>

<style>
	tbody td {
		padding: 5px;
		min-width: 5ch;
		transition: background-color 0.4s ease-in-out, outline-color 0.4s ease-in-out;
	}
	.result {
		--color: 0, 0%, 50%;
		outline: 2px solid hsl(var(--color));
		background-color: hsl(var(--color), 0.1);
	}
	.result.godkjennt {
		--color: 84, 100%, 59%;
	}
	.result.opprykk {
		--color: 43, 74%, 49%;
	}
</style>
