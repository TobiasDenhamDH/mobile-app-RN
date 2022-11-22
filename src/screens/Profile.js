import React, { Component } from 'react'
import {  Text, View, TouchableOpacity, FlatList,ScrollView, StyleSheet, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import Post from '../components/Post';


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
        .where('owner', '==', auth.currentUser.displayName)
        .orderBy('createdAt', 'desc')
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

    logOut(){
        auth.signOut();
        this.props.navigation.navigate('Login')

    }

    borrarPost(id){
        db.collection('posts').doc(id).delete()
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
                    <Text style={styles.text2}><strong>{this.state.user.data.userName.toLowerCase()}</strong></Text>
                    <View style={styles.container4}>
                    <TouchableOpacity onPress={()=> this.logOut()}>
                        {/* <Entypo name="log-out" size={24} color="black" /> */}
                        <Text style={styles.button}><strong>Cerrar sesión</strong></Text>
                    </TouchableOpacity>
                </View>
                </View>

                
                <View style={styles.container5}>
                    {this.state.user.data.bio ? 
                        <View>
                        <Text style={styles.text3}>{this.state.user.data.email}</Text>                     
                        <Text style={styles.text3}>{this.state.user.data.bio}</Text>
                        </View>
                    :
                        <Text style={styles.text3}>{this.state.user.data.email}</Text>
                    }
                </View>
                    
                {this.state.posts.length?
                <>  
                <View style={styles.container6}>
                    <Text style={styles.text}><strong>Mis posteos ({this.state.posts.length})</strong></Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Nuevo Posteo')}>
                            <Entypo style= {styles.add} name="plus" size={30} color="black" />
                        </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={this.state.posts}
                        ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#B7B9BF', width: 400, marginVertical: 5, alignSelf:'center'}}></View>)}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => 
                            <>
                                <Post post={item} {...this.props} />
                                <View style={styles.containerDelete}>
                                    <TouchableOpacity   onPress={() => this.borrarPost(item.id)}>
                                    <MaterialIcons name="delete" size={30} color="black" />
                                    </TouchableOpacity>
                                </View>
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
    color: "white"
},
containerDelete:{
    display:'1',
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center',
},
delete: {
    marginRight:5
},
add: {
    display:'flex',
    alignSelf:'center'
},
container4: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    paddingBottom: 10
 },
fotoPerfil: {
    height: 90,
    width: 90,
    borderRadius: 50
},
text: {
    fontSize: 25,
    color: 'black',
    marginHorizontal:6,
    marginBottom:10
},
text2: {
    fontSize: 28,
    color: 'black',
    alignSelf:'center',
    marginHorizontal:10  
},
text3: {
    fontSize: 15,
    color: 'black',
    marginHorizontal:6,
    paddingTop: 7,
    paddingBottom: 7
},

})
