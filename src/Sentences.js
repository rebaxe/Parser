import { InvalidEndTokenError } from './errors/InvalidEndTokenError.js'
import { Expression } from './Expression.js'
import { Question } from './Question.js'
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

  get parsedSentences () {
    return this._sentences
  }

  set parsedSentences (value) {
    this._sentences = value
  }

  _addSentence (sentence) {
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

  // filterRegularSentences() {
  //   return this._sentences.filter(sentence => {
  //     if (this._isRegularSentence(sentence)) {
  //       return sentence
  //     }
  //   })
  // }

  // _isRegularSentence (sentence) {
  //   return sentence instanceof RegularSentence
  // }

  // filterExpressions () {
  //   return this._sentences.filter(sentence => {
  //     if (this._isExpression(sentence)) {
  //       return sentence
  //     }
  //   })
  // }

  // _isExpression (sentence) {
  //   return sentence instanceof Expression
  // }

  // filterQuestions () {
  //   return this._sentences.filter(sentence => {
  //     if (this._isQuestion(sentence)) {
  //       return sentence
  //     }
  //   })
  // }

  // _isQuestion (sentence) {
  //   return sentence instanceof Question
  // }

  // getSentenceType(sentence) {
  //   if (this._isRegularSentence(sentence)) {
  //     return 'regular'
  //   } else if (this._isExpression(sentence)) {
  //     return 'expression'
  //   } else if (this._isQuestion(sentence)) {
  //     return 'question'
  //   }
  // }
}
