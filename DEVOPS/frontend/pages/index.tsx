import React, { useState } from 'react';
import Image from 'next/image';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/greet?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`);
      const data = await response.json();
      setGreeting(data.greeting);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-md">
        <div className="text-center mb-6">
          <Image src="/img.png" alt="Welcome to our Website" width={800} height={400} />
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to our Website</h1>

        {greeting && <p className="text-xl text-green-600 mb-6">{greeting}</p>}

        <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
          <label className="mb-2 text-gray-700">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />

          <label className="mb-2 text-gray-700">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Say Hello
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;

