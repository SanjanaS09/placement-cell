import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import database from '../firebaseConfig'; // Ensure Firebase is imported
import '../styles/Team.css';
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
      <nav className="nav">
        <div className="logo">
          <img src={logo} alt="Logo" width={50} height={50} />
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
                <button className="openButton">Open</button>
              </div>
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

