import { Sentence } from './Sentence.js';

/**
 * Represents a regular sentence.
 *
 * @class
 */
 export class RegularSentence extends Sentence {
  _constructSentenceString () {
    let string= ''
    for (let i = 0; i < this._tokens.length; i++) {
      if (this._tokens[i].tokenType === 'WORD' && this._tokens[i+1].tokenType !== 'DOT') {
        string += `${this._tokens[i].tokenValue} `
      } else {
        string += this._tokens[i].tokenValue
      }
    }
    this._stringSentence = string
  }
 }
 