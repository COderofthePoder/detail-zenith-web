
CREATE TABLE public.member_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES public.member_bookings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(booking_id)
);

ALTER TABLE public.member_reviews ENABLE ROW LEVEL SECURITY;

-- Members can insert reviews for their own bookings
CREATE POLICY "Members can insert own reviews" ON public.member_reviews
  FOR INSERT TO authenticated
  WITH CHECK (
    member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
  );

-- Members can read own reviews
CREATE POLICY "Members can read own reviews" ON public.member_reviews
  FOR SELECT TO authenticated
  USING (
    member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
  );

-- Anyone can read all reviews (for landing page)
CREATE POLICY "Anyone can read reviews" ON public.member_reviews
  FOR SELECT TO anon
  USING (true);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage reviews" ON public.member_reviews
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
