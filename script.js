"use strict";

/* =========================================
   CLASH-LAB
   JAVASCRIPT CENTRAL
========================================= */


/* =========================================
   CONFIGURACIÓN
========================================= */

const THEME_STORAGE_KEY =
    "clashlab-theme";

const COURSE_PROGRESS_KEY =
    "clashlab-html-progress";


/* =========================================
   ELEMENTOS GENERALES
========================================= */

const html =
    document.documentElement;

const body =
    document.body;

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mainNav =
    document.getElementById(
        "mainNav"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

const themeButton =
    document.getElementById(
        "themeButton"
    );

const themeIcon =
    document.getElementById(
        "themeIcon"
    );


/* =========================================
   STORAGE
========================================= */

function getStorageValue(
    key
) {

    try {

        return localStorage.getItem(
            key
        );

    } catch (error) {

        return null;

    }

}


function setStorageValue(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            value
        );

    } catch (error) {

        /*
         * La página continúa funcionando
         * aunque localStorage no esté disponible.
         */

    }

}


/* =========================================
   TEMA
========================================= */

function getPreferredTheme() {

    const storedTheme =
        getStorageValue(
            THEME_STORAGE_KEY
        );


    if (
        storedTheme === "dark"
        ||
        storedTheme === "light"
    ) {

        return storedTheme;

    }


    if (
        window.matchMedia
        &&
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches
    ) {

        return "light";

    }


    return "dark";

}


function updateThemeUI(
    theme
) {

    const isLight =
        theme === "light";


    html.setAttribute(
        "data-theme",
        theme
    );


    if (themeIcon) {

        themeIcon.textContent =
            isLight
                ? "🌙"
                : "☀️";

    }


    if (themeButton) {

        themeButton.setAttribute(
            "aria-label",
            isLight
                ? "Cambiar a tema oscuro"
                : "Cambiar a tema claro"
        );


        themeButton.setAttribute(
            "title",
            isLight
                ? "Cambiar a tema oscuro"
                : "Cambiar a tema claro"
        );

    }


    const themeMeta =
        document.querySelector(
            'meta[name="theme-color"]'
        );


    if (themeMeta) {

        themeMeta.setAttribute(
            "content",
            isLight
                ? "#f5f7fb"
                : "#080c18"
        );

    }

}


function toggleTheme() {

    const currentTheme =
        html.getAttribute(
            "data-theme"
        ) || "dark";


    const nextTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    updateThemeUI(
        nextTheme
    );


    setStorageValue(
        THEME_STORAGE_KEY,
        nextTheme
    );

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}


updateThemeUI(
    getPreferredTheme()
);


/* =========================================
   MENÚ MÓVIL
========================================= */

function closeMobileMenu() {

    if (!mainNav) {

        return;

    }


    mainNav.classList.remove(
        "is-open"
    );


    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.setAttribute(
            "aria-label",
            "Abrir menú"
        );

    }

}


function toggleMobileMenu() {

    if (!mainNav) {

        return;

    }


    const isOpen =
        mainNav.classList.toggle(
            "is-open"
        );


    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Cerrar menú"
                : "Abrir menú"
        );

    }

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    }
);


document.addEventListener(
    "click",
    (event) => {

        if (
            !mainNav
            ||
            !menuButton
        ) {

            return;

        }


        const clickedInsideNavigation =
            mainNav.contains(
                event.target
            );


        const clickedMenuButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickedInsideNavigation
            &&
            !clickedMenuButton
        ) {

            closeMobileMenu();

        }

    }
);


window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================
   MODO EXPLORADOR DE HOME
========================================= */

const explorerActivate =
    document.getElementById(
        "explorerActivate"
    );

const explorerToast =
    document.getElementById(
        "explorerToast"
    );

const elementInfo =
    document.getElementById(
        "elementInfo"
    );

const elementInfoIcon =
    document.getElementById(
        "elementInfoIcon"
    );

const elementInfoTitle =
    document.getElementById(
        "elementInfoTitle"
    );

const elementInfoDescription =
    document.getElementById(
        "elementInfoDescription"
    );

const elementInfoHtml =
    document.getElementById(
        "elementInfoHtml"
    );

const elementInfoCss =
    document.getElementById(
        "elementInfoCss"
    );

const elementInfoJs =
    document.getElementById(
        "elementInfoJs"
    );

const explorerElements =
    document.querySelectorAll(
        "[data-explorer]"
    );


const explorerData = {

    header: {

        icon: "🧭",

        title: "Header",

        description:
            "Es la parte superior de una página y normalmente contiene identidad y navegación.",

        html:
            "<header>...</header>",

        css:
            "CSS controla tamaño, posición, fondo y espaciado.",

        javascript:
            "JavaScript puede controlar menús y navegación móvil."

    },


    logo: {

        icon: "⚡",

        title: "Logo",

        description:
            "Representa visualmente la identidad del proyecto.",

        html:
            "<a> o <img>",

        css:
            "CSS controla tamaño, tipografía, color y posición.",

        javascript:
            "Puede utilizarse para navegar hacia el inicio."

    },


    nav: {

        icon: "🧭",

        title: "Navegación",

        description:
            "Agrupa los enlaces que permiten desplazarse por el sitio.",

        html:
            "<nav>...</nav>",

        css:
            "CSS organiza enlaces y espacios.",

        javascript:
            "JavaScript puede controlar la versión móvil."

    },


    label: {

        icon: "🏷️",

        title: "Etiqueta destacada",

        description:
            "Pequeño texto que aporta contexto a una sección.",

        html:
            "<p>...</p>",

        css:
            "CSS controla tamaño, color y espaciado.",

        javascript:
            "JavaScript puede actualizar su contenido."

    },


    heading: {

        icon: "📝",

        title: "Título",

        description:
            "Los encabezados organizan y jerarquizan el contenido.",

        html:
            "<h1>, <h2>, <h3>...",

        css:
            "CSS controla tamaño, peso y espaciado.",

        javascript:
            "JavaScript puede cambiar el contenido."

    },


    button: {

        icon: "🔘",

        title: "Botón",

        description:
            "Permite que el usuario ejecute una acción.",

        html:
            "<button>...</button>",

        css:
            "CSS controla colores, bordes y estados visuales.",

        javascript:
            "JavaScript puede reaccionar a eventos como click."

    },


    card: {

        icon: "🃏",

        title: "Tarjeta",

        description:
            "Agrupa información relacionada dentro de una unidad visual.",

        html:
            "<article>...</article>",

        css:
            "CSS define fondo, bordes, sombras y espacio.",

        javascript:
            "JavaScript puede agregar interacción."

    },


    code: {

        icon: "💻",

        title: "Código",

        description:
            "Representa código utilizado para construir o enseñar una página.",

        html:
            "<code>...</code> o <pre>...</pre>",

        css:
            "CSS define la presentación visual del código.",

        javascript:
            "JavaScript puede copiar o modificar código."

    },


    browser: {

        icon: "🌐",

        title: "Navegador de demostración",

        description:
            "Representación visual de una página web.",

        html:
            "Una combinación de elementos HTML.",

        css:
            "CSS organiza su apariencia.",

        javascript:
            "JavaScript puede convertirla en una experiencia interactiva."

    },


    footer: {

        icon: "🦶",

        title: "Footer",

        description:
            "Es la parte final de una página web.",

        html:
            "<footer>...</footer>",

        css:
            "CSS organiza columnas, enlaces y espaciado.",

        javascript:
            "Puede actualizar información dinámicamente."

    }

};


let explorerActive =
    false;


function showDefaultExplorerInfo() {

    if (!elementInfoTitle) {

        return;

    }


    if (elementInfoIcon) {

        elementInfoIcon.textContent =
            explorerActive
                ? "🔎"
                : "💡";

    }


    elementInfoTitle.textContent =
        explorerActive
            ? "Explorador activo"
            : "Explorador listo";


    if (elementInfoDescription) {

        elementInfoDescription.textContent =
            explorerActive
                ? "Seleccioná un elemento resaltado para descubrir cómo está construido."
                : "Activá el explorador y seleccioná un elemento.";

    }


    if (elementInfoHtml) {

        elementInfoHtml.textContent =
            "—";

    }


    if (elementInfoCss) {

        elementInfoCss.textContent =
            "—";

    }


    if (elementInfoJs) {

        elementInfoJs.textContent =
            "—";

    }

}


function toggleExplorer() {

    explorerActive =
        !explorerActive;


    body.classList.toggle(
        "explorer-mode",
        explorerActive
    );


    if (explorerActivate) {

        explorerActivate.textContent =
            explorerActive
                ? "❌ Desactivar Modo Explorador"
                : "🔎 Activar Modo Explorador";

    }


    if (explorerToast) {

        explorerToast.classList.toggle(
            "active",
            explorerActive
        );

    }


    showDefaultExplorerInfo();

}


if (explorerActivate) {

    explorerActivate.addEventListener(
        "click",
        toggleExplorer
    );

}


function showElementInfo(
    type
) {

    const data =
        explorerData[type];


    if (!data) {

        return;

    }


    if (elementInfoIcon) {

        elementInfoIcon.textContent =
            data.icon;

    }


    if (elementInfoTitle) {

        elementInfoTitle.textContent =
            data.title;

    }


    if (elementInfoDescription) {

        elementInfoDescription.textContent =
            data.description;

    }


    if (elementInfoHtml) {

        elementInfoHtml.textContent =
            data.html;

    }


    if (elementInfoCss) {

        elementInfoCss.textContent =
            data.css;

    }


    if (elementInfoJs) {

        elementInfoJs.textContent =
            data.javascript;

    }

}


explorerElements.forEach(
    (element) => {

        element.addEventListener(
            "click",
            (event) => {

                if (!explorerActive) {

                    return;

                }


                event.preventDefault();

                event.stopPropagation();


                const type =
                    element.dataset.explorer;


                if (type) {

                    showElementInfo(
                        type
                    );

                }

            }
        );

    }
);


/* =========================================
   BOTÓN IR AL EXPLORADOR
========================================= */

const exploreButton =
    document.getElementById(
        "exploreButton"
    );


if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        () => {

            const explorerSection =
                document.getElementById(
                    "explorador"
                );


            if (!explorerSection) {

                return;

            }


            explorerSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* =========================================
   PROGRESO DEL CURSO
========================================= */

function getCourseProgress() {

    const stored =
        Number(
            getStorageValue(
                COURSE_PROGRESS_KEY
            )
        );


    if (
        Number.isInteger(stored)
        &&
        stored >= 0
        &&
        stored <= 10
    ) {

        return stored;

    }


    return 0;

}


function saveCourseProgress(
    progress
) {

    const safeProgress =
        Math.min(
            10,
            Math.max(
                0,
                Math.floor(progress)
            )
        );


    setStorageValue(
        COURSE_PROGRESS_KEY,
        String(safeProgress)
    );


    return safeProgress;

}


function updateCourseProgress() {

    const progress =
        getCourseProgress();


    const progressPercentage =
        document.getElementById(
            "courseProgressPercentage"
        );


    const progressText =
        document.getElementById(
            "courseProgressText"
        );


    const progressFill =
        document.getElementById(
            "courseProgressFill"
        );


    if (progressText) {

        progressText.textContent =
            `${progress} / 10 lecciones`;

    }


    if (progressPercentage) {

        progressPercentage.textContent =
            `${progress * 10}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${progress * 10}%`;

    }

}


/* =========================================
   COPIAR CÓDIGO
========================================= */

const copyButtons =
    document.querySelectorAll(
        "[data-copy-target]"
    );


copyButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            async () => {

                const targetId =
                    button.dataset.copyTarget;


                const target =
                    document.getElementById(
                        targetId
                    );


                if (!target) {

                    return;

                }


                const text =
                    target.textContent;


                if (
                    !navigator.clipboard
                    ||
                    !window.isSecureContext
                ) {

                    button.textContent =
                        "No disponible";


                    window.setTimeout(
                        () => {

                            button.textContent =
                                "📋 Copiar";

                        },
                        1800
                    );


                    return;

                }


                try {

                    await navigator.clipboard.writeText(
                        text
                    );


                    button.textContent =
                        "✓ Copiado";


                    window.setTimeout(
                        () => {

                            button.textContent =
                                "📋 Copiar";

                        },
                        1800
                    );

                } catch (error) {

                    button.textContent =
                        "No disponible";


                    window.setTimeout(
                        () => {

                            button.textContent =
                                "📋 Copiar";

                        },
                        1800
                    );

                }

            }
        );

    }
);


/* =========================================
   LECCIÓN 2
   EXPLORADOR DE ESTRUCTURA
========================================= */

const structureLines =
    document.querySelectorAll(
        "[data-structure]"
    );

const structureInfoTitle =
    document.getElementById(
        "structureInfoTitle"
    );

const structureInfoDescription =
    document.getElementById(
        "structureInfoDescription"
    );

const structureInfoCode =
    document.getElementById(
        "structureInfoCode"
    );


const structureData = {

    doctype: {

        title:
            "DOCTYPE",

        description:
            "Es una declaración que indica al navegador que el documento utiliza el estándar moderno de HTML.",

        code:
            "<!DOCTYPE html>"

    },


    html: {

        title:
            "<html>",

        description:
            "Es el elemento raíz del documento. Todo el contenido HTML de la página se encuentra dentro de él.",

        code:
            "<html> ... </html>"

    },


    head: {

        title:
            "<head>",

        description:
            "Contiene información del documento y recursos que utiliza la página, como el título, metadatos y hojas de estilo.",

        code:
            "<head> ... </head>"

    },


    body: {

        title:
            "<body>",

        description:
            "Contiene el contenido principal que forma la interfaz de la página y que el usuario puede encontrar dentro del documento.",

        code:
            "<body> ... </body>"

    }

};


function showStructureInfo(
    type
) {

    const data =
        structureData[type];


    if (!data) {

        return;

    }


    structureLines.forEach(
        (line) => {

            line.classList.toggle(
                "is-selected",
                line.dataset.structure === type
            );

        }
    );


    if (structureInfoTitle) {

        structureInfoTitle.textContent =
            data.title;

    }


    if (structureInfoDescription) {

        structureInfoDescription.textContent =
            data.description;

    }


    if (structureInfoCode) {

        structureInfoCode.textContent =
            data.code;

    }

}


structureLines.forEach(
    (line) => {

        line.addEventListener(
            "click",
            () => {

                const type =
                    line.dataset.structure;


                showStructureInfo(
                    type
                );

            }
        );

    }
);


/* =========================================
   QUIZ — LECCIÓN 2
========================================= */

const quizOptions =
    document.querySelectorAll(
        ".quiz-option"
    );

const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );

let quizAnswered =
    false;


quizOptions.forEach(
    (option) => {

        option.addEventListener(
            "click",
            () => {

                if (quizAnswered) {

                    return;

                }


                const answer =
                    option.dataset.answer;


                if (answer === "correct") {

                    option.classList.add(
                        "correct"
                    );


                    if (quizFeedback) {

                        quizFeedback.textContent =
                            "✅ Correcto. El <title> pertenece al <head> porque describe información del documento.";
                        
                        quizFeedback.style.color =
                            "var(--success)";

                    }


                    quizAnswered =
                        true;

                } else {

                    option.classList.add(
                        "wrong"
                    );


                    if (quizFeedback) {

                        quizFeedback.textContent =
                            "❌ Todavía no. Pensá qué parte contiene información sobre el documento.";
                        
                        quizFeedback.style.color =
                            "var(--danger)";

                    }

                }

            }
        );

    }
);


/* =========================================
   COMPLETAR LECCIÓN 2
========================================= */

const lessonTwoComplete =
    document.getElementById(
        "lessonTwoComplete"
    );

const practiceFeedback =
    document.getElementById(
        "practiceFeedback"
    );


function completeLessonTwo() {

    const currentProgress =
        getCourseProgress();


    /*
     * La Lección 2 completa la segunda
     * posición del recorrido.
     */

    if (
        currentProgress < 2
    ) {

        saveCourseProgress(
            2
        );

    }


    updateCourseProgress();


    if (lessonTwoComplete) {

        lessonTwoComplete.disabled =
            true;

        lessonTwoComplete.textContent =
            "✅ Lección 2 completada";

    }


    if (practiceFeedback) {

        practiceFeedback.textContent =
            "¡Excelente! Ya entendés la estructura básica de un documento HTML. 🧱🚀";

    }

}


function restoreLessonTwoState() {

    const progress =
        getCourseProgress();


    /*
     * Si el usuario ya había completado
     * esta lección, conservamos su estado.
     */

    if (
        progress >= 2
        &&
        lessonTwoComplete
    ) {

        lessonTwoComplete.disabled =
            true;

        lessonTwoComplete.textContent =
            "✅ Lección 2 completada";


        if (practiceFeedback) {

            practiceFeedback.textContent =
                "Esta lección ya está marcada como completada. ¡Seguimos avanzando! 🚀";

        }

    }

}


if (lessonTwoComplete) {

    lessonTwoComplete.addEventListener(
        "click",
        completeLessonTwo
    );

}


updateCourseProgress();

restoreLessonTwoState();


/* =========================================
   INICIALIZACIÓN
========================================= */

function initializeClashLab() {

    updateThemeUI(
        getPreferredTheme()
    );


    updateCourseProgress();

}


initializeClashLab();