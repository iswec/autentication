import { StyleSheet, Text, View } from "react-native";
import { useUser } from '@clerk/clerk-expo';
import { Link } from "expo-router";

export default function Home() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {user?.emailAddresses[0].emailAddress}</Text>

      <Link href="/profile" style={styles.buttonStyle}>
        <Text >Meu perfil</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#121212',
    padding: 8,
    color: '#ffffff',
    fontWeight: 'bold',
  }, 
});
