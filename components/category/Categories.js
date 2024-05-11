import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { CategoriesData } from '../../data/categories';
import { useNavigation } from '@react-navigation/native';

const icons = {
	Bebidas: 'glass-cocktail',
	Carniceria: 'food-steak',
	Charcuteria: 'cheese',
	Pescaderia: 'fish',
	Verduras: 'food-apple',
	Frutas: 'food-apple',
};

const Categories = ({ categories }) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View
				style={{
					padding: 15,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text style={{ fontSize: 20, fontWeight: 600 }}>All Featured</Text>
				<View style={{ flexDirection: 'row', gap: 10 }}>
					<TouchableOpacity
						style={{
							paddingHorizontal: 12,
							paddingVertical: 3,
							backgroundColor: '#fff',
							borderRadius: 5,
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 7,
							flexDirection: 'row',
						}}
					>
						<Text>Sort</Text>
						<FontAwesome5 name='sort' size={20} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							paddingHorizontal: 12,
							paddingVertical: 3,
							backgroundColor: '#fff',
							borderRadius: 5,
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 7,
							flexDirection: 'row',
						}}
					>
						<Text>Filter</Text>
						<FontAwesome5 name='filter' size={17} />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: '#ffffff',
						marginHorizontal: 15,
					}}
				>
					{categories?.map(category => (
						<View key={category._id}>
							<TouchableOpacity
								style={styles.catContainer}
								// onPress={() => navigation.navigate(category.path)}
							>
								<MaterialCommunityIcons
									name={icons[category.category] || 'food'}
									style={styles.catIcon}
								/>

								<Text style={styles.catTitle}>{category.category}</Text>
							</TouchableOpacity>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 0,
		marginTop: 5,
	},
	catContainer: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	catIcon: {
		fontSize: 30,
		verticalAlign: 'top',
	},
	catTitle: {
		fontSize: 12,
	},
});

export default Categories;
