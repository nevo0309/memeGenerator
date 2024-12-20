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
