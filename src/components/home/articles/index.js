import React from 'react';
import { 
    View, Text, 
    Button, ScrollView,
    TouchableOpacity,StyleSheet 
} from 'react-native';
import { Card } from 'react-native-elements'

const HomeScreen = ({navigation}) => {

    const renderCard = () => (
        <TouchableOpacity
            onLongPress={()=> navigation.navigate('Article_screen',{
                id: 'vdhjbd',
                postData: {title:'sjsjs',content:''}
            })}
        >
            <Card>
                <Card.Title style={styles.cardTitle}>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </Text>
                </Card.Title>
                <Card.Divider/>
                <Text style={styles.cardText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                </Text>
            </Card>
        </TouchableOpacity>
    )


    return(
        <ScrollView>
            {renderCard()}
            {renderCard()}
            {renderCard()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardTitle:{
        fontSize:20,
        textAlign:'left'
    },
    cardText:{
        marginBottom:10,
        marginTop:10
    }
})

export default HomeScreen;