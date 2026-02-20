import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Seeds the admin user once on app load (idempotent)
export const useSeedAdmin = () => {
  useEffect(() => {
    const seed = async () => {
      try {
        await supabase.functions.invoke('seed-admin');
      } catch {
        // Silent fail - admin may already exist
      }
    };
    seed();
  }, []);
};
