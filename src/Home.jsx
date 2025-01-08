import React, { useState } from 'react'
import { Button } from './components/ui/button'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Category from './components/Category';
import MostSearchedCar from './components/MostSearchedCar';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';

function Home() {

    const [email, setEmail] = useState("");
    const user = useUser();
    const [images, setImages] = useState([]);
    const supabaseClient = useSupabaseClient();
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
    return (
        <div>
            <Header />
            <Hero />
            <Category />
            <MostSearchedCar />
            <InfoSection />
            <Footer />
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
                    <h1>
                        Welcome are you logged in
                        <p>User :{user.email}</p>
                    </h1>
                </>
            } */}

        </div>
    )
}

export default Home