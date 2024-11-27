import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Adjust path as necessary
import { useSearchParams } from 'next/navigation';

function BookThisTour() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    tickets: '',
    message: '',
  });

  const { email: userEmail, chosenItems } = useAuth(); // Get user email from AuthContext
  const searchParams = useSearchParams(); // Access query parameters

  const [dynamicTrip, setDynamicTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    accommodation: '',
    activities: '',
    plannedTrips: [] as {
      destination: string;
      startDate: Date;
      endDate: Date;
      accommodation?: string;
      activities?: string[];
      status?: 'upcoming' | 'completed' | 'canceled';
      name?: string;
      tickets?: number;
      phone?: string;
      chosenItems?: {
        title: string;
        type: string;
        details: Record<string, any>;
      }[];
    }[],
  });

  useEffect(() => {
    if (chosenItems && chosenItems.length > 0 && chosenItems[0].details) {
      const userDetails = chosenItems[0];
      const destination = userDetails.details.destinationCity || 'Default Destination';
      const startDate = userDetails.details.startDate || new Date().toISOString();
      const endDate =
        userDetails.details.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const activities = userDetails.details.activities || JSON.stringify(['Hiking']);

      setDynamicTrip({
        destination,
        startDate,
        endDate,
        accommodation: 'Default Accommodation',
        activities: Array.isArray(activities) ? activities : JSON.parse(activities),
        plannedTrips: [
          {
            destination,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            accommodation: 'Default Accommodation',
            activities: Array.isArray(activities) ? activities : JSON.parse(activities),
            status: 'upcoming',
            name: formData.name,
            tickets: Number(formData.tickets),
            phone: formData.phone,
            chosenItems,
          },
        ],
      });
    } else {
      console.error('Chosen items or details are undefined:', chosenItems);
    }
  }, [chosenItems, formData.name, formData.tickets, formData.phone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert('Emails do not match!');
      return;
    }

    const plannedTrip = {
      ...dynamicTrip,
      name: formData.name,
      tickets: formData.tickets,
      phone: formData.phone,
    };

    try {
      const response = await fetch('/api/users/planned-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, plannedTrip }),
      });

      if (!response.ok) throw new Error('Failed to submit data');
      alert('Tour booked successfully!');
    } catch (error) {
      console.error('Error submitting tour:', error);
      alert('Failed to book tour.');
    }
  };

  return (
    <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Book This Tour</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Choose the tour package that best suits your needs. Let us make your travel arrangements seamless.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 bg-white dark:bg-gray-700 dark:text-gray-200 focus:ring-pink-500"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 bg-white dark:bg-gray-700 dark:text-gray-200 focus:ring-pink-500"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="email"
          name="confirmEmail"
          placeholder="Confirm Email"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 bg-white dark:bg-gray-700 dark:text-gray-200 focus:ring-pink-500"
          value={formData.confirmEmail}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 bg-white dark:bg-gray-700 dark:text-gray-200 focus:ring-pink-500"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="number"
          name="tickets"
          placeholder="Number of Tickets"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 bg-white dark:bg-gray-700 dark:text-gray-200 focus:ring-pink-500"
          value={formData.tickets}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 bg-white dark:bg-gray-700 dark:text-gray-200 focus:ring-pink-500"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:ring-offset-gray-900"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BookThisTour;
