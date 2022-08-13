import IncomeRepository from './../repository/IncomeRepository.js';
import Income from './../entity/Income.js';

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  async generateIncomeFromString(incomeString, delimiter = ';') {
    const [position, expectation] = incomeString.split(delimiter);
    if (!position.length) { 
      throw new Error('Position is a required field. Please make sure you are providing a position.')
    }
    if (/[ˆa-zA-Z]/g.test(expectation)) {
      throw new Error('A valid Expectation is required. Please note that only numbers are allowed.')
    }
    const conversion = await this.incomeRepository.getConversions()
    
    const value = parseInt(expectation)
    const conversion01 = { currency: 'USD', language: 'en-US', value: value * conversion['USD'] };
    const conversion02 = { currency: 'EUR', language: 'en-GB', value: value * conversion['EUR'] };
    const conversion03 = { currency: 'RUB', language: 'ru-RU', value: value * conversion['RUB'] };
    const incomeProperties = { position, expectation: { currency: 'BRL', language: 'pt-BR', value }, conversion01, conversion02, conversion03 }

    return new Income(incomeProperties)
  }
}

export default IncomeService;
