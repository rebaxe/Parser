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
