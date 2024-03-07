import { InvalidArgumentError } from "commander";
import { fuzzPage } from "./fuzzer";
import puppeteer, { Browser } from "puppeteer";
import { exit } from "process";

export async function tryConnect(url: string, browser: Browser, maxAttempts = 10) {
  let attempts = 0;

  async function attemptConnection() {
      attempts++;
      try {
          const page = await browser.newPage();
          await page.goto(url, {waitUntil: 'networkidle2'});
          console.log(`Successfully connected to ${url} after ${attempts} attempt(s).`);
          // Perform your Puppeteer tasks here
          return page; // Connection successful
      } catch (error) {
          if (error instanceof Error)
            console.log(`Attempt ${attempts} failed. Error: ${error.message}`);
          if (attempts >= maxAttempts) {
              console.log('Max attempts reached. Giving up.');
              exit(1)
          } else {
              console.log(`Retrying in 5 seconds...`);
              await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
              return attemptConnection(); // Recursively try again
          }
      }
  }

  return attemptConnection(); // Start the first attempt
}


export async function checkWhetherMillionWorks( port: number ) {
  const browser = await puppeteer.launch();
  const url = `http://localhost:${port}`
  const page = await tryConnect(url, browser, 100)
  const response = await page.goto(url); // Your app's URL here
  console.log(response?.json())

  // interact with the website - press buttons, type random strings in boxes, click random things, etc.
  await fuzzPage(page);

  // check whether the element that has class name 'million-embed' also has class name 'active'
  const element = await page.$('.million-embed');
  const isActive = await page.evaluate((el) => el!.classList.contains('active'), element);
  if (isActive) {
    console.log('Million Lint is working as expected!');
  }

  await browser.close();
}

export function myParseInt(value: string) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}