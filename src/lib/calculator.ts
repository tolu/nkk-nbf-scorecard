export const calculateResults = (score: DScore) => {
	const resLydighet = score.lydighet.moment.reduce(
		(prev, next) => prev + next.score * next.ratio,
		0
	);
	const resSpesial = score.specialØvelser.moment.reduce(
		(prev, next) => prev + next.score * next.ratio,
		0
	);
	const resSum = resLydighet + resSpesial;
	const godkjenntLydighet = resLydighet > score.lydighet.godkjennt;
	const godkjenntSpesial = resSpesial > score.specialØvelser.godkjennt;
	const godkjennt = godkjenntLydighet && godkjenntSpesial;
	const opprykkLydighet = resLydighet > score.lydighet.opprykk;
	const opprykkSpesial = resSpesial > score.specialØvelser.opprykk;
	const opprykk = opprykkLydighet && opprykkSpesial;
	const result: 'opprykk' | 'godkjennt' | null = opprykk
		? 'opprykk'
		: godkjennt
		? 'godkjennt'
		: null;

	return {
		lydighet: {
			score: resLydighet,
			opprykk: opprykkLydighet,
			godkjennt: godkjenntLydighet
		},
		spesial: {
			score: resSpesial,
			opprykk: opprykkSpesial,
			godkjennt: godkjenntSpesial
		},
		opprykk,
		godkjennt,
		total: resSum,
		award: result ? resultEmojiMap[result] : ''
	};
};
export const resultEmojiMap = {
	opprykk: '🏆',
	godkjennt: '✅'
} as const;
