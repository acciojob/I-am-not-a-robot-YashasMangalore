//your code here
document.addEventListener('DOMContentLoaded', () => {
  const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
  const imageContainer = document.querySelector('.flex');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');

  let clickedImages = [];
  let correctPair = null;

  function getRandomImageClass() {
    return imageClasses[Math.floor(Math.random() * imageClasses.length)];
  }

  function createImageElement(className) {
    const img = document.createElement('img');
    img.className = className;
    img.addEventListener('click', handleImageClick);
    return img;
  }

  function renderImages() {
    imageContainer.innerHTML = '';
    const randomClass = getRandomImageClass();
    const allClasses = [...imageClasses, randomClass];
    const shuffledClasses = allClasses.sort(() => Math.random() - 0.5);

    shuffledClasses.forEach(className => {
      imageContainer.appendChild(createImageElement(className));
    });

    // Set the repeated image class
    correctPair = randomClass;
  }

  function handleImageClick(event) {
    const clickedImg = event.target;
    if (clickedImages.length < 2 && !clickedImages.includes(clickedImg)) {
      clickedImg.classList.add('selected');
      clickedImages.push(clickedImg);

      if (clickedImages.length === 2) {
        verifyButton.style.display = 'block';
      }

      resetButton.style.display = 'block';
    }
  }

  function handleReset() {
    clickedImages.forEach(img => img.classList.remove('selected'));
    clickedImages = [];
    verifyButton.style.display = 'none';
    resetButton.style.display = 'none';
    para.textContent = '';
  }

  function handleVerify() {
    const [img1, img2] = clickedImages;
    const isCorrect = img1.className === img2.className && img1.classList.contains(correctPair);

    if (isCorrect) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyButton.style.display = 'none';
  }

  resetButton.addEventListener('click', handleReset);
  verifyButton.addEventListener('click', handleVerify);

  // Initial render
  renderImages();
});
