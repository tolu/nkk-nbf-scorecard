// Regelverk
// https://www.norsk-brukshundsport.no/wp-content/uploads/2019/03/Regler_for_brukshundprover_190101-211231.pdf
export const klasseD = {
	lydighet: {
		moment: [
			{ name: 'Fellesdekk', ratio: 6, score: 0 },
			{ name: 'Lineføring', ratio: 5, score: 0 },
			{ name: 'Dekk under marsh', ratio: 3, score: 0 },
			{ name: 'Innkalling', ratio: 4, score: 0 },
			{ name: 'Apport', ratio: 4, score: 0 },
			{ name: 'Fritt hopp over hinder', ratio: 4, score: 0 }
		],
		godkjennt: 130,
		opprykk: 182
	} as const,
	specialØvelser: {
		moment: [
			{ name: 'Rundering', ratio: 31, score: 0 },
			{ name: 'Feltsøk', ratio: 8, score: 0 }
		],
		godkjennt: 195,
		opprykk: 312
	} as const
};
