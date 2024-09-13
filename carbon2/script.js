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
        const miners=parseFloat(document.getElementById('miners').value) || 0;
        const dragliners=parseFloat(document.getElementById('dragliners').value) || 0;
        const excavators=parseFloat(document.getElementById('excavators').value) || 0;
        const crushers=parseFloat(document.getElementById('crushers').value) || 0;
        const ventilation= parseFloat(document.getElementById('ventilation-electricity').value) || 0;
        const conveyors = parseFloat(document.getElementById('conveyors').value) || 0;
        const rails = parseFloat(document.getElementById('rails').value) || 0;
        const roads = parseFloat(document.getElementById('roads').value) || 0;
        const waste = parseFloat(document.getElementById('waste').value) || 0;
        const forest= parseFloat(document.getElementById('forest').value) || 0;
        const wetlands = parseFloat(document.getElementById('wetlands').value) || 0;
        const minelands = parseFloat(document.getElementById('minelands').value) || 0;
        const bufferzone = parseFloat(document.getElementById('bufferzone').value) || 0;
        const wetcreation = parseFloat(document.getElementById('wet-creation').value) || 0;
        const argo = parseFloat(document.getElementById('argo').value) || 0;
        const ccs = parseFloat(document.getElementById('ccs').value) || 0;



        // Emission Factors
        const dieselEmissionFactor = 2.68; // kg CO2 per liter
        const electricityEmissionFactor = 0.5; // kg CO2 per kWh


        // Calculate emissions

        const machineryemissions=((miners+dragliners+excavators+crushers)*dieselEmissionFactor*350)/1000;
        const ventilationemissions = (ventilation * electricityEmissionFactor*30*24*350)/1000;

        const processing=machineryemissions+ventilationemissions;

        const conveyorsemissions=(conveyors*electricityEmissionFactor*24*5*350)/1000;
        const railsemissions=(rails*0.5*200*5)/1000;
        const roadssemissions=(roads*0.3*3*100*350)/1000;

        const transportation=conveyorsemissions + railsemissions + roadssemissions;

        const wasteemissions=waste*3.6667*200;

        const totalEmissions=processing+transportation+wasteemissions;
    
        // Calculate carbon sinks
        const forestsink=forest*5*350;
        const wetlandssink=wetlands*2000;

        const totalCarbonAbsorption = forestsink+wetlandssink;
        const emissionGap = totalEmissions - totalCarbonAbsorption;

         //neutrality
         const minelandsN=minelands*3*300;
         const bufferzoneN=bufferzone*300;
         const wetcreationN=wetcreation*2000;
         const argoN=argo*4*300;
         const totalneutrality=minelandsN+bufferzoneN+wetcreationN+argoN+ccs;

        // Update results
        document.getElementById('coal-processing-emissions').textContent = `Coal Processing Emissions: ${processing.toFixed(2)} tons CO2`;
        document.getElementById('coal-transportation-emissions').textContent = `Coal Transportation Emissions: ${transportation.toFixed(2)} tons CO2`;
        document.getElementById('Coal-waste-emissionss').textContent = `Coal Waste Emissions: ${wasteemissions.toFixed(2)} tons CO2`; 
        document.getElementById('total-emissions').textContent = `Total Emissions: ${totalEmissions.toFixed(2)} tons CO2`;

        document.getElementById('forest-sink').textContent = `Forest Absorption: ${forestsink.toFixed(2)} tons CO2`;
        document.getElementById('wet-lands').textContent = `Wetlands Absorption: ${wetlandssink.toFixed(2)} tons CO2`;
        
        document.getElementById('carbon-absorption').textContent = `Total Carbon Absorption (acres): ${totalCarbonAbsorption.toFixed(2)} tons CO2`;
        document.getElementById('emission-gap').textContent = `Emission Gap: ${emissionGap.toFixed(2)} tons CO2`;

        document.getElementById('wet-lands').textContent = `Wetlands Absorption: ${wetlandssink.toFixed(2)} tons CO2`;

        // neutrality update data
        document.getElementById('reclaimed-mine-lands').textContent = `Reclaimed Mine Lands Neutrality: ${minelandsN.toFixed(2)} tons CO2`;
        document.getElementById('buffer-zone').textContent = `Buffer Zone Neutrality: ${bufferzoneN.toFixed(2)} tons CO2`;
        document.getElementById('wetLand-creation').textContent = `WetLand Creation Neutrality: ${wetcreationN.toFixed(2)} tons CO2`;
        document.getElementById('argoforestry-area').textContent = `Argoforestry Neutrality: ${argoN.toFixed(2)} tons CO2`;
        document.getElementById('ccs-n').textContent = `CCS Neutrality: ${ccs.toFixed(2)} tons CO2`;
        document.getElementById('total-neutrality').textContent = `Total Neutrality:${totalneutrality.toFixed(2)} tons CO2`;

        

        // Scroll to results section
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });

         // Show pathways section if emissions exceed limit
         const pathwaysSection = document.getElementById('pathways-section');
         if (totalEmissions > emissionLimit) {
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
                labels: ['Coal ', 'Crane Operation', 'Transportation', 'Coal Processing', 'Water Pumping', 'Ventilation', 'Generators'],
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