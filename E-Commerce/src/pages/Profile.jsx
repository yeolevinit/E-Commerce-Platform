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

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="profile-container">
            <h1>My Profile</h1>
            {profile && (
                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            src={profile.avatar || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="profile-avatar"
                        />
                        <h2>{profile.username}</h2>
                    </div>
                    <div className="profile-details">
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Role:</strong> {profile.role}</p>
                        <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
