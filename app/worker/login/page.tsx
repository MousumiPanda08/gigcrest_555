'use client';

import React from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function LoginPage() {
  const { isMobile } = useWindowSize();

  return (
    <>
      <h1 style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', color: '#1a1a1a', fontWeight: 700, marginBottom: '25px' }}>
        Login
      </h1>
      <div style={{ background: 'white', padding: isMobile ? '20px' : '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>Login form — connect to /api/auth/login</p>
      </div>
    </>
  );
}