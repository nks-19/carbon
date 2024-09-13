const emissionLimit = 1000;
document.addEventListener('DOMContentLoaded', () => {
    // Scroll to form section when "Get Started" button is clicked
    const getStartedButton = document.getElementById('get-started-btn');
    getStartedButton.addEventListener('click', () => {
        document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Handle form submission for carbon calculation
    const form = document.getElementById('carbon-calculation-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page from reloading

        // Retrieve values from the form
        const coalExtractionDiesel = parseFloat(document.getElementById('coal-extraction-diesel').value) || 0;
        const craneOperationDiesel = parseFloat(document.getElementById('crane-operation-diesel').value) || 0;
        const transportationDiesel = parseFloat(document.getElementById('transportation-diesel').value) || 0;
        const coalProcessingElectricity = parseFloat(document.getElementById('coal-processing-electricity').value) || 0;
        const waterPumpingElectricity = parseFloat(document.getElementById('water-pumping-electricity').value) || 0;
        const ventilationElectricity = parseFloat(document.getElementById('ventilation-electricity').value) || 0;
        const generatorsDiesel = parseFloat(document.getElementById('generators-diesel').value) || 0;
        const forestArea = parseFloat(document.getElementById('forest-area').value) || 0;

        // Emission Factors
        const dieselEmissionFactor = 2.68; // kg CO2 per liter
        const electricityEmissionFactor = 0.5; // kg CO2 per kWh

        // Calculate emissions
        const coalExtractionEmissions = coalExtractionDiesel * dieselEmissionFactor;
        const craneOperationEmissions = craneOperationDiesel * dieselEmissionFactor;
        const transportationEmissions = transportationDiesel * dieselEmissionFactor;
        const coalProcessingEmissions = coalProcessingElectricity * electricityEmissionFactor;
        const waterPumpingEmissions = waterPumpingElectricity * electricityEmissionFactor;
        const ventilationEmissions = ventilationElectricity * electricityEmissionFactor;
        const generatorsEmissions = generatorsDiesel * dieselEmissionFactor;

        const totalEmissions = coalExtractionEmissions + craneOperationEmissions + transportationEmissions +
                               coalProcessingEmissions + waterPumpingEmissions + ventilationEmissions +
                               generatorsEmissions;

        // Convert emissions to tons
        const totalEmissionsTons = totalEmissions / 1000;

        // Calculate carbon sinks
        const totalCarbonAbsorption = forestArea/365; // 1 acre absorbs 1 ton CO2 annually
        const emissionGap = totalEmissionsTons - totalCarbonAbsorption;

        // Update results
        document.getElementById('coal-extraction-emissions').textContent = `Coal Extraction Emissions: ${coalExtractionEmissions.toFixed(2)} kg CO2`;
        document.getElementById('crane-operation-emissions').textContent = `Crane Operation Emissions: ${craneOperationEmissions.toFixed(2)} kg CO2`;
        document.getElementById('transportation-emissions').textContent = `Transportation Emissions: ${transportationEmissions.toFixed(2)} kg CO2`;
        document.getElementById('coal-processing-emissions').textContent = `Coal Processing Emissions: ${coalProcessingEmissions.toFixed(2)} kg CO2`;
        document.getElementById('water-pumping-emissions').textContent = `Water Pumping Emissions: ${waterPumpingEmissions.toFixed(2)} kg CO2`;
        document.getElementById('ventilation-emissions').textContent = `Ventilation Systems Emissions: ${ventilationEmissions.toFixed(2)} kg CO2`;
        document.getElementById('generators-emissions').textContent = `Generators Emissions: ${generatorsEmissions.toFixed(2)} kg CO2`;
        document.getElementById('total-emissions').textContent = `Total Emissions: ${totalEmissions.toFixed(2)} kg CO2`;
        document.getElementById('carbon-absorption').textContent = `Carbon Absorption (acres): ${totalCarbonAbsorption.toFixed(2)} tons CO2`;
        document.getElementById('emission-gap').textContent = `Emission Gap: ${emissionGap.toFixed(2)} tons CO2`;

        // Scroll to results section
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });

         // Show pathways section if emissions exceed limit
         const pathwaysSection = document.getElementById('pathways-section');
         if (totalEmissionsTons > emissionLimit) {
             pathwaysSection.style.display = 'block'; // Show pathways section
         } else {
             pathwaysSection.style.display = 'none'; // Hide pathways section
         }  
    

        // Create charts
        const ctx1 = document.getElementById('emission-chart').getContext('2d');
        const ctx2 = document.getElementById('sink-chart').getContext('2d');
        const ctx3 = document.getElementById('gap-chart').getContext('2d');

        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Coal Extraction', 'Crane Operation', 'Transportation', 'Coal Processing', 'Water Pumping', 'Ventilation', 'Generators'],
                datasets: [{
                    label: 'Emissions (kg CO2)',
                    data: [
                        coalExtractionEmissions,
                        craneOperationEmissions,
                        transportationEmissions,
                        coalProcessingEmissions,
                        waterPumpingEmissions,
                        ventilationEmissions,
                        generatorsEmissions
                    ],
                    backgroundColor: '#FF6384', // Color for bars
                    borderColor: '#FF6384',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#444'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#444'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    }
                }
            }
        });

        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: [
                    'Coal Extraction Emissions',
                    'Crane Operation Emissions',
                    'Transportation Emissions',
                    'Coal Processing Emissions',
                    'Water Pumping Emissions',
                    'Ventilation Emissions',
                    'Generators Emissions',
                    'Carbon Absorption (divided equally)'
                ],
                datasets: [{
                    label: 'Emissions and Absorption (kg CO2)',
                    data: [
                        coalExtractionEmissions,
                        craneOperationEmissions,
                        transportationEmissions,
                        coalProcessingEmissions,
                        waterPumpingEmissions,
                        ventilationEmissions,
                        generatorsEmissions,
                        totalCarbonAbsorption / 7 * 1000 // convert tons to kg and divide equally
                    ],
                    backgroundColor: [
                        '#FF6384', // Red
                        '#36A2EB', // Blue
                        '#FFCE56', // Yellow
                        '#4BC0C0', // Teal
                        '#9966FF', // Purple
                        '#FF9F40', // Orange
                        '#C0C0C0', // Silver
                        '#4CAF50'  // Green
                    ],
                    borderColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#C0C0C0',
                        '#4CAF50'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });

        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Total Emissions', 'Carbon Absorption'],
                datasets: [{
                    label: 'Emissions vs Absorption (tons CO2)',
                    data: [totalEmissionsTons, totalCarbonAbsorption],
                    backgroundColor: ['#FF6384', '#4CAF50'], // Colors for bars
                    borderColor: ['#FF6384', '#4CAF50'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#444'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#444'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    }
                }
            }
        });
        
    });



    function calculateCredits() {
        // Get the values from the input fields
        const TotalReduction = parseFloat(document.getElementById('total-reduction').value) || 0;
        const marketRate = parseFloat(document.getElementById('market-rate').value) || 0;

        // Calculate the estimated carbon credits and value
        const EstimatedCredits = TotalReduction; // 1 ton CO2 = 1 credit
        const EstimatedValue = EstimatedCredits * marketRate;

        // Update the credits section
        document.getElementById('total-reduction-result').textContent = `Total Reduction:${TotalReduction.toFixed(2)} tons CO2`;
        document.getElementById('estimated-credits').textContent = `Estimated Credits:${EstimatedCredits.toFixed(2)} credits`;
        document.getElementById('estimated-value').textContent = `Estimated Value:${EstimatedValue.toFixed(2)}`;

        // Scroll to credits results section
        document.getElementById('credits-results').scrollIntoView({ behavior: 'smooth' });

        // Create pie chart for credits
        const ctx4 = document.getElementById('credits-chart').getContext('2d');

        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: ['TotalReduction','Estimated Credits','Estimated Value'],
                datasets: [{
                    label: 'Carbon Credits (tons CO2)',
                    data: [TotalReduction,EstimatedCredits,EstimatedValue],
                    backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
                    borderColor: ['#FF6384','#36A2EB','#FFCE56'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#444'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#444'
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    }
                }
            }
        });
    }
    /// Attach event listener for carbon credits calculation
    const creditsForm = document.getElementById('calculation-form');
    creditsForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        calculateCredits(); // Calculate and update results
    });
   
});



document.addEventListener('DOMContentLoaded', () => {
    // Example data
    const emissionsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'CO2 Emissions (tons)',
            data: [120, 130, 110, 140, 135, 150, 125, 140, 155, 160, 145, 130],
            borderColor: '#007BFF',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
        }]
    };

    const ctxEmissionsTrend = document.getElementById('emissions-trend-chart').getContext('2d');
    new Chart(ctxEmissionsTrend, {
        type: 'line',
        data: emissionsData,
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Dashboard metrics update function
    function updateDashboard(currentEmissions, progress, effectiveness) {
        document.getElementById('current-emissions').textContent = currentEmissions + ' tons CO2';
        document.getElementById('progress-towards-targets').textContent = progress + '%';
        document.getElementById('effectiveness-measures').textContent = effectiveness + '%';
    }

    // Example values for the dashboard
    const currentEmissions = 135; // Example current emissions value
    const progressTowardsTargets = 60; // Example progress percentage
    const effectivenessMeasures = 80; // Example effectiveness percentage

    updateDashboard(currentEmissions, progressTowardsTargets, effectivenessMeasures);
});