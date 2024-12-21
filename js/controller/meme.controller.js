'use strict'
let gElCanvas
let gCtx
function onRenderMeme(img = gCurrentImg) {
  if (!img) {
    console.error('Image is not loaded.')
    return
  }
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

  const meme = getMeme()
  meme.lines.forEach((line) => {
    gCtx.font = `${line.size}px Arial`
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, line.x, line.y)
  })
}

function onTextInput(input) {
  setLineTxt(input.value)
  onRenderMeme()
}

function onChangeFontSize(value) {
  setLineFontSize(value)
  onRenderMeme()
}

function onSetColor(color) {
  setLineColor(color)
  onRenderMeme()
}

function onAddLine() {
  addLine()
  onRenderMeme()
}

function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
          <a href="${uploadedImgUrl}">Photo</a>
          <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
             Share on Facebook  
          </button>`
  }
  uploadImg(canvasData, onSuccess)
}
