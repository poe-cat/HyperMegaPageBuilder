let layout = [];
let selectedIndex = null;

function addElement() {
  const type = document.getElementById('elementType').value;
  const section = document.getElementById('sectionSelect').value;

  const newElement = {
    type: type,
    content: type === 'img' ? 'URL' : 'Nowy ' + type,
    section: section,
    styles: {
      color: '#000000',
      backgroundColor: '#ffffff',
      fontSize: type === 'h1' ? '32px' : '16px',
      width: type === 'img' ? '150px' : '100%',
      textAlign: 'left',
      margin: '0px'
    }
  };

  layout.push(newElement);
  renderLayout();
}

function renderLayout() {
  const editor = document.getElementById('editor');
  editor.innerHTML = `
    <header id="editor-header" class="mb-4"></header>
    <main id="editor-main" class="mb-4"></main>
    <footer id="editor-footer" class="mb-4"></footer>
  `;

  layout.forEach((el, index) => {
    const container = document.createElement('div');
    container.classList.add('editable', `el-${index}`);

    const element = document.createElement(el.type);

    if (el.type === 'img') {
      element.src = el.content;
      element.style.maxWidth = '100%';
      element.style.height = 'auto';
      element.style.width = el.styles.width || '150px';
    } else {
      element.innerText = el.content;
    }

    // Style elementów
    for (let prop in el.styles) {
      if (el.styles[prop]) {
        element.style[prop] = el.styles[prop];
      }
    }

    container.dataset.index = index;
    container.addEventListener('click', (e) => {
      e.stopPropagation();
      selectElement(index);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'X';
    deleteBtn.onclick = function(e) {
      e.stopPropagation();
      layout.splice(index, 1);
      renderLayout();
    };

    container.appendChild(element);
    container.appendChild(deleteBtn);
    document.getElementById(`editor-${el.section}`).appendChild(container);
  });
}

function selectElement(index) {
  selectedIndex = index;
  const el = layout[index];

  document.getElementById('editPanel').style.display = 'block';
  document.getElementById('contentInput').value = el.content;
  document.getElementById('colorInput').value = el.styles.color || '#000000';
  document.getElementById('bgInput').value = el.styles.backgroundColor || '#ffffff';
  document.getElementById('fontSizeInput').value = parseInt(el.styles.fontSize) || 16;
  document.getElementById('textAlignInput').value = el.styles.textAlign || 'left';
  document.getElementById('centerElementCheckbox').checked = el.styles.marginLeft === 'auto';
  document.getElementById('marginInput').value = parseInt(el.styles.margin) || 0;
  document.getElementById('widthInput').value = parseInt(el.styles.width) || 100;

  document.getElementById('fileInputLabel').style.display = el.type === 'img' ? 'block' : 'none';
}

function applyChanges() {
  if (selectedIndex === null) return;

  const el = layout[selectedIndex];
  const newContent = document.getElementById('contentInput').value;
  const newColor = document.getElementById('colorInput').value;
  const newBg = document.getElementById('bgInput').value;
  const newFontSize = document.getElementById('fontSizeInput').value + 'px';
  const textAlign = document.getElementById('textAlignInput').value;
  const centerElement = document.getElementById('centerElementCheckbox').checked;
  const margin = document.getElementById('marginInput').value + 'px';
  const width = document.getElementById('widthInput').value + '%';

  const fileInput = document.getElementById('fileInput');
  if (el.type === 'img' && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      el.content = e.target.result;
      updateElementStyles(el, newColor, newBg, newFontSize, textAlign, centerElement, margin, width);
      renderLayout();
      selectElement(selectedIndex);
    };
    reader.readAsDataURL(file);
  } else {
    el.content = newContent;
    updateElementStyles(el, newColor, newBg, newFontSize, textAlign, centerElement, margin, width);
    renderLayout();
    selectElement(selectedIndex);
  }
}

function updateElementStyles(el, color, bg, fontSize, textAlign, centerElement, margin, width) {
  el.styles.color = color;
  el.styles.backgroundColor = bg;
  el.styles.fontSize = fontSize;
  el.styles.textAlign = textAlign;
  el.styles.width = width;
  el.styles.margin = margin;

  if (centerElement) {
    el.styles.display = 'block';
    el.styles.marginLeft = 'auto';
    el.styles.marginRight = 'auto';
    if (el.type === 'img') {
      el.styles.display = 'block';
    }
  } else {
    el.styles.display = undefined;
    el.styles.marginLeft = undefined;
    el.styles.marginRight = undefined;
  }
}

function saveLayout() {
  const preview = document.getElementById('previewContent');

  preview.innerHTML = document.getElementById('editor').innerHTML;

  document.getElementById('editor').style.display = 'none';
  document.getElementById('controls').style.display = 'none';

  document.getElementById('preview').style.display = 'block';
}



function generateCSS() {
  let css = '';

  layout.forEach((el, index) => {
    css += `.el-${index} {\n`;
    for (let prop in el.styles) {
      if (el.styles[prop]) {
        const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
        css += `  ${cssProp}: ${el.styles[prop]};\n`;
      }
    }
    css += `}\n`;
  });

  return css;
}

function generateFullHTML() {
  let html = `<header>\n`;
  layout.filter(el => el.section === 'header').forEach((el, index) => {
    html += createElementHtml(el, index);
  });
  html += `</header>\n<main>\n`;
  layout.filter(el => el.section === 'main').forEach((el, index) => {
    html += createElementHtml(el, index);
  });
  html += `</main>\n<footer>\n`;
  layout.filter(el => el.section === 'footer').forEach((el, index) => {
    html += createElementHtml(el, index);
  });
  html += `</footer>\n`;
  return html;
}

function createElementHtml(el, index) {
  if (el.type === 'img') {
    return `<${el.type} class="el-${index}" src="${el.content}"></${el.type}>\n`;
  } else {
    return `<${el.type} class="el-${index}">${el.content}</${el.type}>\n`;
  }
}


function editAgain() {
  document.getElementById('preview').style.display = 'none';
  document.getElementById('editor').style.display = 'block';
  document.getElementById('controls').style.display = 'block';
  renderLayout(); //przywracamy układ edytora
}


function exportToZip() {
  const zip = new JSZip();

  const previewHTML = document.getElementById('previewContent').innerHTML;

  const fullHTML = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Moja Strona</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      padding: 2rem;
      background-color: #ffffff;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
${previewHTML}
</body>
</html>
  `.trim();

  zip.file("index.html", fullHTML);
  zip.generateAsync({ type: "blob" }).then(function(content) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = "projekt.zip";
    link.click();
  });
}

