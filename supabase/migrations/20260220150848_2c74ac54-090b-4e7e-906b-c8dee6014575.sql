
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS: only admins can see user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Creator codes table
CREATE TABLE public.creator_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  discount_percentage integer NOT NULL DEFAULT 10 CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  description text,
  creator_name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.creator_codes ENABLE ROW LEVEL SECURITY;

-- Code usages tracking
CREATE TABLE public.code_usages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id uuid REFERENCES public.creator_codes(id) ON DELETE CASCADE NOT NULL,
  used_at timestamp with time zone NOT NULL DEFAULT now(),
  booking_total numeric,
  discount_amount numeric
);

ALTER TABLE public.code_usages ENABLE ROW LEVEL SECURITY;

-- RLS policies for creator_codes
CREATE POLICY "Admins can do everything with creator_codes"
  ON public.creator_codes FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Public can read active codes (for booking validation)
CREATE POLICY "Anyone can read active codes"
  ON public.creator_codes FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- RLS policies for code_usages
CREATE POLICY "Admins can view all usages"
  ON public.code_usages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can insert a usage (when using a code during booking)
CREATE POLICY "Anyone can insert code usage"
  ON public.code_usages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
