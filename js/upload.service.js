// on submit call to this function

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'ds1tr9iln'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const UPLOAD_PRESET = 'nevo0309'

  const formData = new FormData()
  formData.append('file', imgData)
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    console.log('Cloudinary response:', data)
    onSuccess(data.secure_url)
  } catch (err) {
    console.error('Upload failed:', err.message)
    alert(`Image upload failed: ${err.message}`)
  }
}
