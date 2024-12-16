import { API_URL } from '@env';

console.log('API_URL:', API_URL);

// Function to save parking setup
export const saveParkingSetup = async (zone, parkingSpot, durationType) => {
    try {
        console.log('Saving parking setup with data:', { zone, parkingSpot, durationType });

        if (!API_URL) {
            throw new Error('API_URL is not defined');
        }

        const response = await fetch(`${API_URL}/save-parking-setup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zone, parkingSpot, durationType }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from server:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully saved parking setup:', data);
        return data; // Return the response data from the server
    } catch (error) {
        if (error.name === 'TypeError' && error.message === 'Network request failed') {
            console.error('Network request failed. Check your network connection and API_URL:', API_URL);
        } else {
            console.error('Error saving parking setup:', error);
        }
        throw error; // Re-throw the error to handle it in the calling function
    }
};

// Function to save user profile
export const saveUserProfile = async (firstName, lastName, savedSchoolCampus) => {
    try {
        console.log('Saving user profile with data:', { firstName, lastName, savedSchoolCampus });

        if (!API_URL) {
            throw new Error('API_URL is not defined');
        }

        const response = await fetch(`${API_URL}/save-user-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, savedSchoolCampus }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from server:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully saved user profile:', data);
        return data; // Return the response data from the server
    } catch (error) {
        if (error.name === 'TypeError' && error.message === 'Network request failed') {
            console.error('Network request failed. Check your network connection and API_URL:', API_URL);
        } else {
            console.error('Error saving user profile:', error);
        }
        throw error; // Re-throw the error to handle it in the calling function
    }
};
