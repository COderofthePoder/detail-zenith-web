import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  LogOut, Plus, Trash2, Tag, Users, TrendingUp, ToggleLeft, ToggleRight,
  Shield, Copy, CheckCircle, Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import logo from '@/assets/logo.png';

interface CreatorCode {
  id: string;
  code: string;
  discount_percentage: number;
  creator_name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  usage_count?: number;
  total_after_discount?: number;
}

const MONTHS = [
  { value: 'all', label: 'Alle Monate' },
  { value: '01', label: 'Januar' },
  { value: '02', label: 'Februar' },
  { value: '03', label: 'März' },
  { value: '04', label: 'April' },
  { value: '05', label: 'Mai' },
  { value: '06', label: 'Juni' },
  { value: '07', label: 'Juli' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Dezember' },
];

const AdminDashboard = () => {
  const [codes, setCodes] = useState<CreatorCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [newCode, setNewCode] = useState({
    code: '',
    creator_name: '',
    discount_percentage: 10,
    description: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return false;
    }
    const { data: isAdmin } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin',
    });
    if (!isAdmin) {
      navigate('/admin/login');
      return false;
    }
    return true;
  }, [navigate]);

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    const { data: codesData, error } = await supabase
      .from('creator_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      setLoading(false);
      return;
    }

    // Fetch usage stats per code
    const { data: usages } = await supabase
      .from('code_usages')
      .select('code_id, discount_amount, booking_total, used_at');

    // Filter by selected month/year
    const filtered = (usages || []).filter((u) => {
      if (selectedMonth === 'all') return true;
      const d = new Date(u.used_at);
      return (
        String(d.getMonth() + 1).padStart(2, '0') === selectedMonth &&
        String(d.getFullYear()) === selectedYear
      );
    });

    const usageMap: Record<string, { count: number; totalAfterDiscount: number }> = {};
    filtered.forEach((u) => {
      if (!usageMap[u.code_id]) usageMap[u.code_id] = { count: 0, totalAfterDiscount: 0 };
      usageMap[u.code_id].count += 1;
      usageMap[u.code_id].totalAfterDiscount += Number(u.booking_total || 0) - Number(u.discount_amount || 0);
    });

    const enriched = (codesData || []).map((c) => ({
      ...c,
      usage_count: usageMap[c.id]?.count || 0,
      total_after_discount: usageMap[c.id]?.totalAfterDiscount || 0,
    }));

    setCodes(enriched);
    setLoading(false);
  }, [toast, selectedMonth, selectedYear]);

  useEffect(() => {
    const init = async () => {
      const ok = await checkAuth();
      if (ok) fetchCodes();
    };
    init();
  }, [checkAuth, fetchCodes]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase.from('creator_codes').insert({
      code: newCode.code.toUpperCase().trim(),
      creator_name: newCode.creator_name.trim(),
      discount_percentage: newCode.discount_percentage,
      description: newCode.description.trim() || null,
      created_by: session?.user.id,
    });

    if (error) {
      toast({
        title: 'Fehler',
        description: error.message.includes('unique') ? 'Code existiert bereits.' : error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Creator Code erstellt!', description: `Code "${newCode.code.toUpperCase()}" wurde angelegt.` });
      setNewCode({ code: '', creator_name: '', discount_percentage: 10, description: '' });
      setShowForm(false);
      fetchCodes();
    }
    setCreating(false);
  };

  const handleToggle = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('creator_codes')
      .update({ is_active: !current })
      .eq('id', id);
    if (!error) fetchCodes();
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Code "${code}" wirklich löschen?`)) return;
    const { error } = await supabase.from('creator_codes').delete().eq('id', id);
    if (!error) {
      toast({ title: 'Gelöscht', description: `Code "${code}" wurde entfernt.` });
      fetchCodes();
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalUsages = codes.reduce((sum, c) => sum + (c.usage_count || 0), 0);
  const totalAfterDiscount = codes.reduce((sum, c) => sum + (c.total_after_discount || 0), 0);
  const activeCodes = codes.filter((c) => c.is_active).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DS-Detailing" className="h-12 w-auto object-contain" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Admin Dashboard</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Month Filter */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={(v) => setSelectedMonth(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m) => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedMonth !== 'all' && (
            <Select value={selectedYear} onValueChange={(v) => setSelectedYear(v)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2025, 2026, 2027].map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCodes}</p>
              <p className="text-sm text-muted-foreground">Aktive Codes</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalUsages}</p>
              <p className="text-sm text-muted-foreground">Code-Verwendungen</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">CHF {totalAfterDiscount.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Total nach Rabatt</p>
            </div>
          </div>
        </div>

        {/* Creator Codes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Creator Codes</h2>
            <Button onClick={() => setShowForm(!showForm)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Neuer Code
            </Button>
          </div>

          {/* Create Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Creator Code anlegen</h3>
              <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Creator Name</Label>
                  <Input
                    value={newCode.creator_name}
                    onChange={(e) => setNewCode({ ...newCode, creator_name: e.target.value })}
                    placeholder="z.B. Max Mustermann"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Code</Label>
                  <Input
                    value={newCode.code}
                    onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                    placeholder="z.B. MAX10"
                    required
                    className="font-mono uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Rabatt (%)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={newCode.discount_percentage}
                    onChange={(e) => setNewCode({ ...newCode, discount_percentage: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Beschreibung (optional)</Label>
                  <Input
                    value={newCode.description}
                    onChange={(e) => setNewCode({ ...newCode, description: e.target.value })}
                    placeholder="z.B. Instagram Creator"
                  />
                </div>
                <div className="sm:col-span-2 flex gap-3 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                    Abbrechen
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating ? 'Erstellen...' : 'Code erstellen'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Codes List */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Laden...</div>
          ) : codes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
              <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Noch keine Creator Codes angelegt.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {codes.map((code) => (
                <div
                  key={code.id}
                  className={`bg-card border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-opacity ${
                    code.is_active ? 'border-border' : 'border-border opacity-60'
                  }`}
                >
                  {/* Code + Creator */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-primary text-lg tracking-wider">
                        {code.code}
                      </span>
                      <button
                        onClick={() => handleCopy(code.code, code.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="Kopieren"
                      >
                        {copiedId === code.id ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                        -{code.discount_percentage}%
                      </span>
                      {!code.is_active && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          Deaktiviert
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium">{code.creator_name}</p>
                    {code.description && (
                      <p className="text-xs text-muted-foreground">{code.description}</p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 text-center">
                    <div>
                      <p className="text-xl font-bold">{code.usage_count}</p>
                      <p className="text-xs text-muted-foreground">Verwendet</p>
                    </div>
                     <div>
                       <p className="text-xl font-bold">CHF {(code.total_after_discount || 0).toFixed(0)}</p>
                       <p className="text-xs text-muted-foreground">Total nach Rabatt</p>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(code.id, code.is_active)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title={code.is_active ? 'Deaktivieren' : 'Aktivieren'}
                    >
                      {code.is_active ? (
                        <ToggleRight className="w-6 h-6 text-primary" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(code.id, code.code)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      title="Löschen"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
