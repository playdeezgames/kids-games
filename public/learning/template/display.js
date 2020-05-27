export class Display {
    static setContent(content) {
        document.body.innerHTML = content
    }
    static commandButton(caption,tokens){
        return `<button onclick="doCommand(['${tokens.join("','")}'])">${caption}</button>`
    }
}