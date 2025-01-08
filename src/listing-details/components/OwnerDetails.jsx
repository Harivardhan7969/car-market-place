import { Button } from '@/components/ui/button'
import Service from '@/Shared/Service';
import { useUser } from '@supabase/auth-helpers-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function OwnerDetails({ carDetails }) {

    const user = useUser();

    const navigation = useNavigate();

    const OnMessageOwnerButtonClick = async () => {
        const userId = user.email.split('@')[0];
        const ownerUserId = carDetails?.createdBy.split('@')[0];
        //Create Current User ID
        try {
            await Service.CreateSendBirdUser('nanuu', 'nanii', 'https://lh3.googleusercontent.com/a/ACg8ocKf1Q-YkXtPK6ULgo0uFzZJwViBwkkHms-R3635j8VZVj5cPL_P=s288-c-no')
                .then(resp => {
                    console.log(resp);
                })
        } catch (e) { }
        // Owner User Id
        try {
            await Service.CreateSendBirdUser(ownerUserId, carDetails?.userName, carDetails?.userImageUrl)
                .then(resp => {
                    console.log(resp);
                })
        } catch (e) { }
        // Create Channel
        try {
            await Service.CreateSendBirdChannel(['nanii', 'ravii'], carDetails?.listingTitle)
                .then(resp => {
                    console.log(resp);
                    console.log("Chaneel Created");
                    navigation('/profile');
                })
        } catch (e) { }
    }

    return (
        <div>
            <div className='p-10 border rounded-xl mt-5 shadow-lg'>
                <h2 className='font-bold text-3xl mb-5'>Owner/Deals</h2>
                <img src={carDetails?.userImageUrl} className='w-[70px] h-[70px] rounded-full my-2' />
                <h2 className='font-bold text-2xl my-2'>{carDetails?.userName}</h2>
                <h2 className='font-medium  text-gray-500'>{carDetails?.createdBy}</h2>
                <Button onClick={OnMessageOwnerButtonClick} className='w-full mt-2 bg-blue-500'>Message Owner</Button>


            </div>
        </div>
    )
}

export default OwnerDetails