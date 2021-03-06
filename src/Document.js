import { Expression } from './Expression.js'
import { Parser } from './Parser.js'
import { Question } from './Question.js'
import { RegularSentence } from './RegularSentence.js'
import { Sentences } from './Sentences.js'

/**
 * Represents a document.
 *
 * @class
 */
 export class Document {
  /**
   * Creates an instance of Document.
   */
  constructor (sentences, parser) {
    this._sentences = sentences
    this._parser = parser
    this._parseTokens()
  }

  _parseTokens () {
    this._parser.buildSentencesFromTokens()
  }

  fetchAllSentences () {
    return this._sentences
  }

  fetchRegularSentences () {
    return this._sentences.filterSentences(RegularSentence)
  }

  fetchExpressions () {
    return this._sentences.filterSentences(Expression)
  }

  fetchQuestions () {
    return this._sentences.filterSentences(Question)
  }
 }
