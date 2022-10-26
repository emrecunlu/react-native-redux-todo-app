const { default: mongoose } = require('mongoose')
const TodoModel = require('../models/TodoModel')

module.exports.getAll = async (req, res) => {
	const todos = await TodoModel.find({}).sort({ 'updatedAt': -1}).exec()

	res.send(todos)
}

module.exports.removeTodo = async (req, res) => {
	const { id } = req.body

	if (mongoose.isValidObjectId(id)) {
		try {
			await TodoModel.findByIdAndRemove(id)

			res.send({ type: 'success', message: 'Todo başarıyla silindi!' })
		} catch (err) {
			res.send({ type: 'error', message: err.message })
		}
	} else {
		res.send({ type: 'error', message: 'Lütfen geçerli bir id giriniz.' })
	}
}

module.exports.newTodo = async (req, res) => {
	const todo = new TodoModel(req.body)

	try {
		const insertTodo = await todo.save(req.body)

		if (insertTodo) {
			res.send({ type: 'success', message: 'Todo başarıyla eklendi!' })
		}
	} catch (err) {
		res.send({ type: 'error', message: err.message })
	}
}
