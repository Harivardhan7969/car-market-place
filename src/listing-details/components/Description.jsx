import React from 'react'

function Description({ carDetails }) {
    return (
        <div>
            {carDetails?.listingDescription ?
                <div>
                    <div className='p-5 mt-5 rounded-xl shadow-lg border'>
                        <h2 className='text-xl mb-2 font-medium'>Description</h2>
                        <p>{carDetails?.listingDescription}</p>
                    </div>
                </div> :
                <div className='bg-slate-200 p-5 mt-5 rounded-xl shadow-lg border w-full h-[100px] animate-pulse'>

                </div>

            }


        </div>
    )
}

export default Description