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
    const tokens = this._tokenizer.matchingTokenSet
    let newSentence = []
    tokens.forEach(token => {
      if (this._isWord(token)) {
        newSentence.push(token)
      } else if (this._isDot(token)) {
        newSentence.push(token)
        this._sentences.addSentence(this._createRegularSentence(newSentence))
        newSentence = []
      } else if (this._isExclamation(token)) {
        newSentence.push(token)
        this._sentences.addSentence(this._createExpression(newSentence))
        newSentence = []
      } else if (this._isQuestionMark(token)) {
        newSentence.push(token)
        this._sentences.addSentence(this._createQuestion(newSentence))
        newSentence = []
      }
    })
  }

  _isQuestionMark(token) {
    return token.tokenType === 'QUESTIONMARK'
  }

  _isExclamation(token) {
    return token.tokenType === 'EXCLAMATION'
  }

  _isDot(token) {
    return token.tokenType === 'DOT'
  }

  _isWord(token) {
    return token.tokenType === 'WORD'
  }

  _createQuestion(tokens) {
    return new Question(tokens)
  }

  _createExpression(tokens) {
    return new Expression(tokens)
  }

  _createRegularSentence(tokens) {
    return new RegularSentence(tokens)
  }

  getAllSentences () {
    return this._sentences.sentences.map(sentence => sentence.stringSentence)
  }

  getRegularSentences () {
    return this._filterRegularSentences().map(sentence => sentence.stringSentence)
  }

  _filterRegularSentences () {
    return this._sentences.sentences.filter(sentence => {
      if (this._isRegularSentence(sentence)) {
        return sentence
      }
    })
  }

  _isRegularSentence (sentence) {
    return sentence instanceof RegularSentence
  }

  getExpressions () {
    return this._filterExpressions().map(sentence => sentence.stringSentence)
  }

  _filterExpressions () {
    return this._sentences.sentences.filter(sentence => {
      if (this._isExpression(sentence)) {
        return sentence
      }
    })
  }

  _isExpression (sentence) {
    return sentence instanceof Expression
  }

  getQuestions () {
    return this._filterQuestions().map(sentence => sentence.stringSentence)
  }

  _filterQuestions () {
    return this._sentences.sentences.filter(sentence => {
      if (this._isQuestion(sentence)) {
        return sentence
      }
    })
  }

  _isQuestion (sentence) {
    return sentence instanceof Question
  }
 }
