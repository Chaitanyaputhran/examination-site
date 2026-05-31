import React from 'react';

function TestManagementComponent({
  tests,
  subjects,
  questions,
  showForm,
  showQuestionSelector,
  selectedTest,
  selectedQuestions,
  formData,
  onFormDataChange,
  onSubmit,
  onAddQuestions,
  onDelete,
  onCancel,
  onManageQuestions,
  onToggleQuestionSelection,
  onShowForm,
  onCancelQuestionSelector
}) {
  const filteredQuestions = selectedTest
    ? questions.filter(q => q.subject.id === selectedTest.subject.id)
    : questions;

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Test Management</h1>
        <button
          onClick={onShowForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Create Test
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Create New Test</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                value={formData.subjectId}
                onChange={(e) => onFormDataChange({ ...formData, subjectId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.durationMinutes}
                  onChange={(e) => onFormDataChange({ ...formData, durationMinutes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Marks *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalMarks}
                  onChange={(e) => onFormDataChange({ ...formData, totalMarks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Will be distributed equally among questions
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Marks *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.passingMarks}
                  onChange={(e) => onFormDataChange({ ...formData, passingMarks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>ℹ️ Marks Distribution:</strong> The total marks you set ({formData.totalMarks}) will be
                automatically divided equally among all questions you add to this test.
                For example: {formData.totalMarks} marks ÷ 10 questions = {(parseFloat(formData.totalMarks) / 10).toFixed(2)} marks per question.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create & Add Questions
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showQuestionSelector && selectedTest && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            Add Questions to: {selectedTest.title}
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-900">
              <strong>📊 Marks Calculation:</strong> Total Test Marks: {selectedTest.totalMarks} marks
              {selectedQuestions.length > 0 && (
                <span> → Each question will be worth <strong>{(selectedTest.totalMarks / selectedQuestions.length).toFixed(2)} marks</strong> ({selectedQuestions.length} questions selected)</span>
              )}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Subject: {selectedTest.subject.name} | Selected: {selectedQuestions.length} questions
          </p>

          <div className="max-h-96 overflow-y-auto space-y-2 mb-4">
            {filteredQuestions.length === 0 ? (
              <p className="text-gray-500">No questions available for this subject.</p>
            ) : (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() => onToggleQuestionSelection(question.id)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{question.questionText}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Marks: {question.marks} | Difficulty: {question.difficulty}
                      </p>
                    </div>
                  </label>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onAddQuestions}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add {selectedQuestions.length} Questions
            </button>
            <button
              onClick={onCancelQuestionSelector}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks/Q</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tests.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No tests found. Click "Create Test" to add one.
                </td>
              </tr>
            ) : (
              tests.map((test) => (
                <tr key={test.id}>
                  <td className="px-6 py-4 text-sm font-medium">{test.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.subject.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.durationMinutes} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{test.totalMarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.questions?.length || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    {test.questions?.length > 0
                      ? (test.totalMarks / test.questions.length).toFixed(2)
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => onManageQuestions(test)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Add Questions
                    </button>
                    <button
                      onClick={() => onDelete(test.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TestManagementComponent;
