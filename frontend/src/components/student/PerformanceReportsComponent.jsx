import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PerformanceReportsComponent({ performance, subjectPerformance, attempts, onViewReport }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const subjectChartData = subjectPerformance
    ? Object.entries(subjectPerformance).map(([name, data]) => ({
        name: data.subjectName,
        attempts: data.attemptCount,
        average: data.averageScore,
        min: data.minScore,
        max: data.maxScore
      }))
    : [];

  const recentScoresData = attempts.slice(0, 10).reverse().map((attempt, index) => ({
    name: `Test ${index + 1}`,
    score: parseFloat(attempt.score),
    testName: attempt.test.title
  }));

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Performance Reports</h1>

      {performance && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Total Attempts</p>
              <p className="text-3xl font-bold text-blue-600">{performance.totalAttempts}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Average Score</p>
              <p className="text-3xl font-bold text-green-600">
                {performance.averageScore ? performance.averageScore.toFixed(1) : '0'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Highest Score</p>
              <p className="text-3xl font-bold text-yellow-600">
                {performance.highestScore ? performance.highestScore.toFixed(1) : '0'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm">Lowest Score</p>
              <p className="text-3xl font-bold text-red-600">
                {performance.lowestScore ? performance.lowestScore.toFixed(1) : '0'}
              </p>
            </div>
          </div>

          {subjectChartData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Subject-wise Performance (Avg, Min, Max Scores)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#8884d8" name="Average Score" />
                  <Bar dataKey="min" fill="#82ca9d" name="Min Score" />
                  <Bar dataKey="max" fill="#ffc658" name="Max Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {recentScoresData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Test Scores</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentScoresData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#82ca9d" name="Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Attempt History</h2>
        {attempts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No attempts yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attempts.map((attempt) => (
                  <tr key={attempt.id}>
                    <td className="px-6 py-4 text-sm font-medium">{attempt.test.title}</td>
                    <td className="px-6 py-4 text-sm">{attempt.test.subject.name}</td>
                    <td className="px-6 py-4 text-sm font-bold">
                      {attempt.score}/{attempt.test.totalMarks}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-xs rounded ${
                        parseFloat(attempt.score) >= attempt.test.passingMarks
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {parseFloat(attempt.score) >= attempt.test.passingMarks ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(attempt.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => onViewReport(attempt.id)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        📊 View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {subjectChartData.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📊 Statistics Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(subjectPerformance).map(([key, data]) => (
              <div key={key} className="bg-white rounded p-3">
                <p className="font-semibold text-gray-800">{data.subjectName}</p>
                <p className="text-sm text-gray-600">
                  Attempts: {data.attemptCount} | Avg: {data.averageScore.toFixed(1)} |
                  Min: {data.minScore.toFixed(1)} | Max: {data.maxScore.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceReportsComponent;
