const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
	{
		title: { type: String, require: true },
		userId: { type: mongoose.Schema.Types.ObjectId, require: true },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model('todo', todoSchema);
