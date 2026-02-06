module.exports = {
  testDir: './tests',
  timeout: 30000,
  use: {
    viewport: { width: 1280, height: 720 },  // Match slide dimensions
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
};
