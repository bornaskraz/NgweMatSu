import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  deleteDoc, 
  doc, 
  Timestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { Transaction } from "../types";

const COLLECTION_NAME = "transactions";

export const addTransaction = async (transaction: Omit<Transaction, "id">) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), transaction);
    return { id: docRef.id, ...transaction };
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

export const getTransactions = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
      orderBy("date", "desc"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction);
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};
