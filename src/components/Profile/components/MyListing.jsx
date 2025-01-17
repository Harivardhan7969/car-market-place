import CarItem from '@/components/CarItem'
import { Button } from '@/components/ui/button'
import Service from '@/Shared/Service'
import FormatResult from '@/Shared/Service'
// import { useUser } from '@supabase/auth-helpers-react'
import { db } from 'D:/React-work space/car-marketplace-supabse/Configs'
import { CarImages, CarListing } from 'D:/React-work space/car-marketplace-supabse/Configs/schema'
import { desc, eq } from 'drizzle-orm'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa";
import { useUser } from '@clerk/clerk-react'

function MyListing() {
    const { user } = useUser();
    const [carList, setCarList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        user && GetUserCarListing();
    }, [user])



    const GetUserCarListing = async () => {
        const result = await db.select().from(CarListing)
            .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(CarListing.id))
        const resp = Service.FormatResult(result);
        setCarList(resp);
        console.log(resp);
        console.log(carList);


    }

    const DeleteListing = async (id) => {
        const deltedImage = await db.delete(CarImages).where(eq(CarImages.carListingId, id)).returning();
        await db.delete(CarListing).where(eq(CarListing.id, id));

    }

    return (
        <div className='mt-6'>
            <div className='flex justify-between  items-center '>
                <h1 className='font-bold text-4xl'>My Listing</h1>
                <Link to={'/add-listing'}>
                    <Button className='bg-blue-500'>+ Add New Listing</Button>
                </Link>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 mt-3'>
                {
                    carList.map((item, index) => (
                        <div key={index}>
                            <CarItem car={item} />
                            <div className=' p-2 bg-gray-50 rounded-lg flex justify-between gap-3 '>
                                <Link to={'/add-listing?mode=edit&id=' + item?.id} className='w-full'>
                                    <Button variant='outline' className='w-full'>Edit</Button>
                                </Link>

                                <Button variant='destructive' onClick={() => DeleteListing(item?.id)}  ><FaTrashAlt /></Button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyListing