export const handleTheme = () => {
  const toggleButton = document.querySelector(".toggle-theme__button");
  const buttonImg = document.querySelector(".toggle-theme__button > img");
  const root = document.querySelector("html");

  const themePreference = localStorage.getItem("TODOLIST@THEME");

  if (themePreference === "light") {
    toggleButton.title = "Change to dark theme";
    buttonImg.src = "../assets/icons/moon.svg";
    root.setAttribute("data-theme", "light");
  } else {
    toggleButton.title = "Change to light theme";
    buttonImg.src = "../assets/icons/sun.svg";
    root.setAttribute("data-theme", "dark");
  }

  toggleButton.addEventListener("click", () => {
    if (root.getAttribute("data-theme") === "dark") {
      localStorage.setItem("TODOLIST@THEME", "light");

      toggleButton.title = "Change to dark theme";
      buttonImg.src = "../assets/icons/moon.svg";
      root.setAttribute("data-theme", "light");
    } else {
      localStorage.setItem("TODOLIST@THEME", "dark");

      toggleButton.title = "Change to light theme";
      buttonImg.src = "../assets/icons/sun.svg";
      root.setAttribute("data-theme", "dark");
    }
  });
};
