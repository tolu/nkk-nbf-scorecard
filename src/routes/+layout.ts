import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

// instrument vercel analytics
if (dev === false) {
	inject({ mode: 'production' });
}

// Make it SPA
export const ssr = false;
