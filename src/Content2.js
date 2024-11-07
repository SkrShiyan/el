import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './Content2.css';

// Register the necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const districtData = {
  "Western Province": {
    "Colombo District": {
      "Colombo": { "TVK": 40, "NTK": 35, "DMK": 20, "Others": 5 },
      "Dehiwala-Mount Lavinia": { "NTK": 50, "TVK": 30, "DMK": 15, "Others": 5 },
      "Moratuwa": { "DMK": 45, "TVK": 35, "NTK": 15, "Others": 5 }
    },
    "Gampaha District": {
      "Gampaha": { "TVK": 60, "NTK": 20, "DMK": 15, "Others": 5 }
    },
    "Kalutara District": {
      "Panadura": { "DMK": 55, "TVK": 25, "NTK": 15, "Others": 5 }
    }
  },
  "Central Province": {
    "Kandy District": {
      "Kandy": { "TVK": 45, "DMK": 30, "NTK": 20, "Others": 5 }
    },
    "Matale District": {
      "Dambulla": { "NTK": 50, "TVK": 25, "DMK": 20, "Others": 5 }
    },
    "Nuwara Eliya District": {
      "Ella": { "TVK": 55, "DMK": 30, "NTK": 10, "Others": 5 }
    }
  },
  "Southern Province": {
    "Galle District": {
      "Galle": { "TVK": 40, "DMK": 35, "NTK": 20, "Others": 5 }
    },
    "Matara District": {
      "Matara": { "NTK": 55, "DMK": 25, "TVK": 15, "Others": 5 }
    },
    "Hambantota District": {
      "Tangalle": { "DMK": 45, "TVK": 35, "NTK": 15, "Others": 5 }
    }
  },
  "Northern Province": {
    "Jaffna District": {
      "Jaffna": { "NTK": 65, "DMK": 20, "TVK": 10, "Others": 5 }
    },
    "Kilinochchi District": {
      "Kilinochchi": { "DMK": 60, "NTK": 25, "TVK": 10, "Others": 5 }
    },
    "Mannar District": {
      "Mannar": { "TVK": 50, "NTK": 35, "DMK": 10, "Others": 5 }
    }
  }
};

const Content2 = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [divisionData, setDivisionData] = useState(null);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedDivision("");

    const foundDivisions = districtData[Object.keys(districtData).find(province =>
      Object.keys(districtData[province]).includes(district))][district];

    setDivisions(Object.keys(foundDivisions));
    setDivisionData(null);  // Reset division data when district changes
  };

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);

    if (division && selectedDistrict) {
      const data = districtData[Object.keys(districtData).find(province =>
        Object.keys(districtData[province]).includes(selectedDistrict))][selectedDistrict][division];
      setDivisionData(data);
    }
  };

  const barData = {
    labels: divisionData ? Object.keys(divisionData) : [],
    datasets: [
      {
        label: 'Popularity Percentage',
        data: divisionData ? Object.values(divisionData) : [],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
      }
    ]
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Teams'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Popularity of Teams in Selected Division'
      }
    }
  };

  return (
    <div className="Content2-container">
      <h2>Select District and Division</h2>

      {/* District Dropdown */}
      <label>
        District:
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          {Object.values(districtData).flatMap(province =>
            Object.keys(province).map((district) => (
              <option key={district} value={district}>{district}</option>
            ))
          )}
        </select>
      </label>

      {/* Division Dropdown */}
      <label>
        Division:
        <select value={selectedDivision} onChange={handleDivisionChange} disabled={!divisions.length}>
          <option value="">Select Division</option>
          {divisions.map((division) => (
            <option key={division} value={division}>{division}</option>
          ))}
        </select>
      </label>

      {/* Display selected district and division */}
      <div>
        <h3>Selected Location:</h3>
        <p>District: {selectedDistrict || "None"}</p>
        <p>Division: {selectedDivision || "None"}</p>
      </div>

      {/* Bar Chart */}
      {divisionData && (
        <div className="Content2-barChart">
          <Bar data={barData} options={barOptions} />
        </div>
      )}
    </div>
  );
};

export default Content2;