// --- 1. HERO SECTION TYPING ANIMATION ---
const phrases = [
    "Electronics & Communication Engineer",
"Video Game Developer",
"Cloud Engineer (AWS & Terraform)",
"Linux & Git Specialist",
"Robotics & Embedded Systems Developer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const eraseSpeed = 40;
const delayBetweenPhrases = 2000;

function typeEffect() {
    const textElement = document.getElementById("typing-text");
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let currentSpeed = isDeleting ? eraseSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        currentSpeed = delayBetweenPhrases;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentSpeed = 500;
    }

    setTimeout(typeEffect, currentSpeed);
}

// --- 2. TERMINAL SECTION TYPING ANIMATION ---
const commandText = "cat about_me.txt";
let cmdIndex = 0;
const cmdTypingSpeed = 200;
let hasTyped = false;

function typeCommand() {
    if (hasTyped) return;

    const cmdTextElement = document.getElementById("cmd-text");
    const termCursor = document.getElementById("term-cursor");
    const cmdOutput = document.getElementById("cmd-output");

    if (!cmdTextElement || !termCursor || !cmdOutput) return;

    if (cmdIndex < commandText.length) {
        cmdTextElement.textContent += commandText.charAt(cmdIndex);
        cmdIndex++;
        setTimeout(typeCommand, cmdTypingSpeed);
    } else {
        hasTyped = true;
        // Command finished typing! Hide cursor & show bash output
        termCursor.style.display = "none";

        setTimeout(() => {
            cmdOutput.style.display = "block";
        }, 150);
    }
}

// --- INITIALIZATION ON DOM LOAD ---
document.addEventListener("DOMContentLoaded", () => {
    // Start Hero text animation
    typeEffect();

    // Trigger Terminal animation via IntersectionObserver
    const introSection = document.querySelector(".intro-section");

    if (introSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Fire when even 10% of Section 2 is visible
                if (entry.isIntersecting && !hasTyped) {
                    typeCommand();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(introSection);
    }
});

// --- 3. PROJECTS TERMINAL EXPLORER LOGIC ---
const projectData = {
    rover: {
        title: "ROS2 Autonomous Mobile Security Rover",
        tags: ["ROS2", "Raspberry Pi", "ESP32", "Python", "C++"],
        description: "Autonomous ground rover featuring real-time obstacle avoidance, sensor fusion (LIDAR + Radar), and micro-ROS hardware communication pipelines.",
        features: [
            "Configured custom ROS2 navigation nodes.",
            "Integrated ESP32 motor drivers with low-latency UART telemetry.",
            "3D printed modular chassis designed in Fusion 360."
        ],
        image: "rover.jpg" // Add your image path here when ready
    },
    videogame: {
        title: "Custom Action RPG / Indie Game Project",
        tags: ["Game Dev", "C#", "System Architecture"],
        description: "Custom game project designed with focus on mechanics, player movement physics, and optimized resource rendering.",
        features: [
            "Implemented state machines for responsive player inputs.",
            "Custom level design and dynamic lighting systems."
        ],
        image: ""
    },
    fpga: {
        title: "FPGA & SystemVerilog Digital Logic Design",
        tags: ["SystemVerilog", "FPGA", "Verilog", "Digital Design"],
        description: "Hardware description design and simulation of hardware modules, state machines, and customized custom shaft/register interfaces.",
        features: [
            "Wrote synthesis-ready SystemVerilog logic modules.",
            "Simulated waveforms and timing verification."
        ],
        image: ""
    },
    cloud: {
        title: "Serverless AWS Cloud Portfolio & Pipeline",
        tags: ["AWS S3", "Lambda", "Terraform", "GitHub Actions"],
        description: "Infrastructure as Code portfolio hosted serverlessly on AWS with automated CI/CD deployment pipelines.",
        features: [
            "Terraform managed S3, CloudFront, and DynamoDB.",
            "Python Lambda function powering live visitor telemetry."
        ],
        image: ""
    }
};

function displayProject(projectKey) {
    const outputContainer = document.getElementById("project-output");
    const terminalBody = document.getElementById("project-terminal-body");
    const data = projectData[projectKey];
    if (!outputContainer || !data || !terminalBody) return;

    // 1. Remove the old active blinking cursor line from the bottom of the previous output if it exists
    const previousCursorLine = outputContainer.querySelector(".active-cursor-line");
    if (previousCursorLine) {
        previousCursorLine.remove();
    }

    // 2. Build the HTML block for THIS specific command execution
    let newEntryHTML = `
    <div class="terminal-log-entry" style="margin-bottom: 25px;">
    <p class="prompt">Arman@node-01:~/projects$ ./inspect.sh ${projectKey}.project</p>
    <br>
    <h3 class="project-title-print">[ ${data.title} ]</h3>
    <div>
    ${data.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
    </div>
    <p>> <strong>STATUS:</strong> DEPLOYED / ACTIVE</p>
    <p>> <strong>SUMMARY:</strong> ${data.description}</p>
    <br>
    <p>> <strong>KEY HIGHLIGHTS:</strong></p>
    <ul>
    ${data.features.map(feat => `<li style="margin-left: 20px;">- ${feat}</li>`).join('')}
    </ul>
    `;

    // Append image if present
    if (data.image) {
        newEntryHTML += `<br><img src="${data.image}" alt="${data.title}" class="project-img-preview">`;
    }

    newEntryHTML += `</div>`;

    // 3. APPEND the new content to the existing log instead of erasing!
    outputContainer.insertAdjacentHTML("beforeend", newEntryHTML);

    // 4. Append a new active terminal prompt and blinking cursor at the very end
    const activeCursorHTML = `
    <div class="active-cursor-line" style="margin-top: 15px;">
    <p><span class="prompt">Arman@node-01:~/projects$</span> <span class="blinking-cursor">_</span></p>
    </div>
    `;
    outputContainer.insertAdjacentHTML("beforeend", activeCursorHTML);

    // 5. Auto-scroll the terminal to the bottom to follow the newest execution
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Add Click Listeners to Sidebar Items
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".project-item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active state from all items
            items.forEach(i => i.classList.remove("active"));

            // Set active state on clicked item
            item.classList.add("active");

            // Render corresponding project details
            const projectKey = item.getAttribute("data-project");
            displayProject(projectKey);
        });
    });

    // Default load first project on start
    displayProject("rover");
});
