import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ScrollView, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader';

export default class Comments extends Component {
    constructor() {
        super()
        this.state={
            loading:true,
            user: {},
            comments: [],
            commentText:''
        }
    }

    componentDidMount(){
        db.collection('posts').doc(this.props.route.params.id).onSnapshot(doc=>{
 
            this.setState({
                loading:false,
                comments: doc.data().comments
            })
        })
        db.collection('users')
        .where('userName', '==', auth.currentUser.displayName)
        .onSnapshot(docs=>{
            let user = {};
            docs.forEach(doc=>{
            user = ( {
                id:doc.id, 
                data:doc.data()})
        })
            this.setState({
            user: user,
            })
        })
    }

    comentar(){
        if (this.state.commentText == '') {
            return
        } else {
            // actualizar la colección de posteos de firebase
            db.collection('posts').doc(this.props.route.params.id).update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.displayName,
                    text: this.state.commentText,
                    image: this.state.user.data.image,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                this.setState({
                    commentText: '',
                })
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
                this.state.loading? <Loader/> :
                <ScrollView>
                    <View style={styles.container}>

                    <Text style={styles.text}><strong>Agregar Comentario</strong></Text>

                    {this.state.comments.length ?
                    <FlatList
                        data={this.state.comments}
                        keyExtractor={item=>item.createdAt} // sirve para identificar cada elemento de la iteración
                        ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#B7B9BF', width: 300, marginVertical: 5, alignSelf:'center'}}></View>)}
                        renderItem={({item})=>
                        <>
                        {auth.currentUser.displayName !== item.owner?
                        <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('Perfil del usuario', {userName : item.owner })}}
                        >
                        <View style={styles.listadoComentario}>
                            {item.image ?
                                <Image source={{uri: item.image}} style={styles.fotoPerfil}/>
                            :
                                <FontAwesome name="user-circle" size={40} color="black" />
                            }
                            <Text style={styles.userName}><strong>{item.owner.toLowerCase()}</strong></Text>
                            <Text style={styles.textoComentario}>{item.text}</Text>
                        </View>
                        </TouchableOpacity>

                        :
                        <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('Mi perfil', {userName : item.owner })}}
                        >
                        <View style={styles.listadoComentario}>
                            {item.image ?
                                <Image source={{uri: item.image}} style={styles.fotoPerfil}/>
                            :
                                <FontAwesome name="user-circle" size={40} color="black" />
                            }
                            <Text style={styles.userName}><strong>{item.owner.toLowerCase()}</strong></Text>
                            <Text style={styles.textoComentario}>{item.text}</Text>
                        </View>
                        </TouchableOpacity>
                        }
                        </>
                        
                    }
                    />

                    :
                    
                    <View>
                        <Text style={styles.leyenda}>Aún no hay comentarios. ¡Sé el primero en comentar!</Text>
                    </View>

                    }

                    <TextInput
                        style={styles.campo}
                        keyboardType='default'
                        placeholder='Agregar comentario'
                        onChangeText={text => this.setState({commentText:text})}
                        value={this.state.commentText}
                    />

                    {this.state.commentText?

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.comentar(this.state.commentText)}}
                    >
                        <Text style={styles.buttonText}>Publicar</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={()=>{this.comentar(this.state.commentText)}}
                    >
                        <Text style={styles.buttonText}>Publicar</Text>
                    </TouchableOpacity>

                    }

                    </View>
                </ScrollView>
                                        
        )
       
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
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
        width:280,
        marginTop: 30
    },
    button: {
        padding:8,
        backgroundColor: '#552586',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
    button2: {
        padding:8,
        backgroundColor: 'grey',
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
        fontSize: 20,
        color: 'black',
        marginBottom: 30,
        marginTop: 10,
        alignSelf: 'center'
    },
    leyenda: {
        color: 'red',
        alignSelf: 'center'
    },
    listadoComentario: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        paddingLeft: 20
    },
    textoComentario: {
        padding: 5
    },
    userName: {
        paddingLeft: 8
    },
    fotoPerfil: {
        height: 50,
        width: 50,
        borderRadius: 50
    }    
})