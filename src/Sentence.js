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

  get getSentenceTokens() {
    return this._tokens
  }
  
  get getStringSentence() {
    return this._stringSentence
  }

  set getStringSentence (value) {
    this._stringSentence = value
  }


  _constructSentenceString () {
    let string = ''
    for (let i = 0; i < this._tokens.length; i++) {
      string += this._buildString(i);
    }
    this._stringSentence = string
  }

  _buildString(index) {
    if (this._isNotLastWord(index, this._endTokenType())) {
      return `${this._tokens[index].tokenValue} `
    }
    return this._tokens[index].tokenValue
  }

  _endTokenType() {
    return this._tokens[this._tokens.length - 1].tokenType
  }

  _isNotLastWord(index, endTokenType) {
    return this._tokens[index].tokenType === 'WORD' && this._tokens[index+1].tokenType !== endTokenType
  }
 }
