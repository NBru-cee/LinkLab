let myLinks = [];
const ulEl = document.querySelector("#ul-ele");
const inputEl = document.querySelector("#input-ele");
const saveBtn = document.querySelector("#save-btn");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));
const deleteBtn = document.querySelector("#delete-btn");
const clearBtn = document.querySelector("#clear-btn");
const saveTabBtn = document.querySelector("#save-tab-btn");
if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage;
    render(myLinks);
}
//saving links from local storage
saveTabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        myLinks.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    });
});
//main function
function render(links) {
    let listItems = "";
    for (let i = 0; i < links.length; i++) {
        listItems += `
                <li>
                    <a target = "_blank"  href="${links[i]}">${links[i]}</a>
                </li>`;
    }
    ulEl.innerHTML = listItems;
}
//delete links
deleteBtn.addEventListener("click", () => {
    myLinks.pop();
    render(myLinks);
});
//clear links saved
clearBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLinks = [];
    render(myLinks);
});
//save link
saveBtn.addEventListener("click", () => {
    myLinks.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
});
