import React from 'react'
import Search from './Search'

function Hero() {
    return (
        <div>
            <div className='flex flex-col items-center p-10 py-10 gap-2 bg-[#eef0fc] h-[600px] w-full '>
                <h2 className='text-lg font-semibold'>
                    Find cars for sale and rent near you
                </h2>
                <h2 className='text-[50px] font-bold'>Find Your Dream Car</h2>
                <Search />
                <img src='tesla.png' />
            </div>

        </div>
    )
}

export default Hero