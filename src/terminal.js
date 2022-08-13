import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import chalk from "chalk";
import readline from "readline";
import terminalConfig from "./config/terminal.js";

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.data = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  initializeTable() {
    const table = chalkTable(TABLE_OPTIONS, this.data);
    this.print = console.draft(table);
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(TABLE_OPTIONS, this.data));
  }
}

export default CustomTerminal;
