import chalk from 'chalk';

export default {
  table: {
    leftPad: 2,
    columns: [
      { field: 'position', name: chalk.magenta('Position') },
      { field: 'expectation', name: chalk.cyan('Expectation (BRL)') },
      { field: 'conversion01', name: chalk.green('USD') },
      { field: 'conversion02', name: chalk.yellow('EUR') },
      { field: 'conversion03', name: chalk.blue('RUB') }
    ],
  },
};
