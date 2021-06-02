import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';



const Header = ({ name , leftIcon}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
              
            <Text style={styles.headText}>{name}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "space-around",
        backgroundColor: "#0EB2BF"
    },
    icon: {
        fontSize: 28,
        color: "#fff",
        fontWeight: "bold",
    },
    headText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold"
    }
})

export default Header;