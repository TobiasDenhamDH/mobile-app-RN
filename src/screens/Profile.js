import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';


export default class Home extends Component {
    constructor() {
        super()
        this.state={
            loading:true,
            datos: []
        }
    }

    logOut(){
        auth.signOut();
        this.props.navigation.navigate('Register')

    }

    render() {
        return (


           
                <View>
                    <Text>My Profile</Text>
                    <TouchableOpacity onPress={()=> this.logOut()}>
                        <Text>Cerrar sesion</Text>
                    </TouchableOpacity>

                </View>
                           
        )
       
    }
}
