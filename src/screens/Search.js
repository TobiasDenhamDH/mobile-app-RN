import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader';

export default class Search extends Component {
    constructor() {
        super()
        this.state={
            loading:true,
            users: [],
            resultados: [],
            filterBy:'',
            busqueda: false
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(docs=>{
            let users = [];
            docs.forEach(doc=>{
            users.push( {
                id:doc.id, 
                data:doc.data()})
    
        })
            this.setState({
                users: users,
                loading:false,
            })
        })
    }
        
    filter(filtro){
        if (this.state.filterBy.length !== 0 ) {
            let resultadosFiltrados = this.state.users.filter((user) => {return user.data.userName.toLowerCase().includes(filtro.toLowerCase())})
            this.setState({resultados: resultadosFiltrados})  
            this.setState({
                filterBy: '',
                busqueda: true
        })   
        }else{
            this.setState({resultados:[]})
        } 
        
    }

  render() {
    return (
        this.state.loading ? <Loader/> :
        <ScrollView>
            <View style={styles.container2}>
            <TextInput
                style={styles.campo}
                keyboardType='default'
                placeholder='buscar'
                onChangeText={busqueda=>this.setState({filterBy: busqueda})}
                value={this.state.filterBy}
            />

            <TouchableOpacity
                style={styles.lupa} 
                onPress={()=>{this.filter(this.state.filterBy)}}
            >
            <Ionicons name="search-sharp" size={24} color="black" />
            </TouchableOpacity>
            </View>

            {this.state.resultados.length ?
            <View> 
            <Text style={styles.text}><strong>Resultados de búsqueda</strong></Text>
            <FlatList
                    data={this.state.resultados}
                    keyExtractor={item=>item.id.toString()}
                    ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#B7B9BF', width: 300, marginVertical: 5, alignSelf:'center'}}></View>)}
                    renderItem={({item})=> 
                    <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('UserProfile', {userName : item.data.userName})}}
                    >
                        <View style={styles.listadoUsers}>
                        {item.data.image ?
                            <Image source={{uri: item.data.image}} style={styles.fotoPerfil}/>
                        :
                            <FontAwesome name="user-circle" size={40} color="black" />
                        }
                        <Text style={styles.userName}><strong>{item.data.userName.toLowerCase()}</strong></Text>
                        </View>
                    </TouchableOpacity>}
            >
            </FlatList>
            </View> 

            :

            this.state.busqueda &&

            <View>
                <Text style={styles.leyenda}>No hubo coincidencias con la búsqueda</Text>
            </View>

            }
            
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
    container2: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        marginHorizontal:6,
    },
    lupa: {
        alignSelf: 'center',
    },
    leyenda: {
        color: 'red',
        marginLeft: 38
    },
    listadoUsers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 38,
        marginTop: 5
    },
    text: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center'
    },
    userName: {
        fontSize: 15,
        paddingLeft: 15,
        alignSelf: 'center'
    },
    fotoPerfil: {
        height: 50,
        width: 50,
        borderRadius: 50
    }  
})