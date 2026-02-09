import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  CreditCard,
  Loader2,
} from "lucide-react";

interface BusinessCard {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  title: string | null;
  company: string | null;
  tagline: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  address: string | null;
  vat_number: string | null;
  website: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  whatsapp_number: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const emptyCard: Omit<BusinessCard, "id" | "created_at" | "updated_at"> = {
  username: "",
  first_name: "",
  last_name: "",
  title: null,
  company: null,
  tagline: null,
  email: null,
  phone: null,
  mobile: null,
  address: null,
  vat_number: null,
  website: null,
  photo_url: null,
  linkedin_url: null,
  whatsapp_number: null,
  facebook_url: null,
  instagram_url: null,
  twitter_url: null,
  is_active: true,
};

export default function BusinessCardManager() {
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<BusinessCard | null>(null);
  const [form, setForm] = useState(emptyCard);
  const { toast } = useToast();

  const loadCards = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("business_cards")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      console.error("Error loading business cards:", error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i biglietti da visita",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const openCreate = () => {
    setEditingCard(null);
    setForm(emptyCard);
    setDialogOpen(true);
  };

  const openEdit = (card: BusinessCard) => {
    setEditingCard(card);
    setForm({
      username: card.username,
      first_name: card.first_name,
      last_name: card.last_name,
      title: card.title,
      company: card.company,
      tagline: card.tagline,
      email: card.email,
      phone: card.phone,
      mobile: card.mobile,
      address: card.address,
      vat_number: card.vat_number,
      website: card.website,
      photo_url: card.photo_url,
      linkedin_url: card.linkedin_url,
      whatsapp_number: card.whatsapp_number,
      facebook_url: card.facebook_url,
      instagram_url: card.instagram_url,
      twitter_url: card.twitter_url,
      is_active: card.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.username || !form.first_name || !form.last_name) {
      toast({
        title: "Campi obbligatori",
        description: "Username, Nome e Cognome sono obbligatori",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      if (editingCard) {
        const { error } = await supabase
          .from("business_cards")
          .update(form)
          .eq("id", editingCard.id);
        if (error) throw error;
        toast({ title: "Biglietto aggiornato", description: "Le modifiche sono state salvate." });
      } else {
        const { error } = await supabase
          .from("business_cards")
          .insert(form);
        if (error) throw error;
        toast({ title: "Biglietto creato", description: "Il nuovo biglietto da visita è stato creato." });
      }
      setDialogOpen(false);
      loadCards();
    } catch (error: any) {
      console.error("Error saving business card:", error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile salvare il biglietto",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo biglietto da visita?")) return;

    try {
      const { error } = await supabase
        .from("business_cards")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Biglietto eliminato" });
      loadCards();
    } catch (error) {
      console.error("Error deleting business card:", error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare il biglietto",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (card: BusinessCard) => {
    try {
      const { error } = await supabase
        .from("business_cards")
        .update({ is_active: !card.is_active })
        .eq("id", card.id);
      if (error) throw error;
      toast({
        title: card.is_active ? "Biglietto disattivato" : "Biglietto attivato",
      });
      loadCards();
    } catch (error) {
      console.error("Error toggling business card:", error);
    }
  };

  const updateField = (field: string, value: string | boolean | null) => {
    setForm((prev) => ({ ...prev, [field]: value === "" ? null : value }));
  };

  const getInitials = (card: BusinessCard) =>
    `${card.first_name.charAt(0)}${card.last_name.charAt(0)}`.toUpperCase();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Biglietti da Visita Digitali</h2>
        <Button onClick={openCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuovo Biglietto
        </Button>
      </div>

      {/* Cards list */}
      <div className="grid gap-4">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  {card.photo_url && <AvatarImage src={card.photo_url} />}
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                    {getInitials(card)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {card.first_name} {card.last_name}
                    </span>
                    <Badge variant={card.is_active ? "default" : "secondary"}>
                      {card.is_active ? "Attivo" : "Inattivo"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    @{card.username}
                    {card.title && ` · ${card.title}`}
                    {card.company && ` · ${card.company}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/card/${card.username}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleToggleActive(card)}>
                  <Switch checked={card.is_active} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEdit(card)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(card.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {cards.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nessun biglietto</h3>
              <p className="text-muted-foreground mb-4">
                Non ci sono ancora biglietti da visita digitali. Creane uno!
              </p>
              <Button onClick={openCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Crea Primo Biglietto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCard ? "Modifica Biglietto" : "Nuovo Biglietto da Visita"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Required fields */}
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                placeholder="es. sandrello"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">URL: /card/{form.username || "..."}</p>
            </div>
            <div className="space-y-2 flex items-center gap-2 pt-6">
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => updateField("is_active", v)}
              />
              <Label>Attivo</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="first_name">Nome *</Label>
              <Input
                id="first_name"
                value={form.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Cognome *</Label>
              <Input
                id="last_name"
                value={form.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Titolo / Ruolo</Label>
              <Input
                id="title"
                placeholder="es. CEO"
                value={form.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Azienda</Label>
              <Input
                id="company"
                value={form.company || ""}
                onChange={(e) => updateField("company", e.target.value)}
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                placeholder="Una frase che ti rappresenta"
                value={form.tagline || ""}
                onChange={(e) => updateField("tagline", e.target.value)}
              />
            </div>

            {/* Contact info */}
            <div className="col-span-2 border-t pt-4">
              <h3 className="font-semibold mb-3">Contatti</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Cellulare</Label>
              <Input
                id="mobile"
                value={form.mobile || ""}
                onChange={(e) => updateField("mobile", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono fisso</Label>
              <Input
                id="phone"
                value={form.phone || ""}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Sito Web</Label>
              <Input
                id="website"
                placeholder="noscite.it"
                value={form.website || ""}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Input
                id="address"
                value={form.address || ""}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vat_number">P.IVA</Label>
              <Input
                id="vat_number"
                value={form.vat_number || ""}
                onChange={(e) => updateField("vat_number", e.target.value)}
              />
            </div>

            {/* Social links */}
            <div className="col-span-2 border-t pt-4">
              <h3 className="font-semibold mb-3">Social</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                placeholder="https://linkedin.com/in/..."
                value={form.linkedin_url || ""}
                onChange={(e) => updateField("linkedin_url", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">WhatsApp</Label>
              <Input
                id="whatsapp_number"
                placeholder="+39..."
                value={form.whatsapp_number || ""}
                onChange={(e) => updateField("whatsapp_number", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                value={form.facebook_url || ""}
                onChange={(e) => updateField("facebook_url", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={form.instagram_url || ""}
                onChange={(e) => updateField("instagram_url", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter / X URL</Label>
              <Input
                id="twitter_url"
                value={form.twitter_url || ""}
                onChange={(e) => updateField("twitter_url", e.target.value)}
              />
            </div>

            {/* Photo */}
            <div className="col-span-2 border-t pt-4 space-y-2">
              <Label htmlFor="photo_url">URL Foto Profilo</Label>
              <Input
                id="photo_url"
                placeholder="https://..."
                value={form.photo_url || ""}
                onChange={(e) => updateField("photo_url", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingCard ? "Salva Modifiche" : "Crea Biglietto"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
