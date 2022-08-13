import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';
import chalk from 'chalk';

const VOCABULARY = {
  STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  console.info('🚀 Running...\n');
  try {
    terminal.initializeTable()
    console.log('Qual seu cargo e pretensão salarial em BRL ? (position; expectation)')
    console.log('Insira: ')
    const answer = await terminal.question()
    if (answer === VOCABULARY.STOP) {
      terminal.closeTerminal()
        console.log(chalk.green('process finished!'))
        return
    }
    const income = await (await service.generateIncomeFromString(answer)).format()
    terminal.updateTable(income)
    console.log(chalk.green('Register successfully inserted!\n'))
  } catch (error) {
    console.log(chalk.red(`Error@mainLoop:${error.message}`))
    return mainLoop()
  }
  return mainLoop();
}

await mainLoop();
