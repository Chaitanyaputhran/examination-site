import React from 'react';

function ProfileComponent({ profile, formatDate }) {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
                {profile.firstName?.[0]?.toUpperCase() || profile.username?.[0]?.toUpperCase()}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {profile.firstName && profile.lastName
                    ? `${profile.firstName} ${profile.lastName}`
                    : profile.username}
                </h1>
                <p className="text-blue-100 text-lg">
                  {profile.role === 'STUDENT' ? 'Student' : 'Admin'} Account
                </p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-8 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Username
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {profile.username}
                </p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Email Address
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {profile.email}
                </p>
              </div>

              {/* First Name */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  First Name
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {profile.firstName || 'Not provided'}
                </p>
              </div>

              {/* Last Name */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Last Name
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {profile.lastName || 'Not provided'}
                </p>
              </div>

              {/* Role */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Role
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    profile.role === 'STUDENT'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {profile.role}
                  </span>
                </p>
              </div>

              {/* Account Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Account Status
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    profile.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {profile.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>

              {/* Account Created */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Account Created
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {formatDate(profile.createdAt)}
                </p>
              </div>

              {/* Last Updated */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Last Updated
                </label>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {formatDate(profile.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
