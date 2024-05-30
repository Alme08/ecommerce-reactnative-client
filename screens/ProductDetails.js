import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getProductData } from '../redux/features/product/productActions';
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = ({ route }) => {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const [qty, setQty] = useState(1);
  const { product, loading } = useSelector(state => state.product);

  const { params } = route;

  useEffect(() => {
    if (params?._id) {
      dispatch(getProductData(params._id));
    }
  }, [dispatch, params?._id]);

  useEffect(() => {
    if (product) {
      setProductDetails(product);
    }
  }, [product]);

  const handleAddQty = () => {
    if (qty === 10) {
      return alert("Max quantity is 10");
    }
    setQty((prev) => prev + 1);
  };

  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  if (loading) {
    return (
      <Layout >
        <Text style={styles.loading}>
          Cargando...
        </Text>
      </Layout>
    );
  }

  if (!productDetails || !productDetails.images || !productDetails.images[0]) {
    return (
      <Layout>
        <Text style={styles.loading}>
          Error: Producto no encontrado o sin imagen.
        </Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <Image source={{ uri: productDetails.images[0].url }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{productDetails.name}</Text>
        <Text style={styles.title}>Precio: {productDetails.price}$</Text>
        <Text style={styles.desc}>{productDetails.description}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={() => alert(`${qty} items added to cart`)}
            disabled={productDetails.stock < qty}
          >
            <Text style={styles.btnCartText}>
              {productDetails.stock < qty ? "Agotado" : "Añadir al carrito"}
            </Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
              <Text style={styles.btnQtyText}>-</Text>
            </TouchableOpacity>
            <Text>{qty}</Text>
            <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
              <Text style={styles.btnQtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 330,
    width: "100%",
  },
  loading: {
    textAlign: "center",
    margin: "auto",
    paddingTop: 250,
    width: 300,
    height: 500,
    fontSize: 40
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  desc: {
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "left",
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnCart: {
    width: 180,
    backgroundColor: "#000",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
  },
  btnCartText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
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

export default ProductDetails;
