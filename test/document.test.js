import { wordAndDotGrammar } from './testData.js'
import { initTokenizer } from '../src/tokenizer/main.js'
import { Document } from '../src/Document.js'

describe('Get sentences', () => {
  it('All sentences', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b!')
    const myDocument = new Document(tokenizer)
    const sentences = myDocument.getAllSentences()
    expect(sentences).toEqual(['Aa bb.', 'A b!'])
  })
  it('Regular sentence', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'A b.')
    const myDocument = new Document(tokenizer)
    const regularSentences = myDocument.getRegularSentences()
    // const sentence = regularSentences[0]
    expect(regularSentences[0]).toBe('A b.')
  })
  it('Expressions', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b!')
    const myDocument = new Document(tokenizer)
    const expressions = myDocument.getExpressions()
    expect(expressions[0]).toBe('A b!')
  })
  it('Questions', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b? Bb!')
    const myDocument = new Document(tokenizer)
    const questions = myDocument.getQuestions()
    expect(questions[0]).toBe('A b?')
  })
})