import { Label } from '@/components/ui/label'
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from 'D:/React-work space/my-car-market-place/Configs/firebaseConfig.js';
import React, { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { v4 as uuidv4 } from 'uuid';
// import { useUser } from '@clerk/clerk-react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient("https://hbxlzwxelbguiyetoyub.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieGx6d3hlbGJndWl5ZXRveXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1Mjg5NDIsImV4cCI6MjA0ODEwNDk0Mn0.SMitNRMgWFZw4_9K-ShWbp3VCT9KiJXszZ3RshGXa8Y")
const CDNURL = 'https://hbxlzwxelbguiyetoyub.supabase.co/storage/v1/object/public/images/'

function ImagesUploads() {

    const [selectedFilesList, setSelectedFilesList] = useState([])
    const user = useUser();
    const [images, setImages] = useState([]);
    const supabaseClient = useSupabaseClient();
    let url = '';
    // console.log(images);
    // images.map((image) => {
    //     console.log(CDNURL + user.id + "/" + image.name);
    //     url = CDNURL + user.id + "/" + image.name;
    //     console.log(url);

    // })

    const onFileSelected = (event) => {
        const files = event.target.files;
        console.log(files);

        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            setSelectedFilesList((prev) => [...prev, file])
        }

    }
    const removeImage = async (image, id) => {
        const result = await selectedFilesList.filter((item) => item != image);
        setSelectedFilesList(result);
    };
    async function deleteImage(imageName) {

        const { error } = await supabaseClient.storage.from('images').remove([user.id + "/" + imageName]);
        if (error) {
            alert(error)
        }
        else {
            getImages();
        }

    }

    const UploadImageToServer = async () => {
        console.log("Uploading image to server");

        // setLoader(true);
        await selectedFilesList.forEach(async (file) => {
            console.log("Uploading image to server");

            const fileName = Date.now() + '.jpeg';
            const { storageRef, error } = await supabaseClient
                .storage
                .from('images')
                .upload(user.id + "/" + uuidv4(), file);
            // const storageRef = ref(storage, 'car-marketplace/' + fileName);

            console.log(storageRef);

            console.log("Uploading image to server");
            const metaData = {
                contentType: 'image/jpeg'
            }
            console.log("Uploading image to server");
            // await uploadBytes(storageRef, file, metaData).then((snapShot) => {
            //     console.log('Uploaded File');
            // }).then(resp => {
            //     getDownloadURL(storageRef).then(async (downloadUrl) => {
            //         console.log(downloadUrl);

            //     })
            // })

            //    setLoader(false);
        })

    }

    async function uploadImage(e) {
        console.log("upload image 1");
        let file = e.target.files;
        for (let i = 0; i < file?.length; i++) {
            const { data, error } = await supabaseClient
                .storage
                .from('images')
                .upload(user.id + "/" + uuidv4(), file[i]);

            if (data) {
                getImages();
            } else {
                alert('Error uploading image: ');
                console.log(error);

            }
        }

    }
    async function getImages() {
        const { data, error } = await supabaseClient
            .storage
            .from('images')
            .list(user.id + "/", {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            });

        console.log(data);

        if (data !== null) {

            setImages(data);


        } else {
            alert('Error uploading images: ');
            console.log(error);
        }
    }

    return (
        <div>

            <div className='mb-4'>
                <h1 className='font-bold text-2xl'>Images Uploads</h1>
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 '>

                {
                    selectedFilesList.map((image, index) =>
                        <div className='' key={index}>
                            <IoMdCloseCircle onClick={() => removeImage(image, index)} className=' absolute  text-2xl m-2 text-white bg-red-500 rounded-md  cursor-pointer' />
                            {/* <img src={CDNURL + user.id + "/" + image.name}
                                alt={image.name} className='rounded-xl w-full h-full ' /> */}
                            <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl' />

                        </div>

                    )
                }

                <Label htmlFor='images-updload'>
                    <div className='border rounded-xl p-14 border-blue-500
                 bg-blue-100 text-blue-500 cursor-pointer hover:shadow-lg border-dotted'>
                        <h2 className='font-bold text-lg text-center '>+</h2>
                    </div>
                </Label>

                <input type='file' multiple={true} id='images-updload' className='opacity-0' onChange={(e) => onFileSelected(e)} />
            </div>

            <Button onClick={UploadImageToServer}>Upload image</Button>
        </div>
    )
}

export default ImagesUploads