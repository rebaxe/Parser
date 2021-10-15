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

  get sentences () {
    return this._sentences
  }

  set sentences (value) {
    this._sentences = value
  }

  buildSentencesFromTokens(tokens) {
    if (this._isValidSentenceEndToken(tokens)) {
      this._filterSentencesFromTokens(tokens)
    } else {
      this._throwInvalidSentenceError()
    }
  }
  
  _isValidSentenceEndToken(tokens) {
    const tokenBeforeEnd = tokens[tokens.length - 2]
    return this._isEndToken(tokenBeforeEnd)
  }

  _isEndToken(token) {
    return (this._isDot(token) || this._isExclamation(token) || this._isQuestionMark(token))
  }

  _filterSentencesFromTokens(tokens) {
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

  _throwInvalidSentenceError() {
    throw new InvalidEndTokenError('Invalid end token: sentence must end with ".", "!" or "?".')
  }

  _isWord(token) {
    return token.tokenType === 'WORD'
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
