import { Button } from '@/components/ui/button'
import React from 'react'
import { MdOutlineLocalOffer } from "react-icons/md";

function Pricing({ carDetails }) {
    return (
        <div>
            <div className='p-5 border rounded-lg shadow-lg'>
                <h2>Our Price</h2>
                <h2 className='font-bold text-4xl '>${carDetails?.sellingPrice}</h2>
                <Button className='bg-blue-600 w-full my-5' size='lg'><MdOutlineLocalOffer className='text-lg  mr-2' /> Make an Offer</Button>
            </div>
        </div>
    )
}

export default Pricing