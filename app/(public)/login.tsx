import { StyleSheet, Text, View, Button, Pressable, TextInput } from "react-native";
import { useSignIn } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Link } from 'expo-router'


export default function Login() {
    const { isLoaded, setActive, signIn } = useSignIn();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");


    async function handleSignIn(){
        if(!isLoaded) return;

        try{
    
          const signinUser = await signIn.create({
            identifier: email,
            password: password
          })
    
          await setActive({ session: signinUser.createdSessionId })
          setError("");
    
        }catch(e:any){
        setError(e.errors[0]?.longMessage || "An error occurred. Please try again."); 
          console.log(JSON.stringify(e, null, 2));
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acessar conta</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : ""}
      <TextInput
        autoCapitalize="none"
        placeholder="Digite seu email..."
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888888"
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Digite sua senha..."
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888888"
      />

      <Pressable style={styles.buttonStyle} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Acessar</Text>
      </Pressable>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Ainda não possui uma conta? Cadastre-se</Text>
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title:{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 28,
      marginBottom: 14,
    },
    input: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderColor: '#121212',
      borderRadius: 8,
      padding: 10,
      backgroundColor: '#fff',
    },
    buttonText: {  
        color: '#ffffff',
        fontWeight: 'bold',
      },
      buttonStyle: {  
        backgroundColor: '#121212',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
      },
      button: {
        margin: 8,
        alignItems: 'center',
      },
      errorText: {  
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
      },
  });