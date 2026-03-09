import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Mail, Lock } from 'lucide-react';

const MemberLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      toast({ title: 'Willkommen zurück!' });
      navigate('/mitglieder');
    } catch (error: any) {
      toast({ title: 'Fehler', description: error.message || 'Anmeldung fehlgeschlagen.', variant: 'destructive' });
    } finally {
      setLoading(false);
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
                <LogIn className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Mitglieder-Login</CardTitle>
              <CardDescription>Melde dich an, um dein Dashboard zu sehen.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="max@beispiel.ch" className="pl-10" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Passwort</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="Dein Passwort" className="pl-10" required value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? 'Wird angemeldet...' : 'Anmelden'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Noch kein Mitglied?{' '}
                  <Link to="/mitglieder/registrieren" className="text-primary hover:underline">Jetzt registrieren</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MemberLogin;
