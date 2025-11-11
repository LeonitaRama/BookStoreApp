import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddBook() {
    const [book, setBook] = useState("");
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState(false)

    const addBook = async () => {
        if (book.trim() === "") {
            setError("Book title is required");
            return;
        }

        if (book.length < 3) {
            setError("Book title must be at least 3 characters!");
            return;
        }

        setError("");
        const newBook = { id: Date.now().toString(), title: book };

        try {
            const stored = await AsyncStorage.getItem("books")
            const books = stored ? JSON.parse(stored) : [];
            books.push(newBook)
            await AsyncStorage.setItem("books", JSON.stringify(books));

            setBook("");
            setModalVisible(true);
        } catch (error) {
            console.log("Error adding book:", error);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        router.push("/")
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                <Text style={styles.title}>Add New Book</Text>
                <Link href="/" style={{ marginTop: 10, color: "#007AFF" }}>
                    ← Back to Books
                </Link>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter book title"
                    value={book}
                    onChangeText={setBook}
                />
                <TouchableOpacity style={styles.addBtn} onPress={addBook}>
                    <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
            </View>
            {error ? <Text style={{color: 'red', fontSize: 14}}>{error}</Text> : null}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Book added successfully!</Text>
                        <TouchableOpacity onPress={handleModalClose}>
                            <View style={styles.modalBtn}>
                                <Text style={{color: "white"}}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    row: { flexDirection: "row", marginBottom: 12 },
    input: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 10,
        height: 40
    },
    addBtn: {
        backgroundColor: "#007AFF",
        marginLeft: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 8,
    },
    btnText: { color: "white", fontWeight: "bold" },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalBox: {
        backgroundColor: "white",
        padding: 20,
        width: "80%",
        minHeight: 180,
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 12
    },
    modalTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20
    },
    modalBtn: {
        backgroundColor: "#007AFF",
        borderRadius: 8,
        padding: 10
    },
});
