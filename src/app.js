import { initTokenizer } from './tokenizer/main.js'

function parse () {
  const wordAndDotGrammar = [{
    tokenType: 'WORD',
    tokenRegExp: /^[\w|åäöÅÄÖ]+/
  }, {
    tokenType: 'DOT',
    tokenRegExp: /\./
  }]
  const tokenizer = initTokenizer(wordAndDotGrammar, 'I love parsers. They are fun.')
  console.log(tokenizer.matchingTokenSet)
}

parse()