import React from 'react';

function AdminReportsComponent({ studentReport, subjectReport, activeTab, onTabChange }) {
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Reports</h1>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => onTabChange('students')}
          className={`px-6 py-2 rounded-lg transition ${
            activeTab === 'students'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Student-wise Report
        </button>
        <button
          onClick={() => onTabChange('subjects')}
          className={`px-6 py-2 rounded-lg transition ${
            activeTab === 'subjects'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Subject-wise Report
        </button>
      </div>

      {activeTab === 'students' && studentReport && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Student Performance Overview
            </h2>
            <p className="text-sm text-gray-600">
              Total Students: {studentReport.totalStudents}
            </p>
          </div>

          {studentReport.students && studentReport.students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Attempts</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentReport.students.map((student) => (
                    <tr key={student.studentId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{student.studentId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{student.totalAttempts}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{student.averageScore?.toFixed(2) || '0.00'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs rounded ${
                          student.passRate >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {student.passRate?.toFixed(1) || '0.0'}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No student data available</div>
          )}
        </div>
      )}

      {activeTab === 'subjects' && subjectReport && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Subject Performance Overview
            </h2>
            <p className="text-sm text-gray-600">
              Total Subjects: {subjectReport.totalSubjects}
            </p>
          </div>

          {subjectReport.subjects && subjectReport.subjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Attempts</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjectReport.subjects.map((subject) => (
                    <tr key={subject.subjectId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{subject.subjectId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{subject.subjectName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{subject.totalAttempts}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{subject.averageScore?.toFixed(2) || '0.00'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs rounded ${
                          subject.passRate >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.passRate?.toFixed(1) || '0.0'}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No subject data available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminReportsComponent;
