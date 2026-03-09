CREATE OR REPLACE FUNCTION public.use_free_wash(p_member_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.stamp_cards 
  SET free_washes_used = free_washes_used + 1, updated_at = now()
  WHERE member_id = p_member_id
    AND free_washes_earned > free_washes_used;
END;
$$;