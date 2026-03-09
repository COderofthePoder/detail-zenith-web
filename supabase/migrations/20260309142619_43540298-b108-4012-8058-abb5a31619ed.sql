
-- Members profile table
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read own profile" ON public.members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Members can update own profile" ON public.members
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Members can insert own profile" ON public.members
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all members" ON public.members
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Stamp cards table
CREATE TABLE public.stamp_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE NOT NULL,
  stamps INTEGER NOT NULL DEFAULT 0,
  free_washes_earned INTEGER NOT NULL DEFAULT 0,
  free_washes_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stamp_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read own stamp card" ON public.stamp_cards
  FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage stamp cards" ON public.stamp_cards
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Member bookings history
CREATE TABLE public.member_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE NOT NULL,
  service_description TEXT NOT NULL,
  total_price NUMERIC NOT NULL DEFAULT 0,
  discount_applied NUMERIC NOT NULL DEFAULT 0,
  was_free_wash BOOLEAN NOT NULL DEFAULT false,
  stamp_earned BOOLEAN NOT NULL DEFAULT true,
  booked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.member_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read own bookings" ON public.member_bookings
  FOR SELECT TO authenticated
  USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can insert bookings" ON public.member_bookings
  FOR INSERT TO authenticated
  WITH CHECK (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all bookings" ON public.member_bookings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-create stamp card when member is created
CREATE OR REPLACE FUNCTION public.create_stamp_card_for_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.stamp_cards (member_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_member_created
  AFTER INSERT ON public.members
  FOR EACH ROW
  EXECUTE FUNCTION public.create_stamp_card_for_member();

-- Function to add stamp and handle free wash logic
CREATE OR REPLACE FUNCTION public.add_stamp(p_member_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_stamps INTEGER;
BEGIN
  UPDATE public.stamp_cards 
  SET stamps = stamps + 1, updated_at = now()
  WHERE member_id = p_member_id;
  
  SELECT stamps INTO current_stamps 
  FROM public.stamp_cards 
  WHERE member_id = p_member_id;
  
  IF current_stamps >= 10 THEN
    UPDATE public.stamp_cards 
    SET stamps = stamps - 10, 
        free_washes_earned = free_washes_earned + 1,
        updated_at = now()
    WHERE member_id = p_member_id;
  END IF;
END;
$$;
