import { wordAndDotGrammar } from './testData.js'
import { initTokenizer } from '../src/tokenizer/main.js'
import { Document } from '../src/Document.js'
import { Sentences } from '../src/Sentences.js'

describe('Get sentences in string format', () => {
  it('All sentences returns expected strings', () => {
    const myDocument = new Document(wordAndDotGrammar, 'Aa bb. A b!')
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences).toEqual(['Aa bb.', 'A b!'])
  })
  it('Regular sentence returns expected string', () => {
    const myDocument = new Document(wordAndDotGrammar, 'A b.')
    const regularSentences = myDocument.getRegularSentencesAsStrings()
    expect(regularSentences[0]).toBe('A b.')
  })
  it('Expressions returns expected string', () => {
    const myDocument = new Document(wordAndDotGrammar, 'Aa bb. A b!')
    const expressions = myDocument.getExpressionsAsStrings()
    expect(expressions[0]).toBe('A b!')
  })
  it('Questions returns expected string', () => {
    const myDocument = new Document(wordAndDotGrammar, 'Aa bb. A b? Bb!')
    const questions = myDocument.getQuestionsAsStrings()
    expect(questions[0]).toBe('A b?')
  })
})

describe('Get the expected length', () => {
  it('All sentences should be correct amount if one type of sentence', () => {
    const myDocument = new Document(wordAndDotGrammar, 'Aa bb. A b.')
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences.length).toBe(2)
  })
  it('All sentences should be correct amount if two types of sentences', () => {
    const myDocument = new Document(wordAndDotGrammar, 'Aa bb. A b!')
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences.length).toBe(2)
  })
  it('All sentences should be correct amount if three types of sentences', () => {
    const myDocument = new Document(wordAndDotGrammar, 'Aa bb. A b? Bb!')
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences.length).toBe(3)
  })
})

describe('Error handling', () => {
  it('Should throw error if sentence has no valid end token.', () => {
    expect(() => new Document(wordAndDotGrammar, 'Bb')).toThrow('Invalid end token: sentence must end with ".", "!" or "?".')
  })
})