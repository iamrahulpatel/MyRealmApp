const UserSchema = {
    name: 'User',
    primaryKey:'_id',
    properties:{
        _id:"string",
        name:"string",
        email:"string",
        city:"string"
    }
};

// const NewUserSchema = {
//     name: 'NewUser',
//     primaryKey:'id',
//     properties:{
//         id:"int",
//         name:"string",
//         email:"string"
//     }
// };

module.exports={
    UserSchema,
    // NewUserSchema
};