import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, firestore } from '@utils/firebase';

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLoggingIn: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@mamamia:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Por favor, informe e-mail e senha.');
    }

    setIsLoggingIn(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(account => {
        const userRef = doc(firestore, 'users', account.user.uid);

        getDoc(userRef)
          .then(async profile => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists()) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };

              await AsyncStorage.setItem(
                USER_COLLECTION,
                JSON.stringify(userData),
              );
              setUser(userData);
            }
          })
          .catch(() =>
            Alert.alert(
              'Login',
              'Não foi possível buscar os dados de perfil do usúario',
            ),
          );
      })
      .catch(error => {
        const { code } = error;

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail e/ou senha inválidos.');
        }
        return Alert.alert(
          'Login',
          'Não foi possível realizar o login, tente novamente mais tarde',
        );
      })
      .finally(() => setIsLoggingIn(false));
  }

  async function signOut() {
    await auth.signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);

    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinir senha', 'Por favor, preencha o email');
    }

    try {
      await sendPasswordResetEmail(auth, email);

      return Alert.alert(
        'Redefinir senha',
        'Enviamos um link para o seu email para que possa redefinir a sua senha',
      );
    } catch (error) {
      return Alert.alert(
        'Redefinir senha',
        'Não foi possivel enviar um email para redefinir a sua senha',
      );
    }
  }

  async function loadUserStorageData() {
    setIsLoggingIn(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLoggingIn(false);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        forgotPassword,
        isLoggingIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, UseAuth };
