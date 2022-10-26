import { useState } from 'react'
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useAddNewTodoMutation } from '../redux/services/todoApi'

export default function AddForm() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const [addPost, res] = useAddNewTodoMutation()

	const toast = useToast()

	const clickHandle = async () => {
		if (title !== '' && content !== '') {
			const { data } = await addPost({ title, content })

			if (data?.type === 'success') {
				toast.show(data.message, { type: 'success', placement: 'bottom' })

				setTitle('')
				setContent('')
			} else {
				toast.show(data.message, { type: 'danger', placement: 'bottom' })
			}
		} else {
			toast.show('Lütfen boş alan bırakmayınız!', {
				type: 'warning',
				placement: 'bottom',
			})
		}
	}

	return (
		<View>
			<View style={styles.wrapper}>
				<TextInput
					value={title}
					style={styles.textfield}
					onChangeText={setTitle}
					placeholder="Başlık giriniz."
				/>
				<Text style={styles.text}>Ekranda gözükecek başlık.</Text>
			</View>
			<View style={styles.wrapper}>
				<TextInput
					value={content}
					style={[styles.textfield, styles.richTextfield]}
					onChangeText={setContent}
					placeholder="İçerik giriniz."
				/>
				<Text style={styles.text}>Ekranda gözükecek içerik.</Text>
			</View>
			<TouchableOpacity
				onPress={clickHandle}
				activeOpacity={0.65}
				style={styles.button}
			>
				<Text style={styles.buttonText}>Ekle</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	textfield: {
		borderRadius: 4,
		height: 54,
		borderColor: '#DADADA',
		borderWidth: 1,
		borderStyle: 'solid',
		width: '100%',
		color: 'rgba(#000000, .87)',
		paddingHorizontal: 16,
	},
	text: {
		color: 'rgba(#000000, .6)',
		marginHorizontal: 16,
		marginVertical: 8,
		fontSize: 12,
	},
	richTextfield: {
		height: 100,
		textAlignVertical: 'top',
		paddingVertical: 20,
	},
	wrapper: {
		paddingVertical: 5,
	},
	button: {
		borderRadius: 4,
		backgroundColor: '#6200EE',
		width: 69,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'Roboto-500',
		fontSize: 14,
		letterSpacing: 1.25,
	},
})
