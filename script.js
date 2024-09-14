const apiUrl = "http://localhost:5000/api/user-coal-mines/many";
const addCoalMine = async (coalMine) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coalMine),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};


document.addEventListener('DOMContentLoaded', () => {
      // Initially hide the results section
      const resultsSection = document.getElementById('results-section');
      resultsSection.style.display = 'none';

    // Scroll to form section when "Get Started" button is clicked
    const getStartedButton = document.getElementById('get-started-btn');
    getStartedButton.addEventListener('click', () => {
        document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Handle form submission for carbon calculation
    document.getElementById('carbon-calculation-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
    
        // Retrieve values for coal processing emissions
        const miners = parseFloat(document.getElementById('miners').value) || 0;
        const dragliners = parseFloat(document.getElementById('dragliners').value) || 0;
        const excavators = parseFloat(document.getElementById('excavators').value) || 0;
        const crushers = parseFloat(document.getElementById('crushers').value) || 0;
        const ventilation = parseFloat(document.getElementById('ventilation').value) || 0;
    
        // Retrieve values for coal transportation emissions
        const conveyors = parseFloat(document.getElementById('conveyors').value) || 0;
        const rails = parseFloat(document.getElementById('rails').value) || 0;
        const roads = parseFloat(document.getElementById('roads').value) || 0;
    
        // Retrieve values for coal waste emissions
        const waste = parseFloat(document.getElementById('slag').value) || 0;
        const blast = parseFloat(document.getElementById('blast').value) || 0;
        const employee = parseFloat(document.getElementById('employee').value) || 0;

        const coal=parseFloat(document.getElementById('coal').value) || 0;
    
        // Retrieve values for carbon sink
        const forest = parseFloat(document.getElementById('forest').value) || 0;
        const wetlands = parseFloat(document.getElementById('wetlands').value) || 0;
    
        // Retrieve values for carbon neutrality
        const minelands = parseFloat(document.getElementById('minelands').value) || 0;
        const bufferzone = parseFloat(document.getElementById('bufferzone').value) || 0;
        const wetCreation = parseFloat(document.getElementById('wet-creation').value) || 0;
        const argo = parseFloat(document.getElementById('argo').value) || 0;
        const ccs = parseFloat(document.getElementById('ccs').value) || 0;
    

// Call the addCoalMine function
addCoalMine({
    dieselUsage: {
      extraction: miners,
      crane: dragliners,
      transportation: excavators,
      generators: crushers,
    },
    electricityUsage: {
      processing: ventilation,
    },
    transportation: {
      conveyors,
      rails,
      roads,
    },
    waste,
    carbonSink: {
      forest,
      wetlands,
    },
    neutrality: {
      minelands,
      bufferzone,
      wetCreation,
      argo,
      ccs,
    },
  });

        // Emission Factors
    const dieselEmissionFactor = 2.68; // kg CO2 per liter
    const electricityEmissionFactor = 0.5; // kg CO2 per kWh

    // Calculate emissions
    const machineryEmissions = ((miners + dragliners + excavators + crushers) * dieselEmissionFactor * 350) / 1000;
    const ventilationEmissions = (ventilation * electricityEmissionFactor * 30 * 24 * 350) / 1000;
    const conveyorsEmissions = (conveyors * electricityEmissionFactor * 24 * 5 * 350) / 1000;
    const railsEmissions = (rails * 0.5 * 200 * 5) / 1000;
    const roadsEmissions = (roads * 0.3 * 3 * 100 * 350) / 1000;

    const processingEmissions = machineryEmissions + ventilationEmissions;
    const transportationEmissions = conveyorsEmissions + railsEmissions + roadsEmissions;
    const slagEmission= waste * 3.6667 * 200;
    const blastEmission=blast*0.26;
    const wasteEmissions=blastEmission+slagEmission;

    const methane=coal*15*300;
    const methaneEmission=(methane*25*0.717)/1000;

    const totalEmissions = processingEmissions + transportationEmissions + wasteEmissions;
    // capita calculation
    const capita=totalEmissions/employee;

    // Calculate carbon sinks
    const forestSink = forest * 5 * 350;
    const wetlandsSink = wetlands * 2000;

    const totalCarbonAbsorption = forestSink + wetlandsSink;
    const emissionGap = totalEmissions - totalCarbonAbsorption;

    //lands required
    const sequestrationrate=500;
    const landrequired=emissionGap/sequestrationrate;

    // Calculate neutrality
    const minelandsN = minelands * 3 * 300;
    const bufferzoneN = bufferzone * 300;
    const wetCreationN = wetCreation * 2000;
    const argoN = argo * 4 * 300;
    const totalNeutrality = minelandsN + bufferzoneN + wetCreationN + argoN + ccs;

        // Update results
    // Emission
    document.getElementById('coal-processing-emissions').textContent = `Coal Processing Emissions: ${processingEmissions.toFixed(2)} tons CO2`;
    document.getElementById('coal-transportation-emissions').textContent = `Coal Transportation Emissions: ${transportationEmissions.toFixed(2)} tons CO2`;
    document.getElementById('Coal-waste-emissionss').textContent = `Coal Waste Emissions: ${wasteEmissions.toFixed(2)} tons CO2`; 
    document.getElementById('methane-emissions').textContent = `Methane Emissions: ${methaneEmission.toFixed(2)} tons CO2`; 
    document.getElementById('total-emissions').textContent = ` Total Emissions: ${totalEmissions.toFixed(2)} tons CO2`;
   
    //per capita emissions 
    document.getElementById('capita-emissions').textContent = `Per Capita Emissions:${capita.toFixed(2)} tons CO2 per annually`;

    // Carbon Sink
    document.getElementById('forest-sink').textContent = `Forest Absorption: ${forestSink.toFixed(2)} tons CO2`;
    document.getElementById('wet-lands').textContent = `Wetlands Absorption: ${wetlandsSink.toFixed(2)} tons CO2`; 
    document.getElementById('carbon-absorption').textContent = `Total Carbon Absorption: ${totalCarbonAbsorption.toFixed(2)} tons CO2`;

    // Emission Gap
    document.getElementById('emission-gap').textContent = `Emission Gap: ${emissionGap.toFixed(2)} tons CO2`;


    //lands required        
    document.getElementById('lands-required').textContent = `Lands Required: ${landrequired.toFixed(2)} sq km`;

    // Neutrality
    document.getElementById('reclaimed-mine-lands').textContent = `Reclaimed Mine Lands Neutrality: ${minelandsN.toFixed(2)} tons CO2`;
    document.getElementById('buffer-zone').textContent = `Buffer Zone Neutrality: ${bufferzoneN.toFixed(2)} tons CO2`;
    document.getElementById('wetLand-creation').textContent = `WetLand Creation Neutrality: ${wetCreationN.toFixed(2)} tons CO2`;
    document.getElementById('argoforestry-area').textContent = `Agroforestry Neutrality: ${argoN.toFixed(2)} tons CO2`;
    document.getElementById('ccs-n').textContent = `CCS Neutrality: ${ccs.toFixed(2)} tons CO2`;
    document.getElementById('total-neutrality').textContent = `Total Neutrality: ${totalNeutrality.toFixed(2)} tons CO2`;
    document.getElementById('carbon-credit').textContent = `Carbon Credit: ${totalNeutrality.toFixed(2)} credits`;

        

        // Show the results section and scroll to it
        resultsSection.style.display = 'block';
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });

        // Create charts
        const ctx1 = document.getElementById('emission-chart').getContext('2d');
        const ctx2 = document.getElementById('sink-chart').getContext('2d');
        const ctx3 = document.getElementById('gap-chart').getContext('2d');
        const ctx4 = document.getElementById('neutrality-chart').getContext('2d');


  // Emission Chart
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: [ 
                    'Machinery Emissions',
                    'Ventilation Emissions',
                    'Conveyor Emissions',
                    'Rail Emissions',
                    'Road Emissions',
                    'Slag Emissions',
                    'Blast Emissions'
                ],
                datasets: [{
                    label: 'Emissions (Tons CO2)',
                    data: [
                        machineryEmissions,
                        ventilationEmissions,
                        conveyorsEmissions,
                        railsEmissions,
                        roadsEmissions,
                        slagEmission,
                        blastEmission
                    ],
                    backgroundColor: [
                        '#FF6384', // Machinery Emissions
                        '#36A2EB', // Ventilation Emissions
                        '#FFCE56', // Conveyor Emissions
                        '#4BC0C0', // Rail Emissions
                        '#9966FF', // Road Emissions
                        '#FF9F40', // slag Emissions
                        '#FF9F60',//blast Emissions
                        '#FF9890'
                    ],
                    borderColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#FF9F60',
                        '#FF9890'
                    ],
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
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' tons CO2';
                            }
                        }
                    }
                }
            }
        });

        // Sink Chart
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: [ 
                    'Forest Area',
                    'Wet Lands'
                ],
                datasets: [{
                    label: 'Absorption (Tons CO2)',
                    data: [
                        forestSink, 
                        wetlandsSink
                    ],
                    backgroundColor: [
                        '#FF6384', 
                        '#36A2EB'
                    ],
                    borderColor: [
                        '#FF6384',
                        '#36A2EB'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + (tooltipItem.raw).toFixed(2) + ' tons CO2';
                            }
                        }
                    }
                }
            }
        });

        // Gap Chart
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Total Emissions', 'Carbon Absorption'],
                datasets: [{
                    label: 'Emissions vs Absorption (Tons CO2)',
                    data: [totalEmissions, totalCarbonAbsorption],
                    backgroundColor: [
                        '#FF6384', 
                        '#4CAF50'  
                    ],
                    borderColor: [
                        '#FF6384',
                        '#4CAF50'
                    ],
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
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' tons CO2';
                            }
                        }
                    }
                }
            }
        });

        //Neutrality Chart
    new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: [ 
                'Reclaimed Mine Lands',
                'Buffer Zones',
                'Wetland Creation',
                'Argoforestry'
            ],
            datasets: [{
                label: 'Neutrality (Tons CO2)',
                data: [
                    minelandsN, 
                    bufferzoneN,
                    wetCreationN,
                    argoN
                ],
                backgroundColor: [
                    '#FF6384', 
                    '#36A2EB', 
                    '#FFCE56', 
                    '#4BC0C0'
                ],
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ],
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
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' tons CO2';
                        }
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
        labels: [ 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
    const currentEmissions = 135; 
    const progressTowardsTargets = 60; 
    const effectivenessMeasures = 80; 

    updateDashboard(currentEmissions, progressTowardsTargets, effectivenessMeasures);
});