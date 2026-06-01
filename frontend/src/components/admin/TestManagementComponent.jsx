import React from 'react';

function TestManagementComponent({
  tests,
  subjects,
  showForm,
  formData,
  inlineQuestions,
  marksPerQuestion,
  onFormDataChange,
  onSubmit,
  onDelete,
  onCancel,
  onShowForm,
  onAddInlineQuestion,
  onRemoveInlineQuestion,
  onUpdateInlineQuestion
}) {
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Test Management</h1>
        {!showForm && (
          <button
            onClick={onShowForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Create Test
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Create New Test</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Test metadata */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Test Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <select
                value={formData.subjectId}
                onChange={(e) => onFormDataChange({ ...formData, subjectId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes) *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalMarks}
                  onChange={(e) => onFormDataChange({ ...formData, totalMarks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passing Marks *</label>
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

            {/* Inline question builder */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Questions ({inlineQuestions.length})
                </h3>
                <button
                  type="button"
                  onClick={onAddInlineQuestion}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  + Add Question
                </button>
              </div>

              {formData.totalMarks && inlineQuestions.length > 0 && (
                <div className="mb-3 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  {formData.totalMarks} marks ÷ {inlineQuestions.length} question{inlineQuestions.length !== 1 ? 's' : ''} = <strong>{marksPerQuestion} marks each</strong>
                </div>
              )}

              <div className="space-y-4">
                {inlineQuestions.map((q, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-700">Question {index + 1}</span>
                      {inlineQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onRemoveInlineQuestion(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Question Text *</label>
                        <textarea
                          value={q.questionText}
                          onChange={(e) => onUpdateInlineQuestion(index, 'questionText', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                          rows="2"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['option1', 'option2', 'option3', 'option4'].map((opt, i) => (
                          <div key={opt}>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Option {i + 1} *</label>
                            <input
                              type="text"
                              value={q[opt]}
                              onChange={(e) => onUpdateInlineQuestion(index, opt, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Correct Option *</label>
                          <select
                            value={q.correctOption}
                            onChange={(e) => onUpdateInlineQuestion(index, 'correctOption', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                            <option value={3}>Option 3</option>
                            <option value={4}>Option 4</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Marks</label>
                          <div className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-100 text-gray-700">
                            {marksPerQuestion}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Difficulty</label>
                          <select
                            value={q.difficulty}
                            onChange={(e) => onUpdateInlineQuestion(index, 'difficulty', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Test ({inlineQuestions.length} question{inlineQuestions.length !== 1 ? 's' : ''})
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

      {/* Tests table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tests.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No tests found. Click "Create Test" to add one.
                </td>
              </tr>
            ) : (
              tests.map((test) => (
                <tr key={test.id}>
                  <td className="px-6 py-4 text-sm font-medium">{test.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.subject?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.durationMinutes} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{test.totalMarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.questionCount ?? 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
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
