import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PriceTable from "../components/cart/PriceTable";
import Layout from "../components/Layout/Layout";
import CartItem from "../components/cart/CartItem";
import { clearCart, removeItem } from "../redux/features/cart/cartReducer";
import carritoVacio from "../assets/empty_cart.webp";

const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const roundToTwoDecimals = (num) => {
    return num.toFixed(2);
  };

  return (
    <Layout>
      {cartItems.length > 0 ? (
        <>
          <Text style={styles.heading1}>
            Tienes {cartItems.length} producto
            {cartItems.length > 1 ? "s" : ""} en tu carrito.
          </Text>
          <ScrollView>
            {cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </ScrollView>
          <View>
            <PriceTable
              title={"Precio"}
              price={roundToTwoDecimals(totalPrice)}
            />
            <PriceTable
              title={"IVA"}
              price={roundToTwoDecimals(totalPrice * 0.16)}
            />
            <View style={styles.grandTotal}>
              <PriceTable
                title={"Total"}
                price={roundToTwoDecimals(totalPrice + totalPrice * 0.16)}
              />
            </View>
            <TouchableOpacity
              style={styles.btnCheckout}
              onPress={() => navigation.navigate("Verificar Pagos")}
            >
              <Text style={styles.btnCheckoutText}>COMPROBAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnVaciarCheckout]}
              onPress={handleClearCart}
            >
              <Text style={styles.btnCheckoutText}>VACIAR CARRITO</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.imageContainer}>
          <Text style={styles.heading2}>Tu carrito está vacío.</Text>
          <Image source={carritoVacio} style={styles.image} />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  heading1: {
    textAlign: "center",
    fontSize: 20,
    color: 'green',
    marginTop: 10,
  },
  heading2: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 20,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "black",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnVaciarCheckout: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "red",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 100,
  },
  btnCheckoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 100,
    height: 200,
    width: 400,
  },
});

export default Cart;
