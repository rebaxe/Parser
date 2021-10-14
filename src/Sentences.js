import { RegularSentence } from './RegularSentence.js'

/**
 * Represents a sentences.
 *
 * @class
 */
 export class Sentences {
  /**
   * Creates an instance of Sentences.
   */
  constructor () {
    this._sentences = []
  }

  get sentences () {
    return this._sentences
  }

  set sentences (value) {
    this._sentences = value
  }

  addSentence (sentence) {
    const storedSentences = this._sentences
    storedSentences.push(sentence)
    this.sentences = storedSentences
  }

  printSentences () {
    this._sentences.forEach(sentence => {
      console.log(sentence.stringSentence)
    })
  }
 }
