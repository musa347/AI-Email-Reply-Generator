console.log("Email sent");

function findComposeToolbar() {
    const  selectors = [
        '.aDh',
        '.btC',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
        return null;
    }
}
function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3'; // Matches Send button
    button.style.marginLeft = '8px'; // Space between Send and AI Reply
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}


function getEmailContent() {
    const  selectors = [
        '.a3s.aiL',
        '.h7',
        'gmail_quote',
        '[role="[presentation]"]',
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
        return '';
    }
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolBar = findComposeToolbar();
    if (!toolBar) {
        console.log("Compose toolbar not found");
        return;
    }
    console.log("Compose toolbar found, creating Ai button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async() => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const  emailContent = getEmailContent();
          const response = await  fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"

                }),
            });
            if (!response.ok) {
                throw new Error ('API Request Error');
            }

           const  generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.log("Compose box not found");
            }

        }catch (error) {
            console.error("Error generating reply:", error);
            alert("Failed to generate reply")

        }finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }

    });

    const sendButton = document.querySelector('.T-I.J-J5-Ji.aoO'); // Gmail Send button class
    if (sendButton && sendButton.parentNode) {
        sendButton.parentNode.appendChild(button); // Places AI Reply beside Send
    } else {
        toolBar.appendChild(button); // Fallback in case Send button is not found
    }

}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );
        if (hasComposeElements) {
            console.log("Compose elements detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
