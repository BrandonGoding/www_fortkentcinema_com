document.addEventListener('mousemove', (event) => {
  const spotlightElements = document.querySelectorAll('.spotlight');
  const { clientX: mouseX, clientY: mouseY } = event;

  spotlightElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    const distanceX = mouseX - elementX;
    const distanceY = mouseY - elementY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const intensity = Math.max(0, 1 - distance / 500); // Adjust 500 for spotlight range

    element.style.boxShadow = `0 0 ${50 * intensity}px ${20 * intensity}px rgba(255, 255, 255, ${0.5 * intensity})`;
  });
});