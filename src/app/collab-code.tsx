import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useCollabCodeViewModel } from '../viewmodel/useCollabCodeViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CollaboratorCodeScreen() {
  const { manualCode, setManualCode, error, loading, confirmManual, formatPreview } = useCollabCodeViewModel();
  const inputRef = useRef<TextInput>(null);
  const [y, setY] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <Image source={require('../../assets/logo_OrderFlow.png')} style={styles.logo} />
          <Text style={styles.title}>Código de acesso</Text>
          <View style={styles.card} onLayout={(e) => setY(e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Informar código já gerado</Text>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Digite o código (9 dígitos)"
              value={manualCode}
              onChangeText={setManualCode}
              keyboardType="numeric"
              maxLength={11}
            />
            {manualCode ? <Text style={styles.preview}>{formatPreview(manualCode)}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={confirmManual} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Confirmar</Text>}
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  logo: { width: 300, height: 300, alignSelf: 'center', resizeMode: 'contain', marginTop: 30 },
  title: { textAlign: 'center', color: '#333', marginTop: -40, marginBottom: 20, fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#444' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  preview: { textAlign: 'center', color: '#333', marginTop: 8, marginBottom: 8 },
  button: { backgroundColor: '#5856D6', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
});
