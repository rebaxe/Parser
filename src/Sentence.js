/**
 * Represents a sentence.
 *
 * @class
 */
 export class Sentence {
  /**
   * Creates an instance of Sentence.
   */
  constructor (tokens) {
    this._tokens = tokens
    this._stringSentence = '' 
    this._constructSentenceString()
  }

  get stringSentence () {
    return this._stringSentence
  }

  set stringSentence (value) {
    this._stringSentence = value
  }

  _endTokenType() {
    return this._tokens[this._tokens.length - 1].tokenType
  }

  _isNotLastWord(index, endTokenType) {
    return this._tokens[index].tokenType === 'WORD' && this._tokens[index+1].tokenType !== endTokenType
  }
 }
