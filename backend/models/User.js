import { Schema, model } from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';

const userSchema = Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
});

userSchema.plugin(UniqueValidator)

export default model('User', userSchema);