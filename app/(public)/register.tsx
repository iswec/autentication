import { StyleSheet, Text, View, Button, Pressable, TextInput } from "react-native";
import { useSignUp } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Link } from 'expo-router'

export default function Register(){
  const { isLoaded, setActive, signUp } = useSignUp();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pendingEmailCode, setPendingEmailCode] = useState(false);
  const [code, setCode] = useState("")
  const [error, setError] = useState("");


  async function handleSignUp(){
    if(!isLoaded) return

    try{
      await signUp.create({
        emailAddress: email,
        password: password
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setPendingEmailCode(true);
      setError("");

    }catch(e: any){
      setError(e.errors[0]?.longMessage || "An error occurred. Please try again."); 
      console.log(JSON.stringify(e, null, 2));
    }

  }


  async function handleVerifyUser(){
    if(!isLoaded) return;


      try{
        const completeSignup = await signUp?.attemptEmailAddressVerification({
          code
        })

        await setActive({ session: completeSignup.createdSessionId })
        setError("");

      }catch(e: any){
        setError(e.errors[0]?.longMessage || "An error occurred. Please try again."); 
        console.log(JSON.stringify(e, null, 2));
      }
  }

  return(
    <View style={styles.container}>
        {!pendingEmailCode && (
          <View>
            <Text style={styles.title}>Criar uma conta</Text>
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

            <Pressable style={styles.buttonStyle} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Criar uma conta</Text>
            </Pressable>

            <Link href="/login" asChild>
              <Pressable style={styles.button}>
                <Text>Já possui uma conta? Faça o login</Text>
              </Pressable>
            </Link>
          </View>
        )}


        {pendingEmailCode && (
          <View>
            <Text style={styles.title}>Digite o código:</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : ""} 

            <TextInput
              autoCapitalize="none"
              placeholder="Digite seu código..."
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />
            <Pressable style={styles.buttonStyle} onPress={handleVerifyUser}>
              <Text style={styles.buttonText}>Ativar conta</Text>
            </Pressable>
          </View>
        )}

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