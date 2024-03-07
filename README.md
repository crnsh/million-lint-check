<div align="center">
  <img src="https://github.com/crnsh/million-lint-check/assets/79533543/1fb563cd-6cbf-4ab7-b1e4-dd49b9da9683"/>
</div>
<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/crnsh/million-lint-check/release.yml">
  <a href="https://www.npmjs.com/package/million-lint-check">
    <img src="https://img.shields.io/npm/v/million-lint-check">
  </a>
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

#### Note
- For some projects setup will have to be done manually. Once the project is at a state where a simple `npm run dev` is sufficient to run it, this tool can be used.
- This only works with VSCode
- I've only tested this on the project below ;_; (should work for all `nr dev` projects)

## Example
We'll test the CLI on `crnsh/github-h-index` as an example
1. `git clone https://github.com/crnsh/github-h-index.git`
2. `cd github-h-index`
2. `code .` (This is temporarily necessary)
3. `npx million-lint-check@latest setup 3000`
```
Running development server...
Development server started in the background.
Opening browser and interacting with components...

> github_h-index@0.1.0 dev
> next dev

   ▲ Next.js 14.1.1
   - Local:        http://localhost:3000


 ⚡ Million Lint v0.0.66
 ✓ Ready in 0.18ms
 ✓ Ready in 2.2s
 ○ Compiling / ...
 ✓ Compiled / in 1158ms (380 modules)
 ✓ Compiled in 180ms (380 modules)
Successfully connected to http://localhost:3000 after 1 attempt(s).
Randomly interacting with page...
Finding element...
Million Lint is working as expected!

Shutting down development server...
```
