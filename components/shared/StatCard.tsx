'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useWindowSize } from '@/components/hooks/useWindowSize';

interface StatCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string | number;
  valueColor?: string;
  border?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon, iconBg, iconColor, label, value, valueColor, border
}) => {
  const { isMobile } = useWindowSize();

  return (
    <div style={{
      background: 'white', padding: isMobile ? '18px' : '22px', borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '15px',
      alignItems: 'center', border: border || 'none'
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px', background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        {React.createElement(icon, { size: 22, color: iconColor })}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{
          fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 800,
          color: valueColor || '#1a1a1a'
        }}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default StatCard;