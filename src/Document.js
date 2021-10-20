import { Parser } from './Parser.js'
import { Sentences } from './Sentences.js'

/**
 * Represents a document.
 *
 * @class
 */
 export class Document {
  /**
   * Creates an instance of Document.
   * @param {Tokenizer} tokenizer
   */
  constructor (tokenizer) {
    this._tokenizer = tokenizer
    this._sentences = new Sentences()
    this._parser = new Parser(this._sentences)
    this._parseTokens()
  }

  _parseTokens () {
    this._parser.buildSentencesFromTokens(this._tokenizer.matchingTokenSet)
  }

  // getAllSentencesAsStrings () {
  //   const sentences = []   
  //   this._fetchAllSentences().forEach(s => {
  //     sentences.push({
  //       string: s.getStringSentence,
  //       type: this._sentences.getSentenceType(s)
  //     })
  //   })
  //   return sentences
  // }

  fetchAllSentences () {
    return this._sentences
  }

  fetchRegularSentences () {
    return this._sentences.filterRegularSentences()
  }


  fetchExpressions () {
    return this._sentences.filterExpressions()
  }


  fetchQuestions () {
    return this._sentences.filterQuestions()
  }
 }
