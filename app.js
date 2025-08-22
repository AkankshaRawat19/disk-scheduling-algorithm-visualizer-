
let chartInstances = {}; // Store chart instances

function runScheduler() {
    let requestsInput = document.getElementById("requests");
    let headInput = document.getElementById("head");
    let diskSizeInput = document.getElementById("diskSize");

    let requestsValue = requestsInput.value.trim();
    let headValue = headInput.value.trim();
    let diskSizeValue = diskSizeInput.value.trim() || "200";

    // Remove previous error styles
    [requestsInput, headInput, diskSizeInput].forEach(el => el.classList.remove("input-error"));

    // Basic empty check
    if (!requestsValue || !headValue) {
        alert("All fields are required. Please enter valid numeric values.");
        if (!requestsValue) requestsInput.classList.add("input-error");
        if (!headValue) headInput.classList.add("input-error");
        return;
    }

    // Validate request sequence format
    let requestsArray = requestsValue.split(",").map(num => num.trim());
    if (!requestsArray.every(num => /^\d+$/.test(num))) {
        alert("Request Sequence should contain only numeric values separated by commas.");
        requestsInput.classList.add("input-error");
        return;
    }

    if (isNaN(headValue) || isNaN(diskSizeValue)) {
        alert("Initial Head Position and Disk Size must be valid numbers.");
        headInput.classList.add("input-error");
        diskSizeInput.classList.add("input-error");
        return;
    }

    const requests = requestsArray.map(Number);
    const head = parseInt(headValue);
    const diskSize = parseInt(diskSizeValue);

    if (head < 0 || diskSize <= 0) {
        alert("Initial Head Position must be non-negative and Disk Size must be greater than 0.");
        return;
    }

    // Ensure requests and head are within disk size
    if (requests.some(r => r >= diskSize) || head >= diskSize) {
        alert(`All requests and head position must be less than disk size (${diskSize}).`);
        return;
    }

    const selectedAlgorithms = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
    if (selectedAlgorithms.length === 0) {
        alert("Please select at least one algorithm.");
        return;
    }

    fetch('http://localhost:5001/schedule', { // Keep consistent backend port
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests, head, diskSize, algorithms: selectedAlgorithms })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById("algorithmResults");
        resultsDiv.innerHTML = "";

        // Show results
        selectedAlgorithms.forEach(algo => {
            resultsDiv.innerHTML += `<p>${algo.toUpperCase()} - Total Seek Time: ${data.seekTimes[algo]}</p>`;
        });

        // Best Algorithm
        let bestAlgoText = document.getElementById("bestAlgorithm");
        bestAlgoText.innerText = "Best Algorithm: " + data.bestAlgorithm.toUpperCase();
        bestAlgoText.classList.add("highlight");

        let diskUtilizationText = document.getElementById("diskUtilization");
        diskUtilizationText.innerText = "Disk Utilization: " + data.diskUtilization + "%";

        // Clear previous charts
        const chartContainer = document.getElementById("chartContainer");
        chartContainer.innerHTML = "";

        // Create charts
        selectedAlgorithms.forEach(algo => {
            visualize(data.sequences[algo], algo, head);
        });

        setTimeout(() => bestAlgoText.classList.remove("highlight"), 2000);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while processing the request.");
    });
}

function visualize(sequence, algo, initialHead) {
    const chartContainer = document.getElementById("chartContainer");
    const canvas = document.createElement("canvas");
    canvas.id = algo + "Chart";
    chartContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    if (chartInstances[algo]) {
        chartInstances[algo].destroy();
    }

    // Avoid duplication of head
    const adjustedSequence = (sequence[0] === initialHead) ? sequence : [initialHead, ...sequence];

    chartInstances[algo] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: adjustedSequence.map((_, index) => index), // Steps
            datasets: [{
                label: algo.toUpperCase() + ' Head Movement',
                data: adjustedSequence,
                borderColor: '#007bff',
                backgroundColor: '#007bff',
                fill: false,
                pointRadius: 5,
                tension: 0.3
            }]
        },
        options: {
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Step' }
                },
                y: {
                    title: { display: true, text: 'Disk Position' },
                    min: 0,
                    max: Math.max(...adjustedSequence) + 10
                }
            }
        }
    });
}
