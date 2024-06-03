import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";

const Checkout = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);
  const totalAmount = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCOD = () => {
    alert("Pedido realizado con éxito");
  };

  const handleOnline = () => {
    alert("Estás siendo redirigido a la pasarela de pago");
    navigation.navigate("payment");
  };

  const truncate = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Opciones de pago</Text>
        {cart.items.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <Text style={styles.cartItemText}>
              {truncate(item?.name, 20)} x {item.quantity}
            </Text>
            <Text style={styles.cartItemText}>
              {(item.price * item.quantity).toFixed(2)}$
            </Text>
          </View>
        ))}
        <Text style={styles.price}>
          Cantidad Total : {totalAmount.toFixed(2)}$
        </Text>
      </View>
      <View style={styles.paymentCard}>
        <Text style={styles.paymentHeading}>
          Selecciona tus métodos de pago
        </Text>
        <TouchableOpacity style={styles.paymentBtn} onPress={handleCOD}>
          <Text style={styles.paymentBtnText}>Efectivo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentBtn} onPress={handleOnline}>
          <Text style={styles.paymentBtnText}>
            Online (TARJETA CREDITO | DEBITO)
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: "gray",
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cartItemText: {
    fontSize: 16,
  },
  paymentCard: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
    alignSelf: "center",
  },
  paymentHeading: {
    color: "gray",
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: "#000",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  paymentBtnText: {
    color: "#fff",
    textAlign: "center",
  },
});
