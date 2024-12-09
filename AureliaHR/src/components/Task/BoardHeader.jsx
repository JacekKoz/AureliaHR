import React from 'react'

const BoardHeader = () => {
  return (
    <div className='bg-bg_color_2 w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-border_color'>
      <div className='left justify-center items-center flex'>
        <h3 className='text-white'>Tasks</h3>
      </div>
    </div>
  )
}

export default BoardHeader