#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const puppeteer_1 = __importDefault(require("puppeteer"));
function interactWithBrowser(port) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto('http://localhost:3000'); // Your app's URL here
        yield browser.close();
    });
}
const program = new commander_1.Command();
program
    .name('my-cli')
    .description('CLI to setup and run a project with Million Lint')
    .version('0.1.0');
program.command('setup')
    .requiredOption('-p, --port', 'Application client port')
    .description('Sets up the Million Lint in the project')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const options = program.opts();
    console.log('Installing Million Lint and other dependencies...');
    (0, child_process_1.execSync)('npm i -g @antfu/ni', { stdio: 'inherit' });
    (0, child_process_1.execSync)('ni', { stdio: 'inherit' });
    (0, child_process_1.execSync)('npx @million/lint@latest', { stdio: 'inherit' });
    console.log('Running development server...');
    (0, child_process_1.execSync)('nr dev', { stdio: 'inherit' });
    console.log('Opening browser and interacting with components...');
    yield interactWithBrowser(options.port);
}));
program.parse(process.argv);
//# sourceMappingURL=index.js.map