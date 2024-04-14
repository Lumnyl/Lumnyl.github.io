const category_selector = document.querySelector("#category_select")
category_selector.addEventListener("change", change_selected_category)
const subcategory_selector = document.querySelector("#subcategory_select")
subcategory_selector.addEventListener("change", change_selected_subcategory)

const active_table = document.querySelector("#active_table")

const head_lists = {
    "weapons": [
        ["name", "Name"],
        ["category", "Category"],
        ["ammo", "Ammo type(s)"],
        ["primary", "Primary fire"],
        ["secondary", "Secondary fire"],
        ["notes", "Notes"],
        ["description", "Description"],
        ["superior", "Upgrades"],
    ],
    "enemies": [],
    "items": []
}

const weapon_categ_list = [
    "Melee",
    "Sidearm",
    "Shotgun",
    "SSG",
    "Automatic",
    "Precision",
    "Launcher",
    "Special",
    "Superweapon",
    "Throwable",
    "Artifact"
]

const quicknotesweapons = `<li>Demon energy is sometimes dropped by demons on death. Bigger demons drop more.</li>
<li>Grenades are sometimes dropped by former humans. Backpacks give 5.</li>
<li>Durability weapons can break and must be repaired with repair kits.</li>
<li>Upgrades are like Pandemonia Superior augments or Arcane keys. Basically a special upgrade unlocked by an item.</li>
<li>Level 0 is the baseline for artifacts.</li>
<li>Lore is whatever. The war against hell is still going and shooting at it until it dies is still the best combat strategy.</li>
<li>I don't have any plans to turn them into functional weapons.</li>`

const quicknotesitems = `Not yet implemented`
const quicknotesenemies = `Not yet implemented`

import weapon_list from "./weapons.js"

document.querySelector("#weapon_amount").textContent = weapon_list.length

function change_selected_category() {
    let selected_category = category_selector.value
    active_table.innerHTML = ""
    subcategory_selector.innerHTML = ""

    let option = document.createElement("option")
    option.textContent = `All`
    option.value = `0`
    subcategory_selector.appendChild(option)
    if (selected_category == "weapons") {
        for (let index in weapon_categ_list) {
            let option = document.createElement("option")
            option.textContent = `${weapon_categ_list[index]}`
            option.value = `${eval(index) + 1}`
            subcategory_selector.appendChild(option)
        }
        build_weapon_table()
        document.querySelector("#quicknotes").innerHTML = quicknotesweapons
    }
    if (selected_category == "items") {
        document.querySelector("#quicknotes").innerHTML = quicknotesitems
    }
    if (selected_category == "enemies") {
        document.querySelector("#quicknotes").innerHTML = quicknotesenemies
    }
}

function change_selected_subcategory() {
    let selected_category = category_selector.value
    active_table.innerHTML = ""
    if (selected_category == "weapons") {
        build_weapon_table()
    }
}

function build_weapon_table() {
    let table_head = document.createElement("thead")
    let table_body = document.createElement("tbody")
    active_table.appendChild(table_head)
    active_table.appendChild(table_body)
    let weapon_head = document.createElement("tr")
    table_head.appendChild(weapon_head)
    for (let item of head_lists.weapons) {
        let cell = document.createElement("td")
        cell.id = item[0]
        cell.textContent = item[1]
        weapon_head.appendChild(cell)
    }
    for (let weapon of weapon_list) {
        if (subcategory_selector.value == 0 || weapon_categ_list[subcategory_selector.value-1] == weapon.category) {
            let row = document.createElement("tr")
            for (let item of head_lists.weapons) {
                let cell = document.createElement("td")
                if (weapon.category == "Artifact" && item[0] == "superior") {
                    let level_list = document.createElement("ol")
                    cell.appendChild(level_list)
                    for (let level in weapon.superior) {
                        let level_elem = document.createElement("li")
                        level_elem.textContent = weapon.superior[level]
                        level_list.appendChild(level_elem)
                    }
                } else {
                    cell.textContent = weapon[item[0]]
                    if (weapon.durability && item[0] == "category") { 
                        cell.textContent += " - Durability"
                    }
                }
                row.appendChild(cell)
            }
            table_body.appendChild(row)
        }
    }
}

change_selected_category()