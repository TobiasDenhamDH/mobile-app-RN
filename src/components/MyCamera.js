import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { db,auth,storage } from '../firebase/config'


export default class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state={
            permission:false,
            uri:'',
            showCamera:true
        }
        this.metodosDeCamara=''
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>this.setState({
            permission:true
        }))
        .catch(err=>console.log(err))
    }

    tomarFoto(){
        console.log('tomar foto')
        this.metodosDeCamara.takePictureAsync()
        .then(photo=>this.setState({
            uri: photo.uri,
            showCamera:false
        }))
        .catch(err=>console.log(err))
    }

    guardarFoto(){
        console.log('guardar foto')
        fetch(this.state.uri)
        .then(res=>res.blob())
        .then(image=>{
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then((uri)=>{
                    this.props.onImageUpload(uri)
                })
            })
        })
        .catch(err=>console.log(err))
    }

    clearFoto(){
        console.log('guardar foto')
        this.setState({
            uri:'',
            showCamera:true
        })
    }



    render() {
        return (
            <View  style={styles.cameraBody}>
                {this.state.permission? 
                 this.state.showCamera?
                <View style={styles.cameraBody}>
                <Camera
                    style={styles.cameraBody}
                    type={Camera.Constants.Type.back} 
                    ref= {metodosDeCamara =>this.metodosDeCamara = metodosDeCamara}
                />
            
                <TouchableOpacity
                    style={styles.buttonLogin2}
                    onPress={()=>this.tomarFoto()}
                
                >
                    <Ionicons name="radio-button-on-outline" size={70} color="#552586" />
                </TouchableOpacity>
                </View>
                :
                <View>
                <Image
                        style={styles.cameraBody}
                        source={{uri:this.state.uri}}
                    />

                <View style={styles.container2}>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.guardarFoto()}}
                    >
                        <MaterialIcons name="cloud-upload" size={60} color="#552586" />
                    </TouchableOpacity>
                
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.clearFoto()}}
                    >
                        <MaterialIcons name="delete" size={60} color="#552586" />
                    </TouchableOpacity>
                    
                </View>
                </View>
                :
                <View style={styles.text}>
                    <Text>No hay permiso para utilizar la camara del dispositivo</Text>
                </View>

            }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container2: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraBody:{
        height: 300,
    },
    preview:{
        height: 300,

    },
    campo: {
        fontSize:16,
        borderColor: '#CCC',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:4,
        marginVertical:8,
        marginHorizontal:16,
        padding:8,
    },

    button: {
        padding:8,
        marginVertical:10,
        marginHorizontal:16,
    },

    buttonLogin2: {
        padding:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
    },

    buttonText: {
        fontSize:24,
        color:'#FAFAFA',
    },

    text: {
        fontSize: 24,
        textAlign:'center',
        color: 'black',
    }
})