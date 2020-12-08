import React from 'react';
import {View,Text,ScrollView,StyleSheet} from 'react-native';


const ContentShow = () => {

    const text = `<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit</p><p>aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p><p> Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>`;

    return(
        <View>
            <View style={{padding:10}}>
                <Text style={styles.articleTitle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo
                </Text>
                <Text style={styles.articleContent}>
                    {text.replace(/<p>/g,"").replace(/<\/p>/g,"\n\n")}
                </Text>
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    articleTitle:{
        fontSize:30,
        marginBottom:30,
        fontWeight:'300',
        color:'#444444'
    },
    articleContent:{
       fontSize:18,
       color:'#444444'
    }
})

export default ContentShow;