import React,{ useState, useCallback, useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser,clearAuthError } from '../../store/actions';
import { useFocusEffect } from '@react-navigation/native'

import { Input, Button } from 'react-native-elements';
import {LogoText, Colors, showToast } from '../../utils/tools';

const AuthScreen = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error )
    const [formType, setFormType] = useState(true)
    const [ securEntry,setSecurEntry] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleSubmit = (values) => {
        setLoading(true)
        if(formType){
            // register
            dispatch(registerUser(values));
        } else {
            // sign in
            dispatch(loginUser(values))
        }
    }

    useEffect(()=>{
        if(error){
            showToast('error','Sorry',error);
            setLoading(false)
        }
    },[error])

    useFocusEffect(
        useCallback(()=>{
            return () => dispatch(clearAuthError())
        },[])
    )


    return(
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <LogoText/>
                <Formik
                    initialValues={{ email:'',password:''}}
                    validationSchema={Yup.object({
                        email: Yup.string()
                        .email('Invalid email address')
                        .required('The email is required'),
                        password:Yup.string()
                        .max(20,'Must be 10 or less')
                        .required('The lastname is required')
                    })}
                    onSubmit={ values => handleSubmit(values)}
                >
                { ({handleChange,handleBlur, handleSubmit, values,touched,errors})=>(
                    <>
                        <Input
                            placeholder="Email"
                            leftIcon={{ type:'antdesign',name:'mail',color: Colors.white}}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.grey}
                            inputContainerStyle={styles.inputContainerStyle}

                            renderErrorMessage={errors.email && touched.email}
                            errorMessage={errors.email}
                            errorStyle={{ color: Colors.black}}

                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <Input
                            placeholder="Password"
                            secureTextEntry={securEntry}
                            leftIcon={{ type:'antdesign',name:'lock',color: Colors.white}}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.grey}
                            inputContainerStyle={styles.inputContainerStyle}
                            rightIcon={{
                                type:'antdesign',
                                name:securEntry ? 'eye':'eyeo',
                                onPress:()=> setSecurEntry(!securEntry)
                            }}

                            renderErrorMessage={errors.password && touched.password}
                            errorMessage={errors.password}
                            errorStyle={{ color: Colors.black}}

                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <Button
                            title={ formType ? 'Register':'Login'}
                            buttonStyle={{
                                backgroundColor: Colors.black,
                                marginTop:20
                            }}
                            titleStyle={{ width:'100%'}}
                            onPress={handleSubmit}
                            loading={loading}
                        />
                         <Button
                            type="clear"
                            title={`${!formType ? 'Already Registered?':'Need to sign in?'}`}
                            buttonStyle={{
                                marginTop:20
                            }}
                            titleStyle={{ width:'100%', color:Colors.white}}
                            onPress={()=> setFormType(!formType)}
                    
                        />

                    </>
                )}
                </Formik>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer:{
        flex:1,
        backgroundColor:Colors.red
    },
    container:{
        padding:50,
        alignItems:'center'
    },
    inputStyle:{
        fontSize:15,
        color:Colors.white
    },
    inputContainerStyle:{
      borderBottomWidth:3,
      borderBottomColor: Colors.black  
    }
})

export default AuthScreen;