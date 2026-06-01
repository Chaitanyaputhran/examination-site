import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, color, subtitle }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  </div>
);

function StudentDashboardComponent({ stats, tests }) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Attempts"
          value={stats.totalAttempts}
          color="border-blue-500"
        />
        <StatCard
          title="Average Score"
          value={stats.averageScore ? stats.averageScore.toFixed(1) : '0.0'}
          color="border-green-500"
          subtitle="across all tests"
        />
        <StatCard
          title="Highest Score"
          value={stats.highestScore ? stats.highestScore.toFixed(1) : '0.0'}
          color="border-yellow-500"
        />
        <StatCard
          title="Lowest Score"
          value={stats.lowestScore ? stats.lowestScore.toFixed(1) : '0.0'}
          color="border-red-500"
        />
        <StatCard
          title="Tests Passed"
          value={stats.passedCount}
          color="border-green-500"
        />
        <StatCard
          title="Tests Failed"
          value={stats.failedCount}
          color="border-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/student/tests"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <p className="font-semibold text-blue-700">Take a Test</p>
              <p className="text-sm text-gray-600 mt-1">
                {tests.length} tests available
              </p>
            </Link>
            <Link
              to="/student/performance"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              <p className="font-semibold text-green-700">View Performance</p>
              <p className="text-sm text-gray-600 mt-1">
                See detailed analytics and graphs
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Attempts</h2>
          {stats.recentAttempts && stats.recentAttempts.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {stats.recentAttempts.slice(0, 5).map((attempt) => (
                <div
                  key={attempt.id}
                  className="p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {attempt.test.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {attempt.test.subject.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">
                        {attempt.score}/{attempt.test.totalMarks}
                      </p>
                      <p className={`text-xs ${attempt.score >= attempt.test.passingMarks ? 'text-green-600' : 'text-red-600'}`}>
                        {attempt.score >= attempt.test.passingMarks ? 'Passed' : 'Failed'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No attempts yet. Start taking tests!
            </p>
          )}
        </div>
      </div>

      {stats.totalAttempts === 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Ready to start your journey?
          </h3>
          <p className="text-blue-800 mb-4">
            Take your first test and track your progress!
          </p>
          <Link
            to="/student/tests"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            View Available Tests
          </Link>
        </div>
      )}
    </div>
  );
}

export default StudentDashboardComponent;
