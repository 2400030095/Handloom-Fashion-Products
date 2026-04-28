import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ role: 'guest', name: 'Guest', uid: null, email: null });
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    const loadUserProfile = async (firebaseUser) => {
        const fallbackUser = {
            role: 'buyer',
            name: firebaseUser.displayName || firebaseUser.email,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
        };

        try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                return {
                    role: data.role || 'buyer',
                    name: data.name || fallbackUser.name,
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                };
            }

            return fallbackUser;
        } catch {
            return fallbackUser;
        }
    };

    useEffect(() => {
        // Handle redirect result from Google sign-in
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    const firebaseUser = result.user;
                    // Check if user exists in Firestore
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (!userDoc.exists()) {
                        // New user, create doc with default role
                        await setDoc(userDocRef, {
                            name: firebaseUser.displayName || firebaseUser.email,
                            role: 'buyer',
                            email: firebaseUser.email,
                            createdAt: new Date().toISOString()
                        });
                    }
                }
            } catch (err) {
                const messages = {
                    'auth/popup-closed-by-user': 'Sign-in cancelled.',
                    'auth/popup-blocked': 'Redirect blocked by browser.',
                };
                setAuthError(messages[err.code] || 'Google sign-in failed. Please try again.');
            }
        };

        handleRedirectResult();

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const nextUser = await loadUserProfile(firebaseUser);
                setUser(nextUser);
            } else {
                setUser({ role: 'guest', name: 'Guest', uid: null, email: null });
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        setAuthError('');
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            return loadUserProfile(cred.user);
        } catch (err) {
            const messages = {
                'auth/user-not-found': 'No account found with this email.',
                'auth/wrong-password': 'Incorrect password.',
                'auth/invalid-email': 'Invalid email address.',
                'auth/invalid-credential': 'Invalid email or password.',
            };
            setAuthError(messages[err.code] || 'Login failed. Please try again.');
            throw err;
        }
    };

    const register = async (email, password, name, role) => {
        setAuthError('');
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', cred.user.uid), { name, role, email, createdAt: new Date().toISOString() });
            return { role, name, uid: cred.user.uid, email: cred.user.email };
        } catch (err) {
            const messages = {
                'auth/email-already-in-use': 'This email is already registered.',
                'auth/weak-password': 'Password must be at least 6 characters.',
                'auth/invalid-email': 'Invalid email address.',
            };
            setAuthError(messages[err.code] || 'Registration failed. Please try again.');
            throw err;
        }
    };

    const googleLogin = async () => {
        setAuthError('');
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
            // Note: The result will be handled in the useEffect below
        } catch (err) {
            const messages = {
                'auth/popup-closed-by-user': 'Sign-in cancelled.',
                'auth/popup-blocked': 'Popup blocked by browser.',
            };
            setAuthError(messages[err.code] || 'Google sign-in failed. Please try again.');
            throw err;
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    // Quick login for demo (mock context kept for hackathon demo buttons)
    const quickLogin = (role, name) => {
        setUser({ role, name, uid: `demo-${role}`, email: `${role}@demo.com` });
    };

    return (
        <AuthContext.Provider value={{ user, loading, authError, setAuthError, login, register, googleLogin, logout, quickLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
