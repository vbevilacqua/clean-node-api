const EmailValidator = require('./email-validator')
const validator = require('validator')
const MissingParamError = require('../errors/missing-param-error')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@email.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@email.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('valid_email@email.com')
    expect(validator.email).toBe('valid_email@email.com')
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    // If method IS NOT async then you need to pass
    // the pointer of the function when testing
    expect(sut.isValid).toThrow(new MissingParamError('email'))
    // OR use arrow function
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
