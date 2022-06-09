import { UserModel, IUserModel } from './../03-models/user-model';
import ErrorModel from "../03-models/error-model";
import cyber from '../01-utils/cyber';
import CredentialsModel from '../03-models/credentials-model';
import RoleModel from '../03-models/role-model';

async function checkId(idNumber: string): Promise<boolean> {
    const user = await UserModel.findOne({ idNumber: idNumber }).exec();
    return !!user;
}

async function checkEmail(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email: email }).exec();
    return !!user;
}

async function register1(user: IUserModel): Promise<IUserModel> {

    const isIdTaken = await checkId(user.idNumber);
    if (isIdTaken) throw new ErrorModel(400, "This id number is already exists.");

    const isEmailTaken = await checkEmail(user.email);
    if (isEmailTaken) throw new ErrorModel(400, "This email is already exists.");

    user.password = await cyber.hash(user.password);

    user.role = RoleModel.User;

    return user;

}

async function register2(user: IUserModel): Promise<string> {

    const errors = user.validateSync();

    if (errors) throw new ErrorModel(400, errors.message);

    await user.save();

    delete user.password;

    const token = cyber.getNewToken(user);

    return token;

}

async function login(credentials: CredentialsModel): Promise<any> {

    credentials.password = cyber.hash(credentials.password);

    const user = await UserModel.findOne({ email: credentials.email, password: credentials.password }).exec();

    if (!user) {
        throw new ErrorModel(401, "Incorrect Email or Password.");
    }

    delete user.password;

    const token = cyber.getNewToken(user);

    return token;
}

export default {
    register1,
    register2,
    login
}