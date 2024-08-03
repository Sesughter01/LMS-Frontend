"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Circle, CircleIcon, DownloadIcon, Scaling } from "lucide-react";
import { usePathname } from "next/navigation";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import courseService from "@/services/api/courses";
import { UserPayment } from "@/shared/types/payment";
import { PDFDocument, rgb } from "pdf-lib";

const History = () => {
  const pathname = usePathname();
  const authUser = useSelector((state: RootState) => state.auth.user);
  console.log("UserId:", authUser?.id);

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const [userPayments, setUserPayments] = useState<UserPayment[]>([]);

  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        const payments = await courseService.getUserPayments(authUser?.id || 0);
        setUserPayments(payments as any);
        console.log("User Payments:", payments);
      } catch (error) {
        console.error("Error fetching user payments:", error);
      }
    };

    fetchUserPayments();
  }, [authUser]);

  // const generatePDF = async (index: any) => {
  //   const payment = userPayments[index];
  //   const fontSize = 12;

  //   const pdfDoc = await PDFDocument.create();
  //   let page = pdfDoc.addPage();

  //   let currentY = 750; // Initial Y position

  //   // Iterate over payment object and add details to the PDF
  //   for (const [key, value] of Object.entries(payment)) {
  //     if (currentY <= 40) {
  //       // Create a new page
  //       page = pdfDoc.addPage();
  //       currentY = 750;
  //     }

  //     page.drawText(`${key}: ${value}`, { x: 60, y: currentY, color: rgb(0, 0, 0), size: fontSize });
  //     currentY -= 40; // Adjust Y position for the next line
  //   }

  //   const pdfBytes = await pdfDoc.save();

  //   const blob = new Blob([pdfBytes], { type: "application/pdf" });

  //   // Open the PDF in a new tab
  //   const pdfUrl = URL.createObjectURL(blob);
  //   window.open(pdfUrl, "_blank");

  //   // // Create a download link
  //   // const link = document.createElement("a");
  //   // link.href = URL.createObjectURL(blob);
  //   // link.download = `payment_${payment.id}.pdf`;

  //   // // Append the link to the document and trigger the download
  //   // document.body.appendChild(link);
  //   // link.click();

  //   // // Remove the link from the document
  //   // document.body.removeChild(link);
  // };

  const generatePDF = async (index: any) => {
    const payment = userPayments[index];
    const maxLinesPerPage = 15;
    const fontSize = 12;

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    let currentY = 750; // Initial Y position
    let linesDrawn = 0;

    // Iterate over payment object and add details to the PDF
    for (const [key, value] of Object.entries(payment)) {
      if (linesDrawn >= maxLinesPerPage) {
        // Create a new page
        page = pdfDoc.addPage();
        currentY = 750;
        linesDrawn = 0;
      }

      page.drawText(`${key}: ${value}`, { x: 60, y: currentY, color: rgb(0, 0, 0), size: fontSize });
      currentY -= 50; // Adjust Y position for the next line
      linesDrawn += 1;
    }

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // // Open the PDF in a new tab
    // const pdfUrl = URL.createObjectURL(blob);
    // window.open(pdfUrl, "_blank");

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `payment.pdf`;

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav secondaryColor={secondaryColor} currentPage={"Payment"} />
        <section className="grow px-4 lg:px-8 flex flex-col gap-8">
          <Tabs defaultValue="history" className="w-full">
            <TabsList>
              {/* <TabsTrigger
                value="upcoming"
                className="inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
              >
                Upcoming Payment
              </TabsTrigger> */}
              <TabsTrigger
                value="history"
                className="inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
              >
                Payment History
              </TabsTrigger>
            </TabsList>
            {/* <TabsContent value="upcoming" className="py-8">
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
            </TabsContent> */}
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
                        Payment Type
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
                    {userPayments.length === 0 ? (
                      <tr>
                        <td className="text-center py-4">No payment history found.</td>
                      </tr>
                    ) : (
                      userPayments.map((payment, index) => (
                        <tr key={index} className="bg-white ">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {payment.courseTitle}
                          </th>
                          <td className="px-6 py-4 font-medium">{payment.amount}</td>
                          <td className="px-6 py-4 font-medium">{payment.paymentType}</td>
                          {/* Assuming `payment.createdAt` is a valid date string, you might want to format it accordingly */}
                          <td className="px-6 py-4 font-medium">{new Date(payment.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-medium">
                            <div className={`flex gap-1 items-center ${payment.status === "PENDING" ? "text-red-500" : "text-green-500"}`}>
                              <MinusCircleIcon className="w-3 h-3" />
                              {payment.status}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button onClick={() => generatePDF(index)} style={{ backgroundColor: secondaryColor }} className="w-fit flex gap-2">
                              <DownloadIcon className="w-4 h-4" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
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

export default History;
