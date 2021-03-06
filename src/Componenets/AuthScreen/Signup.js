import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import Realm from "realm";
import { UserSchema } from "../../db/schema";
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { Icon } from "native-base";


const Signup = () => {

    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');

    const navigation = useNavigation();

    const insertUser = async () => {
        try {
            const addUser = {
                _id,
                name,
                email,
                city
            };
            const realm = await Realm.open({
                schema: [UserSchema],
                schemaVersion: 2,

            });

            realm.write(() => {
                realm.create('User', addUser);
            })

            //inserting data line wise as per user enters
            // console.log(realm.objects("User").sorted('_id', true))
            console.log("New User Added")
            // alert("New User Added Successfully")

            setId('');
            setName('')
            setEmail('')
            setCity('')
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async () => {
        try {
            const realm = await Realm.open({ schema: [UserSchema], schemaVersion: 2 });

            const data = realm.objects('User');
            //filter method returns the array which follow the conditions, it does not chage the original array
            const removeUser = data.filtered(`_id="${_id}"`);

            realm.write(() => {
                realm.delete(removeUser);
            });

            console.log("Delete User ", removeUser);
            // alert("User Deleted Successfully")
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateUser = async () => {
        try {
            const realm = await Realm.open({ schema: [UserSchema], schemaVersion: 2 });

            realm.write(() => {

                const data = realm.objects('User')[_id];
                // data._id = _id;
                data.name = name;
                data.email = email;
            });

            console.log("User Updated")
            // alert("User Updated Successfully")

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
            <Header name="Signup" showIcons="true" />
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <TextInput blurOnSubmit={false} value={_id} keyboardType="numeric" onChangeText={e => setId(e)} placeholder="Enter your Id" style={styles.input}></TextInput>
                    <TextInput blurOnSubmit={false} value={name} onChangeText={e => setName(e)} placeholder="Enter your Name" style={styles.input}></TextInput>
                    <TextInput value={email} onChangeText={e => setEmail(e)} placeholder="Enter your Email" style={styles.input}></TextInput>
                    <TextInput value={city} onChangeText={e => setCity(e)} placeholder="Enter your City" style={styles.input}></TextInput>

                    <TouchableOpacity style={styles.btn} onPress={insertUser} >
                        <Text style={styles.btntext} >Insert User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={deleteUser} >
                        <Text style={styles.btntext} >Delete User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={updateUser} >
                        <Text style={styles.btntext} >Update User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={gotoHome} >
                        <Text style={styles.btntext} >User List</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        backgroundColor: '#0EB2BF30',
        
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
        fontWeight: "bold"

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
        paddingLeft: "20%"
    },

});

export default Signup;