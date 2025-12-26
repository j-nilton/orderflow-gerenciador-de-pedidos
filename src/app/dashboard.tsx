import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDashboardViewModel } from '../viewmodel/useDashboardViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const {
    tables,
    loading,
    searchQuery,
    setSearchQuery,
    navigateToCreate,
    navigateToDetails,
    navigateToProducts,
  } = useDashboardViewModel();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToDetails(item.id)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={[styles.statusBadge, item.isOccupied ? styles.occupied : styles.available]} />
      </View>
      {item.waiterName ? <Text style={styles.cardSub}>{`Garçom: ${item.waiterName}`}</Text> : null}
      <Text style={styles.cardStatus}>{item.isOccupied ? 'Ocupada' : 'Livre'}</Text>
      {item.notes ? <Text numberOfLines={1} style={styles.cardNotes}>{item.notes}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesas</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={[styles.button, styles.productsButton]} onPress={navigateToProducts}>
            <Text style={styles.buttonText}>Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.addButton]} onPress={navigateToCreate}>
            <Text style={styles.buttonText}>+ Nova</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar mesa..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading && tables.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={tables}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma mesa encontrada.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerButtons: { flexDirection: 'row', gap: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  button: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  addButton: { backgroundColor: '#007AFF' },
  productsButton: { backgroundColor: '#34C759' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  searchBar: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  list: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSub: { fontSize: 12, color: '#666', marginBottom: 4 },
  statusBadge: { width: 12, height: 12, borderRadius: 6 },
  occupied: { backgroundColor: 'red' },
  available: { backgroundColor: 'green' },
  cardStatus: { color: '#666', fontSize: 14, marginBottom: 5 },
  cardNotes: { color: '#888', fontStyle: 'italic', fontSize: 12 },
  loader: { marginTop: 20 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
});
