import { initTokenizer } from '@rebaxe/tokenizer'
import { Document } from './Document.js'

const grammar = [{
  tokenType: 'WORD',
  tokenRegExp: /^[\w|åäöÅÄÖ]+/
}, {
  tokenType: 'DOT',
  tokenRegExp: /\./
}, {
  tokenType: 'EXCLAMATION',
  tokenRegExp: /\!/
}, {
  tokenType: 'QUESTIONMARK',
  tokenRegExp: /\?/
}]

export function parse (text) {
  const tokenizer = initTokenizer(grammar, text)
  return new Document(tokenizer)
}

const parser = parse('I love parsers! They are fun. Right?')
  console.log(parser.getAllSentencesAsStrings())
  console.log(parser.getRegularSentencesAsStrings())
  console.log(parser.getExpressionsAsStrings())
  console.log(parser.getQuestionsAsStrings())