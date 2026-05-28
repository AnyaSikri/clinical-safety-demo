'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MockProvider } from '@/lib/data/mock-provider';

const mockProvider = new MockProvider();
const DEMO_ADDRESSES = mockProvider.getAvailableAddresses();

export default function HomePage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (selectedAddress: string) => {
    setIsLoading(true);
    const encoded = encodeURIComponent(selectedAddress);
    router.push(`/brief/${encoded}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium mb-3">Listing Intelligence Brief</h1>
          <p className="text-[var(--text-2)] text-lg">
            Generate a polished CMA and listing strategy for any property
          </p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Property address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter an address"
            className="w-full px-4 py-3 border border-[var(--border-2)] rounded-lg text-base mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && address.trim()) {
                handleSubmit(address.trim());
              }
            }}
          />
          <button
            onClick={() => handleSubmit(address.trim())}
            disabled={!address.trim() || isLoading}
            className="w-full px-6 py-3 bg-[var(--info-text)] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate brief'}
          </button>

          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-2)] mb-3">Try these example addresses:</p>
            <div className="space-y-2">
              {DEMO_ADDRESSES.map((addr) => (
                <button
                  key={addr}
                  onClick={() => handleSubmit(addr)}
                  disabled={isLoading}
                  className="w-full text-left px-4 py-2.5 bg-[var(--surface-2)] rounded-lg text-sm hover:bg-[var(--border)] transition-colors disabled:opacity-50"
                >
                  {addr}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--text-3)] mt-6">
          MVP demo • Mock data • Powered by Claude API
        </p>
      </div>
    </div>
  );
}
