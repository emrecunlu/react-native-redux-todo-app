import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { useGetAllTodosQuery } from '../../redux/services/todoApi'
import TodoModal from '../TodoModal'
import TodoItem from './TodoItem'

export default function TodoList() {

	const { data: todos, isLoading, error } = useGetAllTodosQuery()

	return (
		<View>
            <TodoModal />
			{(isLoading && <ActivityIndicator />) || (
				<FlatList
					data={todos}
					renderItem={({ item }) => <TodoItem todo={item} />}
					keyExtractor={(item) => item._id}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		paddingVertical: 10,
	},
})
