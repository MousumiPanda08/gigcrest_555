'use client';

import React from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function AdminLoginPage() {
  const { isMobile } = useWindowSize();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: isMobile ? '30px' : '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '20px' }}>Admin Login</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Connect to /api/auth/login</p>
      </div>
    </div>
  );
}