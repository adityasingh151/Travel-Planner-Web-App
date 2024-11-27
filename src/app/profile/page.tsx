'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { CiUser } from "react-icons/ci";
import PremiumLoading from "../PremiulLoading";

const ProfilePage: React.FC = () => {
  const { email } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        try {
          const response = await fetch("/api/users/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [email]);

  if (loading) {
    return <PremiumLoading />;
  }

  if (!userData) {
    return (
      <div className="text-center text-xl text-red-600 dark:text-red-400">
        No user data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 text-gray-900 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
      <div className="container mx-auto py-10 px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="col-span-1 mt-10">
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:shadow-none dark:hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <CiUser className="text-white text-5xl" />
                </div>
                <h2 className="text-3xl font-bold text-pink-800 mb-2 dark:text-pink-400">
                  {`${userData.firstName} ${userData.lastName}`}
                </h2>
                <p className="text-gray-700 text-lg dark:text-gray-300">
                  {userData.email}
                </p>
                <p className="text-gray-600 mt-2 dark:text-gray-400">
                  <strong>Mobile:</strong> {userData.mobileNo || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Preferences & Planned Trips Section */}
          <div className="col-span-2 flex flex-col gap-8 mt-10">
            {/* Preferences */}
            {userData.preferences.length > 0 && userData.preferences?.budgetRange && (
              <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:shadow-none dark:hover:shadow-lg">
                <h2 className="text-3xl font-semibold text-pink-800 mb-4 dark:text-pink-400">
                  Preferences
                </h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Budget Range:</strong> ₹
                    {userData.preferences.budgetRange.min || 0} - ₹
                    {userData.preferences.budgetRange.max || 0}
                  </li>
                  <li>
                    <strong>Favorite Destinations:</strong>{" "}
                    {userData.preferences.favoriteDestinations?.length
                      ? userData.preferences.favoriteDestinations.join(", ")
                      : "None"}
                  </li>
                  <li>
                    <strong>Preferred Travel Modes:</strong>{" "}
                    {userData.preferences.travelModes?.length
                      ? userData.preferences.travelModes.join(", ")
                      : "None"}
                  </li>
                </ul>
              </div>
            )}

            {/* Planned Trips */}
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:shadow-none dark:hover:shadow-lg">
              <h2 className="text-3xl font-semibold text-pink-800 mb-4 dark:text-pink-400">
                Planned Trips
              </h2>
              {userData.plannedTrips.length ? (
                <div className="space-y-6">
                  {userData.plannedTrips.map((trip: any, index: number) => (
                    <div
                      key={index}
                      className="border-b pb-4 last:border-none last:pb-0 dark:border-gray-700"
                    >
                      <h3 className="text-xl font-bold text-pink-700 mb-2 dark:text-pink-300">
                        {trip.name}
                      </h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>
                          <strong>Destination:</strong> {trip.destination}
                        </li>
                        <li>
                          <strong>Start Date:</strong>{" "}
                          {new Date(trip.startDate).toLocaleDateString()}
                        </li>
                        <li>
                          <strong>End Date:</strong>{" "}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </li>
                        <li>
                          <strong>Accommodation:</strong> {trip.accommodation}
                        </li>
                        <li>
                          <strong>Activities:</strong>{" "}
                          {trip.activities.length
                            ? trip.activities.join(", ")
                            : "None"}
                        </li>
                        <li>
                          <strong>Chosen Items:</strong>
                          {trip.chosenItems.length ? (
                            <ul className="list-disc pl-6 mt-1 text-gray-700 dark:text-gray-300">
                              {trip.chosenItems.map((item: any) => (
                                <li key={item._id}>
                                  <span>
                                    <strong>{item.title}:</strong>{" "}
                                    {item.type === "place" && item.details.name}
                                    {item.type === "hotel" &&
                                      item.details.description}
                                    {item.type === "flight" &&
                                      `${item.details.airline} (${item.details.departure} to ${item.details.arrival})`}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-600 dark:text-gray-400">
                              None
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No planned trips</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
