import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('Fetching phone numbers with limit 20...');
      
      // Получаем документ
      const phoneNumbersDocRef = doc(collection(db, 'phoneNumbers'), 'data');
      const phoneNumbersDoc = await getDoc(phoneNumbersDocRef);

      if (!phoneNumbersDoc.exists()) {
        console.log('No phone numbers found');
        return res.status(200).json({ phoneNumbers: [] });
      }

      const phoneNumbersData = phoneNumbersDoc.data();
      const phoneNumbers = phoneNumbersData.phoneNumbers || [];

      if (phoneNumbers.length === 0) {
        console.log('No phone numbers found in the document');
        return res.status(200).json({ phoneNumbers: [] });
      }

      // Извлекаем первые 20 номеров
      const phoneNumbersToReturn = phoneNumbers.slice(0, 20);
      console.log('Extracted phone number data:', phoneNumbersToReturn);

      // Удаляем первые 20 номеров из оригинального массива
      const updatedPhoneNumbers = phoneNumbers.slice(20);

      // Обновляем документ
      await updateDoc(phoneNumbersDocRef, { phoneNumbers: updatedPhoneNumbers });
      console.log('Document updated successfully');

      res.status(200).json({ phoneNumbers: phoneNumbersToReturn });
    } catch (error) {
      console.error('Error getting or deleting phone numbers: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
