import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import   
 './Content1.css';

ChartJS.register(ArcElement); // Register ArcElement
ChartJS.register(Tooltip, Legend); // Existing registrations

const Content1 = () => {
  const votingPercentages = [66.93, 72.08, 72.83, 74.05, 77.39, 85.62, 83.22, 82.81, 82.69, 82.20];
  const totalVotes = votingPercentages.reduce((acc, val) => acc + val, 0);
  const proportions = votingPercentages.map(vote => (vote / totalVotes) * 100);

  const data = {
    labels: [
      'Jaffna', 'Puttalam', 'Batticaloa', 'Vanni', 'Colombo', 
      'Monaragala', 'Hambantota', 'Badulla', 'Anuradhapura', 'Polonnaruwa'
    ],
    datasets: [
      {
        data: proportions,
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#fd6b19', '#009688',
          '#8e44ad', '#2ecc71', '#3498db', '#f39c12', '#d35400'
        ],
        hoverBackgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#fd6b19', '#009688',
          '#8e44ad', '#2ecc71', '#3498db', '#f39c12', '#d35400'
        ]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',  // Move the legend to the right of the pie chart
        align: 'center'
      }
    }
  };

  return (
    <div className="Content1-container">
      <div className="Content1-left">
        <h2 className="Content1-title">Voting Percentage of Districts</h2>
      </div>
      <div className="Content1-right">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Content1;