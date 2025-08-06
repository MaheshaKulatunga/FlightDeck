import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const AircraftProfileScreen = ({ route }) => {
  const { aircraft } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Airbus_A320-214%2C_Airbus_Industrie_JP7617615.jpg' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.heading}>{aircraft.registration_number}</Text>
      <Text>Model: {aircraft.iata_type}</Text>
      <Text>Family: {aircraft.production_line}</Text>
      <Text>Airline Code: {aircraft.airline_iata_code}</Text>
      <Text>Age (Years): {aircraft.plane_age || 'N/A'}</Text>
      <Text>Engine Type: {aircraft.engines_type || 'N/A'}</Text>
      <Text>MSN: {aircraft.construction_number}</Text>
    </ScrollView>
  );
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
