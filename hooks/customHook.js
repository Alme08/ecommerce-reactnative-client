import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

export const useReduxStateHook = (navigation, path = 'login') => {
	const { loading, error, message } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			alert(error);
			dispatch({ type: 'clearError' });
		}
		if (message) {
			alert(message);
			dispatch({ type: 'clearMessage' });
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: path }],
				})
			);
		}
	}, [error, dispatch, message]);
	return loading;
};
