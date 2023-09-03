# brukshund

> Scorecard för brukshundspröver

Ett försök att förenkla för deltagare på brukshundsprøver att hålla reda på sina poäng, utan att göra fel på huvudräkningen, och att ge snabb respons på om man har uppnått "**godkjennt**" eller "**opprykk**".

Publik webb: <https://nbf.tolu.app>

## Infrastructure and deployment details

- Deployed on [Vercel](https://vercel.com/tolu/nbf-scorecard/settings/general)
- Custom domain via [Google Domains](https://domains.google.com/registrar/tolu.app) and [Cloudflare](https://dash.cloudflare.com/25b5c1e5fa76ec2926c5e103e9662f5d/tolu.app/dns/records)
- [Vercel and Cloudflare integration docs](https://vercel.com/docs/integrations/cloudflare)

## To Do

- [ ] Add model for other classes than just D
- [ ] bound range sliders <https://learn.svelte.dev/tutorial/numeric-inputs>
- [ ] firebase eller liknande?
- [ ] localhost vs sql-light?

## Resources

- [NKK Regler for brukshundprover](https://www.norsk-brukshundsport.no/wp-content/uploads/2019/03/Regler_for_brukshundprover_190101-211231.pdf)
- [NRK Core CSS](https://static.nrk.no/core-css/latest/index.html#button)
- [SvelteKit](https://learn.svelte.dev)
