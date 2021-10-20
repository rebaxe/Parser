import { RegularSentence } from '../src/RegularSentence.js'
import { Expression } from '../src/Expression.js'
import { Question } from '../src/Question.js'
import { InvalidEndTokenError } from '../src/errors/InvalidEndTokenError.js'
import { parse } from '../src/app.js'

describe('Get sentences in string format', () => {
  it('All sentences returns expected strings', () => {
    const myDocument = parse('Aa bb. A b!')
    const sentences = myDocument.fetchAllSentences()
    // const stringSentences = []
    // sentences.parsedSentences.forEach(s => stringSentences.push(s.getStringSentence))
    const stringSentences = sentences.parsedSentences.map(sentence => sentence.getStringSentence)
    expect(stringSentences).toEqual(['Aa bb.', 'A b!'])
  })
  it('Regular sentence returns expected string', () => {
    const myDocument = parse('A b.')
    const sentences = myDocument.fetchRegularSentences()
    const stringSentences = sentences.map(sentence => sentence.getStringSentence)
    expect(stringSentences[0]).toBe('A b.')
  })
  it('Expressions returns expected string', () => {
    const myDocument = parse('Aa bb. A b!')
    const sentences = myDocument.fetchExpressions()
    const stringSentences = sentences.map(sentence => sentence.getStringSentence)
    expect(stringSentences[0]).toBe('A b!')
  })
  it('Questions returns expected string', () => {
    const myDocument = parse('Aa bb. A b? Bb!')
    const sentences = myDocument.fetchQuestions()
    const stringSentences = sentences.map(sentence => sentence.getStringSentence)
    expect(stringSentences[0]).toBe('A b?')
  })
})

describe('Get the expected length', () => {
  it('All sentences should be correct amount if one type of sentence', () => {
    const myDocument = parse('Aa bb. A b.')
    const sentences = myDocument.fetchAllSentences()
    expect(sentences.parsedSentences.length).toBe(2)
  })
  it('All sentences should be correct amount if two types of sentences', () => {
    const myDocument = parse('Aa bb. A b!')
    const sentences = myDocument.fetchAllSentences()
    expect(sentences.parsedSentences.length).toBe(2)
  })
  it('All sentences should be correct amount if three types of sentences', () => {
    const myDocument = parse('Aa bb. A b? Bb!')
    const sentences = myDocument.fetchAllSentences()
    expect(sentences.parsedSentences.length).toBe(3)
  })
})

describe('Error handling', () => {
  it('Should throw error if sentence has no valid end token.', () => {
    expect(() => parse('Bb')).toThrow(InvalidEndTokenError)
  })
  it('Should throw error if unvalid tokens in text string.', () => {
    expect(() => parse('Bb*')).toThrow(Error)
  })
  it('Should throw error if string is empty.', () => {
    expect(() => parse('  ')).toThrow(Error)
  })
})

describe('Types of sentences', () => {
  it('Sentence should be of type regular sentence.', () => {
    const myDocument = parse('A b.')
    const sentence = myDocument.fetchAllSentences().parsedSentences[0]
    expect(sentence instanceof RegularSentence).toEqual(true)
  })
  it('Sentence should be of type expression.', () => {
    const myDocument = parse('A b!')
    const sentence = myDocument.fetchAllSentences().parsedSentences[0]
    expect(sentence instanceof Expression).toEqual(true)
  })
  it('Sentence should be of type question.', () => {
    const myDocument = parse('A b?')
    const sentence = myDocument.fetchAllSentences().parsedSentences[0]
    expect(sentence instanceof Question).toEqual(true)
  })
})

describe('Words', () => {
  it('Sentence should have two words.', () => {
    const myDocument = parse('A b.')
    const sentences = myDocument.fetchAllSentences()
    const sentence = sentences.parsedSentences[0]
    const words = sentence._tokens
    expect(words.length).toEqual(3)
  })
  it('Second word should be \'b\'.', () => {
    const myDocument = parse('A b.')
    const sentences = myDocument.fetchAllSentences()
    const sentence = sentences.parsedSentences[0]
    const words = sentence._tokens
    expect(words[1].tokenValue).toEqual('b')
  } )
})