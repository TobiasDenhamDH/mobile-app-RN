import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader';
import { FlatList } from 'react-native-web';


export default class Home extends Component {
    constructor() {
        super()
        this.state={
            loading:true,
            users: {},
            posts: [],
        }
    }
    
    componentDidMount(){
        db.collection('users')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot(docs=>{
            let user= {};
            docs.forEach(doc=>{
            user= {
                id:doc.id, 
                data:doc.data()}
    
        })
        console.log(this.state.users)
            this.setState({
            users: user,
            loading:false
            })
        }),
 

        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot(docs=>{
            let posts = [];
            docs.forEach(doc=>{
            posts.push( {
                id:doc.id, data:doc.data()})

    
        })
        this.setState({
            posts: posts,
            loading:false
          })
        })
    }


    BorrarPost (){

    }
    
    logOut(){
        auth.signOut();
        this.props.navigation.navigate('Login')

    }


    render() {
        return (

                this.state.loading? <Loader/> :
                <View>
                    <Text>{this.state.users.data.email}</Text> 

                    <Text>My Profile</Text>
                    <TouchableOpacity onPress={()=> this.logOut()}>
                        <Text>Cerrar sesion</Text>
                    </TouchableOpacity>

                </View>
                           
        )
       
    }
}
