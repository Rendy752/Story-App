// import axios from 'axios';
// import Config from '../config/config';
// import Utils from '../utils/utils';
// import ApiEndpoint from '../config/api-endpoint';
import { auth, db, storage } from '../utils/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const Transactions = {
  // async getAll() {
  //   return await axios.get(ApiEndpoint.GET_ALL_TRANSACTION, {
  //     headers: {
  //       Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  //     },
  //   });
  // },

  async getAll() {
    const transactionsRef = collection(db, 'transactions');
    const transactionsQuery = query(transactionsRef, where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(transactionsQuery);
    const transactions = [];
    querySnapshot.forEach((item) => {
      transactions.push({
        id: item.id,
        ...item.data(),
      });
    });
    return transactions;
  },

  // async getById(id) {
  //   return await axios.get(ApiEndpoint.GET_BY_ID_TRANSACTION(id), {
  //     headers: {
  //       Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  //     },
  //   });
  // },

  async getById(id) {
    const transactionRef = doc(db, 'transactions', id);
    const docSnapshot = await getDoc(transactionRef);
    return docSnapshot.data();
  },

  // async store({ name, date, amount, type, description, evidence }) {
  //   const data = { name, date, amount, type, description, evidence };

  //   return await axios.post(ApiEndpoint.STORE_TRANSACTION, data, {
  //     headers: {
  //       Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // },

  async store({ name, date, amount, type, description, evidence }) {
    const transactionsRef = collection(db, 'transactions');
    const data = { name, date, amount, type, description, evidence };
    return await addDoc(transactionsRef, {
      ...data,
      userId: auth.currentUser.uid,
    });
  },

  // async update({ id, name, date, amount, type, description, evidence }) {
  //   const data = { name, date, amount, type, description, evidence };

  //   return await axios.put(ApiEndpoint.UPDATE_TRANSACTION(id), data, {
  //     headers: {
  //       Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // },

  async update({ id, name, date, amount, type, description, evidence }) {
    const transactionRef = doc(db, 'transactions', id);
    const data = { name, date, amount, type, description, evidence };
    if (!data.evidence) delete data.evidence;
    return await updateDoc(transactionRef, data);
  },

  // async destroy(id) {
  //   return await axios.delete(ApiEndpoint.DESTROY_TRANSACTION(id), {
  //     headers: {
  //       Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  //     },
  //   });
  // },

  async destroy(id) {
    const transactionRef = doc(db, 'transactions', id);
    return await deleteDoc(transactionRef);
  },

  async storeEvidence(file) {
    const storageRef = ref(storage, `transactions/${auth.currentUser.uid}/${file.name}`);
    return await uploadBytes(storageRef, file);
  },
  async getEvidenceURL(fileFullPath) {
    const storageRef = ref(storage, fileFullPath);
    return await getDownloadURL(storageRef);
  },
  async destroyEvidence(fileFullPath) {
    const desertRef = ref(storage, fileFullPath);
    return await deleteObject(desertRef);
  },
};

export default Transactions;
