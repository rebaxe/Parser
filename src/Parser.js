import { InvalidEndTokenError } from './errors/InvalidEndTokenError.js'
import { InvalidSentenceFormat } from './errors/InvalidSentenceFormat.js'
import { Expression } from './Expression.js'
import { Question } from './Question.js'
import { RegularSentence } from './RegularSentence.js'

/**
 * Represents a Parser.
 *
 * @class
 */
 export class Parser {
  /**
   * Creates an instance of Parser.
   */
  constructor (sentences) {
    this._sentences = sentences
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
      } else if (this._isEnd(token)) {
        return 
      } else {
        this._handleSentenceEnd(newSentence, token)
        newSentence = []
      }
    })
  }

  _handleSentenceEnd(newSentence, token) {
    if (this._isEmpty(newSentence)) {
      this._throwInvalidSentenceFormat()
    } else {
      if (this._isDot(token)) {
        newSentence.push(token)
        this._sentences._addSentence(this._createRegularSentence(newSentence))
      } else if (this._isExclamation(token)) {
        newSentence.push(token)
        this._sentences._addSentence(this._createExpression(newSentence))
      } else if (this._isQuestionMark(token)) {
        newSentence.push(token)
        this._sentences._addSentence(this._createQuestion(newSentence))
      }
    }
  }

  _isEmpty(sentence) {
    return sentence.length === 0
  }

   _throwInvalidSentenceFormat() {
     throw new InvalidSentenceFormat('Two end tokens (".", "!" or "?") are not allowed in a sentence.')
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

  _isEnd(token) {
    return token.tokenType === 'END'
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
 }
