import React from 'react'
import TaskDetails from './TaskDetails/taskDetails'
import Header from '@/app/components/header'
import Comment from './comment/comment'

export default function GetTask() {
  return (
    <>
    <Header />
    <div className='px-[6.3%] mt-[40px] flex justify-between'>
      <TaskDetails />
      <Comment />
    </div>
    </>
  )
}
