import { Sentence } from './Sentence.js';

/**
 * Represents a question.
 *
 * @class
 */
 export class Question extends Sentence {
  _constructSentenceString () {
    let string= ''
    for (let i = 0; i < this._tokens.length; i++) {
      if (this._isNotLastWord(i, this._endTokenType())) {
        string += `${this._tokens[i].tokenValue} `
      } else {
        string += this._tokens[i].tokenValue
      }
    }
    this._stringSentence = string
  }
 }
 