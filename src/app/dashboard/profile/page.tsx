"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  PencilSquareIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  LockClosedIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchedData = {
      firstName: "Nita",
      lastName: "Ly",
      phone: "123-45-678",
      email: "nitaly123@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    };
    setFormData(fetchedData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      console.log("Saving updated data:", formData);
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("Selected image:", file);
    }
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50/50 text-gray-900 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-display">
          My Profile
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card — Left Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            {/* Avatar */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                className="rounded-full object-cover ring-4 ring-gray-100"
                src={
                  selectedImage ||
                  "/assets/category-page-04-image-card-04.jpg"
                }
                alt="User profile"
                fill
              />
              <label
                htmlFor="imageUpload"
                className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 rounded-full p-2.5 cursor-pointer shadow-lg shadow-blue-200 transition-all duration-200 hover:scale-110"
                title="Change profile picture"
              >
                <CameraIcon className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* User Info */}
            <h2 className="text-xl font-bold text-gray-900">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{formData.email}</p>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">28</p>
                  <p className="text-xs text-gray-500 mt-1">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">$1,240</p>
                  <p className="text-xs text-gray-500 mt-1">Spent</p>
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div className="mt-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                <UserIcon className="w-3 h-3 mr-1.5" />
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form — Right Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* Form Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Update your personal details here
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleEdit}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${isEditing
                    ? "bg-green-600 text-white shadow-green-200 hover:bg-green-700"
                    : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700"
                  }`}
              >
                {isEditing ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <PencilSquareIcon className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6">
              <form>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Fields — Only in Edit Mode */}
                {isEditing && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Change Password
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <LockClosedIcon className="w-4 h-4 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <LockClosedIcon className="w-4 h-4 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}