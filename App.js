import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Menu from './src/components/Menu';
import Comments from './src/screens/Comments';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()

export default function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='Menu' component={Menu} options={{headerShown:false}}/>
        <Stack.Screen name='Comments' component={Comments} options={{headerShown:true}}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}