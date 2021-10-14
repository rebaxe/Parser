import { wordAndDotGrammar } from './testData.js'
import { initTokenizer } from '../src/tokenizer/main.js'
import { Document } from '../src/Document.js'

describe('Get sentences in string format', () => {
  it('All sentences returns expected strings', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b!')
    const myDocument = new Document(tokenizer)
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences).toEqual(['Aa bb.', 'A b!'])
  })
  it('Regular sentence returns expected string', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'A b.')
    const myDocument = new Document(tokenizer)
    const regularSentences = myDocument.getRegularSentencesAsStrings()
    expect(regularSentences[0]).toBe('A b.')
  })
  it('Expressions returns expected string', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b!')
    const myDocument = new Document(tokenizer)
    const expressions = myDocument.getExpressionsAsStrings()
    expect(expressions[0]).toBe('A b!')
  })
  it('Questions returns expected string', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b? Bb!')
    const myDocument = new Document(tokenizer)
    const questions = myDocument.getQuestionsAsStrings()
    expect(questions[0]).toBe('A b?')
  })
})

describe('Get the expected length', () => {
  it('All sentences should be correct amount if one type of sentence', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b.')
    const myDocument = new Document(tokenizer)
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences.length).toBe(2)
  })
  it('All sentences should be correct amount if two types of sentences', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b!')
    const myDocument = new Document(tokenizer)
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences.length).toBe(2)
  })
  it('All sentences shpuld be correct amount if three types of sentences', () => {
    const tokenizer = initTokenizer(wordAndDotGrammar, 'Aa bb. A b? Bb!')
    const myDocument = new Document(tokenizer)
    const sentences = myDocument.getAllSentencesAsStrings()
    expect(sentences.length).toBe(3)
  })
})