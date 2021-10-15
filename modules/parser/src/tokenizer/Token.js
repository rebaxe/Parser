/**
 * Represents a token.
 *
 * @class
 */
 export class Token {
  /**
   * Creates an instance of Token.
   *
   * @param {string} type A string representing the token type.
   * @param {string} value A string representing the token value.
   */
  constructor (type, value) {
    this._type = type
    this._value = value
  }

  get tokenType () {
    return this._type
  }

  set tokenType (value) {
    this._type = value
  }

  get tokenValue () {
    return this._value
  }

  set tokenValue (value) {
    this._value = value
  }
}