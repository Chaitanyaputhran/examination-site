import React from 'react';

function QuestionManagementComponent({
  questions,
  subjects,
  showForm,
  editingQuestion,
  formData,
  onFormDataChange,
  onSubmit,
  onEdit,
  onDelete,
  onCancel,
  onShowForm
}) {
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Question Management</h1>
        <button
          onClick={onShowForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Question
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingQuestion ? 'Edit Question' : 'Add New Question'}
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text *
              </label>
              <textarea
                value={formData.questionText}
                onChange={(e) => onFormDataChange({ ...formData, questionText: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option 1 *
                </label>
                <input
                  type="text"
                  value={formData.option1}
                  onChange={(e) => onFormDataChange({ ...formData, option1: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option 2 *
                </label>
                <input
                  type="text"
                  value={formData.option2}
                  onChange={(e) => onFormDataChange({ ...formData, option2: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option 3 *
                </label>
                <input
                  type="text"
                  value={formData.option3}
                  onChange={(e) => onFormDataChange({ ...formData, option3: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option 4 *
                </label>
                <input
                  type="text"
                  value={formData.option4}
                  onChange={(e) => onFormDataChange({ ...formData, option4: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Option *
                </label>
                <select
                  value={formData.correctOption}
                  onChange={(e) => onFormDataChange({ ...formData, correctOption: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marks *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.marks}
                  onChange={(e) => onFormDataChange({ ...formData, marks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty *
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => onFormDataChange({ ...formData, difficulty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editingQuestion ? 'Update' : 'Create'}
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

      <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correct</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No questions found. Click "Add Question" to create one.
                </td>
              </tr>
            ) : (
              questions.map((question) => (
                <tr key={question.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{question.subject.name}</td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{question.questionText}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Option {question.correctOption}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{question.marks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded ${
                      question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => onEdit(question)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(question.id)}
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

export default QuestionManagementComponent;
