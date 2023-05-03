import Head from 'next/head'
import { Fragment } from 'react'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Github Repositories Explorer</title>
        <meta content='App for searching Github User and their repositories' name='description' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className={`${inter.className} bg-gray-300`}>
        <div className='h-screen bg-white max-w-md p-4 min-w mx-auto'>
          <form>
            <input className='w-full bg-gray-200 py-2 px-2.5 border border-gray-400 rounded' type='search' />
            <button className='w-full mt-4 bg-sky-400 p-3 text-white rounded hover:bg-opacity-70' type='submit'>Search</button>
          </form>
          <p className='mt-4 text-gray-600'>Showing users for "paw paw"</p>
          <div className='mt-4 flex flex-col gap-y-2'>
            <button className='flex items-center justify-between w-full bg-gray-300 px-2 py-1' type='button'>
              <span>User test</span>
              <i className='bx bx-chevron-down text-4xl' />
            </button>
            <div className='bg-zinc-400 p-2 ml-auto w-[95%]'>
              <strong>Type-Fun</strong>
              <p>Some repository description</p>
              <i className='bx bxs-star' />
            </div>
            <button className='flex items-center justify-between w-full bg-gray-300 px-2 py-1' type='button'>
              <span>User test</span>
              <i className='bx bx-chevron-down text-4xl' />
            </button>
          </div>
        </div>
      </main>
    </Fragment>
  )
}
