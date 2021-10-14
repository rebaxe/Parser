import { Document } from './Document.js'
import { initTokenizer } from './tokenizer/main.js'

const wordAndDotGrammar = [{
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

function parse () {
  const tokenizer = initTokenizer(wordAndDotGrammar, 'I love parsers! They are fun. Right?')
  // console.log(tokenizer.matchingTokenSet)
  const document = new Document(tokenizer)
  console.log(document.getAllSentences())
  console.log(document.getRegularSentences())
  console.log(document.getExpressions())
  console.log(document.getQuestions())
}

parse()