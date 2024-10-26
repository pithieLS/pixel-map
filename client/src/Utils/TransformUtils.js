export function getCursorPosInCanvas(clickPos, _canvas) {
    const canvasBounds = _canvas.getBoundingClientRect()
    const zoomDiv = _canvas.closest("#zoom-controller")

    // Get float value from scale(9.9999)
    const regex = /scale\(([^)]+)\)/i
    const transform = zoomDiv.style.transform
    let currentScale = 1
    if(transform !== '')
        currentScale = parseFloat(regex.exec(transform)[1])

    const rel_x = (clickPos.pos_x - canvasBounds.left)/currentScale
    const rel_y = (clickPos.pos_y - canvasBounds.top)/currentScale

    return {pos_x: Math.floor(rel_x), pos_y: Math.floor(rel_y)}
}

export function ControlZoom(event, zoomDiv) {
    const zoomAmount = (event.deltaY < 0) ? 1.1 : 0.9;

    const currentScale = zoomDiv.style.transform
        ? parseFloat(zoomDiv.style.transform.replace('scale(', '').replace(')', ''))
        : 1

    const newScale = currentScale * zoomAmount;

    const clampedScale = Math.max(Math.min(10, newScale), 0.5)

    zoomDiv.style.transform = `scale(${clampedScale})`;
}

export function ControlMove(event, moveDiv, lastMousePosInCanvas) {
    const zoomDiv = moveDiv.closest("#zoom-controller")
    const zooDivBounds = zoomDiv.getBoundingClientRect()

    // Get float value from scale(9.9999)
    const regex = /scale\(([^)]+)\)/i
    const transform = zoomDiv.style.transform
    let currentScale = 1
    if(transform !== '')
        currentScale = parseFloat(regex.exec(transform)[1])

    const rel_x = (event.clientX - zooDivBounds.left)/currentScale
    const rel_y = (event.clientY - zooDivBounds.top)/currentScale

    moveDiv.style.left = `${rel_x-lastMousePosInCanvas.pos_x}px`
    moveDiv.style.top = `${rel_y-lastMousePosInCanvas.pos_y}px`
}
