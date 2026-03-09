import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface MemberProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  created_at: string;
}

export interface StampCard {
  id: string;
  stamps: number;
  free_washes_earned: number;
  free_washes_used: number;
}

export interface MemberBooking {
  id: string;
  service_description: string;
  total_price: number;
  discount_applied: number;
  was_free_wash: boolean;
  stamp_earned: boolean;
  booked_at: string;
}

export const useMember = () => {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [stampCard, setStampCard] = useState<StampCard | null>(null);
  const [bookings, setBookings] = useState<MemberBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchMemberData(session.user.id);
      } else {
        setMember(null);
        setStampCard(null);
        setBookings([]);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchMemberData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchMemberData = async (userId: string) => {
    setLoading(true);
    try {
      const { data: memberData } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (memberData) {
        setMember(memberData as MemberProfile);

        const [stampRes, bookingsRes] = await Promise.all([
          supabase.from('stamp_cards').select('*').eq('member_id', memberData.id).maybeSingle(),
          supabase.from('member_bookings').select('*').eq('member_id', memberData.id).order('booked_at', { ascending: false }),
        ]);

        setStampCard(stampRes.data as StampCard | null);
        setBookings((bookingsRes.data as MemberBooking[]) || []);
      }
    } catch (err) {
      console.error('Error fetching member data:', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const availableFreeWashes = stampCard 
    ? stampCard.free_washes_earned - stampCard.free_washes_used 
    : 0;

  const totalSpent = bookings.reduce((sum, b) => sum + Number(b.total_price), 0);

  return { user, member, stampCard, bookings, loading, signOut, availableFreeWashes, totalSpent, refetch: () => user && fetchMemberData(user.id) };
};
