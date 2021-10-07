/**
 * Represents a token.
 *
 * @class
 */
 export class Grammar {
  /**
   * Creates an instance of Token.
   *
   * @param {string} type A string representing a token type.
   * @param {RegExp} regExp A regexp representing grammar definition.
   */
  constructor ({ tokenType: type, tokenRegExp: regExp }) {
    this._type = type
    this._regExp = regExp
  }

  get tokenType () {
    return this._type
  }

  set tokenType (value) {
    this._type = value
  }

  get tokenRegExp () {
    return this._regExp
  }

  set tokenRegExp (value) {
    this._regExp = value
  }
}