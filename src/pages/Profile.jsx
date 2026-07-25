import { useState, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import {
  IoCalendarOutline,
  IoMailOutline,
  IoCreateOutline,
  IoSaveOutline,
  IoCloseCircleOutline,
  IoSettingsOutline,
  IoListOutline,
  IoPersonOutline
} from "react-icons/io5";

function Profile() {
  const {
    fullName,
    setFullName,
    email,
    bio,
    setBio,
    setIsLoading,
    isLoading,
    apiurl,
    token,
    fetchUser,
    user,
    fetchProfile,
    profile,
  } = useContext(storeContext);
  const [isEditing, setIsEditing] = useState(false);

  const createdAt = new Date(profile.createdAt);

  useEffect(() => {
    fetchUser();
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          bio,
        }),
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to update profile, Try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      fetchProfile();
    }
  };

  const handleSave = () => {
    updateProfile();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grow bg-mesh-glow min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-fade-in-down">
      <div className="space-y-8">
        {/* Profile Card Container */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl ">
          {/* Cover Background */}
          <div className="h-32 sm:h-42 mb-5 bg-linear-to-r from-indigo-700 via-purple-700 to-fuchsia-600 relative">
            <div className="absolute inset-0 bg-slate-950/10 z-0 rounded-t-3xl">
              {" "}
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-8 sm:px-10 relative z-10">
            {/* Avatar block and core info */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 mb-8 -mt-16 sm:-mt-24">
              
              <div className="flex justify-center sm:justify-start relative z-20">
                <img
                  src="https://i.pravatar.cc/300"
                  alt="avatar profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-slate-900 shadow-2xl object-cover hover:scale-102 transition duration-300 bg-slate-950"
                />
              </div>

              <div className="grow text-center sm:text-left mt-4 sm:mt-0 pb-2 space-y-1">
                {isEditing ? (
                  <div className="max-w-md mt-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-655 transition"
                      placeholder="Enter your fullname"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                      {profile.fullName || "Configure Fullname"}
                    </h1>
                    <p className="text-slate-400 text-sm flex items-center justify-center sm:justify-start gap-1.5">
                      <IoMailOutline className="w-4 h-4 text-indigo-400" />
                      {user.email}
                    </p>
                  </>
                )}
              </div>

              {/* Edit button trigger */}
              {!isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setFullName(profile.fullName || "");
                    setBio(profile.bio || "");
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 mt-4 sm:mt-0 flex items-center justify-center gap-1.5 text-sm font-bold text-indigo-400 hover:text-white bg-indigo-950/30 hover:bg-indigo-600 border border-indigo-900/40 hover:border-transparent rounded-xl transition duration-200 cursor-pointer active:scale-95"
                >
                  <IoCreateOutline className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Bio Row */}
            <div className="border-t border-slate-800/60 pt-6">
              {isEditing ? (
                <div className="mb-6">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Bio Description
                  </label>
                  <textarea
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-655 transition resize-none"
                    placeholder="Tell us about yourself, your favorite genres, and authors..."
                  />
                </div>
              ) : (
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Biography
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-3xl whitespace-pre-wrap">
                    {profile.bio ||
                      "Write something interesting about yourself! Click edit profile above."}
                  </p>
                </div>
              )}
            </div>

            {/* Joined Timestamp & Actions */}
            {!isEditing && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-950/40 border border-slate-850 px-4 py-2.5 rounded-2xl w-fit">
                <IoCalendarOutline className="w-4 h-4 text-slate-400" />
                <span>
                  Member since{" "}
                  <strong className="text-slate-350">
                    {createdAt.toDateString()}
                  </strong>
                </span>
              </div>
            )}

            {/* Edit Mode Buttons */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-slate-850">
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-none px-6 py-3 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl shadow-lg transition duration-200 cursor-pointer active:scale-95"
                >
                  <IoSaveOutline className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none px-6 py-3 flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-sm font-bold rounded-xl transition duration-200 cursor-pointer active:scale-95"
                >
                  <IoCloseCircleOutline className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Shortcut Buttons */}
        {!isEditing && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="px-6 py-4 flex items-center justify-between bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 rounded-2xl text-slate-300 hover:text-white text-sm font-bold transition duration-200 cursor-pointer shadow-lg group">
              <span className="flex items-center gap-2">
                <IoListOutline className="w-5 h-5 text-indigo-400" />
                My Reading Lists
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-full group-hover:text-indigo-400 transition">
                0 lists
              </span>
            </button>
            <button className="px-6 py-4 flex items-center justify-between bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 rounded-2xl text-slate-300 hover:text-white text-sm font-bold transition duration-200 cursor-pointer shadow-lg group">
              <span className="flex items-center gap-2">
                <IoSettingsOutline className="w-5 h-5 text-purple-400" />
                Account Settings
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-full group-hover:text-purple-400 transition">
                Configure
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
