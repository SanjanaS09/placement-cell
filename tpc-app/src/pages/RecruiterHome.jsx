// RecruiterDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Bell, Briefcase, Users, Calendar, Activity, Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [candidateStats, setCandidateStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  
  // Mock data fetch (replace with actual API calls)
  useEffect(() => {
    // Fetch data from your API
    setActiveJobs([
      { id: 1, title: 'Software Engineer', department: 'Engineering', applicants: 24, deadline: '2025-05-15' },
      { id: 2, title: 'Product Manager', department: 'Product', applicants: 18, deadline: '2025-05-20' },
      { id: 3, title: 'UX Designer', department: 'Design', applicants: 12, deadline: '2025-05-10' },
    ]);

    setUpcomingEvents([
      { id: 1, title: 'Technical Interview', candidate: 'Alex Johnson', position: 'Software Engineer', date: '2025-04-23', time: '10:00 AM' },
      { id: 2, title: 'Campus Recruitment Drive', location: 'MIT', date: '2025-04-28', time: '09:00 AM' },
    ]);

    setCandidateStats({
      total: 54,
      new: 12,
      screening: 18,
      interview: 15,
      offered: 6,
      rejected: 3
    });

    setNotifications([
      { id: 1, message: 'New application for Software Engineer position', time: '2 hours ago' },
      { id: 2, message: 'Interview scheduled with Taylor Smith', time: '5 hours ago' },
      { id: 3, message: 'Deadline approaching for Product Manager JD', time: '1 day ago' },
    ]);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            </button>
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src="/api/placeholder/40/40"
                alt="Profile"
              />
              <span className="ml-2 font-medium">Recruiter Name</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Briefcase size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Active Jobs</h2>
              <p className="text-2xl font-semibold">{activeJobs.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Candidates</h2>
              <p className="text-2xl font-semibold">{candidateStats.total || 0}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Calendar size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Upcoming Events</h2>
              <p className="text-2xl font-semibold">{upcomingEvents.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <Activity size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Interviews</h2>
              <p className="text-2xl font-semibold">{candidateStats.interview || 0}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Active Job Postings</h2>
                <Link to="/recruiter/jobs/new" className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Plus size={18} className="mr-1" />
                  <span>New Job</span>
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Job Title</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Department</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Applicants</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Deadline</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeJobs.map(job => (
                      <tr key={job.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <Link to={`/recruiter/jobs/${job.id}`} className="text-blue-600 hover:underline">
                            {job.title}
                          </Link>
                        </td>
                        <td className="py-4 px-4">{job.department}</td>
                        <td className="py-4 px-4">{job.applicants}</td>
                        <td className="py-4 px-4">{job.deadline}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                            <button className="text-gray-600 hover:text-gray-800">View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Upcoming Events and Notifications */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
              {upcomingEvents.map(event => (
                <div key={event.id} className="mb-4 pb-4 border-b last:border-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {event.candidate ? `Candidate: ${event.candidate}` : event.location} • {event.time}
                  </p>
                </div>
              ))}
              <Link to="/recruiter/events" className="text-blue-600 hover:underline text-sm">
                View all events
              </Link>
            </div>

            {/* Notifications */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
              {notifications.map(notification => (
                <div key={notification.id} className="mb-3 pb-3 border-b last:border-0">
                  <p className="text-gray-800">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Pipeline */}
        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Candidate Pipeline</h2>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/5 p-3 text-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium">New Applications</h3>
                  <p className="text-2xl font-bold mt-2">{candidateStats.new || 0}</p>
                </div>
              </div>
              <div className="w-full md:w-1/5 p-3 text-center">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-medium">Screening</h3>
                  <p className="text-2xl font-bold mt-2">{candidateStats.screening || 0}</p>
                </div>
              </div>
              <div className="w-full md:w-1/5 p-3 text-center">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="font-medium">Interview</h3>
                  <p className="text-2xl font-bold mt-2">{candidateStats.interview || 0}</p>
                </div>
              </div>
              <div className="w-full md:w-1/5 p-3 text-center">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="font-medium">Offer</h3>
                  <p className="text-2xl font-bold mt-2">{candidateStats.offered || 0}</p>
                </div>
              </div>
              <div className="w-full md:w-1/5 p-3 text-center">
                <div className="bg-red-100 p-4 rounded-lg">
                  <h3 className="font-medium">Rejected</h3>
                  <p className="text-2xl font-bold mt-2">{candidateStats.rejected || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;