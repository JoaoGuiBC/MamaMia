import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, firestore } from '@utils/firebase';

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLoggingIn: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

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
          .then(profile => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists()) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };

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

  return (
    <AuthContext.Provider
      value={{
        signIn,
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
