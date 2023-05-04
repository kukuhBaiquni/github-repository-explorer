/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query'
import { searchUser } from '@/api/search'
import { useEffect, useState } from 'react'
import Loader from './loader'
import CollapsibleCardContent from './collapsible-card-content'

type Props = {
  query: string
  // eslint-disable-next-line no-unused-vars
  toggleCollapse: ($: number) => void
}

export default function CollapsibleCard(props: Props) {
  const { query, toggleCollapse } = props
  const [openIndex, setOpenIndex] = useState(-1)

  const querySearchUser = useQuery(['SEARCH_USER'], () => searchUser(query), {
    enabled: false,
  })

  useEffect(() => {
    if (query) {
      querySearchUser.refetch()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const onExpand = (index: number) => {
    setOpenIndex(index)
    toggleCollapse(index)
  }

  const isLoading = querySearchUser.isLoading
    || querySearchUser.isFetching || querySearchUser.isRefetching

  const isNoData = querySearchUser.status === 'success' && querySearchUser.data?.items.length === 0
  return (
    <div className='h-[calc(100vh-25%)] overflow-y-hidden'>
      {isLoading && <Loader count={5} />}
      {!isLoading && querySearchUser.data?.items.map((item: any, idx:number) => (
        <div className='mt-4 flex flex-col gap-y-2' key={item.id}>
          <button
            className='collapsible transition-all flex items-center justify-between w-full bg-gray-200 px-2 py-1'
            type='button'
            onClick={() => onExpand(idx)}
          >
            <span>{item.login}</span>
            <i className='bx bx-chevron-down text-4xl' />
          </button>
          <CollapsibleCardContent
            index={idx}
            openIndex={openIndex}
            username={item.login}
          />
        </div>
      ))}
      {isNoData && !isLoading && (
        <div className='h-full  flex items-center justify-center overflow-y-hidden'>
          No Data
        </div>
      )}
    </div>
  )
}