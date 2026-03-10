
CREATE TABLE public.email_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own verifications" ON public.email_verifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can insert verifications" ON public.email_verifications
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own verifications" ON public.email_verifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

ALTER TABLE public.members ADD COLUMN IF NOT EXISTS is_verified boolean NOT NULL DEFAULT false;
