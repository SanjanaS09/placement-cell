import React, { useState, useEffect } from "react";
import { Chart, Bar } from "react-chartjs-2";
import "chart.js/auto"; // Ensure Chart.js is properly loaded
import '../styles/BranchWise.css';


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const StatChart = () => {
    const [data, setData] = useState([]);
    const series = ["2021", "2022", "2023", "2024", "2025"];
    const labels = ["CE", "CST", "ENC", "DS", "IT"];
    const colors = ["#1B4965", "#5FA8D3", "CAE9FF", "#BBE1FA", "#003049"];

    const populateArray = () => {
        let newData = [];
        for (let i = 0; i < series.length; i++) {
            let temp = [];
            for (let j = 0; j < labels.length; j++) {
                temp.push(getRandomInt(0, 20));
            }
            newData.push(temp);
        }
        setData(newData);
    };

    useEffect(() => {
        populateArray();
        const interval = setInterval(populateArray, 2000);
        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: labels,
        datasets: series.map((serie, index) => ({
            label: serie,
            data: data[index] || [],
            backgroundColor: colors[index % colors.length],
        })),
    };

    return (
        <div style={{ width: "600px", margin: "auto" }}>
            <h2>Dynamic Chart with React & Chart.js</h2>
            <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
        </div>
    );
};

export default StatChart;