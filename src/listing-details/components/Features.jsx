import React from 'react'
import { FaCheck } from "react-icons/fa6";
function Features({ features }) {



    return (
        <div>
            <div className='p-10 shadow-lg border rounded-xl my-2'>
                <h2 className='font-medium text-2xl mb-2'>Features</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {
                        features !== undefined && Object.entries(features).map(([features, value]) => (
                            <div className='flex items-center gap-3' key={value}>
                                <FaCheck className='text-lg p-1 rounded-full bg-blue-200' />
                                <h2 className='text-md'>{features}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Features