const weapon_selector = document.querySelector("#weapon_select")
const weapon_name = document.querySelector("#weapon_name")
const weapon_category = document.querySelector("#weapon_category")
const weapon_desc = document.querySelector("#weapon_desc")
const weapon_primary = document.querySelector("#weapon_primary")
const weapon_secondary = document.querySelector("#weapon_secondary")
const weapon_notes = document.querySelector("#weapon_notes")
const weapon_superior = document.querySelector("#weapon_superior")

import weapon_list from "/doom_weapon_concepts/weapons.json" assert {type: 'json'}

document.querySelector("#weapon_amount").textContent = weapon_list.length

for (let index in weapon_list) {
    let option = document.createElement("option")
    option.textContent = `${weapon_list[index].name}`
    option.value = `${index}`
    weapon_selector.appendChild(option)
}

weapon_selector.addEventListener("change", change_selected_weapon)

function change_selected_weapon () {
    let selected_weapon = weapon_list[weapon_selector.value]
    weapon_name.textContent = selected_weapon.name
    weapon_category.textContent = `${selected_weapon.category} | ${selected_weapon.ammo}${(selected_weapon.durability) ? " | Durability" : ""}`
    weapon_desc.textContent = selected_weapon.description
    weapon_primary.textContent = `Primary fire : ${selected_weapon.primary}`
    weapon_secondary.textContent = `Secondary fire : ${selected_weapon.secondary}`
    weapon_notes.textContent = (selected_weapon.notes != "") ? `Notes : ${selected_weapon.notes}` : ""
    weapon_superior.textContent = `Superior : ${selected_weapon.superior}`
}

change_selected_weapon()