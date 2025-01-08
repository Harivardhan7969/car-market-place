import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from './ui/separator'
import { BsSearchHeart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Data from '@/Shared/Data';
import { Link } from 'react-router-dom';


function Search() {

    const [cars, setCars] = useState();
    const [make, setMake] = useState();
    const [price, setPrice] = useState();

    useEffect(() => {

    }, [])
    const GetCars = async () => {

    }

    return (
        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-14 bg-white p-4 md:p-3 rounded-md md:rounded-full w-full md:w-[700px]'>

            <Select onValueChange={(value) => setCars(value)}>
                <SelectTrigger className="w-[180px]  border-none outline-none ">
                    <SelectValue placeholder="Car" />
                </SelectTrigger>
                <SelectContent>

                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Old</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation='verticle' className='hidden md:block' />
            <Select onValueChange={(value) => setMake(value)}>
                <SelectTrigger className="w-[180px] border-none outline-none">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Data.CarMakes.map((car, index) => {
                            return <SelectItem value={car.name} key={index}> {car.name}</SelectItem>
                        })
                    }
                </SelectContent>
            </Select>
            <Separator orientation='verticle' className='hidden md:block' />
            <Select onValueChange={(value) => setPrice(value)}>
                <SelectTrigger className="w-[180px] border-none outline-none">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Data.Pricing.map((carPrice, index) => {
                            return <SelectItem value={carPrice.amount} key={index}>{carPrice.amount}</SelectItem>
                        })
                    }
                </SelectContent>
            </Select>
            <Link to={'/search?cars=' + cars + '&make=' + make + '&price=' + price} >
                <BsSearchHeart className='text-[50px]  text-blue-500  rounded-full hover:scale-125
             transition-all cursor-pointer p-2' />
            </Link>

            {/* <BsSearchHeart className='text-[50px] bg-blue-500 
        rounded-full p-2 text-white hover:scale-105 transition-all cursor-pointer'/> */}



        </div>
    )
}

export default Search