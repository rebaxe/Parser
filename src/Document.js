import { Parser } from './Parser.js'
import { Sentences } from './Sentences.js'

/**
 * Represents a document.
 *
 * @class
 */
 export class Document {
  /**
   * Creates an instance of Document.
   * @param {Tokenizer} tokenizer
   */
  constructor (tokenizer) {
    this._tokenizer = tokenizer
    this._sentences = new Sentences()
    this._parser = new Parser(this._sentences)
    this._parseTokens()
  }

  _parseTokens () {
    this._parser.buildSentencesFromTokens(this._tokenizer.matchingTokenSet)
  }

  getAllSentencesAsStrings () {
    return this._fetchAllSentences().map(sentence => sentence.getStringSentence)
  }

  _fetchAllSentences () {
    return this._sentences.parsedSentences
  }

  getRegularSentencesAsStrings () {
    return this._fetchRegularSentences().map(sentence => sentence.getStringSentence)
  }

  _fetchRegularSentences () {
    return this._sentences.filterRegularSentences()
  }

  getExpressionsAsStrings () {
    return this._fetchExpressions().map(sentence => sentence.getStringSentence)
  }

  _fetchExpressions () {
    return this._sentences.filterExpressions()
  }

  getQuestionsAsStrings () {
    return this._fetchQuestions().map(sentence => sentence.getStringSentence)
  }

  _fetchQuestions () {
    return this._sentences.filterQuestions()
  }
 }
