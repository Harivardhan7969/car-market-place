import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import InputField from './InputField'
import { IoMdCloseCircle } from "react-icons/io";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { db } from 'D:/React-work space/car-marketplace-supabse/Configs'
import { CarImages } from 'D:/React-work space/car-marketplace-supabse/Configs/schema.js'
import { eq } from 'drizzle-orm';
import { useNavigate } from 'react-router-dom';


const CDNURL = 'https://hbxlzwxelbguiyetoyub.supabase.co/storage/v1/object/public/images/'
//https://hbxlzwxelbguiyetoyub.supabase.co/storage/v1/object/public/images/cee74730-6ccf-4a26-b09a-c76b72d5faa9/img%203.jpg46110727-eb7e-4f61-90d4-5ff9fdf56aca
function UploadImages({ triggerUploadImages, setLoader, carInfo, mode }) {

    const [selectedFilesList, setSelectedFilesList] = useState([]);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [editCarImagesList, setEditCarImagesList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (mode == 'edit') {
            setEditCarImagesList([]);
            carInfo?.images.forEach((image) => {
                setEditCarImagesList((prev) => [...prev, image.imageUrl]);
            })
        }
    }, [carInfo])


    useEffect(() => {
        console.log('useEffect');
        if (triggerUploadImages) {
            console.log("triggerUploadImages inisde if");
            uploadImagesToServer();
            setImageUrls([]);
            setImages([]);
            console.log("triggerUploadImages inisde if 2");
        }

    }, [triggerUploadImages])




    async function onFileselected(event) {
        console.log("onfiles selected");

        const files = event.target.files;

        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            setSelectedFilesList((prev) => [...prev, file]);

        }


    }

    function removeImage(image, index) {
        const result = selectedFilesList.filter((item) => item != image);
        setSelectedFilesList(result);

    }

    const uploadImagesToServer = async () => {
        setLoader(true);
        console.log("upload images");
        await selectedFilesList.forEach(async (file) => {
            const { data, error } = await supabaseClient
                .storage
                .from('images')
                .upload(user.id + "/" + uuidv4(), file);
            console.log('Image uploaded successfully: ');
            console.log(data);

            if (data) {
                getImages();
            } else {
                alert('Error uploading image: ');
                console.log(error);
            }
            setLoader(false);
        })
    };
    const getImages = async () => {

        const { data, error } = await supabaseClient
            .storage
            .from('images')
            .list(user.id + "/", {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            });



        if (data !== null) {

            setImages(data);
            console.log('Images fetched successfullyd ');
            console.log(images);
            // console.log(selectedFilesList);

            if (images.length > 0) {

                await images.forEach((image) => {
                    setImageUrls((prev) => [...prev, CDNURL + user.id + "/" + image.name]);
                })

                if (imageUrls.length > 0) {

                    await imageUrls.forEach((url) => {
                        console.log(url);
                        if (url !== null) {
                            storeImageUrlsDb(url);
                            navigate('/profile')
                        }


                    })
                    // setImageUrls([]);
                    // setImages([]);
                    // setSelectedFilesList([]);
                }




                console.log("image urls ");
                console.log(imageUrls);



            }

        } else {
            alert('Error uploading images: ');
            console.log(error);
        }

    }

    const storeImageUrlsDb = async (url) => {
        console.log('storing image urls');
        await db.insert(CarImages).values({
            imageUrl: url,
            carListingId: triggerUploadImages

        })
    }

    const removeImageFromDb = async (image, index) => {
        const result = await db.delete(CarImages).where(eq(CarImages.id, carInfo?.images[index]?.id)).returning({ id: CarImages.id });

        const imageList = editCarImagesList.filter(item => item != image);
        setEditCarImagesList(imageList);

    }


    return (
        <div>
            <h2 className='font-medium text-xl m-3'>Upload Car images</h2>
            <div >
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                    {
                        mode == 'edit' && editCarImagesList.length > 0 && editCarImagesList.map((imageUrl, index) => (
                            <div key={index}>
                                <IoMdCloseCircle onClick={() => removeImageFromDb(imageUrl, index)} className='absolute m-2 cursor-pointer text-lg text-white bg-red-500 rounded-lg' />

                                <img src={imageUrl} className='border rounded-xl w-full h-[130px] hover:shadow-lg cursor-pointer ' />

                            </div>

                        ))
                    }


                    {
                        selectedFilesList.map((image, index) => {
                            return <div key={index}>
                                <IoMdCloseCircle onClick={() => removeImage(image, index)} className='absolute m-2 cursor-pointer text-lg text-white bg-red-500 rounded-lg' />

                                <img src={URL.createObjectURL(image)} className='border rounded-xl w-full h-[130px] hover:shadow-lg cursor-pointer ' />


                            </div>

                        })
                    }


                    <Label htmlFor='images-upload'>
                        <div className='rounded-xl bg-blue-200 p-12 border-blue-500 hover:cursor-pointer hover:shadow-md '>
                            <h2 className='text-lg text-center text-blue-950'>+</h2>
                        </div>
                    </Label>
                </div>

                <input type='file' id='images-upload' multiple={true}
                    accept="image/jpeg, image/png"
                    onChange={onFileselected}
                    className='opacity-0' />
            </div>


        </div>
    )
}

export default UploadImages