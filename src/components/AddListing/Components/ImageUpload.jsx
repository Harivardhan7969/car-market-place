import React from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CDNURL = 'https://hbxlzwxelbguiyetoyub.supabase.co/storage/v1/object/public/images/'

function ImageUpload() {

    const [email, setEmail] = useState("");
    const user = useUser();
    const [images, setImages] = useState([]);
    const supabaseClient = useSupabaseClient();
    console.log(email);
    console.log(images);

    useEffect(() => {
        if (user) {
            getImages();
        }
    }, [user])

    async function magicLinkLogin() {
        const { data, error } = await supabaseClient.auth.signInWithOtp({
            email: email
        })
        if (error) {
            alert('Error signing in with OTP: ');
            console.log(error);

        } else {
            alert('Magic link sent to your email');
        }
    }

    async function signOut() {
        const { error } = await supabaseClient.auth.signOut();
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
        if (data !== null) {
            setImages(data);
        } else {
            alert('Error uploading images: ');
            console.log(error);
        }
    }

    async function uploadImage(e) {
        let file = e.target.files[0];
        const { data, error } = await supabaseClient
            .storage
            .from('images')
            .upload(user.id + "/" + uuidv4(), file)

        if (data) {
            getImages();
        } else {
            alert('Error uploading image: ');
            console.log(error);

        }
    }

    async function deleteImage(imageName) {

        const { error } = await supabaseClient.storage.from('images').remove([user.id + "/" + imageName]);
        if (error) {
            alert(error)
        }
        else {
            getImages();
        }

    }



    return (
        <div className="container mx-auto mt-4 text-center">
            {user === null ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">Welcome to Imagewall</h1>
                    <form className="max-w-md mx-auto">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Enter Email to get Magic Link
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => magicLinkLogin()}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Get Magic Link
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Your Image Wall</h1>
                    <button
                        type="button"
                        onClick={() => signOut()}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
                    >
                        Sign Out
                    </button>
                    <p className="mb-2">Current User: {user.email}</p>
                    <p className="mb-4">Click here to upload image</p>
                    <div className="max-w-md mx-auto">
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-4"
                            onChange={(e) => uploadImage(e)}
                        />
                    </div>
                    <hr className="my-8" />
                    <h1 className="text-2xl font-bold mb-4">Your Images</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {images.map((image) => (
                            <div
                                key={CDNURL + user.id + "/" + image.name}
                                className="bg-white shadow-md rounded overflow-hidden"
                            >
                                <img
                                    src={CDNURL + user.id + "/" + image.name}
                                    alt={image.name}
                                    className="w-full h-auto"
                                />
                                <div className="p-4">
                                    <button
                                        type="button"
                                        onClick={() => deleteImage(image.name)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    >
                                        Delete Image
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>

    )
}

export default ImageUpload