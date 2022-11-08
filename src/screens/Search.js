import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase/config';

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
            console.log(users);
            
            this.setState({
            users: users,
            loading:false
            })
        })
    }
        
          
    filter(filtro){
        if () {
            
            
        }else{
            let resultadosFiltrados = this.state.users.filter((user) => {return user.data.userName.toLowerCase().includes(filtro.toLowerCase())})
            this.setState({resultados: resultadosFiltrados})
            console.log(resultadosFiltrados)  
        }
    }

    
    handleChange(e){
        console.log('busqueda')
        // if (e.target.value.length === 0) {
        //     e.preventDefault()
        //     this.setState(
        //         { filterBy: '',
        //         resultados: []})
        // } else {
        //     this.setState(
        //         {filterBy: e.target.value}, 
        //         ()=>{this.filter(this.state.filterBy)})
        // }
    }

  render() {
    return (
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