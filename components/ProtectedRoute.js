import { auth } from '@/firebase.conf';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// Firebase authentication instance

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.replace('/login'); // Redirect to login page if user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;