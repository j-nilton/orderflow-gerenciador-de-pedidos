import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useProductsViewModel } from '../viewmodel/useProductsViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export default function ProductsScreen() {
  const {
    products,
    loading,
    name,
    setName,
    price,
    setPrice,
    addProduct,
    deleteProduct,
  } = useProductsViewModel();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Gerenciar Produtos' }} />
      <Text style={styles.title}>Produtos</Text>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Novo Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço (ex: 10.50)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addProduct} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>Adicionar Produto</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  form: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#444' },
  input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  addButton: { backgroundColor: '#34C759', padding: 12, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  list: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardPrice: { fontSize: 14, color: '#666' },
  deleteButton: { backgroundColor: '#FF3B30', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
});
