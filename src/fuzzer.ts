import { Page } from 'puppeteer';

export const fuzzPage = async (page: Page) => {
  // Get all interactive elements
  const buttons = await page.$$('button');
  const links = await page.$$('a');
  const inputs = await page.$$('[type="text"], [type="email"], [type="password"]');

  // Combine them into one array
  const interactiveElements = [...buttons, ...links, ...inputs];

  // Randomly interact with elements
  for (let i = 0; i < 100; i++) { // Example: perform 5 random interactions
    const elementIndex = Math.floor(Math.random() * interactiveElements.length);
    const element = interactiveElements[elementIndex];

    if (await element.isIntersectingViewport()) {
      if (inputs.includes(element)) {
        // For inputs, type a random string
        await element.type('Random String');
      } else {
        // For buttons and links, click on them
        await element.click();
      }
    }
  }
};