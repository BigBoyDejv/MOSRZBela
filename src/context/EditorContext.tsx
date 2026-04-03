'use client';
import { createContext, useContext, useState } from 'react';
import { supabase } from '@/lib/supabase';

type EditorType = 'news' | 'date' | 'content' | 'contact';

interface EditorConfig {
  type: EditorType;
  id?: string;
  initialData: any;
}

interface EditorContextType {
  activeEditor: EditorConfig | null;
  openEditor: (config: EditorConfig) => void;
  closeEditor: () => void;
  isSaving: boolean;
  saveData: (data: any) => Promise<void>;
}

const EditorContext = createContext<EditorContextType>({
  activeEditor: null,
  openEditor: () => {},
  closeEditor: () => {},
  isSaving: false,
  saveData: async () => {},
});

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeEditor, setActiveEditor] = useState<EditorConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openEditor = (config: EditorConfig) => {
    setActiveEditor(config);
  };

  const closeEditor = () => {
    setActiveEditor(null);
  };

  const saveData = async (data: any) => {
    if (!activeEditor) return;
    setIsSaving(true);
    
    let table = '';
    let id = activeEditor.id;

    switch (activeEditor.type) {
      case 'news': table = 'announcements'; break;
      case 'date': table = 'important_dates'; break;
      case 'content': table = 'site_content'; break;
      case 'contact': table = 'site_content'; id = 'kontakty'; break; // Special case for contacts block
    }

    try {
      if (id) {
        const { error } = await supabase.from(table).update(data).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert([data]);
        if (error) throw error;
      }
      closeEditor();
      window.location.reload(); // Refresh to show changes
    } catch (err) {
      console.error('Error saving data:', err);
      alert('Chyba pri ukladaní dát.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <EditorContext.Provider value={{ activeEditor, openEditor, closeEditor, isSaving, saveData }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
