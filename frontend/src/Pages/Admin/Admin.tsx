import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, DollarSign, Users, Stethoscope, Calendar } from 'lucide-react';
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";

const AdminPage = () => {
  const mockVisitorData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 400 },
    { name: 'Fri', value: 500 },
    { name: 'Sat', value: 350 },
    { name: 'Sun', value: 450 },
  ];

  const mockRecoveryData = [
    { name: 'Mon', value: 300 },
    { name: 'Tue', value: 400 },
    { name: 'Wed', value: 350 },
    { name: 'Thu', value: 500 },
    { name: 'Fri', value: 450 },
    { name: 'Sat', value: 400 },
    { name: 'Sun', value: 470 },
  ];

  const bestDoctors = [
    { name: 'Dr. Sarah', img: '/api/placeholder/64/64', specialty: 'Dentist' },
    { name: 'Dr. John', img: '/api/placeholder/64/64', specialty: 'Surgeon' },
    { name: 'Dr. Emily', img: '/api/placeholder/64/64', specialty: 'Orthodontist' },
    { name: 'Dr. Michael', img: '/api/placeholder/64/64', specialty: 'Periodontist' },
  ];

  const handleAddDoctor = () => {
    console.log('Add doctor clicked');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
       <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>
      <div className="max-w-[80rem] mx-auto">
      

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-xl shadow-lg">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={24} className="opacity-90" />
                <div className="text-sm opacity-90">Financial Earnings</div>
              </div>
              <div className="text-xl font-bold">$ 800K - 500K</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-5 rounded-xl shadow-lg">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Users size={24} className="opacity-90" />
                <div className="text-sm opacity-90">Total Patients</div>
              </div>
              <div className="text-xl font-bold">600</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-5 rounded-xl shadow-lg">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope size={24} className="opacity-90" />
                <div className="text-sm opacity-90">Operations</div>
              </div>
              <div className="text-xl font-bold">400</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-800 p-5 rounded-xl shadow-lg">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={24} className="opacity-90" />
                <div className="text-sm opacity-90">Appointments</div>
              </div>
              <div className="text-xl font-bold">80</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* Best Doctors */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Our Doctors</h2>
                <div className="flex gap-4 items-center">
                  <button className="text-blue-600 text-sm font-medium">View all</button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 min-h-[12rem]">
                {bestDoctors.map((doctor, index) => (
                  <div key={index} className="bg-white p-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md border border-slate-200">
                    <img src={doctor.img} alt={doctor.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                    <div className="text-sm font-medium text-slate-900">{doctor.name}</div>
                    <div className="text-xs text-slate-500">{doctor.specialty}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patients */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-75">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Patients</h2>
                <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  View all 
                  <span className="inline-block rotate-45"></span>
                </button>
              </div>
              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="8"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeDasharray="377"
                      strokeDashoffset="94.25"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-slate-500 text-sm">Total Patients</div>
                    <div className="text-slate-900 font-bold text-xl">784,670</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                    <div className="text-slate-900 font-medium">New</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="text-slate-900 font-medium">Treatment</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {/* Visitors Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Visitors</h2>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockVisitorData}>
                    <XAxis dataKey="name" stroke="#374151" />
                    <YAxis stroke="#374151" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recovered Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Recovered</h2>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockRecoveryData}>
                    <XAxis dataKey="name" stroke="#374151" />
                    <YAxis stroke="#374151" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
