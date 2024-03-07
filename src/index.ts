#!/usr/bin/env node
const pjson = require('../package.json');

import { Command } from 'commander';
import { execSync, spawn } from 'child_process';
import puppeteer from 'puppeteer';
import { fuzzPage } from './fuzzer';

async function checkWhetherMillionWorks( port: string ) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`); // Your app's URL here

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

const program = new Command();

program
  .name('million-lint-check')
  .description('CLI to setup and run a project with Million Lint')
  .version(pjson.version);

program.command('setup')
  .requiredOption('-p, --port', 'Application client port')
  .description('Sets up the Million Lint in the project')
  .action(async () => {
    const options = program.opts()  

    console.log('Installing Million Lint and other dependencies...');
    execSync('npm i -g @antfu/ni', { stdio: 'inherit' });
    execSync('ni', { stdio: 'inherit' });
    try {
      execSync('npx @million/lint@latest', { stdio: 'inherit' });
    } catch(error) {
      console.error('Error running Million Lint:', error);
    }

    console.log('Running development server...');
    // Start the development server in the background
    const devServer = spawn('nr', ['dev'], {
      stdio: 'inherit',
      shell: true,
      detached: true,
    });
    console.log('Development server started in the background.');
    devServer.unref();

    console.log('Opening browser and interacting with components...');
    await checkWhetherMillionWorks(options.port)
  });

program.parse(process.argv);