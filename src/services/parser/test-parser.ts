import { HHParser } from './hh-parser';

async function testParser() {
  const parser = new HHParser();
  const vacancies = await parser.parse('typescript');
  console.log(vacancies);
}

testParser();