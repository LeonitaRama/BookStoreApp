import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        loadBooks(); // ngarko librat kur përdoruesi log in
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const loadBooks = async () => {
    try {
      const stored = await AsyncStorage.getItem("books");
      const booksData = stored ? JSON.parse(stored) : [];
      setBooks(booksData);
    } catch (error) {
      console.log("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = router.addListener("focus", loadBooks);
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {userEmail || "User"}</Text>
      <Text style={styles.header}>Books List</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
          </View>
        )}
        style={{ width: "100%" }}
      />
      <TouchableOpacity
        onPress={() => router.push("/add-book")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add New Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  welcome: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  bookItem: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitle: { fontSize: 16, fontWeight: "bold" },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
