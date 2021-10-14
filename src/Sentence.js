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

  _constructSentenceString () {
  }
 }
