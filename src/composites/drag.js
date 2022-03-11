import { onBeforeUnmount } from 'vue'

/**
 * Kinetic drag scrollable element
 *
 * @param el
 * @param container
 * @returns {{enableTracking: enableTracking, stop: stop, disableTracking: disableTracking}}
 */

export default (el, container) => {
  const ease = 0.3
  const threshold = 0.01
  const velocity = 0.3

  let curInertiaX = 0
  let curInertiaY = 0
  let curVelX = 0
  let curVelY = 0
  let lastMotion = 0
  let directionX = 0
  let directionY = 0
  let prevMouseX = 0
  let prevMouseY = 0
  let targetX = 0
  let targetY = 0
  let lastX = 0
  let lastY = 0
  let viewPortMinX = 0
  let viewPortMaxX = container.scrollWidth
  let viewPortMinY = 0
  let viewPortMaxY = container.scrollHeight
  let viewPortX = 0
  let viewPortY = 0
  let processInertia = false
  let stopped = false

  let pressed = false

  const xpos = e => {
    // touch event
    if (e.targetTouches && (e.targetTouches.length >= 1)) {
      return e.targetTouches[0].clientX
    }
    // mouse event
    return e.clientX
  }

  const ypos = e => {
    // touch event
    if (e.targetTouches && (e.targetTouches.length >= 1)) {
      return e.targetTouches[0].clientY
    }
    // mouse event
    return e.clientY
  }

  const tap = e => {
    pressed = true
    curInertiaX = 0
    curInertiaY = 0
    curVelX = 0
    curVelY = 0
    prevMouseX = xpos(e)
    prevMouseY = ypos(e)
    lastMotion = new Date().getTime()
    lastX = targetX
    lastY = targetY
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const drag = e => {
    if (pressed) {
      let x = xpos(e)
      let y = ypos(e)
      let deltaX = x - prevMouseX
      let deltaY = y - prevMouseY
      if (Math.abs(deltaX) >= threshold || Math.abs(deltaY) >= threshold) {
        prevMouseX = x
        prevMouseY = y
        lastMotion = new Date().getTime()

        if (targetX > 0 && targetX < viewPortMaxX) {
          targetX -= deltaX
        } else {
          targetX -= deltaX / 3
        }

        let dX = targetX - lastX
        lastX = targetX

        let velocityX = Math.abs(dX)
        curVelX += (velocityX - curVelX) * velocity
        directionX = dX < 0 ? -1 : 1

        if (targetY > 0 && targetY < viewPortMaxY) {
          targetY -= deltaY
        } else {
          targetY -= deltaY / 3
        }

        let dY = targetY - lastY
        lastY = targetY

        let velocityY = Math.abs(dY)
        curVelY += (velocityY - curVelY) * velocity
        directionY = dY < 0 ? -1 : 1
      }
    }
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const release = e => {
    if (pressed) {
      pressed = false
      curInertiaX = Math.abs(curVelX)
      curInertiaY = Math.abs(curVelY)
      processInertia = true
      let deltaTime = new Date().getTime() - lastMotion
      deltaTime = Math.max(10, deltaTime)
      lastMotion = 0
      curVelX *= 1 - Math.min(1, Math.max(0, deltaTime / 100))
      curVelY *= 1 - Math.min(1, Math.max(0, deltaTime / 100))
    }
    prevMouseX = 0
    prevMouseY = 0
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const update = () => {
    if (processInertia) {
      targetX += curVelX * directionX
      curVelX *= 0.9

      if (targetX < viewPortMinX) {
        curVelX = 0
        targetX = viewPortMinX
      } else if (targetX > viewPortMaxX) {
        curVelX = 0
        targetX = viewPortMaxX
      }

      if (curVelX < 0.01) {
        processInertia = false
        curVelX = 0
      }

      targetY += curVelY * directionY
      curVelY *= 0.9

      if (targetY < viewPortMinY) {
        curVelY = 0
        targetY = viewPortMinY
      } else if (targetY > viewPortMaxY) {
        curVelY = 0
        targetY = viewPortMaxY
      }

      if (curVelY < 0.01) {
        processInertia = false
        curVelY = 0
      }
    }

    let speedX = (targetX - viewPortX) * (pressed ? ease : 0.3)
    viewPortX += speedX
    let roundedViewportX = Math.round(viewPortX)

    let speedY = (targetY - viewPortY) * (pressed ? ease : 0.3)
    viewPortY += speedY
    let roundedViewportY = Math.round(viewPortY)

    // el.style.transform = `translate(${roundedViewportX}px, ${roundedViewportY}px`
    container.scrollLeft = roundedViewportX
    container.scrollTop = roundedViewportY
  }

  const animate = () => {
    const loop = () => {
      update()
      if (!stopped) {
        requestAnimationFrame(loop)
      }
    }
    loop()
  }

  const enableTracking = () => {
    if (typeof window.ontouchstart !== 'undefined') {
      el.addEventListener('touchstart', tap)
      window.addEventListener('touchmove', drag)
      window.addEventListener('touchend', release)
      window.addEventListener('touchcancel', release)
    }
    el.addEventListener('mousedown', tap)
    window.addEventListener('mousemove', drag)
    window.addEventListener('mouseup', release)
    window.addEventListener('mouseleave', release)
  }

  const disableTracking = () => {
    if (typeof el.ontouchstart !== 'undefined') {
      el.removeEventListener('touchstart', tap)
      window.removeEventListener('touchmove', drag)
      window.removeEventListener('touchend', release)
      window.removeEventListener('touchcancel', release)
    }
    el.removeEventListener('mousedown', tap)
    window.removeEventListener('mousemove', drag)
    window.removeEventListener('mouseup', release)
    window.removeEventListener('mouseleave', release)
  }

  const stop = () => {
    stopped = true
    disableTracking()
  }

  onBeforeUnmount(() => {
    stop()
  })

  enableTracking()
  animate()

  return {
    enableTracking,
    disableTracking,
    stop,
  }
}
