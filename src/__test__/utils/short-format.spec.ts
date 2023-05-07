/* eslint-disable no-undef */
import shortFormat from '../../utils/short-format'

describe('shortFormat function', () => {
  it('should return 0 for negative value', () => {
    expect(shortFormat(-1)).toBe(0)
    expect(shortFormat(-100)).toBe(0)
    expect(shortFormat(-1000)).toBe(0)
  })

  it('should return 0 for input 0', () => {
    expect(shortFormat(0)).toBe(0)
  })

  it('should return the same value for inputs between 0 and 999', () => {
    expect(shortFormat(500)).toBe(500)
    expect(shortFormat(250)).toBe(250)
    expect(shortFormat(999)).toBe(999)
    expect(shortFormat(1)).toBe(1)
  })

  it('should return a short format string for inputs over 999', () => {
    expect(shortFormat(1500)).toBe('1.5k')
    expect(shortFormat(2500)).toBe('2.5k')
    expect(shortFormat(5000)).toBe('5k')
  })
})
