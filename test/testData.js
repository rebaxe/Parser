export const grammar = [{
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