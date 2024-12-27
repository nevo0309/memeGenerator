'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function makeId(length = 6) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var id = ''

  for (var i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return id
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

function getEvPos(ev) {
  let pos

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()

    // Touch event use bounding client rect for precise positioning
    const touch = ev.changedTouches[0]
    const rect = gElCanvas.getBoundingClientRect() // canvas size and position

    pos = {
      x: (touch.pageX - rect.left) * (gElCanvas.width / rect.width),
      y: (touch.pageY - rect.top) * (gElCanvas.height / rect.height),
    }
  } else {
    // Mouse event use offset coordinates
    pos = {
      x: ev.offsetX * (gElCanvas.width / gElCanvas.clientWidth),
      y: ev.offsetY * (gElCanvas.height / gElCanvas.clientHeight),
    }
  }

  return pos
}
