import React, { Component } from 'react'
import {  Text, View, TouchableOpacity, FlatList,ScrollView, StyleSheet, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Loader from '../components/Loader';
import Post from '../components/Post';
import NewPost from './NewPost';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={
            loading:true,
            user: {},
            posts: [],
        }
    }


    componentDidMount() {

        db.collection('users')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot((docs) => {
            let usersFromDb = {};
            docs.forEach((doc) => {
            let user = doc.data()
            console.log(user)
            usersFromDb = {
                id: doc.id,
                data: user,
            }
            })
            this.setState({ 
                user: usersFromDb, 
                loading:false
                })
        })
  

        db.collection('posts')
        .where('owner', '==', auth.currentUser.displayName )
        .onSnapshot((docs)=>{
            let posts = [];
            docs.forEach(doc=>{
            posts.push( {
                id:doc.id, data:doc.data()})

    
        })

        this.setState({
            posts: posts,
   
          })
        })
    }


    borrarPost (){
         borrarPost = 
        db 
          .collection('posts')
          .doc(id)
          borrarPost.delete()
    }
    
    logOut(){
        auth.signOut();
        this.props.navigation.navigate('Login')

    }

    deletePost(id){
        const borrarPosteo = 
        db 
          .collection('posts')
          .doc(id)
          borrarPosteo.delete()
      }


    render() {
        return (

                this.state.loading? <Loader/> :
                <ScrollView>
                   

                <View style={styles.container3}>
                    {this.state.user.data.image ?
                    <Image source={{uri: this.state.user.data.image}} style={styles.fotoPerfil}/>
                    :
                    <FontAwesome name="user-circle" size={40} color="black" />
                    }
                    <Text style={styles.text2}><strong>{this.state.user.data.userName}</strong></Text>
                </View>

                
                <View style={styles.container5}>
                    <Text style={styles.text3}>{this.state.user.data.email}</Text>                     
                    <Text style={styles.text3}>{this.state.user.data.bio}</Text>
                </View>

                <View style={styles.container4}>
                    <TouchableOpacity onPress={()=> this.logOut()}>
                        <Text style={styles.button}><strong>Cerrar sesión</strong></Text>
                    </TouchableOpacity>
                </View>
                    
                {this.state.posts.length?
                 <>  
                <View style={styles.container6}>
                    <Text style={styles.text}><strong>Mis Posteos ({this.state.posts.length})</strong></Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Nuevo Posteo')}>
                            <Entypo style= {styles.add} name="plus" size={30} color="black" />
                        </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => 
                        <>
                        <Post post={item} {...this.props} />
                        <TouchableOpacity   onPress={() => this.deletePost(item.id)}>
                            <Text style={styles.button}><strong>Delete Post</strong></Text>
                      </TouchableOpacity>
                        </>
                        }
                    /> 
                </View>
                </>

                :
                
                <View style={styles.container6}>
                <Text style={styles.text}><strong>Aún no tienes posteos</strong></Text>

                
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Nuevo Posteo')}>
                        <Entypo style= {styles.add} name="plus" size={30} color="black" />
                    </TouchableOpacity>

                </View>
               
                }

                    
                    

                </ScrollView>
                           
        )
       
    }
}
const styles = StyleSheet.create({
button: {
    padding:8,
    backgroundColor: '#552586',
    borderRadius:8,
    textAlign:'center',
    marginVertical:4,
    marginHorizontal:16,
    width:200,
    color: "white"
},
add: {
    display:'flex',
    alignSelf:'center'
},
container4: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  
},
container6: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    
  
},
container3: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 10
 },
 container5: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 6,
    paddingBottom: 10
 },
 fotoPerfil: {
    height: 100,
    width: 100,
    borderRadius: 50
},
text: {
    fontSize: 25,
    color: 'black',
    marginHorizontal:6,
    marginBottom:10
},
text2: {
    fontSize: 35,
    color: 'black',
    alignSelf:'center',
    marginHorizontal:10,
    marginTop: 15,
  
},
text3: {
    fontSize: 15,
    color: 'black',
    marginHorizontal:6,
  
  
},

})
