import { Page } from 'puppeteer';

export const fuzzPage = async (page: Page) => {
  // Get all interactive elements
  const buttons = await page.$$('button');

  // Randomly interact with elements
  for (let i = 0; i < 100; i++) {
    const elementIndex = Math.floor(Math.random() * buttons.length);
    const element = buttons[elementIndex];

    await element.click();
  }
};