import { Token } from './Token.js'

/**
 * Module for the type tokenizer.
 */

/**
 * Represents a tokenizer.
 *
 * @class
 */
export class Tokenizer {
  /**
   * Creates an instance of Tokenizer.
   *
   * @param {Array<object>} grammar An array of objects containing grammar definitions.
   * @param {string} string The string to be tokenized.
   */
  constructor (grammar, string) {
    this._string = string
    this._grammarType = grammar
    this._matchingTokens = []
    this._activeTokenIndex = 0
    this._activeToken = {}
  }

  get stringToAnalyze () {
    return this._string
  }

  set stringToAnalyze (value) {
    this._string = value
  }

  get matchingTokenSet () {
    return this._matchingTokens
  }

  set matchingTokenSet (value) {
    this._matchingTokens = value
  }

  get currentActiveToken () {
    return this._activeToken
  }

  set currentActiveToken (value) {
    this._activeToken = value
  }

  tokenize () {
    if (!this._isOnlySpaces()) {
      this._analyzeStringForTokens()
    }
    this._addEndToken()
    this._updateActiveToken()
  }

  _analyzeStringForTokens () {
    while (this.stringToAnalyze.length > 0) {
      this._compareStringToGrammars()
    }
  }

  _compareStringToGrammars() {
    let newTokenValue = ''
    let newTokenType = ''

    for (let i = 0; i < this._grammarType.length; i++) {
      const currentMatch = this._findMatchingToken(this._grammarType[i])
      if (this._applyMaximalMunch(currentMatch, newTokenValue)) {
        newTokenValue = currentMatch
        newTokenType = this._grammarType[i].tokenType
      }
    }
    this._handleNoMatch(newTokenValue)
    this.stringToAnalyze = this.stringToAnalyze.slice(newTokenValue.length)
    this._addToken(newTokenType, newTokenValue)
  }

  _applyMaximalMunch(currentLongestMatch, newMatch) {
    return currentLongestMatch.length > newMatch.length
  }

  _isOnlySpaces () {
    const regExp = /\S/
    return !regExp.test(this.stringToAnalyze)
  }

  /**
   * Checks if the string matches the current grammar.
   *
   * @param {object} grammar An object representing the current grammar.
   * @returns {string} a string representing the matching string.
   */
  _findMatchingToken (grammar) {
    let match = ''
    this.stringToAnalyze = this.stringToAnalyze.trim()    
    for (let i = 0; i < this.stringToAnalyze.length; i++) {
      if (grammar.tokenRegExp.test(this.stringToAnalyze[i])) {
        match += this.stringToAnalyze[i]
      } else {
        return match
      }
    }
    return match
  }

  /**
   * Adds a token to found matching tokens.
   *
   * @param {string} type A string representing the token type.
   * @param {string} value A string representing the token value.
   */
  _addToken (type, value) {
    const newToken = new Token(type, value)
    this.matchingTokenSet.push(newToken)
  }

  _addEndToken () {
    const endToken = new Token('END', '')
    this.matchingTokenSet.push(endToken)
  }

  /**
   * Throws an error if no match was found.
   *
   * @param {string} match A string representing the match.
   * @throws {Error}
   */
  _handleNoMatch (match) {
    if (match.length === 0) {
      throw new Error('Found tokens that did not match')
    }
  }

  _updateActiveToken () {
    this.currentActiveToken = this.matchingTokenSet[this._activeTokenIndex]
  }

  moveToNextToken () {
    // Only allow to get next token as long as active token is not the last match.
    if (this._activeTokenIndex < (this.matchingTokenSet.length - 1)) {
      this._activeTokenIndex++
    }
    this._updateActiveToken()
  }

  moveToPreviousToken () {
    if (this._activeTokenIndex > 0) {
      this._activeTokenIndex--
    }
    this._updateActiveToken()
  }
}
