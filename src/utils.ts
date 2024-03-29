import { InvalidArgumentError } from "commander";
import { fuzzPage } from "./fuzzer";
import puppeteer, { Browser } from "puppeteer";
import { exit } from "process";
import { ChildProcess } from "child_process";

export async function tryConnect(url: string, browser: Browser, maxAttempts = 10) {
  let attempts = 0;

  async function attemptConnection() {
      attempts++;
      try {
          const page = await browser.newPage();
          await page.goto(url, {waitUntil: 'networkidle2'});
          console.log(`Successfully connected to ${url} after ${attempts} attempt(s).`);
          return page;
      } catch (error) {
          if (error instanceof Error)
            console.log(`Attempt ${attempts} failed. Error: ${error.message}`);
          if (attempts >= maxAttempts) {
              console.log('Max attempts reached. Giving up.');
              return false
          } else {
              console.log(`Retrying in 5 seconds...`);
              await new Promise(resolve => setTimeout(resolve, 5000));
              return attemptConnection();
          }
      }
  }

  return attemptConnection();
}

export async function checkWhetherMillionWorks( port: number, devServer: ChildProcess ) {
  const browser = await puppeteer.launch({ headless: false });
  const url = `http://localhost:${port}`
  const page = await tryConnect(url, browser, 100)
  if (!page) {
    throw new Error("Could not connect to page!")
  }
  await page.goto(url, { waitUntil: ['networkidle0', 'load'] });

  // interact with the website - press buttons, type random strings in boxes, click random things, etc.
  console.log(`Randomly interacting with page...`);
  await fuzzPage(page);

  // check whether the element that has class name 'million-embed' also has class name 'active'
  console.log(`Finding Million Element...`);
  const isActiveHandle = await page.waitForSelector(
    'body >>> .million-embed'
  );
  const classNameString = await (await isActiveHandle!.getProperty('className')).jsonValue()
  const classNames = classNameString.split(' ')
  if (classNames.includes('active')) {
    console.log('Million Lint is working as expected!');
  } else {
    throw new Error('Million not working!')
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