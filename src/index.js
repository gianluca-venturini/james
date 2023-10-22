// Reload page when content changes
new EventSource('/esbuild').addEventListener('change', () => location.reload());

console.log('hello world');