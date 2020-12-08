import React from 'react';
import { Platform, View } from 'react-native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Colors,LogoText }from '../utils/tools';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


import VideosScreen from '../components/home/videos';
import VideoScreen from '../components/home/videos/video';
import HomeScreen from '../components/home/articles';
import ArticleScreen from '../components/home/articles/article'

export const Stack = createStackNavigator();

const LeftIcon = () => {
    const navigation = useNavigation()
    return(
        <View style={{margin:10}}>
            <Icon
                name="menufold"
                type="antdesign"
                color={Colors.white}
                onPress={()=> navigation.openDrawer()}
            />
        </View>
    )
}


export const screenOptions = {
    headerTitleAlign:'center',
    headerTintColor: Colors.red,
    headerStyle:{
        backgroundColor: Colors.black,
        borderBottomWidth:6,
        borderBottomColor:Colors.red,
        height: Platform.OS === 'ios' ? 110 : 60
    },
    headerTitle:()=> <LogoText style={{fontSize:25}}/>
}

export const VideosStack = () => (
    <Stack.Navigator
        screenOptions={{
            ...screenOptions
        }}
        initialRouteName="Videos_screen"
    >
        <Stack.Screen name="Videos_screen" component={VideosScreen} options={{
            headerLeft:(props)=> <LeftIcon/>,
        }}/>
    </Stack.Navigator>
)

export const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{
            ...screenOptions
        }}
        initialRouteName="Home_screen"
    >
        <Stack.Screen name="Home_screen" component={HomeScreen} options={{
            headerLeft:(props)=> <LeftIcon/>,
        }}/>
        <Stack.Screen name="Article_screen" component={ArticleScreen}/>
    </Stack.Navigator>
)