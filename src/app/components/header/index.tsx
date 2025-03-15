"use client"
import React from 'react'
import logo from "../../../../public/assets/Images/logo.png"
import Image from 'next/image'
import { FiPlus } from 'react-icons/fi'
import Addemployee from './addemployee'

export default function Header() {
  const [showAddEmployee, setShowAddEmployee] = React.useState(false)

  return (
    <>
    <div className='flex justify-between items-center px-[6.3%] py-[31px] w-full'>
      <Image src={logo} alt='logo'/>
      <div className='flex items-center gap-[40px]'>
        <button className='w-[225px] h-[39px] rounded-[5px] text-[16px] font-firago font-normal text-[#212529] border-[1px] border-[#8338EC]' onClick={() => setShowAddEmployee(true)}>თანამშრომლის შექმნა</button>
        <button className='bg-[#8338EC] w-[268px] h-[40px] text-white font-firago font-normal text-[16px] rounded-[5px] flex items-center justify-center '><span><FiPlus className='text-[16px] mr-[5xpx]' /></span>შექმენი ახალი დავალება</button>
      </div>
    </div>
    {showAddEmployee &&  <Addemployee setShowAddEmployee={setShowAddEmployee}  />}
    </>
  )
}
