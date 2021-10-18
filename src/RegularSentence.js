import { Sentence } from './Sentence.js';

/**
 * Represents a regular sentence.
 *
 * @class
 */
 export class RegularSentence extends Sentence {
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
 }
 