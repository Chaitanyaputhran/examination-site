import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

function AdminDashboardComponent({ stats }) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          color="border-blue-500"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="🎓"
          color="border-green-500"
        />
        <StatCard
          title="Subjects"
          value={stats.totalSubjects}
          icon="📚"
          color="border-purple-500"
        />
        <StatCard
          title="Questions"
          value={stats.totalQuestions}
          icon="❓"
          color="border-yellow-500"
        />
        <StatCard
          title="Tests"
          value={stats.totalTests}
          icon="📝"
          color="border-red-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/users"
            className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
          >
            <p className="font-semibold text-blue-700">Manage Users</p>
            <p className="text-sm text-gray-600 mt-1">Add, edit, or delete users</p>
          </a>
          <a
            href="/admin/tests"
            className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
          >
            <p className="font-semibold text-green-700">Manage Tests</p>
            <p className="text-sm text-gray-600 mt-1">Create and configure tests</p>
          </a>
          <a
            href="/admin/reports"
            className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
          >
            <p className="font-semibold text-purple-700">View Reports</p>
            <p className="text-sm text-gray-600 mt-1">Analyze student performance</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardComponent;
