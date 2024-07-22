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
    "enemies": [
        ["name", "Name"],
        ["category", "Category"],
        ["species", "Species"],
        ["description", "Description"],
    ],
    "items": [
        ["name", "Name"],
        ["category", "Category"],
        ["type", "Type"],
        ["effect", "Effect"],
        ["notes", "Notes"],
        ["description", "Description"],
    ],
    "lore": [
        ["subject", "Subject"],
        ["category", "Category"],
        ["description", "Description"],
    ]
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
    "Demonic",
    "Superweapon",
    "Throwable",
    "Disposable",
    "Artifact",
    "Powerup"
]

const item_categ_list = [
    "Healing",
    "Armor",
    "Ammunition",
    "Powerup",
    "Rune",
    "Contract"
]

const enemy_categ_list = [
    "Zombieman",
    "Shotgunner",
    "Chaingunner",
    "Imp",
    "Fiend",
    "Spectre",
    "Lost Soul",
    "Revenant",
    "Mancubus",
    "Arachnotron",
    "Cacodemon",
    "Pain Elemental",
    "Hell Knight",
    "Baron of Hell",
    "Archvile",
    "Cyberdemon",
    "Spiderdemon",
    "Wolfenstein"
]

const lore_categ_list = [
    "Concepts",
    "Enemy Types",
]

const quicknotesweapons = `<li>Melee weapons all deal double damage when under the effect of Berserk except when stated otherwise.</li>
<li>Demon energy is sometimes dropped by demons on death. Bigger demons drop more.</li>
<li>Grenades are sometimes dropped by former humans.</li>
<li>Durability weapons can break and must be repaired with repair kits.</li>
<li>Disposable and Partially Disposable weapons are temporary weapons that do not use regular ammo types.
<ul>
<li>You can hold multiple copies of Disposable weapons. Reloading drops your current copy and discarded copies cannot be picked back up.</li>
<li>Partially Disposable weapons have their own ammo pool. If you have a Partially Disposable weapon in your inventory, then additional drops are replaced with ammunition packs which give out more ammo than weapon drops.</li>
</ul></li>
<li>Upgrades are like Pandemonia Superior augments or Arcane keys. Basically a special upgrade unlocked by an item.</li>
<li>Level 0 is the baseline for artifacts.</li>`

const quicknotesitems = `<li>Like Pandemonia, armor passively halves all damage dealt to it. For example, a 100 damage hit with 50% protection will deal 50 damage to health and 25 to armor.</li>
<li>Runes are dropped by certain strong enemies. Activating a rune grants you its effects for the rest of the level, and up to 2 can be active at once. Unlike Pandemonia, runes are not consumed upon use because they come with downsides.</li>
<li>Contracts are rare drops, and whichever contract drop depends on the enemy category. They can be signed at the cost of 20 max health and last for the rest of the playthrough. There is no limit to how many contracts can be active at once, as long as you have blood to spare.</li>`

const quicknotesenemies = `<li>Categories are an arbitrary classification based on what would fit in a monster randomizer.</li>`

const quicknoteslore = `<li>I have to preface this part by saying that while this lore is influenced by christianity, it is most importantly just that: influenced. I am not trying to preach anything and I am not trying to be 100% accurate to religious texts.</li>
<li>This is also not an attempt at explaining DOOM's lore and I am writing this entirely for fun.</li>`

import weapon_list from "./weapons.js"
import item_list from "./items.js"
import enemy_list from "./enemies.js"
import lore_list from "./lore.js"

document.querySelector("#weapon_amount").textContent = weapon_list.length
document.querySelector("#item_amount").textContent = item_list.length
document.querySelector("#enemy_amount").textContent = enemy_list.length
document.querySelector("#lore_amount").textContent = lore_list.length

function change_selected_category() {
    let selected_category = category_selector.value
    active_table.innerHTML = ""
    subcategory_selector.innerHTML = ""

    let option = document.createElement("option")
    option.textContent = `All`
    option.value = 0
    subcategory_selector.appendChild(option)
    option = document.createElement("option")
    option.textContent = `New and Updated`
    option.value = 1
    subcategory_selector.appendChild(option)
    if (selected_category == "weapons") {
        for (let index in weapon_categ_list) {
            let option = document.createElement("option")
            option.textContent = `${weapon_categ_list[index]}`
            option.value = `${eval(index) + 2}`
            subcategory_selector.appendChild(option)
        }
        build_weapon_table()
        document.querySelector("#quicknotes").innerHTML = quicknotesweapons
    }
    if (selected_category == "items") {
        for (let index in item_categ_list) {
            let option = document.createElement("option")
            option.textContent = `${item_categ_list[index]}`
            option.value = `${eval(index) + 2}`
            subcategory_selector.appendChild(option)
        }
        build_item_table()
        document.querySelector("#quicknotes").innerHTML = quicknotesitems
    }
    if (selected_category == "enemies") {
        for (let index in enemy_categ_list) {
            let option = document.createElement("option")
            option.textContent = `${enemy_categ_list[index]}`
            option.value = `${eval(index) + 2}`
            subcategory_selector.appendChild(option)
        }
        build_enemy_table()
        document.querySelector("#quicknotes").innerHTML = quicknotesenemies
    }
    if (selected_category == "lore") {
        for (let index in lore_categ_list) {
            let option = document.createElement("option")
            option.textContent = `${lore_categ_list[index]}`
            option.value = `${eval(index) + 2}`
            subcategory_selector.appendChild(option)
        }
        build_lore_table()
        document.querySelector("#quicknotes").innerHTML = quicknoteslore
    }
}

function change_selected_subcategory() {
    let selected_category = category_selector.value
    active_table.innerHTML = ""
    switch (selected_category) {
        case "weapons":
            build_weapon_table()
            break
        case "items":
            build_item_table()
            break
        case "enemies":
            build_enemy_table()
            break
        case "lore":
            build_lore_table()
            break
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
        if (subcategory_selector.value == 0 || weapon_categ_list[subcategory_selector.value - 2] == weapon.category || (weapon_categ_list[subcategory_selector.value - 2] == "Disposable" && weapon.category == "Partially Disposable") || (subcategory_selector.value == 1 && weapon.newstatus > 0)) {
            let row = document.createElement("tr")
            for (let currentitem of head_lists.weapons) {
                let cell = document.createElement("td")
                if (weapon.category == "Artifact" && currentitem[0] == "superior") {
                    let level_list = document.createElement("ol")
                    cell.appendChild(level_list)
                    for (let level in weapon.superior) {
                        let level_elem = document.createElement("li")
                        level_elem.textContent = weapon.superior[level]
                        level_list.appendChild(level_elem)
                    }
                } else {
                    cell.textContent = weapon[currentitem[0]]
                    if (weapon.durability && currentitem[0] == "category") {
                        cell.textContent += " - Durability"
                    }
                    if (currentitem[0] == "name") {
                        if (weapon.newstatus == 1) {
                            cell.innerHTML += '<span class="concept_isnew"> (new!)</span>'
                        } else if (weapon.newstatus == 2) {
                            cell.innerHTML += '<span class="concept_isupdated"> (updated!)</span>'
                        }
                    }
                }
                row.appendChild(cell)
            }
            table_body.appendChild(row)
        }
    }
}

function build_item_table() {
    let table_head = document.createElement("thead")
    let table_body = document.createElement("tbody")
    active_table.appendChild(table_head)
    active_table.appendChild(table_body)
    let item_head = document.createElement("tr")
    table_head.appendChild(item_head)
    for (let item of head_lists.items) {
        let cell = document.createElement("td")
        cell.id = item[0]
        cell.textContent = item[1]
        item_head.appendChild(cell)
    }
    for (let item of item_list) {
        if (subcategory_selector.value == 0 || item_categ_list[subcategory_selector.value - 2] == item.category || (subcategory_selector.value == 1 && item.newstatus > 0)) {
            let row = document.createElement("tr")
            for (let currentitem of head_lists.items) {
                let cell = document.createElement("td")
                cell.textContent = item[currentitem[0]]
                if (currentitem[0] == "notes") {
                    if (item.carriable) {
                        cell.innerHTML += " Carriable."
                    }
                }
                if (currentitem[0] == "name") {
                    if (item.newstatus == 1) {
                        cell.innerHTML += '<span class="concept_isnew"> (new!)</span>'
                    } else if (item.newstatus == 2) {
                        cell.innerHTML += '<span class="concept_isupdated"> (updated!)</span>'
                    }
                }
                row.appendChild(cell)
            }
            table_body.appendChild(row)
        }
    }
}

function build_enemy_table() {
    let table_head = document.createElement("thead")
    let table_body = document.createElement("tbody")
    active_table.appendChild(table_head)
    active_table.appendChild(table_body)
    let enemy_head = document.createElement("tr")
    table_head.appendChild(enemy_head)
    for (let enemy of head_lists.enemies) {
        let cell = document.createElement("td")
        cell.id = enemy[0]
        cell.textContent = enemy[1]
        enemy_head.appendChild(cell)
    }
    for (let enemy of enemy_list) {
        if (subcategory_selector.value == 0 || enemy_categ_list[subcategory_selector.value - 2] == enemy.category || (subcategory_selector.value == 1 && enemy.newstatus > 0)) {
            let row = document.createElement("tr")
            for (let currentenemy of head_lists.enemies) {
                let cell = document.createElement("td")
                cell.textContent = enemy[currentenemy[0]]
                if (currentenemy[0] == "name") {
                    if (enemy.newstatus == 1) {
                        cell.innerHTML += '<span class="concept_isnew"> (new!)</span>'
                    } else if (enemy.newstatus == 2) {
                        cell.innerHTML += '<span class="concept_isupdated"> (updated!)</span>'
                    }
                }
                row.appendChild(cell)
            }
            table_body.appendChild(row)
        }
    }
}


function build_lore_table() {
    let table_head = document.createElement("thead")
    let table_body = document.createElement("tbody")
    active_table.appendChild(table_head)
    active_table.appendChild(table_body)
    let lore_head = document.createElement("tr")
    table_head.appendChild(lore_head)
    for (let lore of head_lists.lore) {
        let cell = document.createElement("td")
        cell.id = lore[0]
        cell.textContent = lore[1]
        lore_head.appendChild(cell)
    }
    for (let lore of lore_list) {
        if (subcategory_selector.value == 0 || lore_categ_list[subcategory_selector.value - 2] == lore.category || (subcategory_selector.value == 1 && lore.newstatus > 0)) {
            let row = document.createElement("tr")
            for (let currentlore of head_lists.lore) {
                let cell = document.createElement("td")
                cell.textContent = lore[currentlore[0]]
                if (currentlore[0] == "subject") {
                    if (lore.newstatus == 1) {
                        cell.innerHTML += '<span class="concept_isnew"> (new!)</span>'
                    } else if (lore.newstatus == 2) {
                        cell.innerHTML += '<span class="concept_isupdated"> (updated!)</span>'
                    }
                }
                row.appendChild(cell)
            }
            table_body.appendChild(row)
        }
    }
}

change_selected_category()