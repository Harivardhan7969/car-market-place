import IconField from '@/components/AddListing/Components/IconField';
import CarSpecification from '@/Shared/CarSpecification';
import React from 'react'

function Specification({ carDetails }) {
    console.log(carDetails);

    return (
        <div>
            <div className='p-10 rounded-xl border shadow-lg mt-5 '>
                <h1 className='font-medium text-lg mb-5'>Specifications</h1>
                {
                    carDetails ? CarSpecification.map((item, index) => (
                        <div className='flex items-center justify-between' key={index}>

                            <h2 className='flex gap-2 my-1'> <IconField icon={item?.icon} />{item?.label}</h2>
                            <h2>{carDetails[item?.name]}</h2>
                        </div>
                    )) :
                        <div className='p-10 border  bg-slate-200 h-[500px]  w-full rounded-xl'>

                        </div>
                }
            </div>
        </div>
    )
}

export default Specification