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
  meme.lines.forEach((line, idx) => {
    // Draw text
    gCtx.font = `${line.size}px Arial`
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, line.x, line.y)

    // Draw a frame
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size // Approximate height of text
    const padding = 5

    gCtx.lineWidth = 2
    gCtx.strokeStyle = idx === meme.selectedLineIdx ? 'black' : 'white' // Highlight selected line
    gCtx.strokeRect(line.x - padding, line.y - textHeight, textWidth + padding * 2, textHeight + padding * 2)
    gCtx.fillStyle = 'rgba(0, 0, 0, 0.5)' // Background overlay
    gCtx.fillRect(line.x - padding, line.y - textHeight, textWidth + padding * 2, textHeight + padding * 2)
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

  const meme = getMeme()
  const selectedLine = meme.lines[meme.selectedLineIdx]
  const textInput = document.querySelector('.text-input input')
  textInput.value = selectedLine.txt

  onRenderMeme()
}
function onSwitchLine() {
  const meme = getMeme()
  meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length

  const selectedLine = meme.lines[meme.selectedLineIdx]
  const textInput = document.querySelector('.text-input input')
  textInput.value = selectedLine.txt
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
