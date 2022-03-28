const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
	{
		firstName: { type: String, require: true },
		lastName: { type: String, require: false },
		email: { type: String, require: true },
		password: { type: String, require: true },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

userSchema.pre('save', function (next) {
	const hash = bcrypt.hashSync(this.password, 7);
	this.password = hash;
	return next();
});

userSchema.methods.checkPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);
