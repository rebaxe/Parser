export class InvalidSentenceFormat extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidSentenceFormat'
  }
}