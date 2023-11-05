import { Schema, model } from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';

const userSchema = Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
});

userSchema.plugin(UniqueValidator)

const userModel = model('User', userSchema);

export default userModel