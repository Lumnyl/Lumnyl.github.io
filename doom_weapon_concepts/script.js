const weapon_selector = document.querySelector("#weapon_select")
const weapon_name = document.querySelector("#weapon_name")
const weapon_category = document.querySelector("#weapon_category")
const weapon_desc = document.querySelector("#weapon_desc")

import weapon_list from "./weapons.json" assert {type: 'json'}

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
    weapon_category.textContent = `${selected_weapon.category} | ${selected_weapon.ammo}`
    weapon_desc.textContent = selected_weapon.description
}

change_selected_weapon()