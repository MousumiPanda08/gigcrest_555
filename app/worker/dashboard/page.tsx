'use client';

import React from 'react';
import { DollarSign, ShieldCheck, FileText, TrendingUp } from 'lucide-react';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { workerData } from '@/lib/data';
import StatCard from '@/components/shared/StatCard';

export default function WorkerDashboardPage() {
  const { isMobile, isTablet } = useWindowSize();

  return (
    <>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', color: '#1a1a1a', fontWeight: 700 }}>Worker Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isMobile && <span style={{ color: '#64748b', fontSize: '14px' }}>Welcome, Rajesh Kumar</span>}
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '14px' }}>RK</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
        <StatCard icon={DollarSign} iconBg="#dbeafe" iconColor="#2563eb" label="Total Earnings (Last 15-months)" value={workerData.totalEarnings} />
        <StatCard icon={ShieldCheck} iconBg="#dcfce7" iconColor="#16a34a" label="Coverage Status" value={workerData.coverageStatus} valueColor="#16a34a" />
        <StatCard icon={FileText} iconBg="#fef3c7" iconColor="#ca8a04" label="Total Claims" value={workerData.totalClaims} />
        <StatCard icon={TrendingUp} iconBg="#fce7f3" iconColor="#db2777" label="Protection %" value={`${workerData.protectionPercent}%`} />
      </div>

      {/* Active Plan Card */}
      <div style={{ background: 'white', padding: isMobile ? '20px' : '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '18px', color: '#1a1a1a', fontWeight: 700 }}>🛡️ Active Plan</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '15px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>Plan Type</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>{workerData.activePlan.type}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>Premium</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#2563eb' }}>{workerData.activePlan.premium}/week</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>Coverage</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#16a34a' }}>{workerData.activePlan.coverage}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>Valid Until</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>{workerData.activePlan.validUntil}</div>
          </div>
        </div>
      </div>

      {/* Income Protection Tracker */}
      <div style={{ background: 'white', padding: isMobile ? '20px' : '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '18px', color: '#1a1a1a', fontWeight: 700 }}>💰 Income Protection Tracker</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '15px', marginBottom: '18px' }}>
          <div style={{ textAlign: 'center', padding: '18px', background: '#fef2f2', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>Total Income Lost</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dc2626' }}>{workerData.incomeProtection.totalLost}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '18px', background: '#f0fdf4', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>Amount Recovered</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#16a34a' }}>{workerData.incomeProtection.recovered}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '18px', background: '#eff6ff', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>Protection Rate</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563eb' }}>{workerData.incomeProtection.protectionRate}%</div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${workerData.incomeProtection.protectionRate}%`, background: 'linear-gradient(90deg, #16a34a, #22c55e)', borderRadius: '5px', transition: 'width 1s ease' }}></div>
        </div>
      </div>

      {/* Recent Claims */}
      <div style={{ background: 'white', padding: isMobile ? '20px' : '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '18px', color: '#1a1a1a', fontWeight: 700 }}>📋 Recent Claims</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Claim ID</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Event</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {workerData.recentClaims.map((claim, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>{claim.id}</td>
                  <td style={{ padding: '12px', color: '#4a5568', fontSize: '0.9rem' }}>{claim.event}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#16a34a', fontSize: '0.9rem' }}>{claim.amount}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                      background: claim.status === 'Approved' ? '#dcfce7' : claim.status === 'Processing' ? '#fef3c7' : '#fee2e2',
                      color: claim.status === 'Approved' ? '#16a34a' : claim.status === 'Processing' ? '#ca8a04' : '#dc2626'
                    }}>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}