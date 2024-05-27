import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCiyagsfSozBzg2pIcNSbKInYe_Z7CY38w",
  authDomain: "sistemcrm-8a988.firebaseapp.com",
  projectId: "sistemcrm-8a988",
  storageBucket: "sistemcrm-8a988.appspot.com",
  messagingSenderId: "179626080047",
  appId: "1:179626080047:web:abc2ee077e5edd479793da",
  measurementId: "G-9GCDY5RSSN"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
