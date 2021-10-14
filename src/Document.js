import { Expression } from './Expression.js'
import { Question } from './Question.js'
import { RegularSentence } from './RegularSentence.js'
import { Sentences } from './Sentences.js'
import { Tokenizer } from './tokenizer/Tokenizer.js'

/**
 * Represents a document.
 *
 * @class
 */
 export class Document {
  /**
   * Creates an instance of Document.
   * @param {Tokenizer}
   */
  constructor (tokenizer) {
    this._tokenizer = tokenizer
    this._sentences = new Sentences()
    this._parseTokens()
  }

  _parseTokens () {
    this._sentences.buildSentencesFromTokens(this._tokenizer.matchingTokenSet)
  }

  getAllSentences () {
    return this._sentences.sentences.map(sentence => sentence.stringSentence)
  }

  getRegularSentences () {
    return this._fetchRegularSentences().map(sentence => sentence.stringSentence)
  }

  _fetchRegularSentences () {
    return this._sentences.filterRegularSentences()
  }

  getExpressions () {
    return this._fetchExpressions().map(sentence => sentence.stringSentence)
  }

  _fetchExpressions () {
    return this._sentences.filterExpressions()
  }

  // _isExpression (sentence) {
  //   return sentence instanceof Expression
  // }

  getQuestions () {
    return this._fetchQuestions().map(sentence => sentence.stringSentence)
  }

  _fetchQuestions () {
    return this._sentences.filterQuestions()
  }

  // _isQuestion (sentence) {
  //   return sentence instanceof Question
  // }
 }
