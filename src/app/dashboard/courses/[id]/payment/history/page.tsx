"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Circle, CircleIcon, DownloadIcon, Scaling } from "lucide-react";
import { usePathname } from "next/navigation";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

const Page = () => {
  const pathname = usePathname();

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav secondaryColor={secondaryColor} currentPage={"Payment"} />
        <section className="grow px-4 lg:px-8 flex flex-col gap-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList>
              <TabsTrigger
                value="upcoming"
                className="inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
              >
                Upcoming Payment
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
              >
                Payment History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="py-8">
              <div className="flex flex-col gap-0">
                <h1 className="font-bold">Upcoming Payment</h1>
                <small className="text-sm text-gray-600">View your upcoming payments and proceed with the payment.</small>
              </div>

              <div className="relative overflow-x-auto py-8">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Instalment
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Due Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white ">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        Java
                      </th>
                      <td className="px-6 py-4">2nd Instalment</td>
                      <td className="px-6 py-4">54,000</td>
                      <td className="px-6 py-4">October 10,2023</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 items-center">
                          <MinusCircleIcon className="w-3 h-3 text-green-500" />
                          Due
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button asChild className="bg-secondary w-fit flex gap-2">
                          <Link href={pathname + "/java"}>
                            Pay <Scaling className="w-4 h-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="history" className="py-8">
              <div className="flex flex-col gap-0">
                <h1 className="font-bold">Payment History</h1>
                <small className="text-sm text-gray-600">See your payment history and downloadable receipt</small>
              </div>

              <div className="relative overflow-x-auto py-8">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white ">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        Java
                      </th>

                      <td className="px-6 py-4 font-medium">180,000</td>
                      <td className="px-6 py-4 font-medium">October 10,2023</td>
                      <td className="px-6 py-4 font-medium">
                        <div className="flex gap-1 items-center ">
                          <MinusCircleIcon className="w-3 h-3 text-green-500" />
                          Success
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button asChild className="bg-secondary w-fit flex gap-2">
                          <Link href={pathname + "/java"}>
                            <DownloadIcon className="w-4 h-4" />
                            Download
                          </Link>
                        </Button>
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
  );
};

export default Page;
