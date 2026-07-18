// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');
        const isOpen = mainNav.classList.contains('nav-open');
        mobileMenuToggle.querySelector('span').textContent = isOpen ? '✕ close' : '☰ menu';
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('nav-open');
            mobileMenuToggle.querySelector('span').textContent = '☰ menu';
        });
    });
}

// Terminal functionality
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.getElementById('terminalBody');

// Command history
let commandHistory = [];
let historyIndex = -1;

// Resume data for LLM context
const resumeData = {
    name: "Mohamed Anas VT",
    role: "Senior Software Engineer",
    email: "anasvakyathodi@gmail.com",
    phone: "+91 9656551078",
    location: "Kerala, India",
    education: [
        {
            degree: "M.Tech in Computer Science",
            institution: "Maulana Azad National Urdu University",
            location: "Hyderabad, India",
            duration: "Oct 2021 - Apr 2023",
            cgpa: "8.95"
        },
        {
            degree: "B.Tech in Computer Science and Engineering",
            institution: "Government Engineering College, Sreekrishnapuram",
            location: "Palakkad, India",
            duration: "2017 - 2021",
            cgpa: "8.65"
        }
    ],
    experience: [
        {
            role: "Software Developer Engineer",
            company: "Highlevel",
            duration: "Sep 2022 - Present",
            location: "Remote",
            description: "Leading development of AI-powered email template generation, analytics dashboards, and branding tools. Building systems for template sharing and email performance tracking."
        },
        {
            role: "Full Stack Developer Intern",
            company: "Velosity Global Solutions India Pvt Ltd.",
            duration: "Feb 2022 - May 2022",
            location: "Chennai, Tamilnadu"
        },
        {
            role: "Full Stack Engineer",
            company: "Perfortricks",
            duration: "Jul 2021 - Dec 2021",
            location: "Remote"
        }
    ],
    projects: [
        {
            name: "Email AI",
            description: "Conversational AI system built with LangChain and LangGraph for email template creation with natural language interface"
        },
        {
            name: "Email Template Builder",
            description: "Comprehensive email marketing platform with template builder, analytics dashboard, and tag automation"
        },
        {
            name: "Brand Boards",
            description: "Unified branding system with AI-powered brand kit generation, global colors, and brand voice"
        },
        {
            name: "Perfortricks",
            description: "Marketing analytics platform integrating multiple advertising platforms"
        }
    ],
    extensions: [
        {
            name: "Citely",
            version: "1.0.0",
            users: 2,
            url: "https://chromewebstore.google.com/detail/nbhcjnhaikhhjcpcpgfbikdegadmbaln",
            description: "AI Search visibility audit — analyze how your site shows up in AI-powered search results"
        },
        {
            name: "Replr",
            version: "1.0.0",
            users: 2,
            rating: 5,
            url: "https://chromewebstore.google.com/detail/mimmbhcdmnlcbcmdcoaoaoaenifmbldi",
            description: "AI-drafted LinkedIn messages — context-aware replies and outreach inside LinkedIn"
        },
        {
            name: "Verbex",
            version: "1.0.0",
            users: 11,
            rating: 5,
            url: "https://chromewebstore.google.com/detail/dgioacefjlabmiglebdkejblocflhahi",
            description: "YouTube Transcript Exporter — grab full video transcripts in one click"
        },
        {
            name: "Folio",
            version: "0.4.0",
            users: 11,
            url: "https://chromewebstore.google.com/detail/floedamdhiaahnipjhomekibenklinok",
            description: "PDF editor in the browser — view, annotate, and edit PDFs without leaving Chrome"
        },
        {
            name: "Krumb",
            version: "1.0.0",
            users: 1,
            url: "https://chromewebstore.google.com/detail/aipcolidojbgfjodidmloekakimgiild",
            description: "Auto-rejects cookie banners on every site. Open-source. Zero tracking"
        },
        {
            name: "Email Builder Tools",
            version: "2.2.0",
            users: 14,
            description: "Private extension used internally for email builder dev actions"
        }
    ],
    skills: {
        frontend: ["Vue.js", "Nuxt.js", "React.js", "Handlebars", "Tailwind CSS", "Material UI", "Bootstrap", "GraphQL", "Webpack"],
        backend: ["Node.js", "Nest.js", "LangChain", "LangGraph"],
        databases: ["Redis", "MongoDB", "Clickhouse", "MySQL"],
        languages: ["JavaScript", "Python", "HTML5", "CSS3"]
    }
};

// Built-in commands
const commands = {
    help: () => {
        return `Available commands:
  <strong>help</strong>       - Show this help message
  <strong>about</strong>      - Display information about me
  <strong>skills</strong>     - List my technical skills
  <strong>projects</strong>   - Show my featured projects
  <strong>extensions</strong> - List my Chrome extensions
  <strong>experience</strong> - Display work experience
  <strong>education</strong>  - Show educational background
  <strong>contact</strong>    - Get my contact information
  <strong>download-resume</strong> - Download my resume (PDF)
  <strong>clear</strong>      - Clear the terminal
  
You can also ask me questions naturally, like:
  "What projects have you built?"
  "Tell me about your experience at Highlevel"
  "What technologies do you know?"`;
    },

    about: () => {
        return `<strong>${resumeData.name}</strong>
${resumeData.role}

Passionate full-stack developer with expertise in building scalable web 
applications, AI-powered tools, and modern digital experiences. Currently 
innovating in the email template generation, analytics, and branding space at Highlevel.

<strong>Location:</strong> ${resumeData.location}
<strong>Email:</strong> <a href="mailto:${resumeData.email}">${resumeData.email}</a>
<strong>Phone:</strong> ${resumeData.phone}

<strong>Social:</strong>
  LinkedIn: <a href="https://linkedin.com/in/anasvakyathodi" target="_blank">linkedin.com/in/anasvakyathodi</a>
  GitHub: <a href="https://github.com/anasvakyathodi" target="_blank">github.com/anasvakyathodi</a>`;
    },

    skills: () => {
        let output = '<strong>Technical Skills:</strong>\n\n';
        output += `<strong>Frontend Development:</strong>\n  ${resumeData.skills.frontend.join(', ')}\n\n`;
        output += `<strong>Backend Development:</strong>\n  ${resumeData.skills.backend.join(', ')}\n\n`;
        output += `<strong>Databases:</strong>\n  ${resumeData.skills.databases.join(', ')}\n\n`;
        output += `<strong>Programming Languages:</strong>\n  ${resumeData.skills.languages.join(', ')}`;
        return output;
    },

    projects: () => {
        let output = '<strong>Featured Projects:</strong>\n\n';
        resumeData.projects.forEach((project, index) => {
            output += `<strong>${index + 1}. ${project.name}</strong>\n   ${project.description}\n\n`;
        });
        return output;
    },

    extensions: () => {
        let output = '<strong>Chrome Extensions:</strong>\n\n';
        resumeData.extensions.forEach((ext, index) => {
            const stats = [`v${ext.version}`, `${ext.users} user${ext.users === 1 ? '' : 's'}`];
            if (ext.rating) {
                stats.unshift(`★ ${ext.rating.toFixed(1)}`);
            }
            const name = ext.url
                ? `<a href="${ext.url}" target="_blank">${ext.name}</a>`
                : ext.name;
            output += `<strong>${index + 1}. ${name}</strong> (${stats.join(' | ')})\n   ${ext.description}\n\n`;
        });
        return output;
    },

    experience: () => {
        let output = '<strong>Work Experience:</strong>\n\n';
        resumeData.experience.forEach((exp, index) => {
            output += `<strong>${index + 1}. ${exp.role}</strong>\n`;
            output += `   ${exp.company}\n`;
            output += `   ${exp.duration} | ${exp.location}\n`;
            if (exp.description) {
                output += `   ${exp.description}\n`;
            }
            output += '\n';
        });
        return output;
    },

    education: () => {
        let output = '<strong>Educational Background:</strong>\n\n';
        resumeData.education.forEach((edu, index) => {
            output += `<strong>${index + 1}. ${edu.degree}</strong>\n`;
            output += `   ${edu.institution}\n`;
            output += `   ${edu.location} | ${edu.duration}\n`;
            output += `   CGPA: ${edu.cgpa}\n\n`;
        });
        return output;
    },

    contact: () => {
        return `<strong>Contact Information:</strong>

<strong>Email:</strong> <a href="mailto:${resumeData.email}">${resumeData.email}</a>
<strong>Phone:</strong> <a href="tel:${resumeData.phone}">${resumeData.phone}</a>
<strong>Location:</strong> ${resumeData.location}

<strong>Social Media:</strong>
  LinkedIn: <a href="https://linkedin.com/in/anasvakyathodi" target="_blank">linkedin.com/in/anasvakyathodi</a>
  GitHub: <a href="https://github.com/anasvakyathodi" target="_blank">github.com/anasvakyathodi</a>

Feel free to reach out for collaborations or opportunities!`;
    },

    'download-resume': () => {
        // Trigger download of resume PDF
        const link = document.createElement('a');
        link.href = 'MOHAMED-ANAS-VT-Resume-20251122.pdf';
        link.download = 'Anas-Vakyathodi-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return `<strong>Downloading Resume...</strong>

Your resume download should start automatically. If it doesn't, please check your downloads folder or try again.

<strong>Filename:</strong> Anas-Vakyathodi-Resume.pdf`;
    },

    clear: () => {
        terminalOutput.innerHTML = '';
        return null;
    }
};

// API Configuration
const API_ENDPOINT = 'https://portfolio-nsqxi0cci-anasvakyathodis-projects.vercel.app/api/chat';


// Handle LLM API call through secure backend
async function callLLMAPI(userInput) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userInput: userInput
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            return data.response;
        } else {
            throw new Error(data.error || 'Unknown error');
        }

    } catch (error) {
        console.error('API Error:', error);

        // Fallback to keyword matching if API fails
        const input = userInput.toLowerCase();

        if (input.includes('extension') || input.includes('chrome')) {
            return commands.extensions();
        } else if (input.includes('project') || input.includes('built') || input.includes('work on')) {
            return commands.projects();
        } else if (input.includes('skill') || input.includes('technology') || input.includes('know')) {
            return commands.skills();
        } else if (input.includes('experience') || input.includes('worked') || input.includes('job')) {
            return commands.experience();
        } else if (input.includes('education') || input.includes('study') || input.includes('degree')) {
            return commands.education();
        } else if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
            return commands.contact();
        } else if (input.includes('who') || input.includes('about you')) {
            return commands.about();
        } else if (input.includes('download') || input.includes('resume') || input.includes('cv')) {
            return commands['download-resume']();
        } else {
            return `I encountered an issue connecting to the AI service. Try using these commands instead:
  - <code>help</code> - See all available commands
  - <code>about</code> - Learn about me
  - <code>skills</code> - View technical skills
  - <code>projects</code> - See my projects
  - <code>download-resume</code> - Download my resume`;
        }
    }
}

// Add output to terminal
function addOutput(command, response) {
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="terminal-prompt">guest@anas:~$</span> <span>${command}</span>`;
    terminalOutput.appendChild(commandLine);

    if (response) {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        responseLine.innerHTML = `<div class="response-text">${response}</div>`;
        terminalOutput.appendChild(responseLine);
    }

    // Add spacing
    const spacer = document.createElement('div');
    spacer.style.marginTop = '1rem';
    terminalOutput.appendChild(spacer);

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Process command
async function processCommand(input) {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    // Add to history
    commandHistory.unshift(trimmedInput);
    historyIndex = -1;

    // Check for built-in commands
    const commandName = trimmedInput.toLowerCase().split(' ')[0];

    if (commands[commandName]) {
        const response = commands[commandName]();
        addOutput(trimmedInput, response);
    } else {
        // Show loading
        addOutput(trimmedInput, '<span class="loading">Processing</span>');

        // Call LLM API
        const response = await callLLMAPI(trimmedInput);

        // Remove loading, add response
        const lastResponse = terminalOutput.lastChild.previousSibling;
        if (lastResponse && lastResponse.querySelector('.loading')) {
            lastResponse.querySelector('.response-text').innerHTML = response;
        }
    }
}

// Handle input
terminalInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const input = terminalInput.value;
        terminalInput.value = ''; // Clear immediately
        await processCommand(input);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            historyIndex = -1;
            terminalInput.value = '';
        }
    }
});

// Keep terminal input focused
terminalBody.addEventListener('click', () => {
    terminalInput.focus();
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav highlighting + header state + scroll progress
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');
const siteHeader = document.getElementById('siteHeader');
const scrollProgress = document.getElementById('scrollProgress');

let scrollTicking = false;

function onScroll() {
    let current = '';

    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    if (siteHeader) {
        siteHeader.classList.toggle('scrolled', window.pageYOffset > 40);
    }

    if (scrollProgress) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.pageYOffset / scrollable : 0;
        scrollProgress.style.transform = `scaleX(${progress})`;
    }
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
            onScroll();
            scrollTicking = false;
        });
    }
});
onScroll();

// Scroll-reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Reveal targets, staggered per section so delays reset for each group
document.querySelectorAll('section').forEach(section => {
    const targets = section.querySelectorAll(
        '.section-header, .content-block, .card, .skill-category, .profile-section, .footer-links, .ext-card'
    );
    targets.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.4)}s`);
        observer.observe(el);
    });
});

// Auto-focus terminal on page load
window.addEventListener('load', () => {
    terminalInput.focus();
});

// Tab completion (basic)
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.toLowerCase();
        const matchedCommands = Object.keys(commands).filter(cmd => cmd.startsWith(input));

        if (matchedCommands.length === 1) {
            terminalInput.value = matchedCommands[0];
        } else if (matchedCommands.length > 1) {
            addOutput(input, `Possible completions: ${matchedCommands.join(', ')}`);
        }
    }
});

// Easter eggs
const easterEggs = {
    'sudo': () => 'Nice try! But you don\'t have sudo privileges here. 😄',
    'ls': () => 'about.txt  skills.json  projects.md  experience.log  contact.yaml',
    'pwd': () => '/home/anas/portfolio',
    'whoami': () => 'guest',
    'date': () => new Date().toString(),
    'echo': (args) => args.join(' ')
};

// Check for easter eggs in command processing
const originalProcessCommand = processCommand;
processCommand = async function (input) {
    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();

    if (easterEggs[cmd]) {
        const response = typeof easterEggs[cmd] === 'function'
            ? easterEggs[cmd](parts.slice(1))
            : easterEggs[cmd];
        addOutput(input, response);
    } else {
        await originalProcessCommand(input);
    }
};

console.log('%c> Welcome to the terminal!', 'color: #00ff41; font-family: monospace; font-size: 14px;');
console.log('%cType "help" to see available commands', 'color: #666; font-family: monospace; font-size: 12px;');
