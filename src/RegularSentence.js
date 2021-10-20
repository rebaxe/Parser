import { Sentence } from './Sentence.js';

/**
 * Represents a regular sentence.
 *
 * @class
 */
 export class RegularSentence extends Sentence {
  constructor(tokens) {
    super(tokens)
    this._sentenceType = 'regular'
  }

  get sentenceType() {
    return this._sentenceType
  }
 }
