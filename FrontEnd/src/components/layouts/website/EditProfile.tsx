"use client";

import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Mail, MapPin, Calendar, ChevronDown } from "lucide-react";

const editProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  city: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

// Swap for the user's real data once wired to the session / API
const defaultValues = {
  firstName: "Mohamed",
  lastName: "Hany",
  email: "you@example.com",
  city: "KSA, Riyadh",
  dateOfBirth: "1995-08-13",
  gender: "Male",
};

export default function EditProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<EditProfileFormData> = async (values) => {
    // Wire this up to your update-profile mutation once that endpoint exists
    console.log("Save profile:", values);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-xl mx-auto">
        {/* Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Update your personal information.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Profile picture */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Profile Picture
            </p>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold overflow-hidden shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  "MH"
                )}
              </div>
              <div>
                <label
                  htmlFor="photo-upload"
                  className="text-sm font-medium text-orange-500 hover:underline cursor-pointer"
                >
                  Upload new photo
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-400 mt-0.5">
                  JPG, JPEG or PNG, Max size of 2MB
                </p>
              </div>
            </div>
          </div>

          {/* First / Last name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-800">
                First Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="w-full mt-1.5 px-3 py-2.5 rounded-lg bg-[#F8F8F8] text-sm outline-none focus:ring-2 focus:ring-orange-200"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className="w-full mt-1.5 px-3 py-2.5 rounded-lg bg-[#F8F8F8] text-sm outline-none focus:ring-2 focus:ring-orange-200"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Email Address <span className="text-orange-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#F8F8F8] text-sm outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* City / DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-800">City</label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  {...register("city")}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#F8F8F8] text-sm outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800">Date of Birth</label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#F8F8F8] text-sm outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-800">Gender</label>
            <div className="relative mt-1.5">
              <select
                {...register("gender")}
                className="w-full appearance-none px-3 py-2.5 pr-9 rounded-lg bg-[#F8F8F8] text-sm outline-none focus:ring-2 focus:ring-orange-200"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 border border-orange-500 text-orange-500 text-sm font-medium py-2.5 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}