/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'
import InfiniteScroll from 'react-infinite-scroll-component'
import { searchUserRepos } from '@/api/search'
import {
  Fragment, useEffect, useMemo,
} from 'react'
import textEllipsis from '@/utils/text-ellipsis'
import shortFormat from '@/utils/short-format'
import Loader from './loader'

type Props = {
  username: string
  index: number
  openIndex: number
}

export default function CollapsibleCardContent(props: Props) {
  const { username, index, openIndex } = props

  const queryUserRepos = useInfiniteQuery(
    ['USER_REPOS', { username }],
    ({ pageParam = 1 }) => searchUserRepos(username, pageParam),
    {
      enabled: index === openIndex,
      getNextPageParam: (_, pgs) => pgs.length + 1,
    },
  )

  const debounceLoadMore = useDebouncedCallback(() => queryUserRepos.fetchNextPage(), 500)

  const dataPages = useMemo(() => queryUserRepos.data?.pages || [], [queryUserRepos])
  const totalData = dataPages.reduce((prev, cur) => prev + cur.length, 0)
  useEffect(() => {
    if (index === openIndex) {
      queryUserRepos.refetch()
    }
  }, [openIndex])

  const isLoading = queryUserRepos.isLoading
    || queryUserRepos.isFetching || queryUserRepos.isRefetching

  const isNoData = queryUserRepos.status === 'success' && queryUserRepos.data?.pages[0].length === 0

  return (
    <div className='content w-[95%] ml-auto fancy-scroll' id={`infinite-scroll-${index}`}>
      <InfiniteScroll
        className='flex flex-col gap-y-3 px-1'
        dataLength={totalData}
        endMessage={null}
        hasMore
        loader={null}
        next={debounceLoadMore}
        scrollThreshold={0.9}
        scrollableTarget={`infinite-scroll-${index}`}
      >
        {
          dataPages.map((dataPage, idx) => (
            <Fragment key={idx}>
              {
                dataPage.map((dataRepo: any) => (
                  <div className='bg-zinc-300 flex justify-between items-start px-2 py-3 h-[80px]' key={dataRepo.id}>
                    <div>
                      <strong className='text-sm'>{dataRepo.name}</strong>
                      <p className='w-full text-ellipsis text-xs lg:text-sm' title={dataRepo.description}>
                        {textEllipsis(dataRepo.description || '', 40) || '-'}
                      </p>
                    </div>
                    <div className='flex items-center gap-x-1 text-sm'>
                      <strong>{shortFormat(dataRepo.stargazers_count)}</strong>
                      <i className='bx bxs-star text-md' />
                    </div>
                  </div>
                ))
              }
            </Fragment>
          ))
        }
        {isLoading && <Loader count={5} height={80} />}
        {isNoData && !isLoading && (
          <div className='h-[80px] flex items-center justify-center overflow-y-hidden'>
            No Data
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}
