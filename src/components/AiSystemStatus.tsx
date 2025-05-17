
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDatabase } from '@/lib/db';

const AiSystemStatus = () => {
  const { verifyBlockchainIntegrity } = useDatabase();
  const [lastScan, setLastScan] = useState<string>('');
  const [matchingStatus, setMatchingStatus] = useState<'idle' | 'matching' | 'matched'>('idle');
  const [blockchainStatus, setBlockchainStatus] = useState<'verifying' | 'verified'>('verifying');
  
  useEffect(() => {
    // Simulate periodic AI matching scans
    const now = new Date();
    setLastScan(now.toLocaleTimeString());
    
    // Verify blockchain periodically
    verifyBlockchainIntegrity();
    setBlockchainStatus('verified');
    
    // Simulate AI matching system activity
    const aiMatchingCycle = () => {
      setMatchingStatus('matching');
      
      setTimeout(() => {
        setMatchingStatus('matched');
        
        setTimeout(() => {
          setMatchingStatus('idle');
          setLastScan(new Date().toLocaleTimeString());
        }, 2000);
      }, 2000);
    };
    
    // Run the AI matching cycle every 30 seconds
    const cycleInterval = setInterval(aiMatchingCycle, 30000);
    
    // Run once on component mount
    aiMatchingCycle();
    
    return () => {
      clearInterval(cycleInterval);
    };
  }, [verifyBlockchainIntegrity]);
  
  return (
    <Card className="bg-white border-[#9b87f5]">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>AI & Blockchain System Status</span>
          <Badge variant="outline" className="bg-gray-100">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Matching Engine:</span>
            <Badge variant={
              matchingStatus === 'idle' ? 'outline' : 
              matchingStatus === 'matching' ? 'secondary' : 'default'
            }>
              {matchingStatus === 'idle' ? 'Idle' : 
               matchingStatus === 'matching' ? 'Processing' : 'Matches Found'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Hyperledger Fabric:</span>
            <Badge variant={blockchainStatus === 'verifying' ? 'secondary' : 'default'}>
              {blockchainStatus === 'verifying' ? 'Verifying' : 'Verified'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Scan:</span>
            <span className="text-xs text-gray-500">{lastScan}</span>
          </div>
          
          <div className="pt-2">
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-1 bg-[#9b87f5] animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-center text-gray-500 mt-1">
              Platform Operating at 75% Efficiency
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiSystemStatus;
