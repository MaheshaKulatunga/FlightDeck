import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { getAircraftInfo } from '../services/aviationStackAPI';
import { useNavigation } from '@react-navigation/native';

const SpotScreen = () => {
  const [query, setQuery] = useState('');
  const [aircraftResults, setAircraftResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    Keyboard.dismiss();
    if (!query.trim()) return;
    const results = await getAircraftInfo(query.trim());
    setAircraftResults(results);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AircraftProfile', { aircraft: item })}
    >
      <Text style={styles.reg}>{item.registration_number}</Text>
      <Text style={styles.model}>{item.iata_type || 'Unknown Model'}</Text>
      <Text style={styles.msn}>{item.construction_number || 'Unknown MSN'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Registration (e.g., G-EUPT)"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        onSubmitEditing={handleSearch}
      />

      <TouchableOpacity style={styles.SearchButton} onPress={handleSearch}>
        <Text style={styles.SearchButtonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={aircraftResults}
        keyExtractor={(item) => item.registration_number}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default SpotScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  SearchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  SearchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#f0f4f8',
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
  },
  reg: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  model: {
    fontSize: 16,
    color: '#333',
  },
  msn: {
    fontSize: 14,
    color: 'gray',
  },
});
