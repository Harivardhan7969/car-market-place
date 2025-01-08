import Header from '@/components/Header'
import Search from '@/components/Search'
import { db } from '../../../../Configs';
import { CarImages, CarListing } from '../../../../Configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Service from '@/Shared/Service';
import CarItem from '@/components/CarItem';

function SearchByCategory() {

    const { category } = useParams();
    const [carList, setCarList] = useState([])
    console.log(category);
    useEffect(() => {
        GetCarList();
    }, [])
    const GetCarList = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.category, category));
        const resp = Service.FormatResult(result);

        setCarList(resp);

    }

    return (
        <div>
            <Header />
            <div className='p-6 flex justify-center bg-slate-200'>

                <Search />
            </div>
            <div className='p-10 md:px-20'>
                <h2 className=' font-bold text-4xl'>{category}</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  mt-7 gap-2 '>
                    {carList.length > 0 ?
                        carList.map((item, index) => (
                            <div key={index}>
                                <CarItem car={item} />
                            </div>
                        )) :
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                            <div className='h-[280px] rounded-md bg-slate-200 animate-pulse  '>

                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default SearchByCategory