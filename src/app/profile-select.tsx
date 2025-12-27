import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function ProfileSelectScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo_OrderFlow.png')} style={styles.logo} />
      <Text style={styles.title}>Selecione seu perfil</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/collab-code')}>
          <Text style={styles.primaryButtonText}>Colaborador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/owner-code')}>
          <Text style={styles.secondaryButtonText}>Dono da organização</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>© Todos os direitos reservados</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  logo: { width: 300, height: 300, alignSelf: 'center', resizeMode: 'contain', marginTop: 30 },
  title: { textAlign: 'center', color: '#333', marginTop: -40, marginBottom: 20, fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  primaryButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { backgroundColor: '#5856D6', padding: 12, borderRadius: 8, alignItems: 'center' },
  secondaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 24, textAlign: 'center', color: '#888', fontSize: 12 },
});
