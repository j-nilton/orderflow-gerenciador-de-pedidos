import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useTableDetailsViewModel } from '../../viewmodel/useTableDetailsViewModel';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../../model/entities/Product';
import { BaseModal } from '../components/BaseModal';

export default function TableDetailsScreen() {
  const {
    table,
    orders,
    loading,
    notes,
    setNotes,
    waiterName,
    saveNotes,
    deleteTable,
    products,
    addOrder,
    updateOrderItem,
    removeOrderItem,
    totalAmount,
    clearTable,
  } = useTableDetailsViewModel();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState<Product | null>(null);
  const [editingItem, setEditingItem] = useState<{ orderId: string, itemId: string, product: Product, quantity: number } | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (loading && !table) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!table) {
    return (
      <View style={styles.center}>
        <Text>Mesa não encontrada</Text>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert(
      "Excluir Mesa",
      "Tem certeza que deseja excluir esta mesa?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: deleteTable }
      ]
    );
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductToAdd(product);
    setEditingItem(null);
    setQuantity(1);
  };

  const handleEditItem = (orderId: string, itemId: string, product: Product, currentQuantity: number) => {
    setEditingItem({ orderId, itemId, product, quantity: currentQuantity });
    setQuantity(currentQuantity);
    setModalVisible(true);
  };

  const handleConfirmAdd = () => {
    if (editingItem) {
        updateOrderItem(editingItem.orderId, editingItem.itemId, quantity);
        setModalVisible(false);
        setEditingItem(null);
        setQuantity(1);
    } else if (selectedProductToAdd) {
      addOrder(selectedProductToAdd, quantity);
      setModalVisible(false);
      setSelectedProductToAdd(null);
      setQuantity(1);
    }
  };

  const handleDeleteItem = () => {
    if (editingItem) {
        Alert.alert(
            "Remover Item",
            `Deseja remover ${editingItem.product.name} do pedido?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Remover", 
                    style: "destructive", 
                    onPress: () => {
                        removeOrderItem(editingItem.orderId, editingItem.itemId);
                        setModalVisible(false);
                        setEditingItem(null);
                        setQuantity(1);
                    }
                }
            ]
        );
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProductToAdd(null);
    setEditingItem(null);
    setQuantity(1);
  };

  const confirmClear = () => {
    Alert.alert(
      "Liberar Mesa",
      "Isto irá apagar pedidos e observações desta mesa.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Liberar", style: "destructive", onPress: clearTable }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: table.name }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{table.name}</Text>
          <Text style={styles.waiter}>Garçom: {waiterName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="Adicionar observações..."
            value={notes}
            onChangeText={setNotes}
            onBlur={saveNotes}
            onSubmitEditing={saveNotes}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={saveNotes}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adicionar Pedido</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.selectButtonText}>+ Selecionar Produto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.ordersHeader}>
            <Text style={styles.sectionTitle}>Pedidos</Text>
            <Text style={styles.totalAmount}>Total: R$ {totalAmount.toFixed(2)}</Text>
          </View>
          {orders.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum pedido registrado.</Text>
          ) : (
            orders.map((order) => (
              <View key={order.id}>
                {order.items.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.orderItem}
                    onPress={() => handleEditItem(order.id, item.id, item.product, item.quantity)}
                  >
                    <Text style={styles.orderItemName}>
                        {item.quantity}x {item.product.name}
                    </Text>
                    <Text style={styles.orderItemPrice}>R$ {(item.product.price * item.quantity).toFixed(2)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          )}
        </View>

        {table.isOccupied && (
          <TouchableOpacity style={styles.clearButton} onPress={confirmClear}>
            <Text style={styles.clearButtonText}>Liberar Mesa</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.deleteButtonText}>Excluir Mesa</Text>
        </TouchableOpacity>
      </ScrollView>

      <BaseModal visible={modalVisible} onRequestClose={handleCloseModal}>
        {!selectedProductToAdd && !editingItem ? (
          <>
            <Text style={styles.modalTitle}>Selecione um Produto</Text>
            {products.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
            ) : (
                <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productItem} onPress={() => handleSelectProduct(item)}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
                    </TouchableOpacity>
                )}
                style={{ maxHeight: 300 }}
                />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.modalTitle}>
                {selectedProductToAdd ? selectedProductToAdd.name : editingItem?.product.name}
            </Text>
            <Text style={styles.quantityLabel}>Quantidade:</Text>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantityValue}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.totalPreview}>
              Total: R$ {((selectedProductToAdd ? selectedProductToAdd.price : (editingItem?.product.price || 0)) * quantity).toFixed(2)}
            </Text>

            <TouchableOpacity style={styles.addButton} onPress={handleConfirmAdd}>
              <Text style={styles.addButtonText}>
                  {editingItem ? "Atualizar Pedido" : "Adicionar ao Pedido"}
              </Text>
            </TouchableOpacity>

            {editingItem && (
                <TouchableOpacity style={[styles.deleteButton, { marginTop: 10, marginBottom: 10 }]} onPress={handleDeleteItem}>
                    <Text style={styles.deleteButtonText}>Remover Item</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={() => {
                if (editingItem) {
                    handleCloseModal();
                } else {
                    setSelectedProductToAdd(null);
                }
            }}>
              <Text style={styles.closeButtonText}>{editingItem ? "Cancelar" : "Voltar"}</Text>
            </TouchableOpacity>
          </>
        )}
      </BaseModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  waiter: { fontSize: 16, color: '#666', marginTop: 5 },
  section: { marginBottom: 25, backgroundColor: '#fff', padding: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  ordersHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#34C759' },
  input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  selectButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  selectButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  confirmButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  orderItemName: { fontSize: 16, color: '#333' },
  orderItemPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  emptyText: { color: '#888', fontStyle: 'italic', textAlign: 'center', padding: 10 },
  clearButton: { backgroundColor: '#FF9500', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  clearButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  deleteButton: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, maxHeight: '60%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  productItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  productName: { fontSize: 16 },
  productPrice: { fontWeight: 'bold' },
  closeButton: { marginTop: 20, padding: 10, alignItems: 'center', backgroundColor: '#eee', borderRadius: 8 },
  closeButtonText: { color: '#333', fontWeight: 'bold' },
  quantityLabel: { fontSize: 16, marginBottom: 10, textAlign: 'center', color: '#666' },
  quantityContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  quantityButton: { backgroundColor: '#ddd', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 },
  quantityButtonText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  quantityValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  totalPreview: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#34C759' },
  addButton: { backgroundColor: '#34C759', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
