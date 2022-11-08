import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase/config';
import Profile from './Profile';
import Loader from '../components/Loader';

export default class Search extends Component {
    constructor() {
        super()
        this.state={
            loading:true,
            users: [],
            resultados: [],
            filterBy:''
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
            loading:false
            })
        })
    }
        
    filter(filtro){
        console.log(this.state.resultados)
        if (this.state.filterBy.length !== 0 ) {
            let resultadosFiltrados = this.state.users.filter((user) => {return user.data.userName.toLowerCase().includes(filtro.toLowerCase())})
            this.setState({resultados: resultadosFiltrados})
            console.log(resultadosFiltrados)  
            this.setState({filterBy: ''})   
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
            <Text>Resultados de búsqueda</Text>
            <FlatList
                    data={this.state.resultados}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item})=> 
                    <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('Mi perfil')}}
                    >
                        <Text>{item.data.userName}</Text>
                    </TouchableOpacity>}
            >   </FlatList>
            </View> 

            :

            this.state.filterBy &&

            <View>
                <Text>No hubo coincidencias con la búsqueda</Text>
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
    }
})