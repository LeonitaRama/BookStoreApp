import { Feather } from "@expo/vector-icons"
import { router } from 'expo-router'
import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from "../../firebase"

const profile = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
  
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user);
          setLoading(false);
        } else {
          router.replace("/login");
        }
      })
  
      return () => unsubscribe();
    }, [])

  const handleSignOut = async () => {
    try {
        await signOut(auth);
        router.replace("/login")
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#007AFF"/>
        <Text style={styles.welcome}>Loading user info...</Text>
        </View>
      )
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: currentUser.photoURL || 'https://via.placeholder.com/100', // default foto nëse nuk ka
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>
          {currentUser.displayName || "User Name"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{currentUser.email}</Text>

        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>{currentUser.uid}</Text>
      </View>
      
      <TouchableOpacity onPress={handleSignOut}>
        <View style={styles.logoutBtn}>
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sign out</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
    profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 40,
  },
  label: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#FF3B30",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});