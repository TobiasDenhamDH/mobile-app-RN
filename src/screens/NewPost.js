import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import MyCamera from '../components/MyCamera'
import { db,auth,storage } from '../firebase/config'
import firebase from 'firebase';
import Loader from '../components/Loader'


export default class NewPost extends Component {

    constructor(props){
        super(props)
        this.state={
            userActivo:{},
            description:'',
            showCamera:true,
            loading:true,
            uri:'',
            likes:[],
            comments:[]
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(docs=>{
            docs.forEach(doc=>{
                if(auth.currentUser.email === doc.data().email){
                    this.setState({
                        userActivo: {
                            id:doc.id, 
                            data: doc.data(),
                        }
                    })

                }
                this.setState({
                    loading:false
                })

            })
            
        })
       
    }

    crearPost(){
        console.log(this.state.userActivo.data.image)
        db.collection('users').doc(this.state.userActivo.id).update({
                
            posts: firebase.firestore.FieldValue.arrayUnion(this.state.description)
        
            })
            .catch(err=>console.log(err))

        db.collection('posts').add({
            owner:auth.currentUser.displayName,
            description:this.state.description,
            likes:[],
            comments:[],
            uri:this.state.uri,
            ownerPic: this.state.userActivo.data.image,
            createdAt: Date.now()
        })
        .then((res)=>{
            console.log('posteo exitoso')
            this.setState({
                description:'',
                showCamera: true
            },()=>this.props.navigation.navigate('Home')
            )
        })
    }
    onImageUpload(uri){
        this.setState({
            uri:uri,
            showCamera:false
        })
    }

    render() {
        return (
            this.state.loading? <Loader/> :
            <View style={styles.containerNew}>
                {this.state.showCamera?
                <MyCamera
                    onImageUpload = {uri=>this.onImageUpload(uri)}
                />
                :
                <View style={styles.container}>

                    <Text style={styles.text}><strong>Agregar Posteo</strong></Text>
                    <TextInput 
                        placeholder='Sube un nuevo posteo...'
                        onChangeText={(description)=>{this.setState({description:description})}}
                        style={styles.campo}
                        value={this.state.description}
                        
                    ></TextInput>
                    <TouchableOpacity
                        onPress={()=>{this.crearPost()}}
                        style={styles.buttonLogin}
                    >
                        <Text style={styles.buttonText}>Crear Posteo</Text>
                    </TouchableOpacity>

                </View>
            
            }
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
    containerNew: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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

    buttonLogin: {
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