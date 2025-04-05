// import React from "react";
// import "./styles/InternshipStat.css";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

// const data = [
//   { name: "Colgate Palmolive", stipend: 25000, offers: 19 },
//   { name: "JP Morgan Chase & Co.", stipend: 75000, offers: 1 },
//   { name: "GE Aerospace", stipend: 40000, offers: 3 },
//   { name: "NVIDIA", stipend: 40000, offers: 5 },
//   { name: "KPMG", stipend: 20000, offers: 2 },
//   { name: "Siemens", stipend: 15000, offers: 2 },
// ];

// const InternshipStatistics = () => {
//   return (
//     <div className="intern-stats-container">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} layout="vertical" margin={{ left: 50, right: 30 }}>
//           <XAxis type="number" dataKey="stipend" tick={{ fill: "#003049", fontSize: 7}} />
//           <YAxis type="category" dataKey="name" tick={{ fill: "#003049" }} width={50} />
//           <Tooltip />
//           <Bar dataKey="stipend" fill="url(#colorUv)">
//             <LabelList dataKey="stipend" position="insideRight" fill="#fff" style={{ fontSize: 12 }} />
//           </Bar>
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="5%" stopColor="#003049" stopOpacity={1} />
//               <stop offset="95%" stopColor="#003049" stopOpacity={0.5} />
//             </linearGradient>
//           </defs>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default InternshipStatistics;

import React from "react";
import "./styles/InternshipStat.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

const data = [
  { name: "Colgate Palmolive", stipend: 25000, offers: 19 },
  { name: "JP Morgan Chase & Co.", stipend: 75000, offers: 1 },
  { name: "GE Aerospace", stipend: 40000, offers: 3 },
  { name: "NVIDIA", stipend: 40000, offers: 5 },
  { name: "KPMG", stipend: 20000, offers: 2 },
  { name: "Siemens", stipend: 15000, offers: 2 },
];

const InternshipStatistics = () => {
  return (
    <div className="intern-stats-container">
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} layout="vertical" margin={{  }}>
          <XAxis type="number" dataKey="stipend" tick={{ fill: "#003049", fontSize: 10 }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#003049", fontSize: 10 }} // Reduced font size
            width={80}
          />
          <Tooltip />
          <Bar dataKey="stipend" fill="url(#colorUv)" barSize={25}> {/* Reduced bar thickness */}
            <LabelList dataKey="stipend" position="insideRight" fill="#fff" style={{ fontSize: 10 }} />
          </Bar>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#003049" stopOpacity={1} />
              <stop offset="95%" stopColor="#003049" stopOpacity={0.5} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InternshipStatistics;
