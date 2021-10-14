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

const text = 'I love parsers! They are fun. Right?'

function parse (grammar, text) {
  const document = new Document(grammar, text)
  console.log(document.getAllSentencesAsStrings())
  console.log(document.getRegularSentencesAsStrings())
  console.log(document.getExpressionsAsStrings())
  console.log(document.getQuestionsAsStrings())
}

parse(grammar, text)