#!/usr/bin/env node

import { Command } from 'commander';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer';

async function interactWithBrowser( port: string ) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000'); // Your app's URL here

  await browser.close();
}

const program = new Command();

program
  .name('my-cli')
  .description('CLI to setup and run a project with Million Lint')
  .version('0.1.0');

program.command('setup')
  .requiredOption('-p, --port', 'Application client port')
  .description('Sets up the Million Lint in the project')
  .action(async () => {
    const options = program.opts()  

    console.log('Installing Million Lint and other dependencies...');
    execSync('npm i -g @antfu/ni', { stdio: 'inherit' });
    execSync('ni', { stdio: 'inherit' });
    execSync('npx @million/lint@latest', { stdio: 'inherit' });

    console.log('Running development server...');
    execSync('nr dev', { stdio: 'inherit' });

    console.log('Opening browser and interacting with components...');
    await interactWithBrowser(options.port)
  });

program.parse(process.argv);