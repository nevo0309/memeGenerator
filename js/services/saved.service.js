'use strict'

const STORAGE_KEY = 'savedMemes'

function saveMeme(meme) {
  const memes = loadFromStorage(STORAGE_KEY) || []
  memes.push(meme)
  saveToStorage(STORAGE_KEY, memes)
}

function getSavedMemes() {
  return loadFromStorage(STORAGE_KEY) || []
}

function deleteMeme(idx) {
  const memes = loadFromStorage(STORAGE_KEY) || []
  memes.splice(idx, 1)
  saveToStorage(STORAGE_KEY, memes)
}

function loadMeme(idx) {
  const memes = loadFromStorage(STORAGE_KEY) || []
  return memes[idx]
}
function setMeme(meme) {
  gMeme = meme
}
