const API_URL = process.env.API_URL
console.log('API_URL:', API_URL);

export const saveParkingSetup = async (zone, parkingSpot, durationType) => {
    try {
        const response = await fetch(`${API_URL}/save-parking-setup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                zone,
                parkingSpot,
                durationType,
            }),
        });
        

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Return the response data from the server
    } catch (error) {
        console.error('Error saving parking setup:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};