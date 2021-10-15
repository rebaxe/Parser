import { wordAndDotGrammar } from './testData.js'
import { Document } from '../src/Document.js'
import { RegularSentence } from '../src/RegularSentence.js'
import { Expression } from '../src/Expression.js'
import { Question } from '../src/Question.js'
import { InvalidEndTokenError } from '../src/errors/InvalidEndTokenError.js'

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
    expect(() => new Document(wordAndDotGrammar, 'Bb')).toThrow(InvalidEndTokenError)
  })
  it('Should throw error if unvalid tokens in text string.', () => {
    expect(() => new Document(wordAndDotGrammar, 'Bb*')).toThrow(Error)
  })
  it('Should throw error if string is empty.', () => {
    expect(() => new Document(wordAndDotGrammar, '  ')).toThrow(Error)
  })
})

describe('Types of sentences', () => {
  it('Sentence should be of type regular sentence.', () => {
    const myDocument = new Document(wordAndDotGrammar, 'A b.')
    const sentence = myDocument._sentences._sentences[0]
    expect(sentence instanceof RegularSentence).toEqual(true)
  })
  it('Sentence should be of type expression.', () => {
    const myDocument = new Document(wordAndDotGrammar, 'A b!')
    const sentence = myDocument._sentences._sentences[0]
    expect(sentence instanceof Expression).toEqual(true)
  })
  it('Sentence should be of type question.', () => {
    const myDocument = new Document(wordAndDotGrammar, 'A b?')
    const sentence = myDocument._sentences._sentences[0]
    expect(sentence instanceof Question).toEqual(true)
  })
})