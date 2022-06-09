class CredentialsModel {
    
    public email: string;
    public password: string;

    public constructor(user: CredentialsModel) {
        this.email = user.email;
        this.password = user.password;
    }

    // At home - add Joi validation!!!

}

export default CredentialsModel;
