const upload = document.getElementById('upload');
const file = document.getElementById('fileInput');
const download = document.getElementById('download');
const downloadSection = document.getElementById('downloadSection');
const fileList = document.getElementById('fileList');

function FilesList() {
  fetch('http://localhost:3000/files')
    .then(response => response.json())
    .then(files => {
      fileList.innerHTML = '';

      files.forEach(files => {
        const listItem = document.createElement('li');
        listItem.textContent = files.name;
        fileList.appendChild(listItem);

        const downloadOpt = document.createElement('option');
        downloadOpt.textContent = files.name;
        downloadOpt.value = files.name;
        downloadSection.appendChild(downloadOpt);
      });
    })
    .catch(error => console.error(error));
}


upload.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('file', file.files[0]);

  fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      FilesList();
    })
    .catch(error => console.error(error));

  upload.reset();
});

download.addEventListener('submit', event => {
  event.preventDefault();

  const selectedFile = downloadSection.value;

  fetch(`http://localhost:3000/download/${selectedFile}`)
    .then(response => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error('File not found');
      }
    })
    .then(blob => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = selectedFile;
      downloadLink.click();
    })
    .catch(error => console.error(error));
});

window.addEventListener('load', () => {
  FilesList();
});