// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserProfile = ({ id }) => {
//   const [userData, setUserData] = useState({ name: '', alias: '', email: '' });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Use template literals for the URL
//         const { data } = await axios.get(`/api/users/${id}`);
        
//         // Update state with the received data
//         setUserData(data);
//       } catch (err) {
//         // Set error state if the request fails
//         setError('Error fetching user data');
//       }
//     };

//     // Trigger data fetch
//     fetchUserData();
//   }, [userId]); // Re-run the effect if userId changes

//   // Return the UI
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Name: {userData.name}</h2>
//       <p>Alias: {userData.alias}</p>
//       <p>Email: {userData.email}</p>
//     </div>
//         <h2>Total Number of Posts: </h2>
//     <div>
//         <p></p>
//     </div>
//   );
// };

// export default UserProfile;
