/**
 * Hide arrow
 */
export function showArrow() {
  const elementArrow = document.querySelector("#arrow");
  if (elementArrow) {
    elementArrow.style.visibility = "visible"; // Ocultar la flecha
  }
}

/**
 * Hide arrow
 */
export function hideArrow() {
  const elementArrow = document.querySelector("#arrow");
  if (elementArrow) {
    elementArrow.style.visibility = "hidden"; // Ocultar la flecha
  }
}

/**
 * Update arrow location above char when select
 */
export function updateArrowPosition(selectedCharacter) {
  const elementArrow = document.querySelector("#arrow");
  const elementCharacter = document.querySelector(
    "#" + selectedCharacter.fileName
  );
  if (elementArrow) {
    if (elementArrow && elementCharacter) {
      const targetLeft = parseFloat(
        window.getComputedStyle(elementCharacter).getPropertyValue("left")
      );
      const targetTop = parseFloat(
        window.getComputedStyle(elementCharacter).getPropertyValue("top")
      );
      elementArrow.style.zIndex = 100;
      elementArrow.style.left = `${targetLeft + 40}px`;
      elementArrow.style.top = `${targetTop - 25}px`;
      elementArrow.style.visibility = "visible";
    }
  }
}

/**
 * Update magic ring location above char when select
 */
export function updateRingMagicPosition(selectedCharacter) {
  const elementRing = document.querySelector("#hero-magic");
  const elementCharacter = document.querySelector(
    "#" + selectedCharacter.fileName
  );

  if (elementRing && elementCharacter) {
    const targetLeft = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("left")
    );
    const targetTop = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("top")
    );
    const targetBottom = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("bottom")
    );
    const targetRight = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("right")
    );

    elementRing.style.zIndex = 100;
    elementRing.style.left = `${targetLeft}px`;
    elementRing.style.top = `${targetTop - 20}px`;
    elementRing.style.bottom = `${targetBottom}px`;
    elementRing.style.right = `${targetRight}px`;

    elementRing.classList.add("visible");
  }
}

/**
 * Update summon bubbles location above char when select
 */
export function updateSummonBubblesPosition(selectedCharacter) {
  const elementY = document.querySelector("#hero-magic-ring-yellow");
  const elementR = document.querySelector("#hero-magic-ring-red");
  const elementG = document.querySelector("#hero-magic-ring-green");


  const elementCharacter = document.querySelector(
    "#" + selectedCharacter.fileName
  );

  if (elementCharacter) {
    const targetLeft = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("left")
    );
    const targetTop = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("top")
    );
    const targetBottom = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("bottom")
    );
    const targetRight = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("right")
    );

    elementY.style.zIndex = 99999;
    elementY.style.left = `${targetLeft-50}px`;
    elementY.style.top = `${targetTop + 30}px`;
    elementY.style.bottom = `${targetBottom}px`;
    elementY.style.right = `${targetRight}px`;

    elementG.style.zIndex = 99999;
    elementG.style.left = `${targetLeft+30}px`;
    elementG.style.top = `${targetTop}px`;
    elementG.style.bottom = `${targetBottom}px`;
    elementG.style.right = `${targetRight}px`;

    elementR.style.zIndex = 99999;
    elementR.style.left = `${targetLeft}px`;
    elementR.style.top = `${targetTop + 50}px`;
    elementR.style.bottom = `${targetBottom}px`;
    elementR.style.right = `${targetRight}px`;

    elementY.classList.add("visible"); 
  }
}

/**
 * Hide and show summon bubbles animation
 */
export function showAndHideSummonBubbles() {
  

  const elementY = document.querySelector("#hero-magic-ring-yellow");
  const elementR = document.querySelector("#hero-magic-ring-red");
  const elementG = document.querySelector("#hero-magic-ring-green");


  if (elementY && elementR && elementG) {
    elementY.style.visibility = "visible";
    elementR.style.visibility = "visible";
    elementG.style.visibility = "visible";
    elementY.classList.add("animate-show");
    elementR.classList.add("animate-show");
    elementG.classList.add("animate-show");

    setTimeout(() => {
      elementY.classList.remove("animate-show");
      elementR.classList.remove("animate-show");
      elementG.classList.remove("animate-show");
      elementY.style.visibility = "hidden";
      elementR.style.visibility = "hidden";
      elementG.style.visibility = "hidden";
    }, 500);
  }
}

/**
 * Hide and show magic ring loading animation
 */
export function showAndHideRingMagic() {
  const name = "#hero-magic";
  const elementMagic = document.querySelector(name);
  if (elementMagic) {
    elementMagic.style.visibility = "visible";
    elementMagic.classList.add("animate-show");
    setTimeout(() => {
      elementMagic.classList.remove("animate-show");
      elementMagic.style.visibility = "hidden";
    }, 1000);
  }
}

/**
 * Hide and show magic attack to enemy animation
 */
export function showMagicAttack(
  selectedCharacter,
  targetCharacter,
  selectedMagic
) {
  const timestamp = new Date().getTime();
  const imageMagic = document.querySelector("#magic");
  if (imageMagic) {
    imageMagic.src =
      getImageUrl(selectedMagic.fileName, "gif") + "?t=" + timestamp;
  }      
  hideArrow();
  updateRingMagicPosition(selectedCharacter);
  showAndHideRingMagic();
  setTimeout(() => {
    const name = "#enemy-magic-receive";
    const elementMagic = document.querySelector(name);
    const elementEnemy = document.querySelector(
      "#" + targetCharacter.fileName
    );
    const targetLeft = parseFloat(
      window.getComputedStyle(elementEnemy).getPropertyValue("left")
    );
    const targetTop = parseFloat(
      window.getComputedStyle(elementEnemy).getPropertyValue("top")
    );
    const targetBottom = parseFloat(
      window.getComputedStyle(elementEnemy).getPropertyValue("bottom")
    );
    const targetRight = parseFloat(
      window.getComputedStyle(elementEnemy).getPropertyValue("right")
    );
    if (elementMagic) {
      elementMagic.style.visibility = "visible";
      elementMagic.style.left = `${targetLeft}px`;
      elementMagic.style.top = `${targetTop}px`;
      elementMagic.style.right = `${targetRight}px`;
      elementMagic.style.bottom = `${targetBottom}px`;
      elementMagic.classList.add("animate-show");
      setTimeout(() => {
        elementMagic.classList.remove("animate-show");
        elementMagic.style.visibility = "hidden";
      }, 1000);
      elementEnemy.classList.add("vibrate");
      setTimeout(() => {
        elementEnemy.classList.remove("vibrate");
      }, 500);
    }
  }, 500);

  return true;
}

/**
 * Update attack slash image location above char when select
 */
export function updateAttackPosition(targetCharacter) {
  const elementAttack = document.querySelector("#attack");
  const elementCharacter = document.querySelector(
    "#" + targetCharacter.fileName
  );
  if (elementAttack && elementCharacter) {
    const targetLeft = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("left")
    );
    const targetRight = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("right")
    );
    const targetTop = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("top")
    );
    const targetBotom = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("bottom")
    );
    elementAttack.style.zIndex = 100;
    elementAttack.style.left = `${targetLeft}px`;
    elementAttack.style.top = `${targetTop}px`;
    elementAttack.style.right = `${targetRight}px`;
    elementAttack.style.bottom = `${targetBotom}px`;
    elementAttack.classList.add("collapse"); 
  }
}

/**
 * Hide and show attack animation (Animation)
 */
export function showAttack(selectedCharacter, targetCharacter) {
  const elementArrow = document.querySelector("#arrow");
  if (elementArrow){
  elementArrow.style.visibility = "hidden";
  const elementEnemy = document.querySelector(
    "#" + targetCharacter.fileName
  );
  updateAttackPosition(targetCharacter);
  if (moveCharacterToTarget(selectedCharacter, targetCharacter)) {
    setTimeout(() => {
      const elementAttack = document.querySelector("#attack");
      if (elementAttack) {
        elementEnemy.classList.add("vibrate");
        setTimeout(() => {
          elementEnemy.classList.remove("vibrate");
        }, 500);
        elementAttack.style.visibility = "visible";
        elementAttack.classList.add("animate-show");
        setTimeout(() => {
          elementAttack.classList.remove("animate-show");
          elementAttack.style.visibility = "hidden";
        }, 1000);
      }
    }, 500);

    setTimeout(() => {

    }, 1000);
  }
  }
  return true;
}

/**
 * Move character to position under attack (Animation)
 * */
export function moveCharacterToTarget(selectedCharacter, targetCharacter) {
  const elementCharacter = document.querySelector(
    "#" + selectedCharacter.fileName
  );
  const elementEnemy = document.querySelector(
    "#" + targetCharacter.fileName
  );

  var targetLeft = parseFloat(
    window.getComputedStyle(elementEnemy).getPropertyValue("left")
  );
  const targetTop = parseFloat(
    window.getComputedStyle(elementEnemy).getPropertyValue("top")
  );
  const originalLeft = parseFloat(
    window.getComputedStyle(elementCharacter).getPropertyValue("left")
  );
  const originalTop = parseFloat(
    window.getComputedStyle(elementCharacter).getPropertyValue("top")
  );

  const direction = originalLeft < targetLeft ? "right" : "left";  
  if (direction == "left") {
    targetLeft += 100;
  }

  if (direction == "right") {
    targetLeft -= 100;
  }

  elementCharacter.style.transition = "left 1s linear, top 1s linear";
  elementCharacter.style.left = `${targetLeft}px`;
  elementCharacter.style.top = `${targetTop}px`;

  setTimeout(() => {
    setTimeout(() => {
      elementCharacter.style.transition = "left 1s linear, top 1s linear";
      elementCharacter.style.left = `${originalLeft}px`;
      elementCharacter.style.top = `${originalTop}px`;
    }, 1000);
  }, 1000); 

  return true;
}

/**
 * Hide and show summon animation (Animation)
 */
export function showSummon(selectedCharacter) {
  updateSummonBubblesPosition(selectedCharacter);
  updateRingMagicPosition(selectedCharacter);
  showAndHideSummonBubbles();
  showAndHideRingMagic();
  hideCharsForSummon();
  animateSummon();
  showHiddenCharsAfterSummon();
  return true;
}

/**
 * Hide characters during summon animation
 */
export function hideCharsForSummon() {
  const characterIds = ["top-hero", "middle-hero", "bottom-hero", "arrow"];

  characterIds.forEach((characterId) => {
    const element = document.querySelector(`#${characterId}`);
    if (element) {
      let opacity = 1;
      const intervalId = setInterval(() => {
        opacity -= 0.1;
        element.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(intervalId);
          element.style.display = "none";
          setTimeout(() => {
            element.style.display = "block";
            let opacity = 0;
            const intervalId2 = setInterval(() => {
              opacity += 0.1;
              element.style.opacity = opacity;
              if (opacity >= 1) {
                clearInterval(intervalId2);
              }
            }, 80);
          }, 8000);
        }
      }, 80);
    } else {
      console.error("Elemento no encontrado:", characterId);
    }
  });
}

/**
 * Show characters during summon animation
 */
export function showHiddenCharsAfterSummon() {
  const elementIds = ["top-hero", "middle-hero", "bottom-hero", "arrow"];

  elementIds.forEach((elementId) => {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
      let opacity = 0;
      const intervalId = setInterval(() => {
        opacity += 0.1;
        element.style.opacity = opacity;
        if (opacity >= 1) {
          clearInterval(intervalId);
        }
      }, 80);
    } else {
      console.error("Elemento no encontrado:", elementId);
    }
  });
}

/**
 * Animation summon
 * **/
export function animateSummon() {
  const elementSummon = document.querySelector("#summon");
  const elementExplosion = document.querySelector(".explosion");

  if (elementSummon) {
    let opacity = 0;
    let posX = -100; 
    let posY = -100;
    const animationInterval = setInterval(() => {
      opacity += 0.05; 
      posX += 1; 
      posY += 1; 
      elementSummon.style.opacity = opacity;
      elementSummon.style.transform = `translate(${posX}px, ${posY}px)`;
      if (posX >= 0 && posY >= 0) {
        clearInterval(animationInterval); 
        setTimeout(() => {
          let opacity = 1;
          let posX = 0;
          let posY = 0;
          const animationInterval = setInterval(() => {
            opacity -= 0.01;
            posX -= 1;
            posY -= 1;
            elementSummon.style.opacity = opacity;
            elementSummon.style.transform = `translate(${posX}px, ${posY}px)`;
            if (opacity <= 0) {
              clearInterval(animationInterval);
            }
          }, 10);
        }, 2000);
      }
    }, 10);
  } else {
    console.error("Elemento no encontrado: summon");
  }

  setTimeout(() => {
    if (elementExplosion) {
      elementExplosion.style.visibility = "visible";
      elementExplosion.classList.add("animate-show");
      setTimeout(() => {
        elementExplosion.classList.remove("animate-show");
        setTimeout(() => {
          elementExplosion.style.visibility = "hidden";
        }, 1000); 
      }, 1000);
    }
  }, 3000);
}

/**
 * Update last Damage location above char when attack
 */
export function updateLastDamagePosition(targetCharacter) {
  const elementDamage = document.querySelector("#damage");
  const elementCharacter = document.querySelector(
    "#" + targetCharacter.fileName
  );

  if (elementDamage && elementCharacter) {
    const targetLeft = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("left")
    );
    const targetTop = parseFloat(
      window.getComputedStyle(elementCharacter).getPropertyValue("top")
    );
    elementDamage.style.top = `${targetTop}px`;
    elementDamage.style.left = `${targetLeft}px`;
    elementDamage.style.zIndex = 9999999;
  }
}

/**
 * Left battle animation
 */
export function applyFlipToLeft() {
  const element1 = document.querySelector("#top-hero");
  const element2 = document.querySelector("#middle-hero");
  const element3 = document.querySelector("#bottom-hero");
  const elementsToFlip = [
    element1,
    element2,
    element3
  ];
  elementsToFlip.forEach(element => {
    if (element) {
      element.classList.add('flip-left');
    }
  });
}

/**
 * Calculate image
 */
export function getImageUrl(fileName, extension="") {
  if (extension){
  return `/ff7vue/images/${fileName}.${extension}`;
  }else{
    return `/ff7vue/images/${fileName}`;
  }
}

/**
 * Get random back image battle
 * @returns 
 */
export function getRandomBackgroundImage() {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const randomNumber = getRandomInt(1, 3);
  return getImageUrl(`back_${randomNumber}`, "jpg");
}

/**
 * Update style targets menu
 * @param {*} sourceMenu 
 * @returns 
 */
export function calculateStyleTargets(sourceMenu) {
  let left = 0;
  let bottom = 0;
  let width = 210;
  let height = 160;
  let zIndex = 99999;
  let opacity = 1;

  if (sourceMenu == "menuBasic") {
    left = 320;
    bottom = 0;
  }

  if (sourceMenu == "menuMagic") {
    left += 500;
    bottom = 0;
  }

  return {
    position: "absolute",
    border: "4px solid #fff",
    background: "linear-gradient(to bottom, #070B43, #0A4AA9)",
    color: "#FFFFFF",
    padding: "0px",
    margin: "0px",
    borderRadius: "10px",
    fontFamily: "cpm",
    fontSize: "24px",
    left: `${left}px`,
    bottom: `${bottom}px`,
    width: `${width}px`,
    height: `${height}px`,
    zIndex: zIndex,
    opacity: opacity,
  };
}

/**
 * Update style magics menu
 * @returns 
 */
export function calculateStyleMagics() {
  const left = 320;
  const bottom = 0;
  const width = 210;
  const height = 160;
  const zIndex = 10000;
  const opacity = 1;

  return {
    position: "absolute",
    border: "4px solid #fff",
    background: "linear-gradient(to bottom, #070B43, #0A4AA9)",
    color: "#FFFFFF",
    padding: "0px",
    margin: "0px",
    borderRadius: "10px",
    fontFamily: "cpm",
    fontSize: "24px",
    left: `${left}px`,
    bottom: `${bottom}px`,
    width: `${width}px`,
    height: `${height}px`,
    zIndex: zIndex,
    opacity: opacity,
  };
}
