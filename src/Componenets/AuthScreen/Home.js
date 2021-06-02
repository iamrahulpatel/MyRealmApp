import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";

import Realm from "realm";

import { useNavigation } from '@react-navigation/native';

import { UserSchema } from "../../db/schema";
import Header from "../common/Header";


const Home = () => {

    const navigation = useNavigation();

    const [users, setUsers] = useState([]);



    const getUserFromDatabase = async () => {
        try {
            const realm = await Realm.open({
                schema: [UserSchema],
                schemaVersion: 2,
                migration: (oldRealm, newRealm) => {
                    if (oldRealm.schemaVersion = 1) {
                        const oldObjects = oldRealm.objects('Uffser');
                        const newObjects = newRealm.objects('User');
                        
                        for (const objectIndex in oldObjects) {
                            const oldObject = oldObjects[objectIndex];
                            const newObject = newObjects[objectIndex];
                            newObject.name = `${oldObject.name} ${oldObject.city}`;
                            console.log("newObject",newObject.name)
                        }
                    }
                }
            });
            //sorting via id
            const userList = realm.objects("User").sorted('_id')
            setUsers(userList)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserFromDatabase();
    }, [])

    const gotoSignup = () => {
        navigation.navigate('Signup')
    }


    return (
        <View style={styles.container}>
            <Header name="User List" />
            <View style={styles.formContainer}>
                <View style={styles.form}>


                    <FlatList
                        data={users}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.list} ><Text>{item._id}.</Text>  {item.name}  {item.email}  {item.city}</Text>
                                <Text>---------------------------------------------------------------------------------</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}

                    />


                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btntext} onPress={gotoSignup} >Signup</Text>
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
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        backgroundColor:"#fff"
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
        fontSize: 16,

    },
    btn: {
        justifyContent: "center",
        alignItems: "center"

    },
    btntext: {
        fontSize: 25,
        borderRadius: 10,
        backgroundColor: "#4E4AAD",
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        color: "#fff",
        fontWeight: "bold",
    },
    list: {
        fontSize: 18,
        fontWeight:"bold"
    }

});

export default Home;