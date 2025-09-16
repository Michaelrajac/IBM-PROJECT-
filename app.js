// HealthAI Application JavaScript - Fixed Version
(function() {
    'use strict';

    class HealthAIApp {
        constructor() {
            this.currentModule = 'dashboard';
            this.isDarkMode = false;
            this.charts = {};
            
            // Medical data
            this.medicalConditions = [
                {
                    "name": "Common Cold",
                    "symptoms": ["runny nose", "sneezing", "cough", "sore throat", "mild fever", "headache"],
                    "confidence": 85,
                    "description": "A viral infection of the upper respiratory tract",
                    "treatment": "Rest, fluids, over-the-counter medications for symptom relief",
                    "severity": "mild"
                },
                {
                    "name": "Influenza (Flu)",
                    "symptoms": ["high fever", "chills", "muscle aches", "fatigue", "cough", "headache", "sore throat"],
                    "confidence": 78,
                    "description": "A contagious respiratory illness caused by influenza viruses",
                    "treatment": "Antiviral medications if caught early, rest, fluids, symptom management",
                    "severity": "moderate"
                },
                {
                    "name": "Hypertension",
                    "symptoms": ["headaches", "dizziness", "chest pain", "shortness of breath", "nosebleeds"],
                    "confidence": 72,
                    "description": "High blood pressure condition",
                    "treatment": "Lifestyle changes, medication as prescribed, regular monitoring",
                    "severity": "moderate to severe"
                },
                {
                    "name": "Type 2 Diabetes",
                    "symptoms": ["increased thirst", "frequent urination", "blurred vision", "fatigue", "slow healing"],
                    "confidence": 80,
                    "description": "A metabolic disorder characterized by high blood sugar levels",
                    "treatment": "Diet modification, exercise, blood sugar monitoring, medication",
                    "severity": "chronic"
                },
                {
                    "name": "Migraine",
                    "symptoms": ["severe headache", "nausea", "sensitivity to light", "sensitivity to sound", "visual disturbances"],
                    "confidence": 88,
                    "description": "A neurological condition causing intense headaches",
                    "treatment": "Pain medication, rest in dark room, trigger avoidance",
                    "severity": "moderate"
                },
                {
                    "name": "Gastroenteritis",
                    "symptoms": ["nausea", "vomiting", "diarrhea", "stomach cramps", "fever", "dehydration"],
                    "confidence": 75,
                    "description": "Inflammation of the stomach and intestines",
                    "treatment": "Hydration, rest, bland diet, electrolyte replacement",
                    "severity": "mild to moderate"
                }
            ];

            this.symptomsDatabase = [
                "fever", "cough", "sore throat", "runny nose", "sneezing", "headache", "muscle aches", 
                "fatigue", "chills", "dizziness", "chest pain", "shortness of breath", "nausea", 
                "vomiting", "diarrhea", "stomach cramps", "increased thirst", "frequent urination", 
                "blurred vision", "sensitivity to light", "sensitivity to sound", "joint pain", 
                "rash", "itching", "swelling", "back pain", "nosebleeds", "insomnia", "anxiety", 
                "depression", "loss of appetite", "weight loss", "weight gain", "constipation", 
                "heartburn", "difficulty swallowing", "voice changes", "memory problems"
            ];

            this.treatments = {
                "Common Cold": {
                    "medications": ["Acetaminophen", "Ibuprofen", "Decongestants"],
                    "home_remedies": ["Rest", "Warm salt water gargling", "Honey tea", "Steam inhalation"],
                    "lifestyle": ["Adequate sleep", "Hydration", "Vitamin C", "Hand hygiene"]
                },
                "Hypertension": {
                    "medications": ["ACE inhibitors", "Beta-blockers", "Diuretics", "Calcium channel blockers"],
                    "home_remedies": ["Low sodium diet", "Regular exercise", "Stress management", "Weight control"],
                    "lifestyle": ["DASH diet", "Limited alcohol", "Quit smoking", "Regular monitoring"]
                }
            };

            this.healthTips = [
                "Drink at least 8 glasses of water daily for optimal hydration",
                "Aim for 7-9 hours of quality sleep each night",
                "Include 30 minutes of physical activity in your daily routine",
                "Eat a balanced diet rich in fruits, vegetables, and whole grains",
                "Practice stress management techniques like meditation or deep breathing"
            ];

            this.appointments = [
                {"date": "2025-09-20", "time": "10:00 AM", "provider": "Dr. Smith", "type": "Annual Check-up"},
                {"date": "2025-09-25", "time": "2:30 PM", "provider": "Dr. Johnson", "type": "Follow-up"},
                {"date": "2025-10-01", "time": "9:15 AM", "provider": "Dr. Brown", "type": "Consultation"}
            ];

            this.medications = [
                {"name": "Lisinopril", "dosage": "10mg", "frequency": "Once daily", "time": "8:00 AM"},
                {"name": "Multivitamin", "dosage": "1 tablet", "frequency": "Once daily", "time": "8:00 AM"},
                {"name": "Omega-3", "dosage": "1000mg", "frequency": "Twice daily", "time": "8:00 AM, 8:00 PM"}
            ];

            this.init();
        }

        init() {
            // Ensure DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupApplication());
            } else {
                this.setupApplication();
            }
        }

        setupApplication() {
            console.log('Setting up HealthAI application...');
            
            // Setup all components
            this.setupEventListeners();
            this.populateSymptomChecklist();
            this.populateAppointments();
            this.populateMedications();
            this.displayDailyTip();
            
            console.log('HealthAI application setup complete');
        }

        setupEventListeners() {
            console.log('Setting up event listeners...');

            // Module navigation - using direct element selection
            const moduleButtons = {
                'dashboard': document.querySelector('[data-module="dashboard"]'),
                'chat': document.querySelector('[data-module="chat"]'),
                'prediction': document.querySelector('[data-module="prediction"]'),
                'treatment': document.querySelector('[data-module="treatment"]'),
                'analytics': document.querySelector('[data-module="analytics"]'),
                'profile': document.querySelector('[data-module="profile"]'),
                'appointments': document.querySelector('[data-module="appointments"]'),
                'medications': document.querySelector('[data-module="medications"]')
            };

            // Attach navigation listeners
            Object.entries(moduleButtons).forEach(([moduleId, button]) => {
                if (button) {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(`Navigation clicked: ${moduleId}`);
                        this.switchModule(moduleId);
                    });
                    console.log(`Event listener attached for ${moduleId}`);
                } else {
                    console.warn(`Button not found for module: ${moduleId}`);
                }
            });

            // Theme toggle
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleTheme();
                });
                console.log('Theme toggle listener attached');
            }

            // Chat functionality
            const sendButton = document.getElementById('sendMessage');
            const chatInput = document.getElementById('chatInput');
            
            if (sendButton) {
                sendButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.sendChatMessage();
                });
            }

            if (chatInput) {
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.sendChatMessage();
                    }
                });
            }

            // Disease prediction
            const analyzeButton = document.getElementById('analyzeSymptoms');
            if (analyzeButton) {
                analyzeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.analyzeSymptoms();
                });
            }

            // Treatment plans
            const treatmentButton = document.getElementById('generateTreatment');
            if (treatmentButton) {
                treatmentButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.generateTreatmentPlan();
                });
            }
        }

        switchModule(moduleId) {
            console.log(`Switching to module: ${moduleId}`);
            
            // Hide all modules first
            const allModules = document.querySelectorAll('.module');
            allModules.forEach(module => {
                module.classList.remove('module--active');
                module.style.display = 'none';
            });

            // Show target module
            const targetModule = document.getElementById(moduleId);
            if (targetModule) {
                targetModule.classList.add('module--active');
                targetModule.style.display = 'block';
                console.log(`Module ${moduleId} is now active`);
            } else {
                console.error(`Module ${moduleId} not found`);
                return;
            }

            // Update sidebar active state
            const allButtons = document.querySelectorAll('.sidebar__item');
            allButtons.forEach(button => {
                button.classList.remove('sidebar__item--active');
            });
            
            const activeButton = document.querySelector(`[data-module="${moduleId}"]`);
            if (activeButton) {
                activeButton.classList.add('sidebar__item--active');
            }

            this.currentModule = moduleId;

            // Initialize charts when analytics module is shown
            if (moduleId === 'analytics') {
                setTimeout(() => this.setupCharts(), 200);
            }
        }

        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            const themeToggle = document.getElementById('themeToggle');
            
            if (this.isDarkMode) {
                document.documentElement.setAttribute('data-color-scheme', 'dark');
                if (themeToggle) themeToggle.textContent = '☀️';
            } else {
                document.documentElement.setAttribute('data-color-scheme', 'light');
                if (themeToggle) themeToggle.textContent = '🌙';
            }
            console.log(`Theme switched to: ${this.isDarkMode ? 'dark' : 'light'}`);
        }

        displayDailyTip() {
            const tipElement = document.getElementById('dailyTip');
            if (tipElement && this.healthTips.length > 0) {
                const randomTip = this.healthTips[Math.floor(Math.random() * this.healthTips.length)];
                tipElement.textContent = randomTip;
            }
        }

        populateSymptomChecklist() {
            const container = document.getElementById('symptomsChecklist');
            if (!container) return;
            
            container.innerHTML = '';

            this.symptomsDatabase.slice(0, 16).forEach((symptom, index) => {
                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'symptom-checkbox';
                const symptomId = `symptom-${index}`;
                checkboxDiv.innerHTML = `
                    <input type="checkbox" id="${symptomId}" value="${symptom}">
                    <label for="${symptomId}">${symptom.charAt(0).toUpperCase() + symptom.slice(1)}</label>
                `;
                container.appendChild(checkboxDiv);
            });
            console.log('Symptom checklist populated');
        }

        populateAppointments() {
            const container = document.getElementById('appointmentsList');
            if (!container) return;
            
            container.innerHTML = '';

            this.appointments.forEach(appointment => {
                const appointmentDiv = document.createElement('div');
                appointmentDiv.className = 'appointment-item';
                appointmentDiv.innerHTML = `
                    <div class="appointment-info">
                        <h4>${appointment.type}</h4>
                        <p><strong>Provider:</strong> ${appointment.provider}</p>
                        <p><strong>Date:</strong> ${appointment.date} at ${appointment.time}</p>
                    </div>
                    <div class="status status--success">Upcoming</div>
                `;
                container.appendChild(appointmentDiv);
            });
        }

        populateMedications() {
            const container = document.getElementById('medicationsList');
            if (!container) return;
            
            container.innerHTML = '';

            this.medications.forEach(medication => {
                const medicationDiv = document.createElement('div');
                medicationDiv.className = 'medication-item';
                medicationDiv.innerHTML = `
                    <div class="medication-info">
                        <h4>${medication.name}</h4>
                        <p><strong>Dosage:</strong> ${medication.dosage}</p>
                        <p><strong>Frequency:</strong> ${medication.frequency}</p>
                    </div>
                    <div class="medication-time">
                        ${medication.time}
                    </div>
                `;
                container.appendChild(medicationDiv);
            });
        }

        sendChatMessage() {
            const input = document.getElementById('chatInput');
            if (!input) return;
            
            const message = input.value.trim();
            if (!message) return;

            const messagesContainer = document.getElementById('chatMessages');
            if (!messagesContainer) return;
            
            console.log(`Sending chat message: ${message}`);
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message chat-message--user';
            userMessage.innerHTML = `
                <div class="chat-message__content">
                    <p>${message}</p>
                    <span class="chat-message__time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            `;
            messagesContainer.appendChild(userMessage);

            // Clear input
            input.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Generate and add AI response
            setTimeout(() => {
                const aiResponse = this.generateAIResponse(message);
                console.log(`AI response: ${aiResponse}`);
                
                const aiMessage = document.createElement('div');
                aiMessage.className = 'chat-message chat-message--ai';
                aiMessage.innerHTML = `
                    <div class="chat-message__content">
                        <p>${aiResponse}</p>
                        <span class="chat-message__time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                `;
                messagesContainer.appendChild(aiMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }

        generateAIResponse(message) {
            const lowerMessage = message.toLowerCase();
            console.log(`Generating AI response for: ${lowerMessage}`);
            
            // Check for fever specifically
            if (lowerMessage.includes('fever')) {
                return "Fever can be a sign of various conditions. If you have a fever above 100.4°F (38°C), monitor it closely. Seek immediate medical attention if fever exceeds 103°F (39.4°C) or is accompanied by severe symptoms like difficulty breathing, chest pain, or severe headache.";
            }

            // Check for other symptoms
            const foundSymptoms = this.symptomsDatabase.filter(symptom => 
                lowerMessage.includes(symptom)
            );

            if (foundSymptoms.length > 0) {
                return `I noticed you mentioned ${foundSymptoms.join(', ')}. These symptoms can be associated with various conditions. I'd recommend using our Disease Prediction module for a more detailed analysis. Remember to consult with a healthcare professional for proper diagnosis and treatment.`;
            }

            // Check for greetings
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return "Hello! I'm your AI Health Assistant powered by IBM Granite technology. I'm here to help you with health-related questions and guidance. How can I assist you today?";
            }

            if (lowerMessage.includes('help')) {
                return "I'm here to help! You can ask me about symptoms, general health questions, or use our specialized modules for disease prediction and treatment planning. What would you like to know?";
            }

            if (lowerMessage.includes('thank')) {
                return "You're welcome! I'm glad I could help. Remember, while I can provide general health information, always consult with healthcare professionals for medical decisions.";
            }

            // Default response
            return "I understand you're asking about health-related concerns. While I can provide general information, I'd recommend using our Disease Prediction module for symptom analysis or consulting with a healthcare professional for personalized advice.";
        }

        analyzeSymptoms() {
            console.log('Starting symptom analysis...');
            
            const symptomsText = document.getElementById('symptomsText');
            const age = document.getElementById('patientAge');
            const gender = document.getElementById('patientGender');

            if (!symptomsText || !age || !gender) {
                console.error('Required form elements not found');
                return;
            }

            const symptomsTextValue = symptomsText.value.trim();
            const checkedSymptoms = Array.from(document.querySelectorAll('#symptomsChecklist input:checked')).map(cb => cb.value);
            const ageValue = age.value;
            const genderValue = gender.value;

            console.log('Symptoms text:', symptomsTextValue);
            console.log('Checked symptoms:', checkedSymptoms);

            if (!symptomsTextValue && checkedSymptoms.length === 0) {
                alert('Please describe your symptoms or select from the checklist.');
                return;
            }

            // Show loading
            this.showLoading();

            setTimeout(() => {
                this.hideLoading();
                const results = this.performSymptomAnalysis(symptomsTextValue, checkedSymptoms, ageValue, genderValue);
                console.log('Analysis results:', results);
                this.displayPredictionResults(results);
            }, 2000);
        }

        performSymptomAnalysis(symptomsText, checkedSymptoms, age, gender) {
            const allSymptoms = [...checkedSymptoms];
            
            // Extract symptoms from text
            this.symptomsDatabase.forEach(symptom => {
                if (symptomsText.toLowerCase().includes(symptom)) {
                    if (!allSymptoms.includes(symptom)) {
                        allSymptoms.push(symptom);
                    }
                }
            });

            console.log('All symptoms for analysis:', allSymptoms);

            // Score conditions based on symptom matches
            const scoredConditions = this.medicalConditions.map(condition => {
                let score = 0;
                let matchedSymptoms = [];

                condition.symptoms.forEach(symptom => {
                    if (allSymptoms.includes(symptom)) {
                        score += 1;
                        matchedSymptoms.push(symptom);
                    }
                });

                if (score > 0) {
                    const baseConfidence = condition.confidence;
                    const symptomMatchRatio = matchedSymptoms.length / condition.symptoms.length;
                    const adjustedConfidence = Math.min(95, Math.max(30, Math.round(baseConfidence * symptomMatchRatio * 1.2)));

                    return {
                        ...condition,
                        score,
                        matchedSymptoms,
                        adjustedConfidence
                    };
                }
                return null;
            }).filter(condition => condition !== null)
              .sort((a, b) => b.score - a.score);

            return scoredConditions.slice(0, 3);
        }

        displayPredictionResults(results) {
            const container = document.getElementById('predictionResults');
            if (!container) {
                console.error('Prediction results container not found');
                return;
            }
            
            console.log('Displaying prediction results:', results);
            
            if (results.length === 0) {
                container.innerHTML = `
                    <div class="text-center">
                        <p>No strong matches found for the provided symptoms. Please consider:</p>
                        <ul style="text-align: left; margin-top: 16px;">
                            <li>Providing more specific symptom descriptions</li>
                            <li>Consulting with a healthcare professional</li>
                            <li>Monitoring symptoms and seeking medical attention if they worsen</li>
                        </ul>
                    </div>
                `;
                return;
            }

            container.innerHTML = `
                <div style="margin-bottom: 16px; padding: 12px; background-color: var(--color-bg-4); border-radius: 8px;">
                    <small><strong>⚠️ Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical diagnosis or treatment.</small>
                </div>
            `;

            results.forEach((condition) => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'condition-result';
                resultDiv.innerHTML = `
                    <div class="condition-header">
                        <h4 class="condition-name">${condition.name}</h4>
                        <span class="confidence-score">${condition.adjustedConfidence}% match</span>
                    </div>
                    <p class="condition-description">${condition.description}</p>
                    <div class="condition-treatment">
                        <strong>Recommended Actions:</strong> ${condition.treatment}
                    </div>
                    <div style="margin-top: 12px;">
                        <strong>Matched Symptoms:</strong> ${condition.matchedSymptoms.join(', ')}
                    </div>
                `;
                container.appendChild(resultDiv);
            });

            // Add general recommendations
            const recommendationsDiv = document.createElement('div');
            recommendationsDiv.innerHTML = `
                <div style="margin-top: 24px; padding: 16px; background-color: var(--color-bg-3); border-radius: 8px;">
                    <h4>General Recommendations:</h4>
                    <ul>
                        <li>Monitor your symptoms closely</li>
                        <li>Stay hydrated and get adequate rest</li>
                        <li>Consult a healthcare professional for proper diagnosis</li>
                        <li>Seek immediate medical attention if symptoms worsen</li>
                    </ul>
                </div>
            `;
            container.appendChild(recommendationsDiv);
        }

        generateTreatmentPlan() {
            const conditionSelect = document.getElementById('primaryCondition');
            if (!conditionSelect) return;
            
            const condition = conditionSelect.value;
            if (!condition) {
                alert('Please select a condition.');
                return;
            }

            this.showLoading();

            setTimeout(() => {
                this.hideLoading();
                this.displayTreatmentPlan(condition);
            }, 1500);
        }

        displayTreatmentPlan(conditionName) {
            const container = document.getElementById('treatmentResults');
            if (!container) return;
            
            let treatmentData = this.treatments[conditionName];
            
            if (!treatmentData) {
                treatmentData = {
                    medications: ["Consult your doctor for appropriate medications"],
                    home_remedies: ["Rest and hydration", "Monitor symptoms", "Maintain healthy lifestyle"],
                    lifestyle: ["Follow medical advice", "Regular check-ups", "Symptom monitoring"]
                };
            }

            container.innerHTML = `
                <div class="treatment-plan">
                    <div class="treatment-section">
                        <h4>💊 Medications</h4>
                        <div class="treatment-list">
                            ${treatmentData.medications.map(med => `<div class="treatment-item">${med}</div>`).join('')}
                        </div>
                    </div>
                    <div class="treatment-section">
                        <h4>🏠 Home Remedies</h4>
                        <div class="treatment-list">
                            ${treatmentData.home_remedies.map(remedy => `<div class="treatment-item">${remedy}</div>`).join('')}
                        </div>
                    </div>
                    <div class="treatment-section">
                        <h4>🌟 Lifestyle Recommendations</h4>
                        <div class="treatment-list">
                            ${treatmentData.lifestyle.map(lifestyle => `<div class="treatment-item">${lifestyle}</div>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 24px; padding: 16px; background-color: var(--color-bg-4); border-radius: 8px;">
                    <h4>⚠️ Important Reminders:</h4>
                    <ul>
                        <li>Always consult with your healthcare provider before starting any treatment</li>
                        <li>Follow prescribed dosages and instructions</li>
                        <li>Monitor your symptoms and report any changes</li>
                        <li>Attend all follow-up appointments</li>
                    </ul>
                </div>
            `;
        }

        setupCharts() {
            if (this.currentModule !== 'analytics') return;

            console.log('Setting up charts...');

            // Clear existing charts
            Object.values(this.charts).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                }
            });
            this.charts = {};

            // Symptom Tracking Chart
            const symptomCtx = document.getElementById('symptomChart');
            if (symptomCtx) {
                this.charts.symptom = new Chart(symptomCtx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Symptom Severity',
                            data: [2, 3, 1, 4, 2, 1, 0],
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 10
                            }
                        }
                    }
                });
            }

            // Health Metrics Chart
            const metricsCtx = document.getElementById('healthMetricsChart');
            if (metricsCtx) {
                this.charts.metrics = new Chart(metricsCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Blood Pressure', 'Heart Rate', 'Weight', 'Sleep Quality'],
                        datasets: [{
                            label: 'Health Metrics',
                            data: [120, 72, 170, 7],
                            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Condition Distribution Chart
            const conditionCtx = document.getElementById('conditionChart');
            if (conditionCtx) {
                this.charts.condition = new Chart(conditionCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Respiratory', 'Cardiovascular', 'Neurological', 'Digestive'],
                        datasets: [{
                            data: [35, 25, 25, 15],
                            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }

            console.log('Charts setup complete');
        }

        showLoading() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.classList.add('loading-overlay--show');
            }
        }

        hideLoading() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.classList.remove('loading-overlay--show');
            }
        }
    }

    // Initialize the application
    let app;
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing HealthAI app');
        app = new HealthAIApp();
        window.healthAIApp = app; // For debugging
    });

})();