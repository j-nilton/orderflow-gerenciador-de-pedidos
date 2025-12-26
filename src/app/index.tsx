import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useWelcomeViewModel } from '../viewmodel/useWelcomeViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const {
    issuedCode,
    formattedIssued,
    manualCode,
    setManualCode,
    error,
    loading,
    generateCode,
    confirmIssued,
    confirmManual,
    formatPreview,
  } = useWelcomeViewModel();

  const scrollRef = useRef<ScrollView>(null);
  const manualInputRef = useRef<TextInput>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [manualY, setManualY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const scrollToManual = () => {
    const offset = keyboardHeight > 0 ? 160 : 240;
    const y = Math.max(0, manualY - offset);
    scrollRef.current?.scrollTo({ y, animated: true });
    setTimeout(() => manualInputRef.current?.focus(), 50);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: keyboardHeight + 40 }]}
        >
          <Image source={require('../../assets/logo_OrderFlow.png')} style={styles.logo} />
          <Text style={styles.welcomeText}>Bem-vindo ao OrderFlow!</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Escolha uma opção para continuar: </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/collab-code')}>
              <Text style={styles.primaryButtonText}>Colaborador</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/login-owner')}>
              <Text style={styles.secondaryButtonText}>Dono da organização</Text>
            </TouchableOpacity>
          </View>

          {keyboardHeight === 0 ? (
            <Text style={styles.footer}>© Todos os direitos reservados</Text>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  scrollContent: { paddingBottom: 20 },
  logo: { width: 300, height: 300, alignSelf: 'center', resizeMode: 'contain', marginTop: 30 },
  welcomeText: { textAlign: 'center', fontWeight: 'bold', color: '#333', marginTop: -40, marginBottom: 20, fontSize: 18 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  sectionTitle: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  primaryButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  confirmButton: { backgroundColor: '#34C759', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  confirmButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  codeLabel: { color: '#666', marginTop: 10 },
  codeValue: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 6, letterSpacing: 2 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  codePreview: { textAlign: 'center', color: '#333', marginTop: 8, marginBottom: 8 },
  secondaryButton: { backgroundColor: '#5856D6', padding: 12, borderRadius: 8, alignItems: 'center' },
  secondaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
  footer: { marginTop: 24, textAlign: 'center', color: '#888', fontSize: 12 },
});
