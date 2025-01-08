import Data from '@/Shared/Data'
import React from 'react'
import { Link } from 'react-router-dom'

function Category() {
    return (
        <div>
            <div className=''>
                <h1 className='p-6 text-4xl text-center font-bold '>Browse By Type</h1>
            </div>
            <div className='grid  grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 px-20 gap-6'>
                {
                    Data.Category.map((category) => (
                        <Link to={'/search/' + category.name}>
                            <div key={category.name} className='border rounded-xl  p-3  items-center flex flex-col hover:shadow-2xl
                         cursor-pointer '>
                                <img src={category.icon} width={50} height={50} />
                                <h2 className='text-md font-semibold mt-1' >{category.name}</h2>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}

export default Category