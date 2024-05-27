import { collection, getDocs, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Импортируйте ваше подключение к Firestore

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const querySnapshot = await getDocs(collection(db, "phoneNumbers"));
      const batch = writeBatch(db);
      
      querySnapshot.forEach((docSnapshot) => {
        batch.delete(doc(db, "phoneNumbers", docSnapshot.id));
      });

      await batch.commit();

      res.status(200).json({ message: 'All phone numbers deleted successfully' });
    } catch (error) {
      console.error('Error deleting phone numbers:', error);
      res.status(500).json({ message: 'Failed to delete phone numbers', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
