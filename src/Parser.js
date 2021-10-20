import { Tokenizer } from '@rebaxe/tokenizer/src/Tokenizer'
import { InvalidEndTokenError } from './errors/InvalidEndTokenError.js'
import { InvalidSentenceFormat } from './errors/InvalidSentenceFormat.js'
import { Expression } from './Expression.js'
import { Question } from './Question.js'
import { RegularSentence } from './RegularSentence.js'
import { Sentences } from './Sentences.js'

/**
 * Represents a Parser.
 *
 * @class
 */
 export class Parser {
  /**
   * Creates an instance of Parser.
   * 
   * @param {Tokenizer} tokenizer - The Tokenizer object.
   * @param {Sentences} sentences - The Sentences object.
   */
  constructor (tokenizer, sentences) {
    this._tokenizer = tokenizer
    this._sentences = sentences
  }

  buildSentencesFromTokens() {
    if (this._isValidSentenceEndToken()) {
      this._filterSentencesFromTokens()
    } else {
      this._throwInvalidSentenceError()
    }
  }

  _isValidSentenceEndToken() {
    const tokens = this._tokenizer.matchingTokenSet
    const tokenBeforeEnd = tokens[tokens.length - 2]
    return this._isSentenceEndToken(tokenBeforeEnd)
  }

  _isSentenceEndToken(token) {
    return (this._isDot(token) || this._isExclamation(token) || this._isQuestionMark(token))
  }

  _filterSentencesFromTokens() {
    let newSentence = []
    while (!this._isEnd(this._tokenizer.currentActiveToken)) {
      if (this._isWord(this._tokenizer.currentActiveToken)) {
        newSentence.push(this._tokenizer.currentActiveToken)
      } else {
        this._handleSentenceEnd(newSentence, this._tokenizer.currentActiveToken)
        newSentence = []
      }
      this._tokenizer.moveToNextToken()
    }
  }

  _handleSentenceEnd(newSentence, token) {
    if (this._isEmpty(newSentence)) {
      this._throwInvalidSentenceFormat()
    } else {
      this._sentences.addSentence(this._createSentence(newSentence, token))
    }
  }

  _throwInvalidSentenceFormat() {
    throw new InvalidSentenceFormat('Two end tokens (".", "!" or "?") are not allowed in a sentence.')
  }

  _createSentence(newSentence, token) {
    if (this._isDot(token)) {
      newSentence.push(token)
      return new RegularSentence(newSentence)
    } else if (this._isExclamation(token)) {
      newSentence.push(token)
      return new Expression(newSentence)
    } else if (this._isQuestionMark(token)) {
      newSentence.push(token)
      return new Question(newSentence)
    }
  }

  _isEmpty(sentence) {
    return sentence.length === 0
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
}
