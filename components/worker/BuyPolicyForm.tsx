// components/worker/BuyPolicyForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Check, Loader2 } from 'lucide-react';
import { PremiumBreakdown } from '@/types';

interface BuyPolicyFormProps {
  workerId: string;
  zoneId: string;
  onSuccess: () => void;
}

export const BuyPolicyForm: React.FC<BuyPolicyFormProps> = ({
  workerId,
  zoneId,
  onSuccess
}) => {
  const [premium, setPremium] = useState<PremiumBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [step, setStep] = useState<'calculate' | 'confirm' | 'payment'>('calculate');

  useEffect(() => {
    fetchPremium();
  }, [workerId, zoneId]);

  const fetchPremium = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/premium/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerId, zoneId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPremium(data.data.premium);
        setStep('confirm');
      } else {
        alert('Failed to calculate premium: ' + data.error);
      }
    } catch (error) {
      console.error('Premium calculation error:', error);
      alert('Failed to calculate premium. Please try again.');
    } finally {
      