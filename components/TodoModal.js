import { StyleSheet } from 'react-native'
import { store } from '../redux/store'
import Modal from 'react-native-modal'
import { closeModal } from '../redux/features/modalSlice'
import { View, Text, TouchableOpacity } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'

import { useRemoveTodoMutation } from '../redux/services/todoApi'

export default function TodoModal() {
	
	const [removeTodo, res] = useRemoveTodoMutation()
	const { isVisible, activeTodo } = useSelector((state) => state.modal)

	const toast = useToast()

	const clickHandle = async () => {
		const {data} = await removeTodo(activeTodo._id)

		console.log(data)

		if (data?.type === 'success') {
			toast.show(data.message, { type: 'success', placement: 'bottom' })
		} else {
			toast.show(data.message, { type: 'danger', placement: 'bottom' })
		}

		store.dispatch(closeModal())
	}

	return (
		<Modal isVisible={isVisible}>
			<View style={styles.modal}>
				<Text style={styles.todoName}>
					{activeTodo.title}
					<Text style={styles.todoQuestion}>
						{' '}
						başlıklı işi silmek üzersiniz, onalıyor musunuz?
					</Text>
				</Text>
				<View style={styles.buttonGroup}>
					<TouchableOpacity onPress={() => store.dispatch(closeModal()) } activeOpacity={0.65} style={[styles.button, styles.buttonCancel]}>
						<Text style={styles.buttonText}>İptal</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={clickHandle} activeOpacity={0.65} style={[styles.button, styles.buttonDanger]}>
						<Text style={styles.buttonText}>Sil</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#ffffff',
		padding: 20,
		borderRadius: 4,
	},
	todoName: {
		fontFamily: 'Roboto-500',
	},
	todoQuestion: {
		fontFamily: 'Roboto-400',
	},
	button: {
		borderRadius: 4,
		backgroundColor: '#6200EE',
		width: 69,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
		marginLeft: 10
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'Roboto-500',
		fontSize: 14,
		letterSpacing: 1.25,
	},
	buttonDanger: {
		backgroundColor: '#df4759'
	},
	buttonCancel: {
		backgroundColor: '#A8A8A8'
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 20
	}
})
