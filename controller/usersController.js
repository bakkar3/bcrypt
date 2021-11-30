import UsersModel from '../models/userModel.js'

 export const getUser = async (login) => {
	const user = await UsersModel.find({login:login})
	return user;
    }
    