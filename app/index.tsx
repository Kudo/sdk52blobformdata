import * as ImagePicker from 'expo-image-picker';
import { View, Button } from 'react-native';

async function uploadAsync() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
  });

  if (result.canceled) {
    return;
  }
  const uri = result.assets[0].uri;

  const response = await fetch(uri);
  const blob = await response.blob();
  console.log('Blob:', blob);

  const formData = new FormData();
  formData.append('file', blob, 'image.png');

  try {
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log('Success:', data);
  } catch (e) {
    console.error('Error:', e);
  }
}

const handleUpload = async () => {};

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button title="Upload Image" onPress={uploadAsync} />
    </View>
  );
}
