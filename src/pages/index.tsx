/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-this-in-sfc */
import Head from 'next/head'
import {
  Fragment, useState, FormEvent, useRef,
} from 'react'
import CollapsibleCard from '@/components/collapsible-card'
import { useQueryClient } from 'react-query'
import { ToastContainer } from 'react-toastify'

export default function Home() {
  const searchInput = useRef<HTMLInputElement | null>(null)

  const queryClient = useQueryClient()

  const [q, setQ] = useState('')

  const toggleCollapse = (index: number) => {
    const content = document.getElementsByClassName('content')
    const elements = Array.from(content)
    elements.forEach((item, idx) => {
      if (index === idx) {
        item.classList.toggle('open')
      } else {
        item.classList.remove('open')
      }
    })
  }

  const onSearch = (evt: FormEvent) => {
    evt.preventDefault()
    const inputValue = searchInput.current
    if (inputValue) {
      if (inputValue.value) {
        setQ(inputValue.value)
      }
    }
  }

  const clearData = () => {
    queryClient.removeQueries('SEARCH_USER')
    queryClient.clear()
    const inputValue = searchInput.current
    if (inputValue) {
      inputValue.value = ''
      inputValue.focus()
    }
    setQ('')
  }

  return (
    <Fragment>
      <Head>
        <title>Github Repositories Explorer</title>
        <meta content='App for searching Github User and their repositories' name='description' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='bg-gray-300'>
        <div className='h-screen bg-white max-w-md p-4 min-w mx-auto'>
          <h2 className='text-center text-xl mb-4'>Github Repository Explorer</h2>
          <form onSubmit={onSearch}>
            <input className='w-full bg-gray-200 py-2 px-2.5 border border-gray-400 rounded' data-testid='search-input' placeholder='Search Github User' ref={searchInput} type='search' />
            <button className='w-full mt-4 bg-sky-400 p-3 text-white rounded hover:bg-opacity-70' data-testid='submit-button' type='submit'>Search</button>
          </form>
          {q && (
            <div className='mt-4 flex justify-between items-center'>
              <p className='text-gray-600' data-testid='query-search'>Showing users for &quot;{q}&quot;</p>
              <button className='text-red-400' data-testid='reset-button' type='button' onClick={clearData}>Reset</button>
            </div>
          )}
          <CollapsibleCard
            query={q}
            toggleCollapse={toggleCollapse}
          />
        </div>
      </main>
      <ToastContainer />
    </Fragment>
  )
}
