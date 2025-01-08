import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious

} from "@/components/ui/carousel"
import { Separator } from './ui/separator';
import { LuFuel } from "react-icons/lu";
import { SiSpeedtest } from "react-icons/si";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';

function CarItem({ car }) {
    console.log(car.images);

    return (
        <Link to={'/listing-details/' + car.id}>
            <div className='mx-2 border rounded-xl hover:shadow-2xl bg-white cursor-pointer'>
                <h2 className='absolute bg-green-500 rounded-full px-2 m-2 text-md text-white'>New</h2>
                <img className='rounded-t-xl h-[180px]' src={car.images[0]?.imageUrl} width={"100%"} height={200} />
                <div className='p-1 '>
                    <h1 className='text-md font-bold my-3 text-center'>{car?.listingTitle}</h1>
                    <Separator className="w-full h-px bg-gray-950 " />
                    <div className='grid grid-cols-3  gap-10 p-2 mt-1'>
                        <div className=' flex flex-col items-center gap-1 text-md'>
                            <SiSpeedtest className='text-xl' />
                            <h2>{car?.mileage}</h2>
                        </div>
                        <div className=' flex flex-col items-center gap-1 text-md'>
                            <LuFuel className='text-xl' />
                            <h2>{car?.fuelType}</h2>
                        </div>
                        <div className=' flex flex-col items-center gap-1 text-md'>
                            <GiGearStickPattern className='text-xl' />
                            <h2>{car?.transmission}</h2>
                        </div>
                    </div>
                    <Separator className="w-full h-px bg-gray-950" />
                    <div className='flex  items-center justify-between mt-2 text-xl'>
                        <h1 className='font-bold '>${car?.sellingPrice}</h1>
                        <h1 className='flex items-center text-blue-500 '>view details <IoMdOpen /></h1>
                    </div>

                </div>

            </div>
        </Link>
    )
}

export default CarItem