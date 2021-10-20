import { Sentence } from './Sentence.js';

/**
 * Represents an expression.
 *
 * @class
 */
 export class Expression extends Sentence {
  constructor(tokens) {
    super(tokens)
    this._sentenceType = 'expression'
  }

  get sentenceType() {
    return this._sentenceType
  }
 }
