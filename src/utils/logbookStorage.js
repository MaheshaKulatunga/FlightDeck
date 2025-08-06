import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGBOOK_KEY = 'logbook';

export const getLogbook = async () => {
  const json = await AsyncStorage.getItem(LOGBOOK_KEY);
  return json ? JSON.parse(json) : {};
};

export const saveToLogbook = async (aircraft) => {
  const logbook = await getLogbook();
  logbook[aircraft.registration_number] = aircraft;
  await AsyncStorage.setItem(LOGBOOK_KEY, JSON.stringify(logbook));
};

export const removeFromLogbook = async (registrationNumber) => {
  const logbook = await getLogbook();
  delete logbook[registrationNumber];
  await AsyncStorage.setItem(LOGBOOK_KEY, JSON.stringify(logbook));
};
