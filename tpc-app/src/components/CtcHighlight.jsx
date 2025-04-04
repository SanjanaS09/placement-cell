import React from "react";
import "./styles/CtcHighlight.css";
import { Line } from "react-chartjs-2";

const CTCWaveChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => ""),
    datasets: [
      {
        label: "CTC Highlights",
        data: data.map((item) => item.ctc),
        borderColor: "#003049",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(0, 48, 73, 0.3)");
          gradient.addColorStop(1, "rgba(0, 48, 73, 0)");
          return gradient;
        },
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: "start", // Gradient applied only under the curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const company = data[tooltipItem.dataIndex].company;
            const students = data[tooltipItem.dataIndex].students;
            return `${company}: ${tooltipItem.raw} LPA, ${students} students`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        title: {
          display: true,
          text: "CTC Offered (LPA)",
          color: "#003049",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#003049",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

const App = () => {
  const companyData = [
    { company: "Oracle", ctc: 1, students: 1 },
    { company: "Deutsche Bank", ctc: 7, students: 7 },
    { company: "JP Morgan Chase & Co.", ctc: 19.75, students: 1 },
    { company: "VISA", ctc: 32.76, students: 4 },
    { company: "Barclays", ctc: 12.49, students: 13 },
    { company: "KPMG", ctc: 5, students: 7 },
    { company: "Deloitte USI", ctc: 7.6, students: 16 },
    { company: "Bank of America", ctc: 6.45, students: 34 },
    { company: "Deloitte IN", ctc: 7.6, students: 14 },
    { company: "Rite Technologies", ctc: 4.4, students: 1 },
    { company: "NetWeaver", ctc: 4.5, students: 4 },
    { company: "Amdocs", ctc: 5.3, students: 12 },
    { company: "Accenture", ctc: 4.5, students: 5 },
    { company: "Publicis Sapient", ctc: 4.58, students: 9 },
    { company: "HSBC", ctc: 9, students: 2 },
    { company: "Capgemini", ctc: 4.25, students: 19 },
    { company: "ExcelR", ctc: 6, students: 2 },
    { company: "Argon & Co.", ctc: 4, students: 1 },
    { company: "IIDE", ctc: 7.2, students: 10 },
    { company: "Eduvanz", ctc: 6, students: 2 },
    { company: "Colgate Palmolive", ctc: 2, students: 2 },
    { company: "CleverTap", ctc: 6, students: 1 },
  ];

  return (
    <div className="chart-wrapper">
      <CTCWaveChart data={companyData} />
    </div>
  );
};

export default App;