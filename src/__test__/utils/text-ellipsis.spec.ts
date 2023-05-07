/* eslint-disable no-undef */
import textEllipsis from '../../utils/text-ellipsis'

describe('textEllipsis function', () => {
  test('returns original text when length is less than or equal to max', () => {
    const text = 'Lorem ipsum dolor sit amet'
    const max = 30
    const result = textEllipsis(text, max)
    expect(result).toBe(text)
  })

  test('returns ellipsized text when length is greater than max', () => {
    const text = 'Lorem ipsum dolor sit amet'
    const max = 10
    const result = textEllipsis(text, max)
    expect(result).toBe('Lorem ipsu...')
  })

  test('returns empty string when given empty string', () => {
    const text = ''
    const max = 10
    const result = textEllipsis(text, max)
    expect(result).toBe('')
  })
})
