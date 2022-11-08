import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Camera, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post';
import Loader from '../components/Loader'

export default class Home extends Component {
    constructor() {
        super()
        this.state={
            loading:true,
            uri:'',
            users: [],
            description:[],
            userActivo:{},
            posts:[],
            likes:[],
            comments:[],
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs=>{
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

    render() {
        return (
                this.state.loading? <Loader/> :
                <ScrollView>
                    {/* <Text style={styles.text}><strong>Bienvenido, {auth.currentUser.email}</strong></Text>  */}

                <FlatList
                    data={this.state.posts}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item})=><Post post={item}/>}
                >   </FlatList>

                </ScrollView>
                                   
                           
        )
       
    }
}
