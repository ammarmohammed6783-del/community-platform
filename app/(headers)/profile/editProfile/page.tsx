"use client";

import getUserData from "@/app/actions/getUserData";
import { updateProfilePhoto } from "@/app/actions/updateProfilePhoto";
import { updateProfileTexts } from "@/app/actions/updateProfileTexts";
import {
    CldUploadButton,
    type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CurrentUser = {
    id: string;
    name: string | null;
    username: string;
    description: string | null;
    profilePhoto: string | null;
};

export default function EditProfile() {
    const router = useRouter();

    const [user, setUser] = useState<CurrentUser | null>(null);

    const [profileImagePreview, setProfileImagePreview] =
        useState<string | null>(null);

    const [newProfilePhoto, setNewProfilePhoto] =
        useState<string | null>(null);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");

    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Load current user
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await getUserData();

                if (!userData) {
                    setErrorMessage("User not found");
                    return;
                }

                setUser(userData);

                setName(userData.name ?? "");
                setUsername(userData.username);
                setDescription(userData.description ?? "");
                setProfileImagePreview(
                    userData.profilePhoto ?? null
                );
            } catch (error) {
                console.error(error);
                setErrorMessage("Failed to load user data");
            }
        };

        loadUser();
    }, []);

    // Handle successful Cloudinary upload
    const handleImageUpload = (
        result: CloudinaryUploadWidgetResults
    ) => {
        if (
            typeof result.info !== "object" ||
            result.info === null ||
            !("secure_url" in result.info)
        ) {
            setErrorMessage("Could not get uploaded image URL");
            return;
        }

        const imageUrl = result.info.secure_url;

        if (typeof imageUrl !== "string") {
            setErrorMessage("Could not get uploaded image URL");
            return;
        }

        setNewProfilePhoto(imageUrl);
        setProfileImagePreview(imageUrl);
        setErrorMessage(null);
    };

    // Save profile changes
    const handleSave = async () => {
        if (!user) {
            setErrorMessage("User not found");
            return;
        }

        try {
            setIsSaving(true);
            setErrorMessage(null);

            // Update profile photo
            if (newProfilePhoto) {
                const updatedPhoto = await updateProfilePhoto(
                    user.id,
                    newProfilePhoto
                );

                setUser((currentUser) =>
                    currentUser
                        ? {
                            ...currentUser,
                            profilePhoto:
                                updatedPhoto.profilePhoto,
                        }
                        : null
                );
            }

            // Update profile text fields
            if (
                name.trim().length > 2 ||
                username.trim().length > 2 ||
                description.trim().length > 2
            ) {
                const updatedTexts = await updateProfileTexts(
                    user.id,
                    {
                        name,
                        username,
                        description,
                    }
                );

                setUser((currentUser) =>
                    currentUser
                        ? {
                            ...currentUser,
                            ...updatedTexts,
                        }
                        : null
                );
            }

            setNewProfilePhoto(null);

            router.back();
            router.refresh()
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-xl p-8">

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Edit Your Profile
                </h2>

                <form
                    className="space-y-6"
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSave();
                    }}
                >
                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Profile Image
                        </label>

                        <div className="flex items-center gap-6 mt-4">
                            {profileImagePreview ? (
                                <img
                                    src={profileImagePreview}
                                    alt="Profile preview"
                                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="rounded-full w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-linear-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white font-bold text-2xl shadow-lg shadow-indigo-500/25 ring-4 ring-slate-200 dark:ring-slate-800/80">
                                    {user?.name
                                        ?.slice(0, 1)
                                        .toUpperCase()}
                                </div>
                            )}

                            <CldUploadButton
                                uploadPreset="community_platform"
                                onSuccess={handleImageUpload}
                                className="cursor-pointer px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                            >
                                Choose Photo
                            </CldUploadButton>
                        </div>
                    </div>

                    {/* Error */}
                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Nickname
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>

                        <input
                            type="text"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Enter your description"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4 justify-end">
                        <button
                            type="button"
                            disabled={isSaving}
                            className="px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}