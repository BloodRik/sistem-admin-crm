import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const phoneNumbersCollection = collection(db, 'phoneNumbers');
      const phoneNumbersSnapshot = await getDocs(phoneNumbersCollection);
      let totalCount = 0;

      phoneNumbersSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.phoneNumbers && Array.isArray(data.phoneNumbers)) {
          totalCount += data.phoneNumbers.length;
        }
      });

      res.status(200).json({ count: totalCount });
    } catch (error) {
      console.error('Error getting phone number count:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
