import { store } from '../../redux/store'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { openModal } from '../../redux/features/modalSlice'

export default function TodoItem({ todo }) {

	const pressHandle = () => {
		store.dispatch(openModal(todo))
	}

	return (
		<TouchableOpacity
			onLongPress={pressHandle}
			activeOpacity={0.5}
			style={styles.todo}
		>
			<View style={styles.todoInner}>
				<Text style={styles.title}>{todo.title}</Text>
				<Text style={styles.content}>{todo.content}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	todo: {
		borderTopWidth: 0,
		borderLeftWidth: 2,
		borderLeftColor: '#c3c3c3',
		borderRightWidh: 0,
		borderBottomWidth: 0,
		paddingVertical: 10,
		marginBottom: 15,
	},
	todoInner: {
		paddingHorizontal: 20,
	},
	title: {
		fontFamily: 'Roboto-500',
	},
	content: {
		fontSize: 13,
		marginTop: 5,
	},
})
