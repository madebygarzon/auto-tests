import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: { baseURL: 'https://partnerinpublishing.com/' },
  retries: 1,
  reporter: [['html', { open: 'never' }]],
});
