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

    command('banner');
    
    
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const text = textarea.value.trim();
            command(text);
            
            textarea.value = '';
            textarea.focus();
            
            
        }
    });
    
    function createInputDiv() {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-div');
        container.appendChild(inputDiv);
    
        const input_text = document.createElement('span');
        input_text.classList.add('input-text');
        inputDiv.appendChild(input_text);
    
        const prefixSpan = document.createElement('span');
        prefixSpan.classList.add('prefix');
        prefixSpan.textContent = prefix;
        input_text.appendChild(prefixSpan);
    
        const textSpan = document.createTextNode('');
        input_text.appendChild(textSpan);
    
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        cursor.textContent = ' ';
        inputDiv.appendChild(cursor);
    
        const updateInputDiv = () => {
            textSpan.textContent = textarea.value;
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
    
        const footer = document.getElementById('footer');
        footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    

    function command(cmd) {
        let command = cmd.split(' ')[0];
        switch(command.toLowerCase()) {
            case 'clear':
                clearTerminal();
                return createInputDiv();
            case 'help':
                printHelp();
                return setTimeout(() => createInputDiv(), Object.keys(help).length * delay);
            case 'username':
                let name = cmd.split(' ').slice(1).join(' ');
                if (name.length === 0 || name.length > 20 || cmd.split(' ').length > 2) {
                    printOutput(invalid + name + params);
                        return createInputDiv();
                } else {
                    changeUsername(name);
                }

                    return createInputDiv();
                case 'whoami':
                    printOutput(`You are ${guest_name}.`);
                    return createInputDiv();
                case 'whois':
                    printOutputs(whois);
                    return setTimeout(() => createInputDiv(), whois.length * delay);
                case 'contact':
                    printOutputs(contact);
                    return setTimeout(() => createInputDiv(), contact.length * delay);
                case 'github':
                printLinks(github);
                    return setTimeout(() => createInputDiv(), github.length * delay);
                case 'banner':
                    printOutputs(banner);
                    return setTimeout(() => createInputDiv(), banner.length * delay);
                case '':
                    printOutput('');
                    return createInputDiv();
                default:
                    printOutput(not + cmd + found);
                    return createInputDiv();
                
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
    
        const p = document.createElement('p');
        p.setAttribute('style', 'white-space: pre;');
        outputDiv.appendChild(p);
        container.appendChild(outputDiv);
    
        const entries = Object.entries(help);
        let index = 0;
    
        const interval = setInterval(() => {
            if (index < entries.length) {
                const [key, value] = entries[index];
    
                const cmdSpan = document.createElement('span');
                cmdSpan.classList.add('command');
                cmdSpan.textContent = key;
    
                p.appendChild(cmdSpan);
                p.appendChild(document.createTextNode(`\r\n     - ${value}\r\n`));
                
                const footer = document.getElementById('footer');
                footer.scrollIntoView({ behavior: 'smooth', block: 'end' });    
                
                index++;
            } else {
                clearInterval(interval);
            }
        }, delay);
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
        p.setAttribute('style', 'white-space: pre-wrap;'); // použij 'pre-wrap' pro lepší zalomení
        outputDiv.appendChild(p);
        container.appendChild(outputDiv);
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < texts.length) {
                const line = texts[index];
                const words = line.split(/(\s+)/); // zachová mezery jako samostatné prvky
                
                words.forEach(word => {
                    // Ověření, zda je slovo v uvozovkách ('' nebo "")
                    if (word.startsWith("'") && word.endsWith("'")) {
                        const commandWord = word.slice(1, -1); // odstraní uvozovky
                        
                        if (help.hasOwnProperty(commandWord)) {
                            const cmdSpan = document.createElement('span');
                            cmdSpan.classList.add('command');
                            cmdSpan.textContent = `'${commandWord}'`; // přidá zpět uvozovky
                            p.appendChild(cmdSpan);
                        } else {
                            p.appendChild(document.createTextNode(word)); // pokud není v help, zobrazí to jako text
                        }
                    } else {
                        p.appendChild(document.createTextNode(word)); // přidá obyčejný text
                    }
                });
                
                const footer = document.getElementById('footer');
                footer.scrollIntoView({ behavior: 'smooth', block: 'end' });    
                p.appendChild(document.createTextNode('\r\n'));
                index++;
            } else {
                clearInterval(interval);
            }
        }, delay);
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
            const footer = document.getElementById('footer');
            footer.scrollIntoView({ behavior: 'smooth', block: 'end' });    
 
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

