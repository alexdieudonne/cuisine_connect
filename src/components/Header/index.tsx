import Image from 'next/image'
import React, { FC } from 'react'

const Header: FC<HeaderProps> = () => {
    return (
        <header>
            <nav className='px-6 py-5 bg-white border-b-2 border-black'>
                <ul className='flex justify-between'>
                    <li className='flex'>
                        <Image src="/assets/logo.svg" alt="logo" width="200" height="300" />
                        <div className='ml-8'>
                            <a href="#" className='px-2 text-sm hover:text-gray-600'>Recipes</a>
                            <a href="#" className='px-2 text-sm hover:text-gray-600'>About</a>
                        </div>
                    </li>
                    <div className='flex'>
                        <li>
                            <span className='text-gray-400'>|</span>
                        </li>
                        <li className=''>
                            <a href="#" className='px-2 text-sm hover:text-gray-600'>Signup</a>
                        </li>
                        <li className=''>
                            <span className='text-gray-400'>|</span>
                        </li>
                        <li className=''>
                            <a href="#" className='px-2 text-sm hover:text-gray-600'>Login</a>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header

type HeaderProps = {

}