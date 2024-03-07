#!/usr/bin/env node
const pjson = require('../package.json');

import { Command, InvalidArgumentError } from 'commander';
import { execSync, spawn } from 'child_process';
import puppeteer, { Browser } from 'puppeteer';
import { fuzzPage } from './fuzzer';
import { exit } from 'process';
import { checkWhetherMillionWorks, myParseInt } from './utils';

const program = new Command();

program
  .name('million-lint-check')
  .description('CLI to setup and run a project with Million Lint')
  .version(pjson.version);

program.command('setup')
  .argument('<port>', 'Frontend port', myParseInt)
  .description('Sets up the Million Lint in the project')
  .action(async (port: number, options) => {
    // Function to kill the development server
    function killDevServer() {
      console.log('\nShutting down development server...');
      process.kill(-devServer!.pid!); // Kill the process group
    }

    // Listen for termination signals
    process.on('SIGINT', killDevServer);
    process.on('SIGTERM', killDevServer);
    process.on('SIGUSR1', killDevServer);
    process.on('SIGUSR2', killDevServer);
        
    if (!(Number.isInteger(port) && 0 <= port && port <= 65535)) {
      console.log('Invalid port!')
      exit(1)
    }

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

    console.log('Opening browser and interacting with components...');
    try {
      await checkWhetherMillionWorks(port, devServer)
    } catch(error : any) {
      console.log(error.message)
      killDevServer()
      exit(1)
    } finally {
      killDevServer()
      exit(0)
    }
  });

program.parse(process.argv);