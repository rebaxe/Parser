import { initTokenizer } from '@rebaxe/tokenizer'
import { Document } from './Document.js'
import { Parser } from './Parser.js'
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
  const parser = new Parser(tokenizer, sentences)
  return new Document(sentences, parser)
}
