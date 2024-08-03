"use client"

import React, { useState } from 'react';

import { Button } from "@/components/ui/button"
import SideBar from "@/components/SideBar"
import DashNav from "@/components/DashNav"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ChevronRightIcon, SearchIcon,SlidersHorizontal,ArrowUpDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { MinusCircleIcon } from "@heroicons/react/24/solid"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const Page = () => {
    const pathname = usePathname();

    const [sortOrder, setSortOrder] = useState('asc');

    const logoUrl = sessionStorage.getItem("logoUrl") || "";
    const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

    const handleSort = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <section className='flex w-full min-h-screen h-auto'>
            <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor}/>
            <main className='grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6'>
                <DashNav secondaryColor={secondaryColor} currentPage={"Support Ticket"} />
                <section className="grow px-4 lg:px-8 flex flex-col gap-8">

                    <Tabs defaultValue="create" className="w-full">
                        <TabsList className="border-b border-gray-100 w-full flex justify-start gap-40">
                            <TabsTrigger value="create" className="text-left inline-block  py-2 border-b-4 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]">
                                Create Ticket
                            </TabsTrigger>
                            <TabsTrigger value="mine" className="text-left inline-block px-4 py-2 border-b-4 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]">
                                My Tickets
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="create" className="py-8">
                            <form className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        Ticket Category <span className="text-xs text-black">[required]</span>
                                    </label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md w-full md:max-w-full">
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Ticket Category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectGroup>
                                                        <SelectItem value="category1" className="data-[highlighted]:bg-gray-100 cursor-pointer">category1</SelectItem>
                                                        <SelectItem value="category2" className="data-[highlighted]:bg-gray-100 cursor-pointer">category2</SelectItem>
                                                        <SelectItem value="category3" className="data-[highlighted]:bg-gray-100 cursor-pointer">catgeory3</SelectItem>

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Detailed description <span className="text-black text-xs">[required]</span>
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={8}
                                            className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <Button className="bg-secondary py-4">Submit Ticket <ChevronRightIcon className="" /></Button>
                            </form>

                        </TabsContent>
                        <TabsContent value="mine" className="py-8">
                            <div className='flex gap-2'>
                                <div className="border border-gray-200 flex gap-2 items-center w-fit px-3 rounded-lg focus-within:outline outline-1">
                                    <SearchIcon className="w-4 h-4 text-gray-500" />
                                    <input type="text" className="outline-0 border-0 py-2" placeholder="Search" />

                                </div>
                                <div className="border border-gray-200 flex gap-2 items-center w-fit px-3 rounded-lg focus-within:outline outline-1 ml-2">
                                    <SlidersHorizontal className="w-4 h-4 text-gray-500"/>
                                    <p className='text-gray-500'>filter</p>
                                </div>
                                <div className="border border-gray-200 flex gap-2 items-center w-fit px-3 rounded-lg focus-within:outline outline-1">
                                    <ArrowUpDown className="w-4 h-4 text-gray-500"/>
                                    <p className='text-gray-500'>sort</p>
                                </div>
                                {/* <button onClick={handleSort} className="border rounded p-2 bg-blue-500 text-white">
                                    Sort by Date {sortOrder === 'asc' ? '↑' : '↓'}
                                </button> */}
                            </div>

                            <div className="relative overflow-x-auto py-8">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                TicketID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Last Update
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white ">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                #3510
                                            </th>

                                            <td className="px-6 py-4 font-medium">
                                                System Issue
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                <div className="flex gap-1 items-center ">
                                                    <MinusCircleIcon className="w-3 h-3 text-green-500" />
                                                    Resolved
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                October 10,2023
                                            </td>
                                            <td className="px-6 py-4">
                                                Refer to your email address
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>
            </main>
        </section>
    )
}

export default Page