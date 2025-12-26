import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useCreateTableViewModel } from '../viewmodel/useCreateTableViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateTableScreen() {
  const { name, setName, loading, error, createTable, cancel } = useCreateTableViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nova Mesa</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome da Mesa</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Mesa 01"
          value={name}
          onChangeText={setName}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancelButton} onPress={cancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createButton} onPress={createTable} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.createButtonText}>Criar Mesa</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#555' },
  input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { padding: 15, borderRadius: 8, flex: 1, marginRight: 10, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' },
  cancelButtonText: { color: '#666', fontWeight: 'bold' },
  createButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, flex: 1, marginLeft: 10, alignItems: 'center' },
  createButtonText: { color: '#fff', fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 20 },
});
