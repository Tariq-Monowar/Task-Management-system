// import React from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { ApexOptions } from 'apexcharts';
// import { RootState } from '../../../app/store';
// import { useSelector } from 'react-redux';

// interface Project {
//   _id: string;
//   title: string;
//   amount: number;
//   currency: string | 'BDT' | 'USD';
//   priority: 'high' | 'medium' | 'low';
//   status: 'Completed' | 'In Progress' | 'Not Started';
// }

// interface ChartProps {
//   data: Project[];
// }

// const Chart = ( ) => {
//     const { projects  } = useSelector((state: RootState) => state.project);

//   const convertedData = projects.map((project) => ({
//     ...project,
//     amount: project.currency === 'USD' ? project.amount * 115 : project.amount,
//   }));

//   // Separate data based on priority for bar charting
//   const highPriority = convertedData.filter((project) => project.priority === 'high');
//   const mediumPriority = convertedData.filter((project) => project.priority === 'medium');
//   const lowPriority = convertedData.filter((project) => project.priority === 'low');
// console.log(highPriority)
//   // Bar chart data for priority levels
//   const barChartData = {
//     series: [
//       { name: 'High Priority', data: highPriority.map((project) => project.amount) },
//       { name: 'Medium Priority', data: mediumPriority.map((project) => project.amount) },
//       { name: 'Low Priority', data: lowPriority.map((project) => project.amount) },
//     ],
//     options: {
//       chart: { type: 'bar', height: 350, stacked: true },
//       plotOptions: {
//         bar: { horizontal: false, columnWidth: '45%', endingShape: 'rounded' },
//       },
//       xaxis: { categories: projects?.map((project) => project?.title) },
//       yaxis: { title: { text: 'Amount (in BDT)' } },
//       fill: { opacity: 1 },
//       legend: { position: 'top', horizontalAlign: 'center' },
//     } as ApexOptions,
//   };

//   // Pie chart data for project status distribution
//   const pieChartData = {
//     series: [
//       convertedData?.filter((project) => project?.status === 'Completed')?.length,
//       convertedData?.filter((project) => project?.status === 'In Progress')?.length,
//       convertedData?.filter((project) => project?.status === 'Not Started')?.length,
//     ],
//     options: {
//       chart: { type: 'pie', height: 350 },
//       labels: ['Completed', 'In Progress', 'Not Started'],
//       legend: { position: 'bottom' },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: { chart: { width: 200 }, legend: { position: 'bottom' } },
//         },
//       ],
//     } as ApexOptions,
//   };

//   // Line chart data for cumulative amount by priority over project index
//   const cumulativeAmounts = {
//     high: highPriority?.map((project, i, arr) =>
//       arr.slice(0, i + 1).reduce((acc, cur) => acc + cur.amount, 0)
//     ),
//     medium: mediumPriority.map((project, i, arr) =>
//       arr.slice(0, i + 1).reduce((acc, cur) => acc + cur.amount, 0)
//     ),
//     low: lowPriority.map((project, i, arr) =>
//       arr.slice(0, i + 1).reduce((acc, cur) => acc + cur.amount, 0)
//     ),
//   };

//   const lineChartData = {
//     series: [
//       { name: 'High Priority', data: cumulativeAmounts.high },
//       { name: 'Medium Priority', data: cumulativeAmounts.medium },
//       { name: 'Low Priority', data: cumulativeAmounts.low },
//     ],
//     options: {
//       chart: { type: 'line', height: 350 },
//       xaxis: { categories: highPriority.map((_, i) => `Project ${i + 1}`) },
//       yaxis: { title: { text: 'Cumulative Amount (in BDT)' } },
//       stroke: { curve: 'smooth', width: 2 },
//       legend: { position: 'top', horizontalAlign: 'center' },
//       tooltip: { y: { formatter: (val: number) => `${val} BDT` } },
//     } as ApexOptions,
//   };

//   return (
//     <div>
//       <h3>Project Priority Distribution (Bar Chart)</h3>
//       <ReactApexChart
//         options={barChartData.options}
//         series={barChartData.series}
//         type="bar"
//         height={350}
//       />
      
//       <h3>Project Status Distribution (Pie Chart)</h3>
//       <ReactApexChart
//         options={pieChartData.options}
//         series={pieChartData.series}
//         type="pie"
//         height={350}
//       />

//       <h3>Cumulative Project Amounts by Priority (Line Chart)</h3>
//       <ReactApexChart
//         options={lineChartData.options}
//         series={lineChartData.series}
//         type="line"
//         height={350}
//       />
//     </div>
//   );
// };

// export default Chart;
