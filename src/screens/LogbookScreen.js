import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getLogbook } from '../utils/logbookStorage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const LogbookScreen = () => {
  const [logbookEntries, setLogbookEntries] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchLogbook = async () => {
      const logbook = await getLogbook();
      const entriesArray = Object.values(logbook);
      setLogbookEntries(entriesArray);
    };

    fetchLogbook();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('AircraftProfile', { aircraft: item })}
    >
      <Text style={styles.title}>Reg: {item.registration_number}</Text>
      <Text>Aicraft Model: {item.iata_type || 'N/A'}</Text>
      <Text>MSN: {item.construction_number || 'N/A'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {logbookEntries.length === 0 ? (
        <Text style={styles.emptyText}>No aircraft spotted yet.</Text>
      ) : (
        <FlatList
          data={logbookEntries}
          keyExtractor={(item) => item.registration_number}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default LogbookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 100,
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
  },
});
