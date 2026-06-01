import React from 'react';
import { useNavigate } from 'react-router-dom';

function TestReportComponent({
  attempt,
  answers,
  marksPerQuestion,
  showEmailModal,
  sendingEmail,
  onEmailResults,
  onCloseModal
}) {
  const navigate = useNavigate();
  const isPassed = parseFloat(attempt.score) >= attempt.test.passingMarks;

  return (
    <>
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/student/performance')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Performance
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{attempt.test.title}</h1>
              <p className="text-gray-600 mt-1">{attempt.test.subject.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                Attempted on: {new Date(attempt.startTime).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-lg text-lg font-bold ${
                isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isPassed ? '✓ PASSED' : '✗ FAILED'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Your Score</p>
              <p className="text-2xl font-bold text-blue-600">
                {attempt.score} / {attempt.test.totalMarks}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {((parseFloat(attempt.score) / attempt.test.totalMarks) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-green-600">
                {attempt.correctAnswers}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {marksPerQuestion.toFixed(2)} marks each
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Wrong</p>
              <p className="text-2xl font-bold text-red-600">
                {attempt.wrongAnswers}
              </p>
              <p className="text-xs text-gray-500 mt-1">0 marks</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Unanswered</p>
              <p className="text-2xl font-bold text-gray-600">
                {attempt.unanswered}
              </p>
              <p className="text-xs text-gray-500 mt-1">0 marks</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Passing Marks</p>
              <p className="text-2xl font-bold text-yellow-600">
                {attempt.test.passingMarks}
              </p>
              <p className="text-xs text-gray-500 mt-1">Required</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onEmailResults}
              disabled={sendingEmail}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail ? (
                <>
                  <span className="animate-spin">...</span>
                  Sending...
                </>
              ) : (
                <>
                  Email Results
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Question-by-Question Analysis</h2>

          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Marks Distribution:</strong> Each question is worth{' '}
              <strong>{marksPerQuestion.toFixed(2)} marks</strong> (Total: {attempt.test.totalMarks} marks ÷ {attempt.totalQuestions} questions)
            </p>
          </div>

          <div className="space-y-4">
            {answers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No answers recorded</p>
            ) : (
              answers.map((answer, index) => (
                <div
                  key={answer.id}
                  className={`border-2 rounded-lg p-5 ${
                    answer.isCorrect
                      ? 'border-green-400 bg-green-50'
                      : answer.selectedOption === null
                      ? 'border-gray-300 bg-gray-50'
                      : 'border-red-400 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                          {index + 1}
                        </span>
                        <p className="font-semibold text-gray-800 text-lg flex-1">
                          {answer.question.questionText}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        answer.isCorrect
                          ? 'bg-green-200 text-green-800'
                          : answer.selectedOption === null
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-red-200 text-red-800'
                      }`}>
                        {answer.isCorrect ? '✓ Correct' : answer.selectedOption === null ? '⊘ Not Answered' : '✗ Wrong'}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        {answer.isCorrect ? `+${marksPerQuestion.toFixed(2)}` : '0'} marks
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 ml-11">
                    <div className="grid grid-cols-1 gap-2">
                      {[1, 2, 3, 4].map((optionNum) => {
                        const isCorrect = answer.question.correctOption === optionNum;
                        const isSelected = answer.selectedOption === optionNum;

                        return (
                          <div
                            key={optionNum}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrect && isSelected
                                ? 'border-green-500 bg-green-100'
                                : isCorrect
                                ? 'border-green-500 bg-green-50'
                                : isSelected
                                ? 'border-red-500 bg-red-100'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-gray-700">
                                {String.fromCharCode(64 + optionNum)}.
                              </span>
                              <span className={`flex-1 ${isCorrect ? 'font-semibold' : ''}`}>
                                {answer.question[`option${optionNum}`]}
                              </span>
                              {isCorrect && (
                                <span className="text-green-700 font-bold text-sm">
                                  ✓ Correct Answer
                                </span>
                              )}
                              {isSelected && !isCorrect && (
                                <span className="text-red-700 font-bold text-sm">
                                  Your Answer
                                </span>
                              )}
                              {isSelected && isCorrect && (
                                <span className="text-green-700 font-bold text-sm">
                                  Your Answer ✓
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Email Success Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 animate-fadeIn">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Sent Successfully!</h3>
              <p className="text-gray-600 text-center mb-4">
                Your exam results have been sent to <strong>{attempt?.student?.email}</strong>
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 w-full">
                <p className="text-sm text-blue-900">
                  The email includes:
                </p>
                <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4">
                  <li>• Complete score breakdown</li>
                  <li>• Question-by-question analysis</li>
                  <li>• Detailed PDF report attachment</li>
                </ul>
              </div>
              <button
                onClick={onCloseModal}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TestReportComponent;
