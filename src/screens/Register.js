import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config'
import Loader from '../components/Loader'


export default class Register extends Component {

    constructor(props){
        super(props)
        this.state={
            loading: true,
            email:'',
            pass:'',
            userName:'',
            errorMensaje:''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('Menu')
            } 
            this.setState({
                loading:false
            })
        
        })

           
    }

    register(email,pass, userName){
        auth.createUserWithEmailAndPassword(email,pass)
        .then((res)=> {

            db.collection('users').add({
                email:email,
                userName:userName,
                posts:[]
            })

            this.setState({
                email:'',
                pass:'',
                userName:''
            })
            this.props.navigation.navigate('Login')
        })
        .catch(err=>{
            this.setState({
                errorMensaje: err.message
            })
        })
    }
    render() {
        return (
            this.state.loading? <Loader/> : 
            <View style={styles.container}>
                    
                <Text style={styles.text}><strong>Registro</strong></Text>
                <View>

                    <TextInput
                            style={styles.campo}
                            keyboardType='default'
                            placeholder='username'
                            onChangeText={userName=>this.setState({userName:userName})}
                            value={this.state.userName}

                        />
                    <TextInput
                        style={styles.campo}
                        keyboardType='email-address'
                        placeholder='email@email.com'
                        onChangeText={userEmail=>this.setState({email:userEmail})}
                        value={this.state.email}

                    />
                    <TextInput
                        style={styles.campo}
                        keyboardType='default'
                        placeholder='password'
                        secureTextEntry
                        onChangeText={userPass=>this.setState({pass:userPass})}
                        value={this.state.pass}
                    />
                    <Text style={styles.errorText}>{this.state.errorMensaje}</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={()=>{this.register(this.state.email, this.state.pass, this.state.userName)}}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{this.props.navigation.navigate("Login")}}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Ya tengo cuenta</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    },
    campo: {
        fontSize:16,
        borderColor: '#552586',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:4,
        marginVertical:8,
        marginHorizontal:16,
        padding:8,
        width:280
    },
    errorText: {
        color: 'red',
        marginHorizontal:16,
    },

    button: {
        padding:8,
        backgroundColor:'#552586',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },

    buttonText: {
        fontSize:24,
        color:'#FAFAFA',
    },

    text: {
        fontSize: 30,
        color: 'black',
        marginHorizontal:16,
        marginBottom:10
    }
})