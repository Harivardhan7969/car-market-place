import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailsHeader from '../components/DetailsHeader'
import { useParams } from 'react-router-dom'
import { db } from './../../../Configs';
import { CarImages, CarListing } from './../../../Configs/schema';
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import ImageGallary from '../components/ImageGallary';
import Description from '../components/Description';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';
import OwnerDetails from '../components/OwnerDetails';
import Footer from '@/components/Footer';
import FinancialCalculator from '../components/FinancialCalculator';
import MostSearchedCar from '@/components/MostSearchedCar';


function ListingDetails() {
    const { id } = useParams();
    const [carDetails, setCarDetails] = useState();
    console.log(id);

    useEffect(() => {
        GetCarDetails();
    }, [])

    const GetCarDetails = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.id, id));
        const resp = Service.FormatResult(result);
        setCarDetails(resp[0]);
        console.log(resp[0]);

    }

    return (
        <div>
            <Header />
            <div className='p-10 md:px-20'>
                <DetailsHeader carDetails={carDetails} />
                <div className='grid grid-cols-1 md:grid-cols-3  w-full mt-5 gap-5'>


                    <div className='md:col-span-2 '>
                        <ImageGallary carDetails={carDetails} />

                        <Description carDetails={carDetails} />
                        <Features features={carDetails?.features} />
                        <FinancialCalculator carDetails={carDetails} />
                    </div>
                    <div className=''>
                        <Pricing carDetails={carDetails} />
                        <Specification carDetails={carDetails} />
                        <OwnerDetails carDetails={carDetails} />
                    </div>
                </div>
                <MostSearchedCar />
            </div>
            <Footer />
        </div>
    )
}

export default ListingDetails