import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './components/Inbox'

function Profile() {
    return (
        <div>
            <Header />
            <div className='p-10 md:px-20 my-10'>
                <Tabs defaultValue="my-listing" className="w-full ">
                    <TabsList className='w-full flex justify-start h-12 pl-4 gap-3'>
                        <TabsTrigger value="my-listing" className='h-8'>My Listing</TabsTrigger>
                        <TabsTrigger value="inbox" className='h-8'>Inbox</TabsTrigger>
                        <TabsTrigger value="profile" className='h-8'>Profile</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-listing">
                        <MyListing />
                    </TabsContent>
                    <TabsContent value="inbox"><Inbox /></TabsContent>
                    <TabsContent value="profile">Profile</TabsContent>
                </Tabs>


            </div>

        </div>
    )
}

export default Profile