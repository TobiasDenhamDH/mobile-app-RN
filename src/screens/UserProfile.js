import React, { Component } from 'react'
import {  Text, View, ScrollView, StyleSheet, Image , FlatList} from 'react-native';
import { db } from '../firebase/config';
import { FontAwesome} from '@expo/vector-icons';
import Loader from '../components/Loader';
import Post from '../components/Post';


export default class UserProfile extends Component {
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
        .where('userName', '==', this.props.route.params.userName)
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
        .where('owner', '==', this.props.route.params.userName)
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
                    <Text style={styles.text}><strong>Posteos ({this.state.posts.length})</strong></Text>
                </View>

                <View>
                    <FlatList
                        ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#B7B9BF', width: 400, marginVertical: 5, alignSelf:'center'}}></View>)}
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Post post={item} {...this.props} />}
                    /> 
                </View>
                </>

                :
                
                <View style={styles.container6}>
                    <Text style={styles.text}><strong>Aún no tiene posteos</strong></Text>
                </View>

                }
                </ScrollView>
                           
        )
       
    }
}

const styles = StyleSheet.create({
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
    marginBottom: 10,
    marginHorizontal: 6
},
text2: {
    fontSize: 28,
    color: 'black',
    alignSelf:'center',
    marginHorizontal:10,
},
text3: {
    fontSize: 15,
    color: 'black',
    marginHorizontal:6,
    paddingTop: 7,
    paddingBottom: 7
},

})