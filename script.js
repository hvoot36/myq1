document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        const image = piece.getAttribute('data-image');
        piece.style.backgroundImage = `url(${image})`;
    });
});

let draggingElement = null;
let offsetX, offsetY;

document.querySelectorAll('.puzzle-piece').forEach(piece => {
    piece.addEventListener('pointerdown', startDragging);
});

document.addEventListener('pointermove', drag);
document.addEventListener('pointerup', stopDragging);

function startDragging(e) {
    draggingElement = e.target;
    offsetX = e.clientX - draggingElement.offsetLeft;
    offsetY = e.clientY - draggingElement.offsetTop;
    draggingElement.setPointerCapture(e.pointerId);
}

function drag(e) {
    if (draggingElement) {
        requestAnimationFrame(() => {
            const containerRect = document.getElementById('puzzleContainer').getBoundingClientRect();
            let newX = e.clientX - offsetX - containerRect.left;
            let newY = e.clientY - offsetY - containerRect.top;

            // Keep the piece within the container
            newX = Math.max(0, Math.min(newX, containerRect.width - draggingElement.offsetWidth));
            newY = Math.max(0, Math.min(newY, containerRect.height - draggingElement.offsetHeight));

            draggingElement.style.left = newX + 'px';
            draggingElement.style.top = newY + 'px';
        });
    }
}

function stopDragging(e) {
    if (draggingElement) {
        draggingElement.releasePointerCapture(e.pointerId);
        draggingElement = null;
    }
}
