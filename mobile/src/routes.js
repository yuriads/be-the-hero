import React from 'react';
import { NavigationContainer } from '@react-navigation/native';//o navigarionContaainer sempre vai por volta de todas as rotas, ele é parecido com o BrowserRoutes do ReactJS
import { createStackNavigator } from '@react-navigation/stack';

//nossa primeira navegação está criada
const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
    return (
        <NavigationContainer>]

            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>

        </NavigationContainer>
    );
}

