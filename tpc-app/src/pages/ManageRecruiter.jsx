// import React, { useState, useEffect } from "react";
// import firebase from "firebase/compat/app";
// import "firebase/compat/database";
// import "../styles/TPOPage.css";



// const ManageRecruiter = () => {
//     const [recruiters, setRecruiters] = useState([]);

//     useEffect(() => {
//         const snapshot = firebase.database().ref("Recruiters").once("value");
//         const data = snapshot.val();
//         setRecruiters(data ? Object.values(data) : []);
//     }, []);


//     return (
//         <div className="tpo-container">
//             <div className="recruiter-section">
//                 <h2>Recruiter Details</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Company Name</th>
//                             <th>Internship Title</th>
//                             <th>Internship Description</th>
//                             <th>Remote/On-Site</th>
//                             <th>Employment Type</th>
//                             <th>Job Title</th>
//                             <th>Job Description</th>
//                             <th>Job Location</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {recruiters.map((recruiter, index) => (
//                             <tr key={index}>
//                                 <td>{recruiter.company_name}</td>
//                                 <td>{recruiter.internship?.internship_title || "N/A"}</td>
//                                 <td>{recruiter.internship?.internship_description || "N/A"}</td>
//                                 <td>{recruiter.internship?.remote_on_site || "N/A"}</td>
//                                 <td>{recruiter.internship?.type_of_employment || "N/A"}</td>
//                                 <td>{recruiter.placement?.job_title || "N/A"}</td>
//                                 <td>{recruiter.placement?.job_desc || "N/A"}</td>
//                                 <td>{recruiter.placement?.jobLocation || "N/A"}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>);
// };


// export default ManageRecruiter;

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app"; 
import "firebase/compat/database";
import "../styles/TPOPage.css";

const ManageRecruiter = () => {
    const [recruiters, setRecruiters] = useState([]);

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                // Fetch data from Firebase asynchronously
                const snapshot = await firebase.database().ref("Recruiters").once("value");

                // Ensure snapshot is not null or undefined
                if (snapshot.exists()) {
                    const data = snapshot.val();  // Get the data from the snapshot
                    setRecruiters(data ? Object.values(data) : []);
                } else {
                    console.log("No data found for recruiters.");
                    setRecruiters([]);
                }
            } catch (error) {
                console.error("Error fetching recruiters: ", error);
            }
        };

        fetchRecruiters();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="tpo-container">
            <div className="recruiter-section">
                <h2>Recruiter Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Internship Title</th>
                            <th>Internship Description</th>
                            <th>Remote/On-Site</th>
                            <th>Employment Type</th>
                            <th>Job Title</th>
                            <th>Job Description</th>
                            <th>Job Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruiters.map((recruiter, index) => (
                            <tr key={index}>
                                <td>{recruiter.company_name}</td>
                                <td>{recruiter.internship?.internship_title || "N/A"}</td>
                                <td>{recruiter.internship?.internship_description || "N/A"}</td>
                                <td>{recruiter.internship?.remote_on_site || "N/A"}</td>
                                <td>{recruiter.internship?.type_of_employment || "N/A"}</td>
                                <td>{recruiter.placement?.job_title || "N/A"}</td>
                                <td>{recruiter.placement?.job_desc || "N/A"}</td>
                                <td>{recruiter.placement?.jobLocation || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRecruiter;
