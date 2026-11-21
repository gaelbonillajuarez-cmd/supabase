// ImagePicker: La herramienta de Expo que nos permite gestionar el acceso a la galería y archivos multimedia del dispositivo.
import * as ImagePicker from 'expo-image-picker'
// useState: El gancho (hook) de React para manejar la memoria temporal de la imagen elegida y la visibilidad del modal de vista previa.
import { useState } from 'react'
// Componentes de React Native: Image, Modal, StyleSheet, Text, TouchableOpacity y View para construir la interfaz del selector y su vista previa.
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// ImagePickerComponentProps: Contrato de TypeScript que le exige a este componente recibir obligatoriamente una función llamada onImageSelected,
// la cual recibe un texto (uri) para entregárselo al componente padre (GalleryView) cuando se confirme la selección.
interface ImagePickerComponentProps {
  onImageSelected: (uri: string) => void
}

// Componente ImagePickerComponent: Gestiona de forma aislada los permisos, la selección de imágenes desde la galería del celular y su vista previa a pantalla completa.
export default function ImagePickerComponent({ onImageSelected }: ImagePickerComponentProps) {
  // tempUri: Variable de estado que guarda provisionalmente la ruta (uri) de la imagen seleccionada de la galería. Inicia en null.
  const [tempUri, setTempUri] = useState<string | null>(null)
  // previewVisible: Booleano que controla si el modal de vista previa a pantalla completa está abierto o cerrado. Inicia en false.
  const [previewVisible, setPreviewVisible] = useState(false)

  // pickImage: Función asíncrona que solicita permisos de galería y abre la interfaz de archivos multimedia del dispositivo.
  const pickImage = async () => {
    // requestMediaLibraryPermissionsAsync(): Pide autorización formal al usuario para entrar a la galería de fotos.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    // Si el usuario niega el permiso, muestra una alerta en pantalla y frena la ejecución.
    if (!permissionResult.granted) {
      alert("Se necesitan permisos para acceder a la galería.")
      return
    }

    // launchImageLibraryAsync: Abre el selector de fotos del sistema, filtrando solo imágenes, permitiendo edición/recorte y calidad máxima.
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    })

    // Si el usuario elige una foto y no cancela, guarda la ruta temporalmente y abre el modal de vista previa a pantalla completa.
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setTempUri(result.assets[0].uri)
      setPreviewVisible(true)
    }
  }

  // confirmImage: Se ejecuta al presionar el botón "Aceptar" dentro del modal de vista previa.
  const confirmImage = () => {
    // Valida que exista una ruta válida, se la envía al componente padre (GalleryView), cierra el modal y limpia la memoria temporal.
    if (tempUri) { 
      onImageSelected(tempUri)
      setPreviewVisible(false)
      setTempUri(null)
    }
  }

  return (
    // Fragmento vacío para retornar múltiples elementos hermanos sin alterar la estructura visual.
    <>
      {/* Botón principal estilizado en azul para activar la función pickImage al presionarlo */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>Galería</Text>
      </TouchableOpacity>

      {/* Modal de vista previa a PANTALLA COMPLETA para verificar la foto seleccionada */}
      <Modal visible={previewVisible} animationType="slide">
        <View style={styles.previewContainer}>
          
          {/* Si tempUri tiene un valor válido, renderiza la imagen abarcando toda la pantalla */}
          {tempUri && <Image source={{ uri: tempUri }} style={styles.fullScreenImage} />}

          {/* previewControls: Barra inferior flotante con los botones de acción para cancelar o aceptar */}
          <View style={styles.previewControls}>
            {/* Botón rojo para descartar la foto seleccionada y cerrar la vista previa */}
            <TouchableOpacity 
              style={styles.btnCancelFull} 
              onPress={() => setPreviewVisible(false)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
            
            {/* Botón verde para confirmar la foto y enviarla al componente padre */}
            <TouchableOpacity 
              style={styles.btnConfirmFull} 
              onPress={confirmImage}
            >
              <Text style={styles.btnText}>Aceptar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    </>
  )
}

// styles: Objeto de estilos visuales que definen el diseño del botón de galería y de la interfaz de vista previa a pantalla completa
const styles = StyleSheet.create({
  button: { 
    backgroundColor: '#0984e3', 
    padding: 12, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 10, 
    width: '100%' 
  },
  text: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  // previewContainer: Contenedor principal de la vista previa que ocupa toda la pantalla con fondo negro
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // fullScreenImage: Muestra la foto seleccionada abarcando todo el ancho y alto sin deformarse
  fullScreenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // previewControls: Organiza los botones inferiores de manera flotante sobre la imagen
  previewControls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnCancelFull: {
    backgroundColor: '#d63031',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  btnConfirmFull: {
    backgroundColor: '#00b894',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
})