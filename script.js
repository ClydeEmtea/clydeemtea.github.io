document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('textarea');
    const container = document.querySelector('.container');
    let guest_name = "guest";
    let prefix = guest_name + "@clydeemtea.github.io:~$ ";

    if (textarea) {
        setTimeout(() => textarea.focus(), 0);
        textarea.addEventListener('blur', () => {
            setTimeout(() => textarea.focus(), 0);
        });
    }

    
    createInputDiv();
    
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const text = textarea.value.trim();
            command(text);
            
            textarea.value = '';
            textarea.focus();
            
            createInputDiv();
            
        }
    });
    
    function createInputDiv() {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-div');
        container.appendChild(inputDiv);
        
        const input_text = document.createElement('span');
        input_text.textContent = prefix;
        input_text.classList.add('input-text');
        inputDiv.appendChild(input_text);
        
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        cursor.textContent = ' ';
        inputDiv.appendChild(cursor);


        const updateInputDiv = () => {
            input_text.textContent = prefix + textarea.value;
            
            inputDiv.appendChild(cursor);
        };

        textarea.addEventListener('input', updateInputDiv);

        textarea.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                textarea.removeEventListener('input', updateInputDiv);
                textarea.removeEventListener('keydown', updateInputDiv);
                if (inputDiv.contains(cursor)) {
                    inputDiv.removeChild(cursor);
                }

            }
        });
        inputDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function command(cmd) {
        let command = cmd.split(' ')[0];
        switch(command.toLowerCase()) {
            case 'clear':
                clearTerminal();
                return "Terminal cleared.";
            case 'help':
                printHelp();
                return "Available commands listed.";
            case 'username':
                let name = cmd.split(' ').slice(1).join(' ');
                if (name.length === 0 || name.length > 20 || cmd.split(' ').length > 2) {
                    printOutput(invalid + name + params);
                    return `Invalid username: ${name}`;
                } else {
                    changeUsername(name);
                }

                return `Username set to ${guest_name}`;
            case 'whoami':
                printOutput(`You are ${guest_name}.`);
                return `You are ${guest_name}.`;
            case 'whois':
                printOutputs(whois);
                return "Information about the creator displayed.";
            case 'contact':
                printOutputs(contact);
                return "Contact information displayed.";
            case 'github':
                printLinks(github);
                return "GitHub profile link displayed.";
            case '':
                printOutput('');
                return "No command entered.";
            default:
                printOutput(not + cmd + found);
                return `Command not found: ${cmd}`;
    
        }
    }
    
    function clearTerminal() {
        const container = document.querySelector('.container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    function printHelp() {
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('output');
        
        Object.entries(help).forEach(([key, value]) => {
            const p = document.createElement('p');
            p.setAttribute('style', 'white-space: pre;');
            const cmd = document.createElement('span');
            cmd.classList.add('command');
            cmd.textContent = key;
            p.appendChild(cmd);
            p.textContent += `\r\n     - ${value}`;
            
 
            outputDiv.appendChild(p);
        });
    
        container.appendChild(outputDiv);
    }
    
    function printOutput(text) {
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('output');
        const p = document.createElement('p');
        p.setAttribute('style', 'white-space: pre;');
        p.textContent = text;
        outputDiv.appendChild(p);
        container.appendChild(outputDiv);
    }

    function printOutputs(texts) {
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('output');
        const p = document.createElement('p');
        p.setAttribute('style', 'white-space: pre;');
        
        texts.forEach(text => {
            p.textContent += text + '\r\n';
 
        });
        outputDiv.appendChild(p);
    
        container.appendChild(outputDiv);
    }
    function printLinks(texts) {
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('output');
        const p = document.createElement('p');
        p.setAttribute('style', 'white-space: pre;');

        
        texts.forEach(text => {
            const a = document.createElement('a');
            a.setAttribute('href', text);
            a.textContent += text + '\r\n';
            p.appendChild(a);
 
        });
        outputDiv.appendChild(p);
    
        container.appendChild(outputDiv);
    }

    function changeUsername(name) {
        guest_name = name;
        prefix = guest_name + "@clydeemtea.github.io:~$ ";
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('output');
        const p = document.createElement('p');
        p.setAttribute('style', 'white-space: pre;');
        outputDiv.appendChild(p);
        container.appendChild(outputDiv);
    }
    
});

