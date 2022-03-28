const express = require('express');

const router = express.Router();

const Todo = require('../models/todo.model');

const authenticate = require('../middleware/authenticate');

router.get('', async (req, res) => {
	try {
		const todo = await Todo.find().lean().exec();

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.post('', async (req, res) => {
	try {
		const todo = await Todo.create(req.body);

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.get('/:id', authenticate, async (req, res) => {
	try {
		req.body.userId = req.user._id;
		const todo = await Todo.find({ userId: req.params.id }).lean().exec();

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.patch('/:id', authenticate, async (req, res) => {
	try {
		req.body.userId = req.user._id;

		let todo = await Todo.find({ userId: req.params.id }).lean().exec();

		if (!todo) {
			return res.status(401).send('you are not allowed to edit this todo');
		}
		todo = await Todo.findByIdAndUpdate(req.body, req.params.id, {
			new: true,
		});
		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.delete('/:id', authenticate, async (req, res) => {
	try {
		req.body.userId = req.user._id;

		let todo = await Todo.find({ userId: req.params.id }).lean().exec();

		if (!todo) {
			return res.status(401).send('you are not allowed to delete this todo');
		}
		todo = await Todo.findByIdAndDelete(req.body, req.params.id, {
			new: true,
		});
		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

module.exports = router;
