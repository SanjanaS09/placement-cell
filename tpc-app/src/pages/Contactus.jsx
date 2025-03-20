import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import database from '../firebaseConfig'; // Ensure Firebase is imported
import '../styles/contactus.css';
import logo from '../assets/images/IIIC-logo.png';

const ContactUs = () => {
  const [data, setData] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await database.ref('Team').once('value');
        if (snapshot.exists()) {
          setData(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='teamContainer container-fluid'>
      <nav className="navbar-contactus">
        <div className="logo">
          <img src={logo} alt="Logo" width={100} height={100} />
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/')} className="nav-button">Home</button>
        </div>
      </nav>
      <div className='card-container justify-content-center align-items-center p-1'>
        <div className='col-12 cards'>
          {Object.entries(data).map(([key, member]) => (
            <div className='team-card' key={key} onClick={() => setSelectedMember(member)}>
              <img src={member.img} alt={member.name} />
              <div className='details'>
                <p>{member.name}</p>
                <div>{member.role}</div>
              </div>
              <button className="openButton">Open</button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL - Pop-up Window */}
      {
        selectedMember && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setSelectedMember(null)}>&times;</span>
              <img src={selectedMember.img} alt={selectedMember.name} className="modal-img" />
              <h2>{selectedMember.name}</h2>
              <p><strong>Role:</strong> {selectedMember.role}</p>
              <p><strong>Email:</strong> {selectedMember.email}</p>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default ContactUs;



// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import database from '../FirebaseConfig';

// import '../styles/team.css';


// const TeamPage = () => {
//   const [code, setCode] = useState(null);
//   const [data, setData] = useState({});

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const dataSnapshot = await database.ref('statics/team').once('value');
//         setData(dataSnapshot.val());
//       }
//       catch (error) {
//         console.log(error.message);
//       }

//       // Parse query parameters from the URL
//       const params = new URLSearchParams(location.search);
//       setCode(params.get('code'));
//     };

//     fetchData();
//   }, [location]);


//   return (
//     <div className='teamContainer container-fluid m-0 p-3'>
//       <div className='row justify-content-center align-items-center m-3 p-1'>
//         {code === null ? (
//           <div>
//             <button className='col-12 backButton' onClick={() => navigate('/')}>&#10006;</button>
//             <div className='col-12 cards'>
//               {Object.entries(data).map(([key, member]) => (
//                 <div
//                   className='card'
//                   key={key}
//                   onClick={() => navigate(`/teampage?code=${encodeURI(key)}`)}
//                 >
//                   <img src={`${member.imgLink}`} alt={key} />
//                   <div className='details' style={{ marginTop: '100px' }}>
//                     <p>{member.name}</p>
//                     <div>{member.desig}</div>
//                   </div>
//                   <button className="openButton" onClick={() => navigate(`/teampage?code=${encodeURI(key)}`)}> Open</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className='col-12'>
//             <button className='col-12 backButton mb-3' onClick={() => navigate('/teampage')}>&larr;</button>
//             <div className='cards'>
//               <div className='col-12 cardPrivate'>
//                 <img src={data[code].imgLink} alt={code} />
//                 <div className='detailsPrivate' style={{ marginTop: '100px' }}>
//                   <p>{data[code].name}</p>
//                   <div>{data[code].desig}<br /><br />{data[code].email}<br />{data[code].pnum}</div>
//                 </div>
//                 <a className="fa fa-whatsapp whatsappButton" href={encodeURI(`https://wa.me/${(data[code].pnum).replace(' ', '').replace(' ', '')}/?text=Hey ${data[code].name}, let's get drilling`)} target='_blank' rel="noreferrer"> </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div >
//   );
// };

// export default TeamPage;



{/* <div>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" width={100} height={100}/>
        </div>
      </nav>
      <div className="container-contactus">
        <section className="chairperson">
          <h2>IIIC Co-ordinator</h2>
          <div className="profile">
            <img src={VilasKharat} alt="VilasKharat" />
            <div className="details">
              <h3>Vilas Kharat</h3>
              <p></p>
              <p><strong>Email:</strong> <a href="mailto:vilas1221@gmail.com">vilas1221@gmail.com</a></p>
              <p><strong>Phone:</strong> 123-456-7890</p>
            </div>
          </div>
        </section>

        <section className="manager">
          <h2>Assistant General Manager-Placement</h2>
          <div className="profile">
            <div className="details">
              <h3>Jane Doe</h3>
              <p>Assistant General Manager of Placement Office</p>
              <p><strong>Email:</strong> <a href="mailto:jane.doe@university.edu">jane.doe@university.edu</a></p>
              <p><strong>Office Phone:</strong> 234-567-8901</p>
            </div>
          </div>
        </section>

        <section className="staff">
          <h2>Head of Departments</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Michael Brown</td>
                <td>Assistant Manager</td>
                <td>Placement Office</td>
                <td>michael.brown@university.edu</td>
                <td>345-678-9012</td>
              </tr>
              <tr>
                <td>Linda Green</td>
                <td>Assistant Manager</td>
                <td>Placement Office</td>
                <td>linda.green@university.edu</td>
                <td>456-789-0123</td>
              </tr>
              <tr>
                <td>David White</td>
                <td>Executive</td>
                <td>Placement Office</td>
                <td>david.white@university.edu</td>
                <td>567-890-1234</td>
              </tr>
              <tr>
                <td>Alice Black</td>
                <td>Coordinator</td>
                <td>Placement Office</td>
                <td>alice.black@university.edu</td>
                <td>678-901-2345</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="committee">
          <h2>Student Placement Committee Members 2024</h2>
          <table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Robert Davis</td>
                <td>Recruitment Secretary</td>
                <td>robert.davis@university.edu</td>
                <td>789-012-3456</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jessica Moore</td>
                <td>Elected Placement Coordinator</td>
                <td>jessica.moore@university.edu</td>
                <td>890-123-4567</td>
              </tr>
              <tr>
                <td>3</td>
                <td>William Johnson</td>
                <td>Elected Placement Coordinator</td>
                <td>william.johnson@university.edu</td>
                <td>901-234-5678</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div> */}