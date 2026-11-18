// DataSource (funciones) para notes con Supabase
import { Note } from "../domain/note.entity";
// Ajusta esta ruta si tu cliente de supabase está en otra carpeta (ej. "../../../core/supabase")
import { supabase } from "../../../supabase";

// Leer todas las notas ordenadas de la más reciente a la más antigua
export async function getAllNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al obtener notas:", error.message);
    return [];
  }

  return (data as Note[]) || [];
}

// Crear una nueva nota en Supabase
export async function createNote(title: string, description: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, description: description.trim() === "" ? null : description }])
    .select()
    .single();

  if (error) {
    console.error("Error al crear la nota:", error.message);
    return null;
  }

  return data as Note;
}

// Actualizar la nota seleccionada
export async function updateNote(note: Note): Promise<Note | null> {
  const { data, error } = await supabase
    .from("notes")
    .update({
      title: note.title,
      description: note.description,
    })
    .eq("id", note.id)
    .select()
    .single();

  if (error) {
    console.error("Error al actualizar la nota:", error.message);
    return null;
  }

  return data as Note;
}

// Eliminar la nota seleccionada (retorna true si se eliminó, false si hubo error)
export async function deleteNote(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar la nota:", error.message);
    return false;
  }

  return true;
}