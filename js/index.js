let submittedData = JSON.parse(localStorage.getItem("submittedData")) || [];

function submitSuccess() {
  let productName = document.getElementById("productName").value;
  let productDesc = document.getElementById("productDesc").value;
  let price = document.getElementById("price").value;
  let imageInput = document.getElementById("imageLocation");

  // Handle file input and create a FileReader to get the image URL
  if (imageInput.files && imageInput.files[0]) {
    let reader = new FileReader();

    // Once the file is read, store the image data in localStorage and display it
    reader.onload = function (e) {
      let imageLocation = e.target.result; // This will be a base64 image URL

      // Store the values in an object
      let dataEntry = {
        productName: productName,
        productDesc: productDesc,
        imageLocation: imageLocation, // Base64 image data
        price: price,
      };

      // Add the new entry to the array
      submittedData.push(dataEntry);

      // Save the updated array to localStorage
      localStorage.setItem("submittedData", JSON.stringify(submittedData));

      // Update the display
      displayData();
    };

    // Read the image file as a data URL (base64)
    reader.readAsDataURL(imageInput.files[0]);
  }
}

function displayData() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear the table body before adding new rows

  // Loop through submittedData and create table rows
  submittedData.forEach((entry, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${entry.productName}</td>
          <td>${entry.productDesc}</td>
          <td>${entry.price}</td>
          <td><img src="${
            entry.imageLocation
          }" alt="Uploaded Image" width="100" /></td>
          <td>
            <button id="buttonTableSize" onclick="deleteEntry(${index})" type="button" class="btn btn-danger">Delete</button>
            <button id="buttonTableSize" onclick="viewImage('${
              entry.imageLocation
            }')" type="button" class="btn btn-primary">View</button>
            </td></td>
         
        `;
    tableBody.appendChild(row);
  });

  document.getElementById("productDesc").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("imageLocation").value = "";
}

function deleteEntry(index) {
  submittedData.splice(index, 1);
  localStorage.setItem("submittedData", JSON.stringify(submittedData));
  displayData();
}

function viewImage(imageUrl) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImg.src = imageUrl;
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

window.onload = function () {
  displayData();
};
