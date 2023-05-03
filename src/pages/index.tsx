import Head from 'next/head'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Github Repositories Explorer</title>
        <meta name="description" content="App for searching Github User and their repositories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} bg-gray-300`}>
        <div className='h-screen bg-white max-w-md p-4 min-w mx-auto'>
          <form>
            <input type="search" className='w-full bg-gray-200 py-2 px-2.5 border border-gray-400 rounded' />
            <button type="submit" className='w-full mt-4 bg-sky-400 p-3 text-white rounded hover:bg-opacity-70'>Search</button>
          </form>
          <p className='mt-4 text-gray-600'>Showing users for "paw paw"</p>
        </div>
      </main>
    </>
  )
}
