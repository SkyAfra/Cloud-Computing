import { Firestore } from '@google-cloud/firestore';

const loadHistoryData = async () => {
  const db = new Firestore({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'c241-ps372',
    databaseId: 'predictions',
  });

  const predictCollection = db.collection('predictions');

  const snapshot = await predictCollection.orderBy('createdAt', 'desc').get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));

  return { data };
};

export default loadHistoryData;
