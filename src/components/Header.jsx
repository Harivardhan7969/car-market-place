
import React, { StrictMode, useState } from 'react'
import { Button } from './ui/button';


import { Link, RouterProvider } from 'react-router-dom';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';


function Header() {

    // const user = useUser();
    const { user, isSignedIn } = useUser();





    return (
        <div>

            <div className='flex justify-between items-center shadow-md h-16'>

                <img src='car.svg' width={100} height={100} />

                <ul className='hidden md:flex gap-16'>
                    <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary'>Home</li>
                    <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary '>Search</li>
                    <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary'>New</li>
                    <li className='font-medium hover:scale-110 transition-all cursor-pointer hover:text-primary'>Preowned</li>
                </ul>
                {/* {
                    user === null ? (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-6">Welcome to Imagewall</h1>
                            <form className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Enter Email to get magic Link
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                                    onClick={() => magicLinkLogin()}
                                >
                                    Get Magic Link
                                </button>
                            </form>
                        </>
                    ) : <>


                        <p>User :{user?.email}</p>
                        <Link to={'/profile'} >
                            <Button>Submit Listing login</Button>
                        </Link>

                    </>
                } */}
                {isSignedIn ?
                    <div className='flex items-center gap-5'>
                        <UserButton />
                        <Link to={'/profile'}>
                            <Button>Submit Listing</Button>
                        </Link>
                    </div>
                    :
                    <SignInButton mode="modal" fallbackRedirectUrl='/profile'>
                        <Button>Submit Listing</Button>
                    </SignInButton>
                }

            </div>

        </div >

    )
}

export default Header