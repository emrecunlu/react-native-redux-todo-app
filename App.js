import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
} from 'react-native'
import { useFonts } from 'expo-font'
import TodoList from './components/Todos/TodoList'
import AddForm from './components/AddForm'
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-native-toast-notifications'
import { store } from './redux/store'
import { useSelector } from 'react-redux'
import TodoModal from './components/TodoModal'

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
		'Roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
		'Roboto-700': require('./assets/fonts/Roboto-Bold.ttf'),
	})

	if (!fontsLoaded) return null

	return (
		<Provider store={store}>
			<ToastProvider>
				<SafeAreaView style={styles.SafeAndroidView}>
					<View style={styles.container}>
						<View>
							<AddForm />
							<TodoList />
						</View>
					</View>
				</SafeAreaView>
			</ToastProvider>
		</Provider>
	)
}

const styles = StyleSheet.create({
	SafeAndroidView: {
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	container: {
		paddingHorizontal: 20,
		paddingVertical: 30,
		height: '100%',
		backgroundColor: '#fff',
	},
})
