import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Importing type for better type checking
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

interface Project {
  _id: string;
  title: string;
  amount: number;
  currency: string | 'BDT' | 'USD';
  priority: string | 'high' | 'medium' | 'low';
  status: 'Completed' | 'In Progress' | 'Not Started';
}

const Chart = () => {
  const { projects, sidebarEnable } = useSelector((state: RootState) => state.project);
  const [chartWidth, setChartWidth] = useState<number>(0); // To track chart's width

  // Convert amounts to BDT if they are in USD
  const convertedData = projects.map((project) => ({
    ...project,
    amount: project.currency === 'USD' ? project.amount * 115 : project.amount,
  }));

  // Adjust chart's width based on window size and sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      // Adjust the chart's width based on the window size and sidebar state
      const containerWidth = window.innerWidth;
      setChartWidth(containerWidth - (sidebarEnable ? 250 : 0)); // 250px is assumed sidebar width
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially to set the correct size

    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarEnable]); // Trigger update on sidebar toggle

  // Chart data based on project amounts
  const chartData = {
    series: [
      {
        name: 'Amount',
        data: convertedData.map((project) => project.amount),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        title: {
          text: 'Project Amounts',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
          colors: ['gray'],
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: projects.map((project) => project.title),
        labels: {
          rotate: -45, // Slightly rotate x-axis labels for better visibility
        },
        title: {
          text: 'Projects',
        },
      },
      yaxis: {
        title: {
          text: 'Amount (BDT)',
        },
        labels: {
          formatter: (value) => `${value} ৳`, // Add BDT symbol to Y-axis
        },
      },
      fill: {
        opacity: 0.8,
        colors: ['#00E396'], // Custom bar color
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val} ৳`, // Add BDT symbol to tooltip
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        markers: {
          width: 16,
          height: 16,
          radius: 50,
        },
      },
      grid: {
        borderColor: '#e2e2e2',
      },
    } as ApexOptions, // Explicitly declare as ApexOptions
  };

  return (
    <div id="chart" style={{ width: '100%', maxWidth: chartWidth, marginTop: '40px'   }}>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={390}
      />
    </div>
  );
};

export default Chart;
