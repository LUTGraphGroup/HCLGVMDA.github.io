let data = [];

// Load JSON data
fetch('build/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data); // Debugging output
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

const exampleMetabolites = ["hsa-mir-31", "hsa-mir-215", "hsa-mir-3658", "hsa-mir-26a-1", "hsa-mir-3915"];

function fillExample() {
    const randomIndex = Math.floor(Math.random() * exampleMetabolites.length);
    document.getElementById('miRNA').value = exampleMetabolites[randomIndex];
}

function queryDisease() {
    const miRNA = document.getElementById('miRNA').value.trim().toLowerCase();
    const modalResultsDiv = document.getElementById('modal-results');
    const modal = document.getElementById('myModal');

    modalResultsDiv.innerHTML = ''; // Clear previous results

    if (!miRNA) {
        modalResultsDiv.innerHTML = 'Please enter a miRNA.';
        modal.style.display = "block";
        return;
    }

    // Find associated diseases
    const results = data.filter(item => item.miRNA && item.miRNA.toLowerCase() === miRNA);

    if (results.length > 0) {
        const output = results.map(item => `${item.disease} (Score: ${item.Score})`).join('<br>');
        modalResultsDiv.innerHTML = 'Diseases:<br>' + output;
    } else {
        modalResultsDiv.innerHTML = 'No diseases found for this miRNA.';
    }
    modal.style.display = "block"; // Show modal
}

function clearInput() {
    document.getElementById('miRNA').value = '';
    closeModal();
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Close modal on click
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}
