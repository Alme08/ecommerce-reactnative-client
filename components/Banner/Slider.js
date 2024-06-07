import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	Pressable,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';

const { width } = Dimensions.get('window');

const Slider = ({ images }) => {
	const renderItem = data => (
		<View key={data.url} style={styles.cardContainer}>
			<View style={styles.cardWrapper}>
				<Image style={styles.card} source={{ uri: data.url }} />
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Carousel
				pagination={PaginationLight}
				renderItem={renderItem}
				data={images}
				loop
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width,
	},
	cardWrapper: {
		borderRadius: 10,
		overflow: 'hidden',
	},
	card: {
		width: width * 0.93,
		height: width * 0.8,
	},
	cornerLabel: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderTopLeftRadius: 8,
	},
	cornerLabelText: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '600',
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 2,
		paddingBottom: 2,
	},
});

export default Slider;
