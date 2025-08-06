import { AVIATIONSTACK_API_KEY } from '../constants/apiKeys';

const BASE_URL = 'http://api.aviationstack.com/v1';

export const getAircraftInfo = async (registration) => {
  try {
    const response = await fetch(
      `${BASE_URL}/airplanes?access_key=${AVIATIONSTACK_API_KEY}&registration_number=${registration}`
    );
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      return [];
    }

    return data.data; // Array of aircraft
  } catch (error) {
    console.error('AviationStack Error:', error);
    return [];
  }
};
