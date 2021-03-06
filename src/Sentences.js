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

  get parsedSentences () {
    return this._sentences
  }

  set parsedSentences (value) {
    this._sentences = value
  }

  addSentence (sentence) {
    const storedSentences = this._sentences
    storedSentences.push(sentence)
    this.parsedSentences = storedSentences
  }

  filterSentences(sentenceType) {
    return this._sentences.filter(sentence => {
      if (sentence instanceof sentenceType) {
        return sentence
      }
    })
  }
}
