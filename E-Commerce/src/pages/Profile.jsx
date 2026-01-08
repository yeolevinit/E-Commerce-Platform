import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/auth/profile');
                setProfile(response.data.data.user);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center">
            {error}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="border-b border-gray-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-500 mt-1">Manage your account information</p>
            </div>

            {profile && (
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                    <div className="flex-shrink-0">
                        <img
                            src={profile.avatar || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-md object-cover"
                        />
                    </div>

                    <div className="flex-grow space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Username</label>
                            <div className="text-lg font-medium text-gray-900">{profile.username}</div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                            <div className="text-lg font-medium text-gray-900">{profile.email}</div>
                        </div>

                        <div className="flex space-x-8 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</label>
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {profile.role}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Member Since</label>
                                <div className="text-sm text-gray-700">
                                    {new Date(profile.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
