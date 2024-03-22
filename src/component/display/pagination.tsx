import React from 'react'

type Props = {
    page: number,
    setPagePre: (p: number) => void
    setPageNext: (p: number) => void
    allItem: number,
    limit: number
}

const Pagination = ({ page, allItem, limit, setPagePre, setPageNext }: Props) => {
    return (
        <div className='pagination'>
            <div>{page < 1 ? null : <p onClick={() => setPagePre(page)}>prev</p>}</div>
            <div><p className='pageNumber'>{page + 1}</p></div>
            <div>{(page + 1) * limit <= allItem ? < p onClick={() => setPageNext(page)}>next</p > : null}</div>
        </div>
    )
}

export default Pagination