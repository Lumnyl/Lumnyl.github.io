var html_body = document.querySelector("body")
var is_darkmode = (localStorage.getItem("is_darkmode") === null) ? false : localStorage.getItem("is_darkmode")
var is_minimize = (localStorage.getItem("is_minimize") === null) ? false : localStorage.getItem("is_minimize")
if (is_darkmode === "true") html_body.classList.add("darkmode")

var last_website_update = "8 August 2025"

var footer_separator = document.createElement("hr")
var last_updated = document.createElement("p")
var changelog_link = document.createElement("a")
changelog_link.textContent =  last_website_update
changelog_link.href = "/changelog.html"
last_updated.classList.add("italic")
last_updated.textContent = "Latest website update : "
last_updated.appendChild(changelog_link)

var source_code = document.createElement("p")
var source_link = document.createElement("a")
source_link.textContent = "Source code on github"
source_link.href = "https://github.com/Lumnyl/Lumnyl.github.io"
source_code.appendChild(source_link)
source_code.classList.add("italic")

html_body.appendChild(footer_separator)
html_body.appendChild(last_updated)
html_body.appendChild(source_code)

var floater = document.createElement("div")
floater.classList.add("floater")

var floater_elem1 = document.createElement("p")
floater_elem1.classList.add("can_minimize")
if (is_minimize === "true") floater_elem1.classList.add("hide")
floater.appendChild(floater_elem1)

var floater_darkmode_toggle = document.createElement("input")
floater_darkmode_toggle.type = "checkbox"
floater_darkmode_toggle.checked = (is_darkmode === "true")
floater_darkmode_toggle.id = "darkmode_toggle"

floater_darkmode_toggle.addEventListener("click", function() {
    (floater_darkmode_toggle.checked) ? html_body.classList.add("darkmode") : html_body.classList.remove("darkmode")
    is_darkmode = floater_darkmode_toggle.checked
    localStorage.setItem("is_darkmode", is_darkmode)
})

var floater_darkmode_label = document.createElement("label")
floater_darkmode_label.setAttribute("for", "darkmode_toggle")
floater_darkmode_label.classList.add("floater_clickable")
floater_darkmode_label.textContent = "Toggle dark mode"

floater_elem1.appendChild(floater_darkmode_toggle)
floater_elem1.appendChild(floater_darkmode_label)

var floater_elem2 = document.createElement("p")
floater_elem2.classList.add("can_minimize")
if (is_minimize === "true") floater_elem2.classList.add("hide")
floater.appendChild(floater_elem2)

var return_home = document.createElement("a")
return_home.textContent = "Return to homepage"
return_home.classList.add("floater_clickable")
return_home.href = "/"
floater_elem2.appendChild(return_home)

var floater_elem3 = document.createElement("p")
floater_elem3.classList.add("can_minimize")
if (is_minimize === "true") floater_elem3.classList.add("hide")
floater.appendChild(floater_elem3)

var scroll_top = document.createElement("span")
scroll_top.textContent = "Scroll back to the top"
scroll_top.classList.add("floater_clickable")
floater_elem3.appendChild(scroll_top)

scroll_top.addEventListener("click", function() {
    window.scrollTo({top:0,behavior:'smooth'});
})

var floater_minimize = document.createElement("p")
floater.appendChild(floater_minimize)
var floater_minimize_toggle = document.createElement("input")
floater_minimize_toggle.type = "checkbox"
floater_minimize_toggle.checked = (is_minimize === "true")
floater_minimize_toggle.id = "minimize_toggle"

floater_minimize_toggle.addEventListener("click", function() {
    let minimize_list = document.querySelectorAll(".can_minimize")
    for (let elem of minimize_list) {
        (floater_minimize_toggle.checked) ? elem.classList.add("hide") : elem.classList.remove("hide")
    }
    is_minimize = floater_minimize_toggle.checked
    localStorage.setItem("is_minimize", is_minimize)
})

var floater_minimize_label = document.createElement("label")
floater_minimize_label.setAttribute("for", "minimize_toggle")
floater_minimize_label.classList.add("floater_clickable")
floater_minimize_label.textContent = "Minimize"
floater_minimize.appendChild(floater_minimize_toggle)
floater_minimize.appendChild(floater_minimize_label)



html_body.appendChild(floater)