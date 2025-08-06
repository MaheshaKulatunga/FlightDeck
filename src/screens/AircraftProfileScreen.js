import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { saveToLogbook, removeFromLogbook, getLogbook } from '../utils/logbookStorage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const AircraftProfileScreen = ({ route }) => {
  const { aircraft } = route.params;
  const [isSpotted, setIsSpotted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkIfSpotted = async () => {
      const logbook = await getLogbook();
      setIsSpotted(!!logbook[aircraft.registration_number]);
      };
      checkIfSpotted();
    }, [aircraft.registration_number])
  );

  const handleToggleSpotted = async () => {
    if (isSpotted) {
      await removeFromLogbook(aircraft.registration_number);
    } else {
      await saveToLogbook(aircraft);
    }

    const updatedLogbook = await getLogbook();
    setIsSpotted(!!updatedLogbook[aircraft.registration_number]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Airbus_A320-214%2C_Airbus_Industrie_JP7617615.jpg' }}
        style={styles.image}
      />
      <Text style={styles.title}>{aircraft.registration_number}</Text>
      <Text>Model: {aircraft.iata_type}</Text>
      <Text>Airline: {aircraft.airline_iata_code || 'Unknown'}</Text>
      <Text>MSN: {aircraft.construction_number}</Text>

      <TouchableOpacity onPress={handleToggleSpotted} style={styles.iconButton}>
        <Ionicons
          name={isSpotted ? 'checkmark-circle' : 'add-circle-outline'}
          size={32}
          color={isSpotted ? 'green' : '#007bff'}
        />
        <Text style={styles.iconLabel}>
          {isSpotted ? 'Spotted' : 'Mark as Spotted'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const handleAddToLogbook = async (aircraft) => {
  await saveToLogbook(aircraft);
  Alert.alert('Success', `Aircraft ${aircraft.registration_number} added to logbook.`);
};

export default AircraftProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
