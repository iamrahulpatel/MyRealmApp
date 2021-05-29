import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import Realm from "realm";
import { UserSchema } from "../../db/schema";

import { useState } from 'react/cjs/react.development';
import { useNavigation } from '@react-navigation/native';


const Signup = () => {

    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const insertUser = async () => {
        try {
            const addUser = {
                _id,
                name,
                email
            };
            const realm = await Realm.open({ schema: [UserSchema] });
            realm.write(() => {
                realm.create('User', addUser);
            })
            console.log("New User Added")
            alert("New User Added Successfully")
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async () => {
        try {
            const realm = await Realm.open({ schema: [UserSchema] });

            const data = realm.objects('User');
            const removeUser = data.filtered(`_id="${_id}"`);

            realm.write(() => {
                realm.delete(removeUser);
            });

            console.log("Delete User ", removeUser);
            alert("User Deleted Successfully")
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateUser = async () => {
        try {
            const realm = await Realm.open({ schema: [UserSchema] });

            realm.write(() => {

                const data = realm.objects('User')[_id];
                // data._id = _id;
                data.name = name;
                data.email = email;
            });

            console.log("User Updated")
            alert("User Updated Successfully")

        }
        catch (error) {
            console.log(error)
        }
    }

    const gotoHome = () => {
        navigation.navigate("Home")
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <TextInput keyboardType="numeric" onChangeText={e => setId(e)} placeholder="Enter your Id" style={styles.input}></TextInput>
                    <TextInput onChangeText={e => setName(e)} placeholder="Enter your Name" style={styles.input}></TextInput>
                    <TextInput onChangeText={e => setEmail(e)} placeholder="Enter your Email" style={styles.input}></TextInput>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btntext} onPress={insertUser} >Insert User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btntext} onPress={deleteUser} >Delete User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btntext} onPress={updateUser} >Update User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btntext} onPress={gotoHome} >User List</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
    },
    form: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        backgroundColor: '#0EB2BF',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        color: '#4E4AAD',
        fontSize: 20,
        fontWeight:"bold"

    },
    btn: {
        justifyContent: "center",
        alignItems: "center"

    },
    btntext: {
        width: "80%",
        fontSize: 20,
        borderRadius: 10,
        backgroundColor: "#4E4AAD",
        padding: 10,
        marginBottom: 10,
        color: "#fff",
        fontWeight: "bold",
        paddingLeft:"25%"
    }

});

export default Signup;