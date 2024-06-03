import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../redux/features/cart/cartReducer";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddQty = () => {
    dispatch(incrementQuantity(item._id));
  };

  const handleRemoveQty = () => {
    dispatch(decrementQuantity(item._id));
  };

  const truncate = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.images[0].url }} style={styles.image} />
      <View style={styles.containerName}>
        <Text style={styles.name}> {truncate(item?.name, 24)} </Text>
        <Text>Price: {item?.price} $</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  containerName: {
    width: 100,
  },
  name: {
    fontSize: 12,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CartItem;
