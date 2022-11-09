import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, CheckBox} from 'react-native'
import { auth } from '../firebase/config'
import Loader from '../components/Loader'



export default class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            loading:true,
            email:'',
            pass:'',
            remember:false,
            errorMensaje:'',
            error: {
                email:'',
                pass:''
            }
        }
    }

    componentDidMount(){
        console.log(this.state.remember)
        if(this.state.remember == true) {
            auth.onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('Menu')
       
            }
        })} 
        else {
                this.props.navigation.navigate('Login')
          
        }
        this.setState({loading:false})
    }

    login(email,pass){
        if ( this.state.email.length == 0  && this.state.pass.length == 0){
            this.setState({error: {email:'ingrese email', pass: 'ingrese contraseña'}})
            return

        } else if (this.state.email.length == 0){
            this.setState({error: {email:'ingresa email', pass:''}})
            return
        } else if (this.state.pass.length == 0){
            this.setState({error: {email:'', pass:'ingrese contraseña'}})
            return
        }
        this.setState({error:{email:'', pass:''}})
        

        auth.signInWithEmailAndPassword(email,pass)
        .then((res)=> {
            this.props.navigation.navigate('Menu')
            
        })
        .catch(err=>{
            this.setState({
                errorMensaje:err.message
            })
        })
    }
    render() {

        return (
            this.state.loading? <Loader/> :
            <View style={styles.container}>
                <Text style={styles.text}><strong>Inicio de sesión</strong></Text>
                <View>

                
                    <TextInput
                        style={styles.campo}
                        keyboardType='email-address'
                        placeholder='Dirección de email'
                        onChangeText={userEmail=>this.setState({email:userEmail})}
                        value={this.state.email}

                    />
                     <Text style={styles.errorText}>
                    {this.state.error.email && 'La dirección de email es obligatoria'}
                    </Text>

                    <TextInput
                        style={styles.campo}
                        keyboardType='default'
                        placeholder='Contraseña'
                        secureTextEntry
                        onChangeText={userPass=>this.setState({pass:userPass})}
                        value={this.state.pass}
                    />
                    <Text style={styles.errorText}>
                    {this.state.error.pass && 'La contraseña es obligatoria'}
                    </Text>
                    <Text style={styles.errorText}>{this.state.errorMensaje}</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    
                <CheckBox
                    value={this.state.remember}
                    onValueChange={()=>this.setState({
                        remember:!this.state.remember
                    })}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Remember me</Text>
             </View>
    

                <TouchableOpacity 
                    onPress={()=>{this.login(this.state.email, this.state.pass)}}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{this.props.navigation.navigate("Register")}}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Registrate</Text>
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
    },
    checkboxContainer: {
        flexDirection: "row",
        // marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 2,
    },
    
})