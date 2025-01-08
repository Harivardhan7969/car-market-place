import React, { useEffect, useState } from 'react'
import Header from '../Header'
import carDetails from './../../Shared/carDetails'
import InputField from './Components/InputField'
import { Label } from '../ui/label'
import DropDownField from './Components/DropDownField'
import TextAreaField from './Components/TextAreaField'
import { Separator } from '../ui/separator'
import features from './../../Shared/features.json'
import { Checkbox } from '../ui/checkbox'
import { Button } from "@/components/ui/button"

import { CarImages, CarListing } from 'D:/React-work space/car-marketplace-supabse/Configs/schema.js'
import { db } from 'D:/React-work space/car-marketplace-supabse/Configs'
import IconField from './Components/IconField'
import ImagesUploads from './Components/ImagesUploads'
import ImageUpload from './Components/ImageUpload'
import UploadImages from './Components/UploadImages'
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '@supabase/auth-helpers-react'
import moment from 'moment'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'




function AddListing() {

    const [formData, setFormData] = useState([]);
    const [featuresData, setFeaturesData] = useState([]);
    const [triggerUploadImages, setTriggerUploadImages] = useState();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const user = useUser();
    const [searchParams] = useSearchParams();
    const [carInfo, setCarInfo] = useState();
    const [images, setImages] = useState([]);

    const mode = searchParams.get('mode');
    const recordId = searchParams.get('id');

    useEffect(() => {
        if (mode === 'edit') {
            GetListingDetails();
        }

    }, [])

    const GetListingDetails = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.id, recordId));


        const resp = Service.FormatResult(result);
        console.log(resp);
        setCarInfo(resp[0]);
        setFeaturesData(resp[0].features);
        setImages(resp[0].images);
        setFormData(resp[0]);

    }

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value

        }))
        console.log(formData);

    }

    const handleFeatureChange = (name, value) => {
        setFeaturesData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        console.log(formData);

        console.log(featuresData);

    }

    const onSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        console.log(formData);
        toast('please wait')
        if (mode === 'edit') {
            const result = await db.update(CarListing).set({
                ...formData,
                features: featuresData,
                createdBy: user.email,

                postedOn: moment().format('DD/MM/YYYY')
            }).where(eq(CarListing.id, recordId)).returning({ id: CarListing.id })
            console.log(result);
            setLoader(false);
            navigate('/profile')
        } else {
            try {
                const result = await db.insert(CarListing).values({
                    ...formData,
                    features: featuresData,
                    createdBy: user.email,
                    userName: user.name,
                    userImageUrl: 'https://lh3.googleusercontent.com/a/ACg8ocKf1Q-YkXtPK6ULgo0uFzZJwViBwkkHms-R3635j8VZVj5cPL_P=s288-c-no',
                    postedOn: moment().format('DD/MM/YYYY')

                }).returning({ id: CarListing.id });
                if (result) {

                    console.log(formData);
                    console.log("data saved");
                    setTriggerUploadImages(result[0]?.id);
                    setLoader(false);
                }
            } catch (error) {
                console.error(error);
            }
        }


    }

    return (
        <div>
            <Header />
            <div className='p-10 md:px-20  '>
                <h1 className='font-bold text-4xl '>Add Listing</h1>
                <form className='border p-5 px-10 my-10'>
                    <div>
                        <h1 className='font-medium text-2xl mb-4'>Car Details</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        {
                            carDetails.carDetails.map((item, index) => (
                                <div key={index} >
                                    <div className='flex flex-col gap-1'>

                                        <Label className='text-md flex gap-2 items-center'> <IconField icon={item.icon} />{item.label} {item.required && <span className='text-red-500'>*</span>} </Label>
                                        {
                                            item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} handleInputChanges={handleInputChange} carInfo={carInfo} />
                                                : item.fieldType == 'dropdown' ? <DropDownField item={item} handleInputChanges={handleInputChange} carInfo={carInfo} />
                                                    : item.fieldType == 'textarea' ? <TextAreaField item={item} handleInputChanges={handleInputChange} carInfo={carInfo} />
                                                        : null
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Separator className='bg-black my-5' />
                    <div>
                        <h1 className='font-bold text-2xl mb-5'>Features</h1>
                        <div className='grid grid-cols-3 gap-3 '>
                            {
                                features.features.map((feature, index) => (
                                    <div key={index} className='mx-5 flex items-center  '>
                                        <Checkbox onCheckedChange={(value) => handleFeatureChange(feature.name, value)}
                                            checked={featuresData?.[feature.name]}
                                        /> <Label className='pl-2'>{feature.label}</Label>
                                    </div>

                                ))
                            }
                        </div>
                    </div>

                    <Separator className='bg-black my-6' />


                    {/* <ImageUpload /> */}
                    <UploadImages triggerUploadImages={triggerUploadImages} carInfo={carInfo} mode={mode}
                        setLoader={(v) => { setLoader(v); }}
                    />

                    <div className='flex justify-center items-end mt-10 '>
                        <Button type='submit' onClick={(e) => onSubmit(e)} className='bg-blue-500 '>
                            {!loader ? 'Submit' : <BiLoaderAlt className='animate-spin text-lg' />}
                        </Button>
                    </div>




                </form>

            </div>

        </div>
    )
}

export default AddListing