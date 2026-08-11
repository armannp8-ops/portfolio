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
        termCursor.style.display = "none";
        setTimeout(() => {
            cmdOutput.style.display = "block";
        }, 150);
    }
}

// --- 3. PROJECTS TERMINAL EXPLORER LOGIC ---
const projectData = {
    rover: {
        title: "ROS2 Autonomous Mobile Security Rover",
        tags: ["ROS2", "Raspberry Pi", "ESP32", "Python", "C++"],
        description: "Autonomous security rover designed for proactive intrusion detection, continuous patrol, and event-driven threat response. Integrates LiDAR-based SLAM, Nav2 autonomous navigation, mmWave human detection, environmental sensing, and distributed wireless perimeter nodes into a unified security platform.",
        features: [
            "Built a ROS 2 autonomous navigation stack using SLAM Toolbox + Nav2 for mapping, localization, path planning, and obstacle avoidance.",
            "Implemented a Raspberry Pi + ESP32 distributed architecture, separating high-level autonomy from real-time motor control and sensor acquisition.",
            "Developed a dual-layer security system where remote ESP32 WSN nodes can trigger the rover to autonomously navigate to the intrusion location for visual verification.",
            "Integrated RPLIDAR, LD2420 mmWave radar, IMU, MQ-135, DHT11, and camera for navigation, intrusion detection, and environmental monitoring.",
            "Developed a mobile-responsive web dashboard with live video, SLAM map visualization, telemetry, alerts, operational modes, and manual teleoperation.",
            "Validated the system through Gazebo simulation and physical deployment, including autonomous patrol, dynamic obstacle avoidance, and remote intrusion-response scenarios."
        ],
        image: "assets/rover.jpeg"
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

    // Remove active blinking cursor line from previous output
    const previousCursorLine = outputContainer.querySelector(".active-cursor-line");
    if (previousCursorLine) {
        previousCursorLine.remove();
    }

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

    if (data.image) {
        newEntryHTML += `<br><img src="${data.image}" alt="${data.title}" class="project-img-preview">`;
    }

    newEntryHTML += `</div>`;

    // Append output
    outputContainer.insertAdjacentHTML("beforeend", newEntryHTML);

    // Append active cursor line at bottom
    const activeCursorHTML = `
    <div class="active-cursor-line" style="margin-top: 15px;">
    <p><span class="prompt">Arman@node-01:~/projects$</span> <span class="blinking-cursor">_</span></p>
    </div>
    `;
    outputContainer.insertAdjacentHTML("beforeend", activeCursorHTML);

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function clearTerminal() {
    const outputContainer = document.getElementById("project-output");
    if (outputContainer) {
        outputContainer.innerHTML = `
        <div class="active-cursor-line">
            <p><span class="prompt">Arman@node-01:~/projects$</span> <span class="blinking-cursor">_</span></p>
        </div>
        `;
    }
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();

    const introSection = document.querySelector(".intro-section");
    if (introSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasTyped) {
                    typeCommand();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(introSection);
    }

    // Handle project clicks and clear action
    const items = document.querySelectorAll(".project-item");
    items.forEach(item => {
        item.addEventListener("click", () => {
            const action = item.getAttribute("data-action");
            const projectKey = item.getAttribute("data-project");

            if (action === "clear") {
                clearTerminal();
            } else if (projectKey) {
                items.forEach(i => {
                    if (!i.classList.contains("clear-action")) {
                        i.classList.remove("active");
                    }
                });
                item.classList.add("active");
                displayProject(projectKey);
            }
        });
    });

    // Default load first project
    displayProject("rover");
});
