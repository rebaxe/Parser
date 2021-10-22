import { initTokenizer } from '@rebaxe/tokenizer'
import { Document } from './Document.js'
import { Sentences } from './Sentences.js'

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
  const sentences = new Sentences()
  return new Document(tokenizer, sentences)
}
