import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ProgressCard, { ProgressCardProps } from "@/app/admin/student/[id]/utills/progressCard";
import React, { useEffect, useState } from "react";
import Spinner from "../../../../../../utilComponents/Spinner";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Icons
const completeIcon = <img src="/icons/progress1.svg" alt="check-icon" />;
const highScore = <img src="/icons/progress2.svg" alt="trophy-icon" />;
const lowScore = <img src="/icons/progress3.svg" alt="thumbs-down icon" />;
const averageScore = <img src="/icons/progress4.svg" alt="time-icon" />;

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string;
    borderColor: string;
    barThickness: number;
  }[];
}

interface StatisticsTabProps {
  data: any;
  loading: boolean;
  secondaryColor: any;
}

function StatisticsTab({ data, loading, secondaryColor }: StatisticsTabProps) {
  console.log("statData:", data);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  // useEffect(() => {
  //   setChartData({
  //     labels: [
  //       "100-90",
  //       "90 - 80",
  //       "80-70",
  //       "70-60",
  //       "60-50",
  //       "50-40",
  //       "40-30",
  //       "30-20",
  //       "20-10",
  //       "10-0",
  //     ],
  //     datasets: [
  //       {
  //         data: [-5, -3, 10, 90, 100, 100, 100, -8, -8, -8],
  //         backgroundColor: "#1A183E",
  //         borderColor: "#1A183E",
  //         barThickness: 20,
  //       },
  //     ],
  //   });

  useEffect(() => {
    // Assuming data.chart is defined in your data structure
    if (!data || !data.chart) {
      // Handle the case when data or data.chart is undefined
      return;
    }

    const { chart } = data;

    // Extracting labels and data from data.chart
    const labels = Object.keys(chart).map((key) => key.toString());
    const chartDataValues = Object.values(chart).map((value) => (value as { percentage: number; count: number }).count);

    setChartData({
      labels,
      datasets: [
        {
          data: chartDataValues,
          backgroundColor: secondaryColor,
          borderColor: secondaryColor,
          barThickness: 20,
        },
      ],
    });

    setChartOptions({
      // plugins: {
      //   legend: {
      //     position: "top",
      //   },
      //   title: {
      //     display: true,
      //     text: "Number of Students",
      //   },
      // },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Grade Percentile",
            color: "#000",
            font: {
              size: 16,
              weight: 600,
              padding: { top: 10 },
            },
          },
        },
        y: {
          suggestedMin: 0,
          // beginAtZero: true,
          max: 200,
          ticks: {
            stepSize: 50,
            callback: (value: any) => (value === 0 ? "0" : value),
          },
          title: {
            display: true,
            text: "Number of Students",
            color: "#000",
            font: {
              size: 16,
              weight: 600,
              padding: { right: 10 },
            },
          },
        },
      },
    });
  }, [data]);

  const progressCardProps: ProgressCardProps[] = [
    { icon: completeIcon, text: "Assessments Completed", score: `${data?.completionPercentage || 0}%` },
    { icon: highScore, text: "Highest Score", score: `${data?.highestScore || 0}%` },
    { icon: lowScore, text: "Lowest Score", score: `${data?.lowestScore || 0}%` },
    { icon: averageScore, text: "Average Score", score: `${data?.averageScore || 0}%` },
  ];

  return (
    <div>
      <section className="space-y-12">
        <div className="flex justify-start items-center gap-4">
          {progressCardProps.map((props, index) => (
            <ProgressCard key={index} {...props} />
          ))}
        </div>

        <div className="mt-8">
          {loading && (
            <div className="flex items-center justify-center mt-40">
              {/* Loading indicator or message */}
              <Spinner />
            </div>
          )}
          {!loading && data && data.chart ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <div className="flex mt-40 items-center justify-center">
              <span className="text-xl font-bold text-gray-500">No Statistics For this Assessment</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StatisticsTab;
