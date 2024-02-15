'use client'

import React from 'react';
import Navbar from '../components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Home() {
  return (
    // <ProtectedRoute>
    <Navbar />
    // </ProtectedRoute>
  );
}

