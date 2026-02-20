import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Shield } from 'lucide-react';
import logo from '@/assets/logo.png';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@dsdetailing.ch',
        password,
      });

      if (error) throw error;

      // Verify admin role server-side
      const { data: hasAdminRole } = await supabase.rpc('has_role', {
        _user_id: data.user.id,
        _role: 'admin',
      });

      if (!hasAdminRole) {
        await supabase.auth.signOut();
        throw new Error('Kein Admin-Zugriff');
      }

      toast({ title: 'Willkommen!', description: 'Erfolgreich eingeloggt.' });
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'Fehler',
        description: error.message || 'Login fehlgeschlagen',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="DS-Detailing" className="h-40 w-auto object-contain mb-4" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Admin-Bereich</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                value="admin"
                disabled
                className="bg-muted text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort eingeben"
                required
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <Lock className="w-4 h-4 mr-2" />
              {loading ? 'Einloggen...' : 'Einloggen'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
