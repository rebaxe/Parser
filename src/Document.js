import { Sentences } from './Sentences'

/**
 * Represents a document.
 *
 * @class
 */
 export class Document {
  /**
   * Creates an instance of Document.
   * @param {Sentences}
   */
  constructor (sentences) {
    this._sentences = sentences
  }
 }
