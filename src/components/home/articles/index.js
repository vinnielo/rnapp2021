import React, { useEffect, useState } from 'react';
import { 
    View, Text, 
    Button, ScrollView,
    TouchableOpacity,StyleSheet,
    ActivityIndicator 
} from 'react-native';
import { Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getStories,getMoreStories } from '../../../store/actions';
 
const HomeScreen = ({navigation}) => {
    const [loadingMore,setLoadingMore] = useState(false);
    const stories = useSelector(state => state.stories);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getStories())
    },[dispatch])


    const renderCard = () => (
        stories.posts.map((item)=>(
            <TouchableOpacity
                key={item.id}
                onPress={()=> navigation.navigate('Article_screen',{
                    id: item.id,
                    postData: item
                })}
            >
                <Card>
                    <Card.Title style={styles.cardTitle}>
                        <Text>{item.title}</Text>
                    </Card.Title>
                    <Card.Divider/>
                    <Text style={styles.cardText}>
                        {item.excerpt}
                    </Text>
                </Card>
            </TouchableOpacity>
        ))
    )

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 50;
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    }


    return(
        <ScrollView
            onScroll={({nativeEvent})=> {
                if(isCloseToBottom(nativeEvent)){
                   if(!loadingMore){
                        setLoadingMore(true);
                        dispatch(getMoreStories(stories)).then(()=>{
                            setLoadingMore(false);
                        })
                   }
                }
            }}
            scrollEventThrottle={400}
        >
            { stories && stories.posts ?
                renderCard()
                :null
            }

            {loadingMore ?
                <View style={{marginTop:50, marginBottom:50}}>
                    <ActivityIndicator color="black"/>
                </View>
            :null}
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
