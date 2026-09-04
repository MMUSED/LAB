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

function getStorageValue(key) {

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
         * El sitio continúa funcionando
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


function updateThemeUI(theme) {

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
        )
        ||
        "dark";


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


        if (
            !mainNav.contains(
                event.target
            )
            &&
            !menuButton.contains(
                event.target
            )
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
   PROGRESO DEL CURSO
========================================= */

function getCourseProgress() {

    const storedValue =
        Number(
            getStorageValue(
                COURSE_PROGRESS_KEY
            )
        );


    if (
        Number.isInteger(storedValue)
        &&
        storedValue >= 0
        &&
        storedValue <= 10
    ) {

        return storedValue;

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


    const percentage =
        progress * 10;


    const progressText =
        document.getElementById(
            "courseProgressText"
        );

    const progressPercentage =
        document.getElementById(
            "courseProgressPercentage"
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
            `${percentage}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

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
   EXPLORADOR GENERAL
========================================= */

const explorerActivate =
    document.getElementById(
        "explorerActivate"
    );

const explorerToast =
    document.getElementById(
        "explorerToast"
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
            "JavaScript puede controlar menús y navegación."

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
            "Puede utilizarse para navegar al inicio."

    },


    nav: {

        icon: "🧭",

        title: "Navegación",

        description:
            "Agrupa enlaces que permiten desplazarse por el sitio.",

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
            "Texto pequeño utilizado para aportar contexto.",

        html:
            "<p>...</p>",

        css:
            "CSS define color, tamaño y espaciado.",

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
            "JavaScript puede modificar el texto."

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
            "JavaScript puede reaccionar a eventos."

    },


    card: {

        icon: "🃏",

        title: "Tarjeta",

        description:
            "Agrupa información relacionada dentro de una unidad visual.",

        html:
            "<article>...</article>",

        css:
            "CSS define fondo, bordes y espacio.",

        javascript:
            "JavaScript puede agregar interacción."

    },


    code: {

        icon: "💻",

        title: "Código",

        description:
            "Representa código utilizado para construir o enseñar.",

        html:
            "<code>...</code> o <pre>...</pre>",

        css:
            "CSS define la presentación del código.",

        javascript:
            "JavaScript puede copiar o modificar ejemplos."

    },


    browser: {

        icon: "🌐",

        title: "Navegador",

        description:
            "Representación visual de una página web.",

        html:
            "Combinación de elementos HTML.",

        css:
            "CSS organiza su apariencia.",

        javascript:
            "JavaScript agrega comportamiento."

    },


    footer: {

        icon: "🦶",

        title: "Footer",

        description:
            "Es la parte final de una página.",

        html:
            "<footer>...</footer>",

        css:
            "CSS organiza columnas, enlaces y espacios.",

        javascript:
            "Puede actualizar información dinámica."

    }

};


let explorerActive =
    false;


function updateExplorerInfoDefault() {

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


    updateExplorerInfoDefault();

}


if (explorerActivate) {

    explorerActivate.addEventListener(
        "click",
        toggleExplorer
    );

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
   LECCIÓN 4
   NIVELES DE ENCABEZADOS
========================================= */

const headingLevelButtons =
    document.querySelectorAll(
        "[data-heading-level]"
    );

const headingPreviewTitle =
    document.getElementById(
        "headingPreviewTitle"
    );

const headingPreviewDescription =
    document.getElementById(
        "headingPreviewDescription"
    );


const headingData = {

    1: {

        title:
            "H1 — Título principal",

        description:
            "Representa el encabezado principal del contenido de una página o sección principal."

    },


    2: {

        title:
            "H2 — Sección",

        description:
            "Se utiliza para introducir una sección importante dentro de la jerarquía."

    },


    3: {

        title:
            "H3 — Subsección",

        description:
            "Permite crear una división más específica dentro de una sección."

    },


    4: {

        title:
            "H4 — Subnivel",

        description:
            "Representa un nivel de contenido más específico que un H3."

    },


    5: {

        title:
            "H5 — Nivel inferior",

        description:
            "Se utiliza cuando la estructura necesita una subdivisión todavía más profunda."

    },


    6: {

        title:
            "H6 — Nivel inferior",

        description:
            "Es el nivel más profundo disponible entre los encabezados HTML."

    }

};


headingLevelButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const level =
                    button.dataset.headingLevel;


                const data =
                    headingData[level];


                if (!data) {

                    return;

                }


                headingLevelButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "is-selected"
                        );

                    }
                );


                button.classList.add(
                    "is-selected"
                );


                if (headingPreviewTitle) {

                    headingPreviewTitle.textContent =
                        data.title;

                }


                if (headingPreviewDescription) {

                    headingPreviewDescription.textContent =
                        data.description;

                }

            }
        );

    }
);


/* =========================================
   QUIZ — LECCIÓN 4
========================================= */

const lessonFourQuizOptions =
    document.querySelectorAll(
        ".quiz-option"
    );

const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );

let lessonFourQuizAnswered =
    false;


lessonFourQuizOptions.forEach(
    (option) => {

        option.addEventListener(
            "click",
            () => {

                if (
                    lessonFourQuizAnswered
                ) {

                    return;

                }


                const answer =
                    option.dataset.answer;


                if (
                    answer === "correct"
                ) {

                    option.classList.add(
                        "correct"
                    );


                    if (quizFeedback) {

                        quizFeedback.textContent =
                            "✅ Correcto. Si \"Mi Portfolio\" es el título principal, H1 es la opción adecuada.";

                        quizFeedback.style.color =
                            "var(--success)";

                    }


                    lessonFourQuizAnswered =
                        true;

                } else {

                    option.classList.add(
                        "wrong"
                    );


                    if (quizFeedback) {

                        quizFeedback.textContent =
                            "❌ Todavía no. Pensá cuál es el nivel principal de la jerarquía.";

                        quizFeedback.style.color =
                            "var(--danger)";

                    }

                }

            }
        );

    }
);


/* =========================================
   COMPLETAR LECCIÓN 4
========================================= */

const lessonFourComplete =
    document.getElementById(
        "lessonFourComplete"
    );

const practiceFeedback =
    document.getElementById(
        "practiceFeedback"
    );


function completeLessonFour() {

    const currentProgress =
        getCourseProgress();


    if (
        currentProgress < 4
    ) {

        saveCourseProgress(
            4
        );

    }


    updateCourseProgress();


    if (lessonFourComplete) {

        lessonFourComplete.disabled =
            true;

        lessonFourComplete.textContent =
            "✅ Lección 4 completada";

    }


    if (practiceFeedback) {

        practiceFeedback.textContent =
            "¡Excelente! Ya sabés organizar contenido con títulos y párrafos. 📝🚀";

    }

}


function restoreLessonFourState() {

    const progress =
        getCourseProgress();


    if (
        progress >= 4
        &&
        lessonFourComplete
    ) {

        lessonFourComplete.disabled =
            true;

        lessonFourComplete.textContent =
            "✅ Lección 4 completada";


        if (practiceFeedback) {

            practiceFeedback.textContent =
                "Esta lección ya está marcada como completada. ¡Seguimos! 🚀";

        }

    }

}


if (lessonFourComplete) {

    lessonFourComplete.addEventListener(
        "click",
        completeLessonFour
    );

}


updateCourseProgress();

restoreLessonFourState();


/* =========================================
   INICIALIZACIÓN
========================================= */

function initializeClashLab() {

    updateThemeUI(
        getPreferredTheme()
    );


    updateCourseProgress();


    restoreLessonFourState();

}


initializeClashLab();
