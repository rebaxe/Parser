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

  get sentences () {
    return this._sentences
  }

  set sentences (value) {
    this._sentences = value
  }

  buildSentencesFromTokens(tokens) {
    let newSentence = []
    tokens.forEach(token => {
      if (this._isWord(token)) {
        newSentence.push(token)
      } else if (this._isDot(token)) {
        newSentence.push(token)
        this._addSentence(this._createRegularSentence(newSentence))
        newSentence = []
      } else if (this._isExclamation(token)) {
        newSentence.push(token)
        this._addSentence(this._createExpression(newSentence))
        newSentence = []
      } else if (this._isQuestionMark(token)) {
        newSentence.push(token)
        this._addSentence(this._createQuestion(newSentence))
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

  _addSentence (sentence) {
    const storedSentences = this._sentences
    storedSentences.push(sentence)
    this.sentences = storedSentences
  }

  filterRegularSentences() {
    return this._sentences.filter(sentence => {
      if (this._isRegularSentence(sentence)) {
        return sentence
      }
    })
  }

  _isRegularSentence (sentence) {
    return sentence instanceof RegularSentence
  }

  filterExpressions () {
    return this._sentences.filter(sentence => {
      if (this._isExpression(sentence)) {
        return sentence
      }
    })
  }

  _isExpression (sentence) {
    return sentence instanceof Expression
  }

  filterQuestions () {
    return this._sentences.filter(sentence => {
      if (this._isQuestion(sentence)) {
        return sentence
      }
    })
  }

  _isQuestion (sentence) {
    return sentence instanceof Question
  }

 }
