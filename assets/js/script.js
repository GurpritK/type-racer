// Typing Speed Test JavaScript
class TypingTest {
    constructor() {
        this.textSamples = {
            easy: [
                "The cat sat on the mat. It was a sunny day. The birds were singing in the trees.",
                "I like to eat apples and oranges. They are sweet and good for me.",
                "The dog runs fast in the park. Children play and laugh together.",
                "We go to school every day. We learn new things and make friends.",
                "The sun is bright and warm. Flowers bloom in the garden.",
                "Mom makes cookies in the kitchen. They smell very good.",
                "Fish swim in the blue water. The waves are calm and peaceful.",
                "Books have many stories inside. Reading is fun and exciting.",
                "Rain drops fall from the sky. Plants need water to grow big.",
                "Cars drive on the busy road. People go to work and home."
            ],
            medium: [
                "Technology has revolutionized the way we communicate with each other across vast distances.",
                "Environmental conservation requires collective effort from individuals, communities, and governments worldwide.",
                "Educational institutions play a crucial role in shaping the future leaders of tomorrow.",
                "Scientific research continues to unlock mysteries about our universe and expand human knowledge.",
                "Cultural diversity enriches our society by bringing together different perspectives and traditions.",
                "Economic development must balance growth with sustainability to ensure long-term prosperity.",
                "Healthcare professionals dedicate their lives to improving patient outcomes and saving lives.",
                "Artificial intelligence and machine learning are transforming industries at an unprecedented pace.",
                "Climate change poses significant challenges that require immediate action and innovative solutions.",
                "Global cooperation is essential for addressing complex international issues and conflicts."
            ],
            hard: [
                "Quantum entanglement demonstrates the peculiar interconnectedness of subatomic particles, defying conventional understanding of locality and causality in ways that continue to perplex even the most accomplished physicists.",
                "Neuroplasticity research reveals the brain's extraordinary capacity for reorganization throughout life, challenging previously held beliefs about cognitive limitations and opening unprecedented therapeutic possibilities for neurological rehabilitation.",
                "Cryptocurrency implementations utilize sophisticated cryptographic algorithms and distributed ledger technologies to establish trustless financial ecosystems that operate independently of traditional banking infrastructure.",
                "Bioengineering applications in regenerative medicine encompass tissue scaffolding, stem cell differentiation, and genetic modification techniques that promise revolutionary treatments for previously incurable degenerative diseases.",
                "Philosophical epistemology examines the fundamental nature of knowledge acquisition, questioning the reliability of sensory perception and the validity of logical reasoning in establishing objective truth.",
                "Computational linguistics leverages natural language processing algorithms to analyze syntactic structures, semantic relationships, and pragmatic contextual meanings within human communication systems.",
                "Astrophysical phenomena including gravitational waves, dark matter interactions, and supermassive black hole dynamics continue to challenge our understanding of spacetime geometry and cosmic evolution.",
                "Molecular gastronomy applies scientific principles to culinary arts, utilizing chemical reactions, phase transitions, and textural modifications to create innovative dining experiences.",
                "Psycholinguistic research investigates the cognitive mechanisms underlying language comprehension, production, and acquisition across diverse populations and developmental stages.",
                "Sustainable architecture integrates ecological design principles with advanced materials science to create energy-efficient structures that minimize environmental impact while maximizing human comfort."
            ]
        };
        
        this.currentText = '';
        this.difficulty = 'easy';
        this.startTime = null;
        this.isTestActive = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generateRandomText();
    }
    
    bindEvents() {
        // Difficulty selector
        const difficultySelector = document.getElementById('inputGroupSelect01');
        difficultySelector.addEventListener('change', (e) => {
            this.setDifficulty(e.target.value);
        });
        
        // Control buttons
        const startBtn = document.querySelector('.btn-success');
        const stopBtn = document.querySelector('.btn-danger');
        const retryBtn = document.querySelector('.btn-secondary');
        
        startBtn.addEventListener('click', () => this.startTest());
        stopBtn.addEventListener('click', () => this.stopTest());
        retryBtn.addEventListener('click', () => this.retryTest());
        
        // Input field
        const inputField = document.querySelector('.form-control');
        inputField.addEventListener('input', (e) => this.handleInput(e));
        inputField.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    setDifficulty(value) {
        const difficultyMap = {
            '1': 'easy',
            '2': 'medium',
            '3': 'hard'
        };
        
        this.difficulty = difficultyMap[value] || 'easy';
        this.generateRandomText();
        this.resetStats();
    }
    
    generateRandomText() {
        const texts = this.textSamples[this.difficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        this.currentText = texts[randomIndex];
        
        // Update the display
        const textDisplay = document.querySelector('.text-display p');
        textDisplay.textContent = this.currentText;
        
        // Reset input field
        const inputField = document.querySelector('.form-control');
        inputField.value = '';
        inputField.disabled = false;
    }
    
    startTest() {
        if (!this.isTestActive) {
            this.isTestActive = true;
            this.startTime = new Date();
            
            // Enable input and focus
            const inputField = document.querySelector('.form-control');
            inputField.disabled = false;
            inputField.focus();
            
            // Update button states
            this.updateButtonStates(true);
            
            // Start timer
            this.startTimer();
        }
    }
    
    stopTest() {
        if (this.isTestActive) {
            this.isTestActive = false;
            
            // Disable input
            const inputField = document.querySelector('.form-control');
            inputField.disabled = true;
            
            // Update button states
            this.updateButtonStates(false);
            
            // Calculate final results
            this.calculateResults();
        }
    }
    
    retryTest() {
        this.isTestActive = false;
        this.startTime = null;
        
        // Generate new text
        this.generateRandomText();
        
        // Reset stats
        this.resetStats();
        
        // Update button states
        this.updateButtonStates(false);
        
        // Clear and enable input
        const inputField = document.querySelector('.form-control');
        inputField.value = '';
        inputField.disabled = false;
    }
    
    handleInput(e) {
        if (!this.isTestActive) {
            this.startTest();
        }
        
        this.updateProgress();
        this.calculateLiveStats();
    }
    
    handleKeydown(e) {
        // Auto-start test on first keypress
        if (!this.isTestActive && e.key.length === 1) {
            this.startTest();
        }
    }
    
    updateProgress() {
        const inputField = document.querySelector('.form-control');
        const typedText = inputField.value;
        const progress = Math.min((typedText.length / this.currentText.length) * 100, 100);
        
        // Update progress bar
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-panel small');
        
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
        progressText.textContent = `${Math.round(progress)}% Complete`;
        
        // Check if test is complete
        if (typedText === this.currentText) {
            this.stopTest();
        }
    }
    
    calculateLiveStats() {
        if (!this.startTime) return;
        
        const inputField = document.querySelector('.form-control');
        const typedText = inputField.value;
        const currentTime = new Date();
        const timeElapsed = (currentTime - this.startTime) / 1000; // seconds
        
        // Calculate WPM (Words Per Minute)
        const wordsTyped = typedText.trim().split(' ').length;
        const wpm = timeElapsed > 0 ? Math.round((wordsTyped / timeElapsed) * 60) : 0;
        
        // Calculate accuracy
        let correctChars = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] === this.currentText[i]) {
                correctChars++;
            }
        }
        const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100;
        
        // Update display
        this.updateStats({
            wpm: wpm,
            accuracy: accuracy,
            time: this.formatTime(timeElapsed),
            characters: typedText.length
        });
    }
    
    calculateResults() {
        const inputField = document.querySelector('.form-control');
        const typedText = inputField.value;
        const endTime = new Date();
        const timeElapsed = (endTime - this.startTime) / 1000; // seconds
        
        // Calculate final WPM
        const wordsTyped = typedText.trim().split(' ').length;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        
        // Calculate final accuracy
        let correctChars = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] === this.currentText[i]) {
                correctChars++;
            }
        }
        const accuracy = Math.round((correctChars / typedText.length) * 100);
        
        this.updateStats({
            wpm: wpm,
            accuracy: accuracy,
            time: this.formatTime(timeElapsed),
            characters: typedText.length
        });
    }
    
    updateStats(stats) {
        document.querySelector('.stat-item:nth-child(1) .stat-value').textContent = stats.wpm;
        document.querySelector('.stat-item:nth-child(2) .stat-value').textContent = `${stats.accuracy}%`;
        document.querySelector('.stat-item:nth-child(3) .stat-value').textContent = stats.time;
        document.querySelector('.stat-item:nth-child(4) .stat-value').textContent = stats.characters;
    }
    
    resetStats() {
        this.updateStats({
            wpm: 0,
            accuracy: 0,
            time: '0:00',
            characters: 0
        });
        
        // Reset progress bar
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-panel small');
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', 0);
        progressText.textContent = '0% Complete';
    }
    
    startTimer() {
        if (this.isTestActive) {
            const currentTime = new Date();
            const timeElapsed = (currentTime - this.startTime) / 1000;
            
            // Update time display
            const timeElement = document.querySelector('.stat-item:nth-child(3) .stat-value');
            timeElement.textContent = this.formatTime(timeElapsed);
            
            // Continue timer
            setTimeout(() => this.startTimer(), 100);
        }
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    updateButtonStates(isActive) {
        const startBtn = document.querySelector('.btn-success');
        const stopBtn = document.querySelector('.btn-danger');
        const retryBtn = document.querySelector('.btn-secondary');
        
        if (isActive) {
            startBtn.disabled = true;
            stopBtn.disabled = false;
            retryBtn.disabled = true;
        } else {
            startBtn.disabled = false;
            stopBtn.disabled = true;
            retryBtn.disabled = false;
        }
    }
}

// Initialize the typing test when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
});
