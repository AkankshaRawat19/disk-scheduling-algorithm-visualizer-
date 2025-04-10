/*let chartInstances = {}; // To store chart instances for each algorithm

function runScheduler() {
    let requestsInput = document.getElementById("requests");
    let headInput = document.getElementById("head");
    let diskSizeInput = document.getElementById("diskSize");

    let requestsValue = requestsInput.value.trim();
    let headValue = headInput.value.trim();
    let diskSizeValue = diskSizeInput.value.trim() || "200";

    // Remove previous error styles
    requestsInput.classList.remove("input-error");
    headInput.classList.remove("input-error");
    diskSizeInput.classList.remove("input-error");

    if (!requestsValue || !headValue) {
        alert("All fields are required. Please enter valid numeric values.");
        
        if (!requestsValue) requestsInput.classList.add("input-error");
        if (!headValue) headInput.classList.add("input-error");

        return;
    }

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

    const selectedAlgorithms = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
    if (selectedAlgorithms.length === 0) {
        alert("Please select at least one algorithm.");
        return;
    }

    fetch('http://localhost:5000/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests, head, diskSize, algorithms: selectedAlgorithms })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById("algorithmResults");
        resultsDiv.innerHTML = ""; // Clear previous results

        // Show results for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            resultsDiv.innerHTML += `<p>${algo.toUpperCase()} - Total Seek Time: ${data.seekTimes[algo]}</p>`;
        });

        // Animate Best Algorithm Text
        let bestAlgoText = document.getElementById("bestAlgorithm");
        bestAlgoText.innerText = "Best Algorithm: " + data.bestAlgorithm.toUpperCase();
        bestAlgoText.classList.add("highlight");

        let diskUtilizationText = document.getElementById("diskUtilization");
        diskUtilizationText.innerText = "Disk Utilization: " + data.diskUtilization + "%";

        // Clear the chart container before adding new charts
        const chartContainer = document.getElementById("chartContainer");
        chartContainer.innerHTML = ""; // Clear any previous charts

        // Create a chart for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            visualize(data.sequences[algo], algo);
        });

        // Remove highlight effect after 2 seconds
        setTimeout(() => {
            bestAlgoText.classList.remove("highlight");
        }, 2000);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while processing the request.");
    });
}

function visualize(sequence, algo) {
    const chartContainer = document.getElementById("chartContainer");

    // Create a new canvas element for each algorithm
    const canvas = document.createElement("canvas");
    canvas.id = algo + "Chart";  // Give each canvas a unique ID
    chartContainer.appendChild(canvas); // Append to the container

    const ctx = canvas.getContext('2d');

    // Destroy any previous chart for the same algorithm (if exists)
    if (chartInstances[algo]) {
        chartInstances[algo].destroy();
    }

    // Create a new chart for the algorithm
    chartInstances[algo] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sequence,
            datasets: [{
                label: algo.toUpperCase() + ' Head Movement',
                data: sequence,
                borderColor: '#007bff',
                backgroundColor: '#007bff',
                fill: false,
                pointRadius: 5
            }]
        },
        options: {
            animation: {
                duration: 500, // Smooth animation for each point
                easing: 'easeInOutQuad' // Smooth animation easing
            },
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Disk Position'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Seek Time'
                    }
                }
            }
        }
    });
}*/
/*let chartInstances = {}; // To store chart instances for each algorithm

function runScheduler() {
    let requestsInput = document.getElementById("requests");
    let headInput = document.getElementById("head");
    let diskSizeInput = document.getElementById("diskSize");

    let requestsValue = requestsInput.value.trim();
    let headValue = headInput.value.trim();
    let diskSizeValue = diskSizeInput.value.trim() || "200";

    // Remove previous error styles
    requestsInput.classList.remove("input-error");
    headInput.classList.remove("input-error");
    diskSizeInput.classList.remove("input-error");

    if (!requestsValue || !headValue) {
        alert("All fields are required. Please enter valid numeric values.");
        
        if (!requestsValue) requestsInput.classList.add("input-error");
        if (!headValue) headInput.classList.add("input-error");

        return;
    }

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

    const selectedAlgorithms = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
    if (selectedAlgorithms.length === 0) {
        alert("Please select at least one algorithm.");
        return;
    }

    fetch('http://localhost:5000/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests, head, diskSize, algorithms: selectedAlgorithms })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById("algorithmResults");
        resultsDiv.innerHTML = ""; // Clear previous results

        // Show results for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            resultsDiv.innerHTML += `<p>${algo.toUpperCase()} - Total Seek Time: ${data.seekTimes[algo]}</p>`;
        });

        // Animate Best Algorithm Text
        let bestAlgoText = document.getElementById("bestAlgorithm");
        bestAlgoText.innerText = "Best Algorithm: " + data.bestAlgorithm.toUpperCase();
        bestAlgoText.classList.add("highlight");

        let diskUtilizationText = document.getElementById("diskUtilization");
        diskUtilizationText.innerText = "Disk Utilization: " + data.diskUtilization + "%";

        // Clear the chart container before adding new charts
        const chartContainer = document.getElementById("chartContainer");
        chartContainer.innerHTML = ""; // Clear any previous charts

        // Create a chart for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            visualize(data.sequences[algo], algo);
        });

        // Remove highlight effect after 2 seconds
        setTimeout(() => {
            bestAlgoText.classList.remove("highlight");
        }, 2000);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while processing the request.");
    });
}

function visualize(sequence, algo) {
    const chartContainer = document.getElementById("chartContainer");

    // Create a new canvas element for each algorithm
    const canvas = document.createElement("canvas");
    canvas.id = algo + "Chart";  // Give each canvas a unique ID
    chartContainer.appendChild(canvas); // Append to the container

    const ctx = canvas.getContext('2d');

    // Destroy any previous chart for the same algorithm (if exists)
    if (chartInstances[algo]) {
        chartInstances[algo].destroy();
    }

    // Create a new chart for the algorithm with animation
    chartInstances[algo] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sequence,
            datasets: [{
                label: algo.toUpperCase() + ' Head Movement',
                data: sequence,
                borderColor: '#007bff',
                backgroundColor: '#007bff',
                fill: false,
                pointRadius: 5
            }]
        },
        options: {
            animation: {
                duration: 1000, // Smooth animation for the entire chart drawing
                easing: 'easeOutQuart', // Smooth easing for the animation
                onProgress: function(animation) {
                    // Optionally you can add more complex progress handling here
                    console.log(`Animation progress: ${animation.currentStep / animation.numSteps * 100}%`);
                },
                onComplete: function() {
                    console.log("Chart animation completed!");
                }
            },
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Disk Position'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Seek Time'
                    }
                }
            }
        }
    });
}*/
/*let chartInstances = {}; // To store chart instances for each algorithm

function runScheduler() {
    let requestsInput = document.getElementById("requests");
    let headInput = document.getElementById("head");
    let diskSizeInput = document.getElementById("diskSize");

    let requestsValue = requestsInput.value.trim();
    let headValue = headInput.value.trim();
    let diskSizeValue = diskSizeInput.value.trim() || "200";

    // Remove previous error styles
    requestsInput.classList.remove("input-error");
    headInput.classList.remove("input-error");
    diskSizeInput.classList.remove("input-error");

    if (!requestsValue || !headValue) {
        alert("All fields are required. Please enter valid numeric values.");
        
        if (!requestsValue) requestsInput.classList.add("input-error");
        if (!headValue) headInput.classList.add("input-error");

        return;
    }

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

    const selectedAlgorithms = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
    if (selectedAlgorithms.length === 0) {
        alert("Please select at least one algorithm.");
        return;
    }

    fetch('http://localhost:5000/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests, head, diskSize, algorithms: selectedAlgorithms })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById("algorithmResults");
        resultsDiv.innerHTML = ""; // Clear previous results

        // Show results for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            resultsDiv.innerHTML += `<p>${algo.toUpperCase()} - Total Seek Time: ${data.seekTimes[algo]}</p>`;
        });

        // Animate Best Algorithm Text
        let bestAlgoText = document.getElementById("bestAlgorithm");
        bestAlgoText.innerText = "Best Algorithm: " + data.bestAlgorithm.toUpperCase();
        bestAlgoText.classList.add("highlight");

        let diskUtilizationText = document.getElementById("diskUtilization");
        diskUtilizationText.innerText = "Disk Utilization: " + data.diskUtilization + "%";

        // Clear the chart container before adding new charts
        const chartContainer = document.getElementById("chartContainer");
        chartContainer.innerHTML = ""; // Clear any previous charts

        // Create a chart for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            visualize(data.sequences[algo], algo, head); // Pass initial head position (head)
        });

        // Remove highlight effect after 2 seconds
        setTimeout(() => {
            bestAlgoText.classList.remove("highlight");
        }, 2000);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while processing the request.");
    });
}

function visualize(sequence, algo, initialHeadPosition) {
    const chartContainer = document.getElementById("chartContainer");

    // Create a new canvas element for each algorithm
    const canvas = document.createElement("canvas");
    canvas.id = algo + "Chart";  // Give each canvas a unique ID
    chartContainer.appendChild(canvas); // Append to the container

    const ctx = canvas.getContext('2d');

    // Ensure that the sequence starts with the initial head position
    if (sequence[0] !== initialHeadPosition) {
        sequence.unshift(initialHeadPosition); // Add the initial head position at the start of the sequence
    }

    // Destroy any previous chart for the same algorithm (if exists)
    if (chartInstances[algo]) {
        chartInstances[algo].destroy();
    }

    // Create a new chart for the algorithm with animation
    chartInstances[algo] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sequence,  // X-axis will represent the disk head movements
            datasets: [{
                label: algo.toUpperCase() + ' Head Movement',
                data: sequence,
                borderColor: '#007bff',
                backgroundColor: '#007bff',
                fill: false,
                pointRadius: 5
            }]
        },
        options: {
            animation: {
                duration: 1000, // Smooth animation for the entire chart drawing
                easing: 'easeOutQuart', // Smooth easing for the animation
            },
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Disk Position'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Seek Time'
                    }
                }
            }
        }
    });
}*/
let chartInstances = {}; // To store chart instances for each algorithm

function runScheduler() {
    let requestsInput = document.getElementById("requests");
    let headInput = document.getElementById("head");
    let diskSizeInput = document.getElementById("diskSize");

    let requestsValue = requestsInput.value.trim();
    let headValue = headInput.value.trim();
    let diskSizeValue = diskSizeInput.value.trim() || "200";

    // Remove previous error styles
    requestsInput.classList.remove("input-error");
    headInput.classList.remove("input-error");
    diskSizeInput.classList.remove("input-error");

    if (!requestsValue || !headValue) {
        alert("All fields are required. Please enter valid numeric values.");
        
        if (!requestsValue) requestsInput.classList.add("input-error");
        if (!headValue) headInput.classList.add("input-error");

        return;
    }

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

    const selectedAlgorithms = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
    if (selectedAlgorithms.length === 0) {
        alert("Please select at least one algorithm.");
        return;
    }

    fetch('http://localhost:5000/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests, head, diskSize, algorithms: selectedAlgorithms })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById("algorithmResults");
        resultsDiv.innerHTML = ""; // Clear previous results

        // Show results for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            resultsDiv.innerHTML += `<p>${algo.toUpperCase()} - Total Seek Time: ${data.seekTimes[algo]}</p>`;
        });

        // Animate Best Algorithm Text
        let bestAlgoText = document.getElementById("bestAlgorithm");
        bestAlgoText.innerText = "Best Algorithm: " + data.bestAlgorithm.toUpperCase();
        bestAlgoText.classList.add("highlight");

        let diskUtilizationText = document.getElementById("diskUtilization");
        diskUtilizationText.innerText = "Disk Utilization: " + data.diskUtilization + "%";

        // Clear the chart container before adding new charts
        const chartContainer = document.getElementById("chartContainer");
        chartContainer.innerHTML = ""; // Clear any previous charts

        // Create a chart for each selected algorithm
        selectedAlgorithms.forEach(algo => {
            visualize(data.sequences[algo], algo, head);
        });

        // Remove highlight effect after 2 seconds
        setTimeout(() => {
            bestAlgoText.classList.remove("highlight");
        }, 2000);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while processing the request.");
    });
}

function visualize(sequence, algo, initialHead) {
    const chartContainer = document.getElementById("chartContainer");

    // Create a new canvas element for each algorithm
    const canvas = document.createElement("canvas");
    canvas.id = algo + "Chart";  // Give each canvas a unique ID
    chartContainer.appendChild(canvas); // Append to the container

    const ctx = canvas.getContext('2d');

    // Destroy any previous chart for the same algorithm (if exists)
    if (chartInstances[algo]) {
        chartInstances[algo].destroy();
    }

    // Initial sequence adjusted to start at the initial head position
    const adjustedSequence = [initialHead, ...sequence];

    // Create a new chart for the algorithm
    chartInstances[algo] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: adjustedSequence, // Include the initial head position in the labels
            datasets: [{
                label: algo.toUpperCase() + ' Head Movement',
                data: adjustedSequence,
                borderColor: '#007bff',
                backgroundColor: '#007bff',
                fill: false,
                pointRadius: 5
            }]
        },
        options: {
            animation: {
                duration: 100, // Adjust the total animation duration
                easing: 'easeInOutQuad', // Smooth animation easing
                onProgress: function(animation) {
                    // Dynamically update the chart as the animation progresses
                    const progress = animation.currentStep / animation.numSteps;
                    const visibleData = adjustedSequence.slice(0, Math.ceil(progress * adjustedSequence.length));
                    chartInstances[algo].data.datasets[0].data = visibleData;
                    chartInstances[algo].update();
                }
            },
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Disk Position'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Seek Time'
                    }
                }
            }
        }
    });
}
