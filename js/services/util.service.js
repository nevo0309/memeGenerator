'use strict'

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
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
