import React from 'react';

function AvailableTestsComponent({ tests, onStartTest }) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Tests</h1>

      {tests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Tests Available</h2>
          <p className="text-gray-600">
            There are currently no active tests. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {test.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {test.subject.name}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Active
                  </span>
                </div>

                {test.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {test.description}
                  </p>
                )}

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">⏱️ Duration:</span>
                    <span>{test.durationMinutes} minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">📊 Total Marks:</span>
                    <span>{test.totalMarks}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">✅ Passing Marks:</span>
                    <span>{test.passingMarks}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">❓ Questions:</span>
                    <span>{test.questions?.length || 0}</span>
                  </div>
                </div>

                <button
                  onClick={() => onStartTest(test.id)}
                  className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">📌 Instructions</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Make sure you have a stable internet connection</li>
          <li>• Once started, the timer cannot be paused</li>
          <li>• Your answers are auto-saved as you go</li>
          <li>• You can navigate between questions freely</li>
          <li>• Test will auto-submit when time expires</li>
        </ul>
      </div>
    </div>
  );
}

export default AvailableTestsComponent;
