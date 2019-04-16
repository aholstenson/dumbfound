/**
 * Generate a seed by using the time and Math.random().
 */
export function generateSeed(): string {
	return (Date.now() / 100 * Math.random()).toString(16);
}
