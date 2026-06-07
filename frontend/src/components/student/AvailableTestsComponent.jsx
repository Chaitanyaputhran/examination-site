import React, { useState } from 'react';

function AvailableTestsComponent({ tests, completedTestIds, onStartTest }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleStartClick = (test) => {
    setSelectedTest(test);
    setShowConfirmModal(true);
  };

  const handleConfirmStart = () => {
    if (selectedTest) {
      onStartTest(selectedTest.id);
      setShowConfirmModal(false);
      setSelectedTest(null);
    }
  };

  const handleCancelStart = () => {
    setShowConfirmModal(false);
    setSelectedTest(null);
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Tests</h1>

      {tests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4"></div>
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
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {test.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {test.subject.name}
                    </p>
                  </div>
                  {completedTestIds.has(test.id) && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                      Previously Attempted
                    </span>
                  )}
                </div>

                {test.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {test.description}
                  </p>
                )}

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">Duration:</span>
                    <span>{test.durationMinutes} minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">Total Marks:</span>
                    <span>{test.totalMarks}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">Passing Marks:</span>
                    <span>{test.passingMarks}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">Questions:</span>
                    <span>{test.questionCount ?? 0}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartClick(test)}
                  className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {completedTestIds.has(test.id) ? 'Retake Test' : 'Start Test'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Instructions</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Make sure you have a stable internet connection</li>
          <li>• Once started, the timer cannot be paused</li>
          <li>• Your answers are auto-saved as you go</li>
          <li>• You can navigate between questions freely</li>
          <li>• Test will auto-submit when time expires</li>
        </ul>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Start Test?
              </h2>
              <p className="text-gray-600 mb-4">
                You are about to start: <span className="font-semibold text-gray-800">{selectedTest.title}</span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold text-gray-800">{selectedTest.durationMinutes} minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Marks:</span>
                <span className="font-semibold text-gray-800">{selectedTest.totalMarks}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="font-semibold text-gray-800">{selectedTest.questionCount ?? 0}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800 font-medium">
                ⚠️ Once you start, the timer will begin immediately and cannot be paused!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelStart}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStart}
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Yes, Start Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailableTestsComponent;
