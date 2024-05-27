// pages/api/uploadPhoneNumbers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { phoneNumbers } = req.body;
      const docRef = doc(db, 'phoneNumbers', 'data');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingData = docSnap.data().phoneNumbers || [];
        const updatedData = removeDuplicates([...existingData, ...phoneNumbers]);
        await updateDoc(docRef, { phoneNumbers: updatedData });
      } else {
        await setDoc(docRef, { phoneNumbers });
      }

      res.status(200).json({ message: 'Phone numbers uploaded successfully' });
    } catch (error) {
      console.error('Error uploading phone numbers:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function removeDuplicates(arr: string[]): string[] {
  const uniqueArr = [];
  const uniqueSet = new Set();
  for (const item of arr) {
    if (!uniqueSet.has(item)) {
      uniqueSet.add(item);
      uniqueArr.push(item);
    }
  }
  return uniqueArr;
}
