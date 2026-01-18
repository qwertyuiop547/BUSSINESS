/**
 * Wallet / Add Funds Page - Premium Design
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { DashboardLayout } from '../components/layout';
import {
  Button,
  Badge,
  Pagination,
} from '../components/ui';
import { useTopUpRequests, useCreateTopUp, useComingSoonCount, useNotifyComingSoon } from '../hooks/useApi';
import useAuthStore from '../store/authStore';
import useCurrencyStore from '../store/currencyStore';
import { formatDate } from '../lib/utils';
import {
  Wallet, CreditCard, Clock, CheckCircle2, XCircle,
  Copy, Check, AlertCircle, Send, ArrowRight, Sparkles,
  TrendingUp, DollarSign, ChevronRight, QrCode, Receipt,
  ArrowUpRight, History, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

const topUpSchema = z.object({
  amount: z.number().min(100, 'Minimum is ₱100').max(100000, 'Maximum is ₱100,000'),
  paymentMethod: z.enum(['GCASH', 'PAYMAYA', 'GOTYME', 'MAYABANK', 'PAYPAL', 'BANK_TRANSFER']),
  referenceNumber: z.string().min(1, 'Reference number is required'),
  notes: z.string().optional(),
});

// Payment method config with QR codes
const paymentMethods = {
  GCASH: {
    name: 'GCash',
    qrImage: '/qr-gcash.jpg',
    instructions: [
      'NUMBER: 09764574477',
      'NAME: JU***N E.',
      'SEND RECEIPT SA GC'
    ]
  },
  PAYMAYA: {
    name: 'PayMaya',
    qrImage: '/qr-paymaya.jpg',
    instructions: [
      'NUMBER: 09764574477',
      'NAME: JU***N E.',
      'SEND SCREENSHOT OF PAYMENT'
    ]
  },
  GOTYME: {
    name: 'GoTyme',
    qrImage: '/qr-gotyme.jpg',
    instructions: [
      'NUMBER: 09764574477',
      'NAME: JU***N E.',
      'SEND SCREENSHOT OF PAYMENT'
    ]
  },
  MAYABANK: {
    name: 'Maya Bank',
    qrImage: '/qr-mayabank.jpg',
    instructions: [
      'NUMBER: 09764574477',
      'NAME: JU***N E.',
      'SEND SCREENSHOT OF PAYMENT'
    ]
  },
  VISA: {
    name: 'Visa',
    icon: '💳',
    comingSoon: true,
    instructions: [
      'Card payments processed securely',
      'Enter your Visa card details',
      'Transaction will be verified instantly'
    ]
  },
  MASTERCARD: {
    name: 'Mastercard',
    icon: '💳',
    comingSoon: true,
    instructions: [
      'Card payments processed securely',
      'Enter your Mastercard details',
      'Transaction will be verified instantly'
    ]
  },
};

const statusConfig = {
  PENDING: { label: 'Pending', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30', icon: Clock },
  APPROVED: { label: 'Approved', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', icon: XCircle },
};

export default function WalletPage() {
  const { user, refreshBalance } = useAuthStore();
  const { formatAmount, getCurrencySymbol, currency } = useCurrencyStore();
  const [selectedMethod, setSelectedMethod] = useState('GCASH');
  const [amount, setAmount] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Coming Soon feature for card payments
  const isComingSoonMethod = paymentMethods[selectedMethod]?.comingSoon;
  const comingSoonKey = isComingSoonMethod ? `payment_${selectedMethod.toLowerCase()}` : null;
  const { data: comingSoonCount = 0 } = useComingSoonCount(comingSoonKey);
  const notifyMutation = useNotifyComingSoon();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [clickEffects, setClickEffects] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: topUpsData, isLoading: topUpLoading, refetch } = useTopUpRequests({
    page,
    limit: 10,
  });
  const createTopUp = useCreateTopUp();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      paymentMethod: 'GCASH',
    },
  });

  const handleAmountSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!amount || numAmount < 100) {
      toast.error('Minimum amount is ₱100');
      return;
    }
    setValue('amount', numAmount);
    setValue('paymentMethod', selectedMethod);
    setShowPaymentDetails(true);
  };

  const onSubmit = async (data) => {
    try {
      await createTopUp.mutateAsync(data);
      toast.success('Top-up request submitted! Waiting for approval.');
      reset();
      setAmount('');
      setShowPaymentDetails(false);
      refetch();
      if (refreshBalance) refreshBalance();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const copyNumber = () => {
    const number = currentMethod.instructions[0].split(': ')[1];
    navigator.clipboard.writeText(number);
    setCopied(true);
    toast.success('Number copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const topUps = topUpsData?.data || [];
  const pagination = topUpsData?.pagination;
  const currentMethod = paymentMethods[selectedMethod];

  // Calculate stats
  const totalDeposited = topUps.filter(t => t.status === 'APPROVED').reduce((sum, t) => sum + (t.amount || 0), 0);
  const pendingRequests = topUps.filter(t => t.status === 'PENDING').length;

  return (
    <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 shadow-xl dark:shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500/20 dark:from-emerald-500/30 to-green-500/10 dark:to-green-500/20 blur-3xl animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 to-blue-500/5 dark:to-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9nPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMXYzOGgzOFYxSDF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>
        
        <div className="relative px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                </span>
                Wallet Center
              </div>
              
              {/* Title Section */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
                    <Wallet className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 ring-4 ring-white dark:ring-slate-900">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 bg-clip-text text-transparent">
                    Add Funds
                  </h1>
                  <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
                    Top up your wallet balance instantly
                  </p>
                </div>
              </div>
            </div>
            
            {/* Balance Card */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 opacity-20 dark:opacity-30 blur-lg group-hover:opacity-40 dark:group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative rounded-2xl border border-slate-200 dark:border-white/20 bg-white/90 dark:bg-slate-900/80 p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Current Balance</p>
                    <p className="mt-2 text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {formatAmount(user?.balance || 0)}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 ring-1 ring-emerald-500/30">
                    <DollarSign className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Total Deposited</p>
                    <p className="text-lg font-semibold text-emerald-500 dark:text-emerald-400">+{formatAmount(totalDeposited)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Pending</p>
                    <p className="text-lg font-semibold text-amber-500 dark:text-amber-400">{pendingRequests} request{pendingRequests !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Fund Form - Premium Design */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="p-6 space-y-6">

          {!showPaymentDetails ? (
            <>
              {/* Step 1: Select Method & Amount */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full text-emerald-400 text-sm font-medium ring-1 ring-emerald-500/20">
                  <Wallet className="w-4 h-4" />
                  Step 1: Enter Amount
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(paymentMethods).map(([key, method]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedMethod(key)}
                      className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-300 overflow-hidden ${
                        selectedMethod === key
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      {selectedMethod === key && (
                        <div className="absolute top-2 right-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                      <span className={`font-semibold text-lg ${selectedMethod === key ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-800 dark:text-white'}`}>
                        {method.name}
                      </span>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Instant transfer</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
                  Amount ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">{getCurrencySymbol()}</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-12 pr-4 py-5 text-3xl font-bold rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all"
                  />
                </div>
                {/* Quick amounts */}
                <div className="flex gap-3 mt-4">
                  {[100, 500, 1000, 2000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        amount === quickAmount.toString()
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                          : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      {getCurrencySymbol()}{quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Minimum Warning */}
                {amount && parseFloat(amount) < 100 && (
                  <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">Minimum amount is {getCurrencySymbol()}100</span>
                  </div>
                )}
              </div>

              {/* Continue Button */}
              <Button
                type="button"
                onClick={handleAmountSubmit}
                className="w-full py-4 text-lg bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 border-none shadow-lg shadow-emerald-500/25"
                disabled={!amount || parseFloat(amount) < 100}
              >
                Continue to Payment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </>
          ) : (
            <>
              {/* Step 2: QR Code & Reference */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full text-cyan-400 text-sm font-medium ring-1 ring-cyan-500/20">
                  <QrCode className="w-4 h-4" />
                  Step 2: Pay & Submit
                </div>
              </div>

              {/* Amount Summary */}
              <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-sm text-slate-500 dark:text-slate-400">You are adding</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent mt-2">
                  {getCurrencySymbol()}{parseFloat(amount).toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">via {currentMethod.name}</p>
              </div>

              {/* QR Code or Card Icon or Coming Soon */}
              {isComingSoonMethod ? (
                /* Coming Soon UI for Visa/Mastercard */
                <div className="flex flex-col items-center justify-center py-8 px-4">
                  <div className="text-center space-y-6 max-w-md">
                    {/* Card Icon */}
                    <div className="relative group mx-auto w-fit">
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-lg group-hover:opacity-40 transition-opacity" />
                      <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl">
                        <div className="w-[180px] h-[120px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl">
                          <span className="text-6xl mb-2">{currentMethod.icon || '💳'}</span>
                          <span className="text-lg font-bold text-slate-700 dark:text-white">{currentMethod.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Coming Soon</h3>
                    
                    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                      <p className="text-slate-600 dark:text-slate-300">
                        {currentMethod.name} payments are coming soon! Click below to be notified when it's available.
                      </p>
                    </div>
                    
                    {/* Notify Button */}
                    <div className="relative inline-block">
                      {/* Notification Badge - only show if count > 0 */}
                      {comingSoonCount > 0 && (
                        <div className={`absolute -top-3 -right-3 z-10 transition-transform duration-150 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-slate-900 bg-amber-400 rounded-full shadow-lg">
                            +{comingSoonCount.toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      {/* Floating +1 animation */}
                      {showPlusOne && (
                        <div className="absolute -top-6 left-1/2 z-20 animate-float-up">
                          <span className="text-lg font-bold text-emerald-400">+1</span>
                        </div>
                      )}
                      
                      {/* Sparkle effects on click */}
                      {clickEffects.map((effect) => (
                        <div
                          key={effect.id}
                          className="absolute z-30 pointer-events-none animate-float-up"
                          style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
                        >
                          <span className="text-xl">{effect.emoji}</span>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          notifyMutation.mutate(comingSoonKey);
                          setIsAnimating(true);
                          setShowPlusOne(true);
                          
                          // Add random sparkle effects
                          const emojis = ['✨', '🔔', '⭐', '💫', '🌟'];
                          const newEffects = Array.from({ length: 3 }, (_, i) => ({
                            id: Date.now() + i,
                            emoji: emojis[Math.floor(Math.random() * emojis.length)],
                            x: Math.random() * 100,
                            y: Math.random() * 100 - 50,
                          }));
                          setClickEffects(prev => [...prev, ...newEffects]);
                          
                          setTimeout(() => setIsAnimating(false), 200);
                          setTimeout(() => setShowPlusOne(false), 600);
                          setTimeout(() => setClickEffects(prev => prev.filter(e => !newEffects.includes(e))), 800);
                        }}
                        className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-150 bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 overflow-hidden ${
                          isAnimating 
                            ? 'scale-110 border-amber-400 shadow-lg shadow-amber-500/40' 
                            : 'active:scale-95'
                        }`}
                      >
                        {/* Ripple effect */}
                        {isAnimating && (
                          <div className="absolute inset-0 bg-amber-400/20 animate-ping rounded-xl" />
                        )}
                        <span className={`text-2xl transition-transform duration-200 ${isAnimating ? 'animate-wiggle scale-125' : ''}`}>🔔</span>
                        <span className="relative z-10">Give Me It</span>
                      </button>
                    </div>
                    
                    {comingSoonCount > 0 && (
                      <p className="text-sm text-emerald-400">
                        {comingSoonCount.toLocaleString()} {comingSoonCount === 1 ? 'person wants' : 'people want'} {currentMethod.name} payments!
                      </p>
                    )}
                    
                    {/* Back Button */}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowPaymentDetails(false)}
                      className="mt-4 bg-slate-700 hover:bg-slate-600 border-none"
                    >
                      Back to Payment Methods
                    </Button>
                  </div>
                </div>
              ) : (
                /* Normal QR/Card Display */
                <>
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-20 blur-lg group-hover:opacity-40 transition-opacity" />
                      <div className="relative bg-white p-5 rounded-2xl shadow-2xl">
                        {currentMethod.qrImage ? (
                          <Image
                            src={currentMethod.qrImage}
                            alt={`${currentMethod.name} QR Code`}
                            width={220}
                            height={220}
                            className="rounded-xl"
                          />
                        ) : (
                          <div className="w-[220px] h-[220px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl">
                            <span className="text-8xl mb-4">{currentMethod.icon || '💳'}</span>
                            <span className="text-xl font-bold text-slate-700 dark:text-white">{currentMethod.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-4 flex items-center gap-2">
                      {currentMethod.qrImage ? (
                        <>
                          <QrCode className="w-4 h-4" />
                          Scan with {currentMethod.name} app
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Pay with {currentMethod.name}
                        </>
                      )}
                    </p>
                  </div>

              {/* Instructions */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                  Payment Details
                </h3>
                <div className="space-y-3">
                  {currentMethod.instructions.map((instruction, index) => (
                    <p key={index} className="text-slate-700 dark:text-slate-200 font-medium flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-xs text-slate-500 dark:text-slate-400">
                        {index + 1}
                      </span>
                      {instruction}
                      {index === 0 && currentMethod.qrImage && (
                        <button
                          onClick={copyNumber}
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                          title="Copy number"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                          )}
                        </button>
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Reference Number Input */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <input type="hidden" {...register('amount', { valueAsNumber: true })} />
                <input type="hidden" {...register('paymentMethod')} />

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    {...register('referenceNumber')}
                    placeholder="Enter your payment reference number"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                  />
                  {errors.referenceNumber && (
                    <p className="mt-2 text-sm text-rose-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.referenceNumber.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowPaymentDetails(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 border-none"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 border-none shadow-lg shadow-cyan-500/25"
                    isLoading={isSubmitting || createTopUp.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </form>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Transaction History - Premium Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 px-6 py-5 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-white dark:to-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 ring-1 ring-violet-500/30">
              <History className="h-5 w-5 text-violet-500 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">Transaction History</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your deposit requests</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {topUps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700/50 mb-4">
                        <CreditCard className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">No transactions yet</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Your deposit history will appear here</p>
                    </div>
                  </td>
                </tr>
              ) : (
                topUps.map((topUp, index) => {
                  const statusInfo = statusConfig[topUp.status] || statusConfig.PENDING;
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr key={topUp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-300">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {formatDate(topUp.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-sm font-medium text-slate-700 dark:text-white">
                          {topUp.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-emerald-500 dark:text-emerald-400">
                        +{formatAmount(topUp.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          topUp.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30' :
                          topUp.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/30' :
                          'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30'
                        }`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {pagination?.pages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 flex justify-center bg-slate-50 dark:bg-slate-900/30">
            <Pagination
              currentPage={page}
              totalPages={pagination.pages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

WalletPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
