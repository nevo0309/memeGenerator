'use strict'

function onSaveMeme() {
  const meme = getMeme()
  const canvasData = gElCanvas.toDataURL()
  meme.canvasData = canvasData
  saveMeme(meme)
  alert('Meme saved successfully!')
}

function onLoadSavedMemes() {
  const savedMemes = getSavedMemes()
  renderSavedMemes(savedMemes)
}

function renderSavedMemes(memes) {
  const elSavedContainer = document.querySelector('.main-saved')
  elSavedContainer.innerHTML = memes
    .map((meme, idx) => {
      return `
          <div class="saved-meme">
            <img src="${meme.canvasData}" alt="Meme ${idx}" onclick="onEditSavedMeme(${idx})">
            <button class="dlt-saved-meme" onclick="onDeleteSavedMeme(${idx})">Delete</button>
          </div>
        `
    })
    .join('')
}

function onEditSavedMeme(idx) {
  const meme = loadMeme(idx)
  if (!meme) return

  setMeme(meme)

  document.querySelector('.main-saved').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')
  document.querySelector('.gallery').classList.add('hidden')
  document.querySelector('.filtering').classList.add('hidden')
  document.querySelector('.main-gallery').classList.remove('hidden')

  gCurrentImg = new Image()
  gCurrentImg.src = meme.canvasData
  gCurrentImg.onload = () => {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addMouseListeners()
    addTouchListeners()

    // Update text input
    const textInput = document.querySelector('.text-input input')
    if (meme.lines.length > 0) {
      textInput.value = meme.lines[meme.selectedLineIdx]?.txt || ''
    }

    onRenderMeme(gCurrentImg)
  }
}

function onDeleteSavedMeme(idx) {
  deleteMeme(idx)
  onLoadSavedMemes()
}

function onOpenSavedMemes() {
  document.querySelector('.main-generator').classList.add('hidden')
  document.querySelector('.main-gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.add('hidden')

  document.querySelector('.main-saved').classList.remove('hidden')

  // Load and render saved memes
  onLoadSavedMemes()
}
