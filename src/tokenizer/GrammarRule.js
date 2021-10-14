/**
 * Represents a token.
 *
 * @class
 */
 export class GrammarRule {
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

  /**
   * Checks if the string matches the current grammar.
   *
   * @param {string} string A string representing the string to compare to grammar.
   * @returns {string} a string representing the matching string.
   */
  findMatchingToken (string) {
    let match = ''
    string = this._trimString(string) 
    for (let i = 0; i < string.length; i++) {
      if (this._regExp.test(string[i])) {
        match += string[i]
      } else {
        return match
      }
    }
    return match
  }

  _trimString(string) {
    return string.trim()
  }
}