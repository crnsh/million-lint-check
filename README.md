<div align="center">
  <img src="https://github.com/crnsh/million-lint-check/assets/79533543/1fb563cd-6cbf-4ab7-b1e4-dd49b9da9683"/>
</div>
<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/crnsh/million-lint-check/release.yml">
  <img src="https://img.shields.io/npm/v/million-lint-check">
  <img src="https://img.shields.io/npm/l/million-lint-check">
  <img src="https://img.shields.io/npm/dt/million-lint-check">
</p>
<hr/>
  
## What?
Million Lint Checker is a command line tool that automatically detects whether Million Lint works on your repository or not.

## How?
It works by doing the following things - 
1. Detects package manager and does local setup using [@antfu/ni](https://www.npmjs.com/package/@antfu/ni)
3. Runs [@million/lint](https://www.npmjs.com/package/@million/lint)
4. Randomly interacts (fuzzes) with the client and detects Million Lint suggestions using [puppeteer](https://www.npmjs.com/package/puppeteer)

## Installation
- Run `npx million-lint-check@latest setup $PORT`, where `$PORT` is the port your frontend will run on in development.
