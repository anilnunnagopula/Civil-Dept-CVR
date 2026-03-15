import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';

export function useCollection(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`📡 Connecting to collection: ${collectionName}...`);
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    
    const unsub = onSnapshot(q, 
      (snapshot) => {
        console.log(`✅ [${collectionName}] fetched ${snapshot.docs.length} docs`);
        setData(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      }, 
      (error) => {
        console.error(`❌ Firestore error on [${collectionName}]:`, error.code, error.message);
        setLoading(false);
      }
    );
    
    return unsub;
  }, [collectionName]);

  async function add(docData) {
    await addDoc(collection(db, collectionName), {
      ...docData,
      isNew: true,
      createdAt: serverTimestamp(),
    });
  }

  async function remove(id) {
    await deleteDoc(doc(db, collectionName, id));
  }

  return { data, loading, add, remove };
}
