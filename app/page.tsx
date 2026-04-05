'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Loader2 
} from 'lucide-react';

// Adjust this import to match your actual types path
// import { Claim } from '@/types';

type Claim = any; // Fallback type

export default function Home() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch claims from your API route
    // Change the endpoint to match your actual API route (e.g., /api/claims)
    fetch('/api/claims')
      .then((res) => res.json())
      .then((data) => {
        setClaims(data.data || data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch claims:', err);
        setLoading(false);
      });
  }, []);

  // Calculate Dashboard Stats
  const totalClaims = claims.length;
  const paidClaims = claims.filter((c: Claim) => c.status === 'paid' || c.status === 'auto_approved').length;
  const pendingReview = claims.filter((c: Claim) => c.status === 'manual_review').length;
  const highFraudAlerts = claims.filter((c: Claim) => c.fraudScore > 70).length;

  const totalPayout = claims.reduce((acc: number, c: Claim) => acc + (c.approvedPayout || 0), 0);

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { bg: string; text: string }> = {
      'paid': { bg: 'bg-green-100', text: 'text-green-800' },
      'auto_approved': { bg: 'bg-green-100', text: 'text-green-800' },
      'approved': { bg: 'bg-green-100', text: 'text-green-800' },
      'manual_review': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'denied': { bg: 'bg-red-100', text: 'text-red-800' }
    };
    const config = configs[status] || configs['manual_review'];
    return (
      <Badge className={`${config.bg} ${config.text} font-bold text-xs`}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">
            Claims Dashboard
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-1">
            Overview of insurance claims, payouts, and fraud detection.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Shield className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Total Claims</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-zinc-50">{totalClaims}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <DollarSign className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Total Paid Out</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-zinc-50">₹{totalPayout.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-zinc-50">{pendingReview}</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">High Fraud Risk</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-zinc-50">{highFraudAlerts}</p>
            </div>
          </Card>
        </div>

        {/* Recent Claims Table */}
        <Card className="overflow-hidden">
          <div className="p-5 border-b dark:border-zinc-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-50">Recent Claims</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
          ) : claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500 dark:text-zinc-400">
              <CheckCircle size={40} className="mb-3 text-green-500" />
              <p className="font-semibold">No claims found</p>
              <p className="text-sm">New claims will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 dark:text-zinc-400 uppercase bg-gray-50 dark:bg-zinc-900/50">
                  <tr>
                    <th className="px-5 py-3">Claim ID</th>
                    <th className="px-5 py-3">Worker</th>
                    <th className="px-5 py-3">Event</th>
                    <th className="px-5 py-3">Payout</th>
                    <th className="px-5 py-3">Fraud Score</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-zinc-800">
                  {claims.slice(0, 10).map((claim: Claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/30 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-900 dark:text-zinc-200">
                        {claim.id?.slice(0, 8)}...
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900 dark:text-zinc-200">
                        {claim.workerName || 'Unknown'}
                      </td>
                      <td className="px-5 py-3 capitalize text-gray-600 dark:text-zinc-300">
                        {claim.eventType?.replace('_', ' ')}
                      </td>
                      <td className="px-5 py-3 font-semibold text-gray-900 dark:text-zinc-200">
                        ₹{claim.approvedPayout?.toLocaleString() || 0}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${claim.fraudScore > 70 ? 'bg-red-500' : claim.fraudScore > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${claim.fraudScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
                            {claim.fraudScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        {getStatusBadge(claim.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

      </div>
    </div>
  );
}