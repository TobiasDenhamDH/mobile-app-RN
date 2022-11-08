import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
import Search from '../screens/Search'
import { Ionicons } from '@expo/vector-icons';
import {Foundation, Entypo, FontAwesome5 } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Menu() {
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel:false}}>

            <Tab.Screen name='Home' component={Home} options={{tabBarStyle:{backgroundColor:'#552586', borderTopWidth: 0}, tabBarIcon: ({focused}) => (<Foundation name='home' size={24} color={focused?"black":"white"}/>), headerStyle: {backgroundColor: '#552586'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'},}}/>

            <Tab.Screen name='Nuevo Posteo' component={NewPost} options= {{tabBarStyle:{backgroundColor:'#552586'}, tabBarIcon: ({focused})=> (<Entypo name="camera" size={24} color={focused?"black":"white"} />) , headerStyle: {backgroundColor: '#552586'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'},}}/>

            <Tab.Screen name='Search' component={Search} options={{tabBarStyle:{backgroundColor:'#552586'}, tabBarIcon: ({focused}) => (<Ionicons name="search-sharp" size={24} color={focused?"black":"white"} />), headerStyle: {backgroundColor: '#552586'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'},}}/>

            <Tab.Screen name='Mi perfil' component={Profile} options={{tabBarStyle:{backgroundColor:'#552586'}, tabBarIcon: ({focused}) => (<FontAwesome5 name="user-alt" size={22} color={focused?"black":"white"} />), headerStyle: {backgroundColor: '#552586'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'},}}/>
            
        </Tab.Navigator>
    )
}