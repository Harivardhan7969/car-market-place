import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import { HiCalendarDays } from "react-icons/hi2";
import { IoIosSpeedometer } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";

function DetailsHeader({ carDetails }) {
    return (
        <div>
            {
                carDetails?.listingTitle ?
                    <div>
                        <h1 className='font-bold text-3xl'>{carDetails?.listingTitle}</h1>
                        <p className='text-xl'>{carDetails?.tagline}</p>
                        <div className='flex items-center gap-5 mt-3 text-blue-500'>
                            <div className='flex items-center  gap-1 bg-blue-200 rounded-full p-1 '>
                                < HiCalendarDays className='h-4 w-6 ' />
                                <h1 className=' text-sm'>{carDetails?.year}</h1>
                            </div>
                            <div className='flex items-center  gap-1 bg-blue-200 rounded-full p-1'>
                                < IoIosSpeedometer className='h-4 w-6 ' />
                                <h1 className=' text-sm'>{carDetails?.mileage}</h1>
                            </div>
                            <div className='flex items-center  gap-1 bg-blue-200 rounded-full p-1'>
                                < GiGearStickPattern className='h-4 w-6 ' />
                                <h1 className=' text-sm'>{carDetails?.transmission}</h1>
                            </div>
                            <div className='flex items-center  gap-1 bg-blue-200 rounded-full p-1'>
                                < BsFillFuelPumpFill className='h-4 w-6 ' />
                                <h1 className=' text-sm'>{carDetails?.fuelType}</h1>
                            </div>
                        </div>
                    </div> :
                    <div className='w-full rounded-xl h-[100px] bg-slate-200 animate-pulse'>

                    </div>
            }

        </div>
    )
}

export default DetailsHeader