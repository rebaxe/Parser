import { GrammarRule } from './GrammarRule.js'
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
   * @param {Array<GrammarRule>} grammar An array of objects containing grammar rule definitions.
   * @param {string} string The string to be tokenized.
   */
  constructor (grammar, string) {
    this._string = string
    this._grammar = Array.from(grammar, rule => new GrammarRule(rule))
    this._matchingTokens = []
    this._activeTokenIndex = 0
    this._activeToken = {}
    this.tokenize()
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
    const newToken = {
      tokenType: '',
      tokenValue: ''
    }
  
    this._grammar.forEach(rule => {
      const match = rule.findMatchingToken(this.stringToAnalyze)
      if (this._isMaximalMunch(match, newToken.tokenValue)) {
        newToken.tokenValue = match
        newToken.tokenType = rule.tokenType
      }
    })
  
    this._handleNoMatch(newToken.tokenValue)
    this._cutTokenFromString(newToken.tokenValue)
    this._addToken(newToken)
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
  
  _isMaximalMunch(currentLongestMatch, newMatch) {
    return currentLongestMatch.length > newMatch.length
  }

  _cutTokenFromString(tokenValue) {
    this.stringToAnalyze = this.stringToAnalyze.trim().slice(tokenValue.length)
  }

  _isOnlySpaces () {
    const regExp = /\S/
    return !regExp.test(this.stringToAnalyze)
  }

  /**
   * Adds a token to found matching tokens.
   *
   * @param {object} newToken An object representing the new token.
   */
  _addToken ({ tokenType, tokenValue }) {
    const newToken = new Token(tokenType, tokenValue)
    this.matchingTokenSet.push(newToken)
  }

  _addEndToken () {
    const endToken = new Token('END', '')
    this.matchingTokenSet.push(endToken)
  }


  _updateActiveToken () {
    this.currentActiveToken = this.matchingTokenSet[this._activeTokenIndex]
  }

  moveToNextToken () {
    // Only allow to get next token as long as active token is not the last match.
    if (this._isNotLastToken()) {
      this._activeTokenIndex++
    }
    this._updateActiveToken()
  }

  _isNotLastToken() {
    return this._activeTokenIndex < (this.matchingTokenSet.length - 1)
  }

  moveToPreviousToken () {
    if (this._isNotFirstToken()) {
      this._activeTokenIndex--
    }
    this._updateActiveToken()
  }

  _isNotFirstToken() {
    return this._activeTokenIndex > 0
  }
}
