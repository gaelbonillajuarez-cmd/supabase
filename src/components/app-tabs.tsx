// Importamos NativeTabs desde expo-router para la barra de pestañas nativa
import { NativeTabs } from 'expo-router/native-tabs';
// Importamos useColorScheme para detectar si el dispositivo está en modo claro u oscuro
import { useColorScheme } from 'react-native';

// Importamos los colores definidos en las constantes del tema
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  // Detecta el esquema de color actual ('dark' o 'light')
  const scheme = useColorScheme();
  // Selecciona los colores correspondientes al tema activo
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      
      {/* Pestaña 1: Galería -> apunta a src/app/gallery.tsx (que renderiza GalleryView) */}
      <NativeTabs.Trigger name="gallery">
        <NativeTabs.Trigger.Label>Galería</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* Pestaña 2: Notas -> apunta a src/app/notes.tsx (que renderiza NotesView) */}
      <NativeTabs.Trigger name="notes">
        <NativeTabs.Trigger.Label>Notas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* Pestaña 3: Perfil / Usuario -> apunta a src/app/account.tsx (en minúsculas) */}
      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Label>Perfil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}
