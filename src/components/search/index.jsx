import Service from '@/Shared/Service';
import { db } from 'D:/React-work space/car-marketplace-supabse/Configs';
import { CarImages, CarListing } from 'D:/React-work space/car-marketplace-supabse/Configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarItem from '../CarItem';
import Search from '../Search';
import Header from '../Header';

function SearchByOptions() {

    const [searchparam] = useSearchParams();

    const condition = searchparam.get('cars');
    const make = searchparam.get('make');
    const price = searchparam.get('price');
    const [carList, setCarList] = useState([]);

    console.log(make);

    useEffect(() => {
        GetCarLsiting();
    })


    const GetCarLsiting = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))

            .where(condition != undefined && eq(condition, CarListing.condition))
            .where(make != undefined && eq(make, CarListing.listingTitle));
        const resp = Service.FormatResult(result);
        setCarList(resp);
        console.log(resp);


    }

    return (
        <div>
            <Header />
            <div className='p-6 flex justify-center bg-slate-200'>

                {/* <Search /> */}
            </div>
            <div className='p-10 md:px-20'>
                <h2 className=' font-bold text-4xl'>Search  by CarList</h2>
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

export default SearchByOptions