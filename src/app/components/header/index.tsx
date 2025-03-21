"use client"
import React, { useState } from 'react'
import logo from "../../../../public/assets/Images/logo.png"
import Image from 'next/image'
import { FiPlus } from 'react-icons/fi'
import Addemployee from './addemployee'
import Link from 'next/link'

export default function Header() {
  const [showAddEmployee, setShowAddEmployee] = useState(false)

  return (
    <>
    <div className='flex justify-between items-center px-[6.3%] py-[31px] w-full'>
      <Link href = "/">
      <Image src={logo} alt='logo'/>
      </Link>
      <div className='flex items-center gap-[40px]'>
        <button className='w-[225px] cursor-pointer h-[39px] rounded-[5px] text-[16px] font-firago font-normal text-[#212529] border-[1px] border-[#8338EC] hover:border-[#B588F4] transition-[1.3s]' onClick={() => setShowAddEmployee(true)}>თანამშრომლის შექმნა</button>
        <Link href="/createTask" >
        <button onClick={() => sessionStorage.removeItem("selectedFilters")} className='bg-[#8338EC] hover:bg-[#B588F4] transition-[1.3s] cursor-pointer w-[268px] h-[40px] text-white font-firago font-normal text-[16px] rounded-[5px] flex items-center justify-center '><span><FiPlus className='text-[16px] mr-[5xpx]' /></span>შექმენი ახალი დავალება</button>
        </Link>
      </div>
    </div>
    {showAddEmployee &&  <Addemployee setShowAddEmployee={setShowAddEmployee}  />}
    </>
  )
}
