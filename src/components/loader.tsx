import Skeleton from 'react-loading-skeleton'

export type Props = {
  count: number
  height?: number
}

export default function Loader(props: Props) {
  const { count = 1, height = 50 } = props
  const loaderList = Array.from({ length: count }, (_, idx) => idx)
  return (
    <div className='mt-4 flex flex-col gap-y-4'>
      {
        loaderList.map((index) => (
          <Skeleton height={height} key={index} />
        ))
      }
    </div>
  )
}
