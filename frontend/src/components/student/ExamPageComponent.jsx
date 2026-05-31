import React from 'react';

function ExamPageComponent({
  test,
  questions,
  currentQuestionIndex,
  answers,
  timeRemaining,
  marksPerQuestion,
  onAnswerSelect,
  onSubmit,
  onNavigate,
  formatTime
}) {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{test?.title}</h1>
            <p className="text-sm text-gray-600">{test?.subject.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Time Remaining</p>
            <p className={`text-3xl font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeRemaining)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
            {marksPerQuestion.toFixed(2)} {marksPerQuestion === 1 ? 'Mark' : 'Marks'}
          </span>
        </div>

        <p className="text-xl text-gray-800 mb-6">{currentQuestion?.questionText}</p>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((optionNum) => (
            <button
              key={optionNum}
              onClick={() => onAnswerSelect(currentQuestion.id, optionNum)}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                answers[currentQuestion.id] === optionNum
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="font-semibold mr-3">
                {String.fromCharCode(64 + optionNum)}.
              </span>
              {currentQuestion[`option${optionNum}`]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => onNavigate(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={() => onSubmit(false)}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={() => onNavigate(Math.min(questions.length - 1, currentQuestionIndex + 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next →
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-semibold text-gray-700 mb-3">Question Navigation</h3>
        <div className="grid grid-cols-10 gap-2">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => onNavigate(index)}
              className={`p-2 rounded text-sm font-medium ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : answers[q.id]
                  ? 'bg-green-200 text-green-800'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Answered: {Object.keys(answers).length} / {questions.length}
        </p>
      </div>
    </div>
  );
}

export default ExamPageComponent;
