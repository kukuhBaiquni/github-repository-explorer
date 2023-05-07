/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react'
import Loader from '../components/loader'
import '@testing-library/jest-dom/extend-expect'

afterEach(() => {
  cleanup()
})

describe('Loader component', () => {
  const component = render(<Loader count={3} height={50} />)

  test('renders correct number of loaders', () => {
    const { container } = component
    expect(container.querySelectorAll('.react-loading-skeleton')).toHaveLength(3)
  })

  test('renders correct height for loaders', () => {
    const { container } = component
    const loaders = container.querySelectorAll('.react-loading-skeleton')
    loaders.forEach((loader) => {
      expect(loader).toHaveStyle(`height: ${50}px`)
    })
  })
})
