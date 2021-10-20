import { Sentence } from './Sentence.js';

/**
 * Represents a question.
 *
 * @class
 */
 export class Question extends Sentence {
  constructor(tokens) {
    super(tokens)
    this._sentenceType = 'question'
  }

  get sentenceType() {
    return this._sentenceType
  }
 }
 