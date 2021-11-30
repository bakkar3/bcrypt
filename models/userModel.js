import mongoose from 'mongoose';
const usersSchema = mongoose.Schema({
    login: String,
    hash: String
},{collection:"user"});
const UsersModel = mongoose.model("Users", usersSchema);
export default UsersModel;