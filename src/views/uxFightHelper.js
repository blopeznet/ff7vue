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
      elementArrow.style.visibility = "visible"; // Agregar una clase para mostrar el anillo mágico
    }
  }
}

/**
 * Update magic ring location above char when select
 */
export function updateRingMagicPosition(selectedCharacter) {
  const elementRing = document.querySelector("#hero-magic");
  const elementCharacter = document.querySelector(
    "#" + selectedCharacter.value.fileName
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

    elementRing.classList.add("visible"); // Agregar una clase para mostrar el anillo mágico
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
    "#" + selectedCharacter.value.fileName
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

    elementY.classList.add("visible"); // Agregar una clase para mostrar el anillo mágico
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
    // Hacer visible el elemento antes de la animación
    elementY.style.visibility = "visible";
    elementR.style.visibility = "visible";
    elementG.style.visibility = "visible";

    // Agregar clase para animar la visibilidad del elemento
    elementY.classList.add("animate-show");
    elementR.classList.add("animate-show");
    elementG.classList.add("animate-show");

    setTimeout(() => {
      elementY.classList.remove("animate-show");
      elementR.classList.remove("animate-show");
      elementG.classList.remove("animate-show");

      // Después de la animación, ocultar el elemento nuevamente
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
    // Hacer visible el elemento antes de la animación
    elementMagic.style.visibility = "visible";

    // Agregar clase para animar la visibilidad del elemento
    elementMagic.classList.add("animate-show");
    setTimeout(() => {
      elementMagic.classList.remove("animate-show");

      // Después de la animación, ocultar el elemento nuevamente
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
      getImageUrl(selectedMagic.value.fileName, "gif") + "?t=" + timestamp;
  }      
  hideArrow();
  updateRingMagicPosition(selectedCharacter);
  showAndHideRingMagic();
  // Esperar 500 milisegundos antes de mostrar y animar la imagen
  setTimeout(() => {
    const name = "#enemy-magic-receive";
    const elementMagic = document.querySelector(name);
    const elementEnemy = document.querySelector(
      "#" + targetCharacter.value.fileName
    );
    // Obtener las coordenadas del elemento de destino
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
      // Hacer visible el elemento antes de la animación
      elementMagic.style.visibility = "visible";
      elementMagic.style.left = `${targetLeft}px`;
      elementMagic.style.top = `${targetTop}px`;
      elementMagic.style.right = `${targetRight}px`;
      elementMagic.style.bottom = `${targetBottom}px`;
      // Agregar clase para animar la visibilidad del elemento
      elementMagic.classList.add("animate-show");
      setTimeout(() => {
        elementMagic.classList.remove("animate-show");

        // Después de la animación, ocultar el elemento nuevamente
        elementMagic.style.visibility = "hidden";
      }, 1000);
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
    "#" + targetCharacter.value.fileName
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
    elementAttack.classList.add("collapse"); // Agregar una clase para mostrar el anillo mágico
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
    "#" + targetCharacter.value.fileName
  );

  // Actualizar la posición de la flecha y mover el personaje al objetivo
  updateAttackPosition(targetCharacter);
  if (moveCharacterToTarget(selectedCharacter, targetCharacter)) {
    // Esperar un breve momento antes de mostrar el ataque
    setTimeout(() => {
      const elementAttack = document.querySelector("#attack");
      if (elementAttack) {
        // Aplicar la clase de vibración al enemigo
        elementEnemy.classList.add("vibrate");
        // Quitar la clase de vibración después de 0.5 segundos
        setTimeout(() => {
          elementEnemy.classList.remove("vibrate");
        }, 500);

        // Mostrar el ataque
        elementAttack.style.visibility = "visible";
        // Agregar clase para animar la visibilidad del elemento
        elementAttack.classList.add("animate-show");
        setTimeout(() => {
          elementAttack.classList.remove("animate-show");
          // Después de la animación, ocultar el elemento nuevamente
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
/**
 * Move character to position under attack (Animation)
 * */
/**
 * Move character to position under attack (Animation)
 * */
export function moveCharacterToTarget(selectedCharacter, targetCharacter) {
  const elementCharacter = document.querySelector(
    "#" + selectedCharacter.value.fileName
  );
  const elementEnemy = document.querySelector(
    "#" + targetCharacter.value.fileName
  );

  // Obtener las coordenadas del elemento de destino y origen
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

  // Determinar la dirección del movimiento (izquierda o derecha)
  const direction = originalLeft < targetLeft ? "right" : "left";
  var distance = Math.abs(originalLeft - targetLeft);


  if (direction == "left") {
    targetLeft += 100;
  }

  if (direction == "right") {
    targetLeft -= 100;
  }
  // Establecer las coordenadas del elemento de origen a las del elemento de destino
  elementCharacter.style.transition = "left 1s linear, top 1s linear";
  elementCharacter.style.left = `${targetLeft}px`;
  elementCharacter.style.top = `${targetTop}px`;

  // Después de que el personaje llegue al objetivo
  setTimeout(() => {
    // Esperar un segundo antes de regresar a su posición original
    setTimeout(() => {
      elementCharacter.style.transition = "left 1s linear, top 1s linear";
      elementCharacter.style.left = `${originalLeft}px`;
      elementCharacter.style.top = `${originalTop}px`;
    }, 1000);
  }, 1000); // Esperar un segundo antes de comenzar a retroceder

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
      // Ocultar el elemento gradualmente cambiando la opacidad
      let opacity = 1;
      const intervalId = setInterval(() => {
        opacity -= 0.1; // Disminuir la opacidad en cada intervalo
        element.style.opacity = opacity;
        if (opacity <= 0) {
          // Cuando la opacidad llega a cero, detener el temporizador y mostrar el elemento
          clearInterval(intervalId);
          element.style.display = "none";
          setTimeout(() => {
            element.style.display = "block";
            // Mostrar el elemento gradualmente restaurando la opacidad
            let opacity = 0;
            const intervalId2 = setInterval(() => {
              opacity += 0.1; // Aumentar la opacidad en cada intervalo
              element.style.opacity = opacity;
              if (opacity >= 1) {
                // Cuando la opacidad vuelve a 1, detener el temporizador
                clearInterval(intervalId2);
              }
            }, 80); // Intervalo de 80 milisegundos para una transición suave
          }, 8000); // Mostrar el elemento oculto después de 8000 milisegundos
        }
      }, 80); // Intervalo de 80 milisegundos para una transición suave
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
      // Mostrar el elemento gradualmente cambiando la opacidad
      let opacity = 0;
      const intervalId = setInterval(() => {
        opacity += 0.1; // Aumentar la opacidad en cada intervalo
        element.style.opacity = opacity;
        if (opacity >= 1) {
          // Cuando la opacidad llega a 1, detener el temporizador
          clearInterval(intervalId);
        }
      }, 80); // Intervalo de 80 milisegundos para una transición suave
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
    let posX = -100; // Posición inicial en X
    let posY = -100; // Posición inicial en Y

    // Función para animar el elemento
    const animationInterval = setInterval(() => {
      opacity += 0.01; // Aumentar la opacidad gradualmente
      posX += 1; // Mover gradualmente hacia la derecha
      posY += 1; // Mover gradualmente hacia abajo

      elementSummon.style.opacity = opacity;
      elementSummon.style.transform = `translate(${posX}px, ${posY}px)`;

      // Cuando llegue al centro de la pantalla
      if (posX >= 0 && posY >= 0) {
        clearInterval(animationInterval); // Detener la animación

        // Después de un tiempo, volver a la esquina y hacer que desaparezca
        setTimeout(() => {
          let opacity = 1;
          let posX = 0; // Posición inicial en X
          let posY = 0; // Posición inicial en Y

          const animationInterval = setInterval(() => {
            opacity -= 0.01; // Disminuir la opacidad gradualmente
            posX -= 1; // Mover gradualmente hacia la izquierda
            posY -= 1; // Mover gradualmente hacia arriba

            elementSummon.style.opacity = opacity;
            elementSummon.style.transform = `translate(${posX}px, ${posY}px)`;

            // Cuando vuelva a la esquina y la opacidad sea 0
            if (opacity <= 0) {
              clearInterval(animationInterval); // Detener la animación
            }
          }, 10); // Intervalo de animación (10ms)
        }, 2000); // Tiempo antes de iniciar la segunda animación (2000ms)
      }
    }, 10); // Intervalo de animación (10ms)
  } else {
    console.error("Elemento no encontrado: summon");
  }

  // Después de 3 segundos, mostrar la explosión
  setTimeout(() => {
    if (elementExplosion) {
      // Hacer visible el elemento explosión antes de la animación
      elementExplosion.style.visibility = "visible";

      // Agregar clase para animar la visibilidad del elemento explosión
      elementExplosion.classList.add("animate-show");

      // Después de 1 segundo, quitar la clase de animación de la explosión
      setTimeout(() => {
        elementExplosion.classList.remove("animate-show");

        // Después de la animación, ocultar la explosión
        setTimeout(() => {
          elementExplosion.style.visibility = "hidden";
        }, 1000); // Espera 1 segundo para ocultar la explosión
      }, 1000); // Espera 1 segundo para quitar la clase de animación de la explosión
    }
  }, 3000); // Espera 3 segundos para mostrar la explosión
}

/**
 * Update last Damage location above char when attack
 */
export function updateLastDamagePosition(targetCharacter) {
  const elementDamage = document.querySelector("#damage");
  const elementCharacter = document.querySelector(
    "#" + targetCharacter.value.fileName
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
export function getImageUrl(fileName, extension) {
  return `/ff7vue/images/${fileName}.${extension}`;
}

// Exportar el método randomBackgroundImage
export function getRandomBackgroundImage() {
  // Función para generar un número aleatorio entre min (incluido) y max (excluido)
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Generar un número aleatorio entre 1 y 2 (excluyendo 2)
  const randomNumber = getRandomInt(1, 3);

  // Generar la URL de la imagen de fondo utilizando el número aleatorio
  return getImageUrl(`back_${randomNumber}`, "jpg");
}

// Método para actualizar los estilos
export function calculateStyleTargets(sourceMenu) {
  let left = 0;
  let bottom = 0;
  let width = 210;
  let height = 160;
  let zIndex = 99999;
  let opacity = 1;

  if (sourceMenu == "menuBasic") {
    left = 290;
    bottom = 0;
  }

  if (sourceMenu == "menuMagic") {
    left += 470;
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

// Método para actualizar los estilos
export function calculateStyleMagics() {
  const left = 290;
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
