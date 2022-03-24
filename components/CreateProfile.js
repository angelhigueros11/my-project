import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image,TextInput,TouchableOpacity,Pressable,Alert,KeyboardAvoidingView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './hooks/useTogglePasswordVisibility';
import {auth} from './firebase.js';
import Home from './Home.js';
export default function CreateProfile({navigation}){

    const validate = (email) => {
        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    }

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
            const user = userCredentials.user;
            let name = email.split('.')[0];
            navigation.navigate("Home",{email,name})
        }).catch(err => {alert(err.message);});
    }

    


    const pswUtils = useTogglePasswordVisibility();
    const passwordVisibility = pswUtils.passwordVisibility;
    const rightIcon = pswUtils.rightIcon;
    const handlePasswordVisibility = pswUtils.handlePasswordVisibility;

    const pswUtils2 = useTogglePasswordVisibility();
    const passwordVisibility2 = pswUtils2.passwordVisibility;
 

    const handlePasswordVisibility2 = pswUtils2.handlePasswordVisibility;

    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('');
    const [email,setMail] = useState('');

  



    return (
        <SafeAreaView style={styles.container}>
            {/**LOGO AREA */}
            <View style={styles.logo}>
                {/* <Image source={require('../assets/src/imgs/logoConTitulo.png')} style={styles.logoImg}/> */}
                <Text style={styles.logoText1}>Health</Text>
                <Text style={styles.logoText2}>Forms</Text>
            </View>
            {/** Area de Inputs */}
            <View style = {styles.containerInputs}>
                
                <TextInput style={[styles.input,{marginTop:20}]}
                placeholder="Correo"  
                value={email} 
                onChangeText={text => setMail(text)}
                autoCapitalize='none'/>

                {/* <TextInput style={[styles.input,{marginTop:20}]}
                placeholder="DPI"  
                value={DPI} 
                onChangeText={text => setDPI(text)}
                keyboardType='numeric'/> */}
                
                {/* Area del input contrasena */}
                <View style={styles.inputContainer}>

                    <TextInput
                    style={styles.inputField}
                    name='password'
                    placeholder='Contraseña'
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='newPassword'
                    secureTextEntry={passwordVisibility}
                    value={password}
                    enablesReturnKeyAutomatically
                    onChangeText={text => setPassword(text)}
                    />

                    {/* Area del icono */}
                    <Pressable onPress={handlePasswordVisibility} style={{top:0,right:20}}>
                        <MaterialCommunityIcons name={rightIcon} size={28} color="#232323" />
                    </Pressable>

                </View>

                {/* Area del input contrasena */}
                <View style={styles.inputContainer}>

                    <TextInput
                    style={styles.inputField}
                    name='password'
                    placeholder='Confirmar Contraseña'
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='newPassword'
                    secureTextEntry={passwordVisibility2}
                    value={passwordC}
                    enablesReturnKeyAutomatically
                    onChangeText={text => setPasswordC(text)}
                    />

                    {/* Area del icono */}
                    <Pressable onPress={handlePasswordVisibility2} style={{top:0,right:20}}>
                        <MaterialCommunityIcons name={rightIcon} size={28} color="#232323" />
                    </Pressable>

                </View>
            </View>

 
                
                {/* Iniciar Sesion */}
                <View style={styles.buttonContainer} >

                    <TouchableOpacity style={styles.logInButton} onPress={()=>{
                        if(validate(email)){

                            if(password.length>6){
                                if(password===passwordC){
                                    handleSignUp();
                                 
    
                                }else{
                                    Alert.alert("Error","Las contraseñas no coinciden")
                                }

                            }else{
                                Alert.alert("Error","La contraseña debe tener más de 6 caracteres")
                            }
                            
                            
                            // navigation.navigate('Home');
                        }else{
                            Alert.alert("Error","Correo invalido");
                        }
                        
                        }}>
                                <Text style={{ color:'white' }}> Crear Perfil </Text>
                    </TouchableOpacity>

                                    {/* Crear Perfil */}
                                    <TouchableOpacity style={[styles.logInButton,{marginTop:20,backgroundColor:'white'}]} hitSlop={{backgroundColor:'red'}} onPress={()=>{
                                        navigation.navigate('UserLogin');
                                    }}>
                                            <Text style={{color:'black'}}>Cancelar</Text>
                                    </TouchableOpacity>
                </View >
                
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        backgroundColor: '#fff',
        
        
    },logo:{
        flex: 0.2,
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent: 'center',
      },
      logoImg: {
        resizeMode: "center", 
        width:250,
        height:50,
        bottom: 0,
        backgroundColor: '#fff',

      },
      containerInputs:{
          flex:0.4,
          backgroundColor: '#fff',
          width:"80%",
          alignItems:'center',
          marginTop:50
      },
      buttonContainer: {
        backgroundColor: '#fff',
        flex: 0.3,
        alignItems:'center',
        width:"80%"
      }
      ,
      input:{
          backgroundColor: '#fff',
          marginTop: 50,
          height: 40,
          borderBottomColor:"#29abe2",
          borderBottomWidth: 1,
          width:"80%",
      },
      logInButton:{

          width:"80%",
          height:40,
          borderRadius:15,
          backgroundColor: '#29abe2',
          justifyContent: 'center',
          alignItems: 'center',
         
          top:60,
          color: '#fff',
      },
      
      inputContainer: {
        marginTop:20,
        backgroundColor: 'white',
        width: '80%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white'
      },
      inputField: {

        backgroundColor: '#fff',
        marginTop:0,
        height: 40,
        borderBottomColor:"#29abe2",
        borderBottomWidth: 1,
        width:"100%",
        
      },
      logoText1:{
        fontSize:40,
        color: '#29abe2',
        fontWeight: 'bold',
      },
      logoText2:{
        fontSize:40,
        fontWeight: 'bold',

      }
      
      
      
    
})