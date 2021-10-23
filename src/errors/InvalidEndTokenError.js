export class InvalidEndTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidEndTokenError'
  }
}