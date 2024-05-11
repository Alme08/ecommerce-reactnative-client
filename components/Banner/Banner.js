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
import { bannerData } from '../../data/bannerData';

const { width } = Dimensions.get('window');

const Banner = () => {
	const renderItem = data => (
		<View key={data.coverImageUrl} style={styles.cardContainer}>
			<Pressable onPress={() => alert(data._id)}>
				<View style={styles.cardWrapper}>
					<Image style={styles.card} source={{ uri: data.coverImageUrl }} />
				</View>
			</Pressable>
		</View>
	);

	return (
		<View style={styles.container}>
			<Carousel
				pagination={PaginationLight}
				renderItem={renderItem}
				data={bannerData}
				loop
				autoplay
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
		height: width * 0.55,
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

export default Banner;
