var html_body = document.querySelector("body")
var is_darkmode = (localStorage.getItem("is_darkmode") === null) ? false : localStorage.getItem("is_darkmode")
var is_minimise = (localStorage.getItem("is_minimise") === null) ? false : localStorage.getItem("is_minimise")
if (is_darkmode === "true") html_body.classList.add("darkmode")

var last_website_update = "14 June 2024"

var footer_separator = document.createElement("hr")
var last_updated = document.createElement("p")
var changelog_link = document.createElement("a")
changelog_link.textContent =  last_website_update
changelog_link.href = "/changelog.html"
last_updated.classList.add("italic")
last_updated.textContent = "Latest website update : "
last_updated.appendChild(changelog_link)

html_body.appendChild(footer_separator)
html_body.appendChild(last_updated)

var floater = document.createElement("div")
floater.classList.add("floater")

var floater_elem1 = document.createElement("p")
floater_elem1.classList.add("can_minimise")
if (is_minimise === "true") floater_elem1.classList.add("hide")
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
floater_elem2.classList.add("can_minimise")
if (is_minimise === "true") floater_elem2.classList.add("hide")
floater.appendChild(floater_elem2)

var return_home = document.createElement("a")
return_home.textContent = "Return to homepage"
return_home.classList.add("floater_clickable")
return_home.href = "/"
floater_elem2.appendChild(return_home)

var floater_minimise = document.createElement("p")
floater.appendChild(floater_minimise)
var floater_minimise_toggle = document.createElement("input")
floater_minimise_toggle.type = "checkbox"
floater_minimise_toggle.checked = (is_minimise === "true")
floater_minimise_toggle.id = "minimise_toggle"

floater_minimise_toggle.addEventListener("click", function() {
    let minimise_list = document.querySelectorAll(".can_minimise")
    for (let elem of minimise_list) {
        (floater_minimise_toggle.checked) ? elem.classList.add("hide") : elem.classList.remove("hide")
    }
    is_minimise = floater_minimise_toggle.checked
    localStorage.setItem("is_minimise", is_minimise)
})

var floater_minimise_label = document.createElement("label")
floater_minimise_label.setAttribute("for", "minimise_toggle")
floater_minimise_label.classList.add("floater_clickable")
floater_minimise_label.textContent = "Minimise"
floater_minimise.appendChild(floater_minimise_toggle)
floater_minimise.appendChild(floater_minimise_label)

html_body.appendChild(floater)