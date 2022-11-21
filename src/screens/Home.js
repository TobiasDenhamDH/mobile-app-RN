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

                <FlatList
                    data={this.state.posts}
                    ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#B7B9BF', width: 400, alignSelf:'center'}}></View>)}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item})=><Post post={item} {...this.props}/>} // para pasar las props de navegación del home a los posteos porque no es otra pantalla
                >   </FlatList>

                </ScrollView>
                                   
                           
        )
       
    }
}
