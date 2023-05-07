/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import {
  render, cleanup,
} from '@testing-library/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import App from '../pages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retryDelay: 3000,
      retry: 3,
      staleTime: 0,
    },
  },
})

const renderApp = () => render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)

let searchInput: HTMLInputElement
let submitButton: HTMLButtonElement
let querySearch: HTMLParagraphElement
let resetButton: HTMLButtonElement

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  const { getByTestId, queryByTestId } = renderApp()
  searchInput = getByTestId('search-input') as HTMLInputElement
  submitButton = getByTestId('submit-button') as HTMLButtonElement
  querySearch = queryByTestId('query-search') as HTMLParagraphElement
  resetButton = queryByTestId('reset-button') as HTMLButtonElement
})

test('initial UI is rendered as expected', () => {
  expect(searchInput.value).toBeFalsy()
  expect(submitButton).toHaveTextContent('Search')
  expect(querySearch).not.toBeInTheDocument()
  expect(resetButton).not.toBeInTheDocument()
})
