var last_website_update = "7th of March 2024"

var html_body = document.querySelector("body")
var footer_separator = document.createElement("hr")
var last_updated = document.createElement("p")
last_updated.classList.add("italic")
last_updated.textContent = "Website last updated on the " + last_website_update
var return_home = document.createElement("a")
return_home.textContent = "Return to homepage"
return_home.href = "/"

html_body.appendChild(footer_separator)
html_body.appendChild(last_updated)
html_body.appendChild(return_home)