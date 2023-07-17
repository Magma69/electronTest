window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['Version']) {
      replaceText(`${dependency}-version`, '0.0.0 (BETA)')
    }
  })