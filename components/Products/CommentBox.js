import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import InputBox from '../Form/InputBox';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createReview } from '../../redux/features/product/productActions';
import { useNavigation } from '@react-navigation/native';

const CommentBox = ({ reviews, hasPurchased, productId }) => {
	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(0);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleCommentChange = text => {
		setComment(text);
	};

	const handleRatingChange = value => {
		setRating(value);
	};

	const handleSubmit = async () => {
		const formData = {
			rating,
			comment,
		};
		await dispatch(createReview(productId, formData));
		navigation.navigate('home');
	};

	return (
		<View>
			<View style={{ paddingBottom: 30 }}>
				<Text style={styles.title}>Comentarios</Text>
				{reviews.map((review, index) => {
					return (
						<View
							key={index}
							style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10 }}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingBottom: 10,
								}}
							>
								<Image
									source={{ uri: review.image.url }}
									style={{ width: 40, height: 40, borderRadius: 100 }}
								/>
								<Text style={{ fontWeight: 'bold', fontSize: 17 }}>
									{review.name} -{' '}
								</Text>
								<View style={{ flexDirection: 'row' }}>
									{Array.from({ length: 5 }, (_, i) => {
										const half = i + 0.5;
										return (
											<AntDesign
												key={i}
												name={
													review.rating > i
														? 'star'
														: review.rating > half
														? 'starhalf'
														: 'staro'
												}
												size={18}
												color='#FFD700'
											/>
										);
									})}
								</View>
							</View>
							{/* <View style={{ borderBottomWidth: 0.5 }} /> */}
							<Text>{review.comment}</Text>
						</View>
					);
				})}
				{reviews.length === 0 && <Text>No hay comentarios</Text>}
			</View>
			{hasPurchased ? (
				<>
					<Text style={styles.title}>Deja un comentario</Text>
					<View style={styles.ratingContainer}>
						<TouchableOpacity onPress={() => handleRatingChange(1)}>
							{rating >= 1 ? (
								<AntDesign name='star' size={24} color='#FFD700' />
							) : (
								<AntDesign name='staro' size={24} color='#FFD700' />
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleRatingChange(2)}>
							{rating >= 2 ? (
								<AntDesign name='star' size={24} color='#FFD700' />
							) : (
								<AntDesign name='staro' size={24} color='#FFD700' />
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleRatingChange(3)}>
							{rating >= 3 ? (
								<AntDesign name='star' size={24} color='#FFD700' />
							) : (
								<AntDesign name='staro' size={24} color='#FFD700' />
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleRatingChange(4)}>
							{rating >= 4 ? (
								<AntDesign name='star' size={24} color='#FFD700' />
							) : (
								<AntDesign name='staro' size={24} color='#FFD700' />
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleRatingChange(5)}>
							{rating >= 5 ? (
								<AntDesign name='star' size={24} color='#FFD700' />
							) : (
								<AntDesign name='staro' size={24} color='#FFD700' />
							)}
						</TouchableOpacity>
					</View>
					<InputBox
						placeholder='Ingresa tu comentario'
						value={comment}
						setValue={setComment}
					/>
					<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
						<Text style={styles.submitButtonText}>Enviar</Text>
					</TouchableOpacity>
				</>
			) : (
				<Text>Compra este producto para dejar un comentario.</Text>
			)}
		</View>
	);
};

const styles = {
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	input: {
		height: 100,
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 5,
		marginBottom: 10,
		padding: 10,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	ratingText: {
		marginRight: 10,
	},
	ratingButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: 'lightgray',
		marginRight: 5,
	},
	ratingButtonActive: {
		backgroundColor: 'lightgray',
	},
	purchasedContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	purchasedText: {
		marginRight: 10,
	},
	purchasedButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: 'lightgray',
		backgroundColor: 'white',
	},
	purchasedButtonActive: {
		backgroundColor: 'lightgray',
	},
	submitButton: {
		width: 180,
		backgroundColor: '#000',
		borderRadius: 5,
		height: 40,
		justifyContent: 'center',
		marginBottom: 60,
		marginHorizontal: 'auto',
	},
	submitButtonText: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
};

export default CommentBox;
