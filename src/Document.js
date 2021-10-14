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
      if (token.tokenType === 'WORD') {
        newSentence.push(token)
      } else if (token.tokenType === 'DOT') {
        newSentence.push(token)
        const sentence = new RegularSentence(newSentence)
        newSentence = []
        this._sentences.addSentence(sentence)
      } else if (token.tokenType === 'EXCLAMATION') {
        newSentence.push(token)
        const sentence = new Expression(newSentence)
        newSentence = []
        this._sentences.addSentence(sentence)
      } else if (token.tokenType === 'QUESTIONMARK') {
        newSentence.push(token)
        const sentence = new Question(newSentence)
        newSentence = []
        this._sentences.addSentence(sentence)
      }
    })
  }

  getAllSentences () {
    return this._sentences
  }

  getRegularSentences () {
    return this._filterRegularSentences()
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
    return this._filterExpressions()
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
 }
