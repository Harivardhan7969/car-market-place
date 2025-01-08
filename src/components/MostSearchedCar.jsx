import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious

} from "@/components/ui/carousel"
import { db } from 'D:/React-work space/car-marketplace-supabse/Configs';
import Service from '@/Shared/Service';
import { CarImages, CarListing } from 'D:/React-work space/car-marketplace-supabse/Configs/schema';
import { desc, eq } from 'drizzle-orm';

function MostSearchedCar() {

    const [carList, setCarList] = useState([]);

    useEffect(() => {
        GetpopularCarList();
    }, [])


    const GetpopularCarList = async () => {
        const result = await db.select().from(CarListing)
            .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .orderBy(desc(CarListing.id));

        console.log(result);
        //setCarList(result);
        const resp = Service.FormatResult(result);
        console.log(resp);
        setCarList(resp);




    }

    return (
        <div className='mx-24'>
            <h1 className='text-4xl text-center font-bold my-10'>Most Searched Cars</h1>
            <Carousel>
                <CarouselContent>
                    {
                        carList?.map((car, index) => (
                            <CarouselItem key={index} className='basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 '>
                                <CarItem car={car} />
                            </CarouselItem>
                        ))
                    }

                </CarouselContent>
                <CarouselPrevious className="p-2 bg-gray-200 hover:bg-blue-500 text-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
                <CarouselNext className="p-2 bg-gray-200 hover:bg-blue-500 text-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
            </Carousel>

            {/* {
                FakeData.carList.map((car, index) => (
                    <CarItem key={index} car={car} />
                ))
            } */}


        </div>
    )
}

export default MostSearchedCar