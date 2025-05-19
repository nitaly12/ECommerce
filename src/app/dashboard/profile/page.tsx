"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    <div className="w-full py-24 px-4">
      <div className="flex items-center">
        <div className="relative w-28 h-28">
          <Image
            className="rounded-full object-cover w-full h-full"
            src={selectedImage || "/assets/category-page-04-image-card-04.jpg"}
            alt="User profile"
            width={112}
            height={112}
          />
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-md hover:bg-gray-100"
            title="Change profile picture"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687 1.688a2.25 2.25 0 010 3.182L9.75 18.156H6v-3.75l9.112-9.112a2.25 2.25 0 013.182 0z"
              />
            </svg>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="px-5 text-gray-700">
          <h1 className="text-sm font-semibold">
            {formData.firstName} {formData.lastName}
          </h1>
          <h3 className="text-gray-500 text-sm">{formData.email}</h3>
        </div>
      </div>

      <div className="mt-10">
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-100"
              />
            </div>
          </div>

          {isEditing && (
            <>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
            </>
          )}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleToggleEdit}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}