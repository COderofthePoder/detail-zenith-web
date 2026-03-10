import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, RefreshCw } from 'lucide-react';

const MemberVerify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: 'Fehler', description: 'Bitte melde dich zuerst an.', variant: 'destructive' });
        navigate('/mitglieder/login');
        return;
      }

      const { data, error } = await supabase.functions.invoke('verify-email-code', {
        body: { code },
      });

      if (error || data?.error) {
        toast({
          title: 'Ungültiger Code',
          description: data?.error || 'Der Code ist ungültig oder abgelaufen.',
          variant: 'destructive',
        });
        return;
      }

      toast({ title: 'E-Mail bestätigt! ✓', description: 'Willkommen bei DS Detailing!' });
      navigate('/mitglieder');
    } catch (err: any) {
      toast({ title: 'Fehler', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/mitglieder/login');
        return;
      }

      const { error, data } = await supabase.functions.invoke('send-verification-code', {
        body: {
          email: session.user.email,
          firstName: session.user.user_metadata?.first_name || '',
        },
      });

      if (error || data?.error) throw new Error(data?.error || 'Fehler beim Senden');

      toast({ title: 'Neuer Code gesendet!', description: 'Prüfe dein E-Mail-Postfach.' });
    } catch (err: any) {
      toast({ title: 'Fehler', description: err.message, variant: 'destructive' });
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">E-Mail bestätigen</CardTitle>
              <CardDescription>
                Wir haben dir einen 6-stelligen Code per E-Mail gesendet. Gib ihn hier ein, um dein Konto zu bestätigen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={code} onChange={setCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerify}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading || code.length !== 6}
              >
                {loading ? 'Wird überprüft...' : 'Bestätigen'}
              </Button>

              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
                  {resending ? 'Wird gesendet...' : 'Code erneut senden'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MemberVerify;
