var last_website_update = "8 March 2024"

var html_body = document.querySelector("body")
var footer_separator = document.createElement("hr")
var last_updated = document.createElement("p")
var changelog_link = document.createElement("a")
changelog_link.textContent =  last_website_update
changelog_link.href = "/changelog.html"
last_updated.classList.add("italic")
last_updated.textContent = "Latest website update : "
last_updated.appendChild(changelog_link)
var return_home = document.createElement("a")
return_home.textContent = "Return to homepage"
return_home.href = "/"

html_body.appendChild(footer_separator)
html_body.appendChild(last_updated)
html_body.appendChild(return_home)