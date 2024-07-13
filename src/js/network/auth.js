import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

const Auth = {
  async register({ email, password }) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await signOut(auth);
    return userCredential;
  },

  async login({ email, password }) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async logout() {
    return await signOut(auth);
  },

  async updateProfile(user, { displayName = null } = {}) {
    return await updateProfile(user, {
      displayName,
    });
  },

  async showProfileName() {
    const user = auth.currentUser;
    return user.displayName;
  },
};

export default Auth;
