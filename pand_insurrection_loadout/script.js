import { weapon_list } from "./weapon_list.js";

let input_amount = document.querySelector("#input_weapon_amount")
let weapon_amount = document.querySelector('#weapon_amount')
let button_generate = document.querySelector("#generate_loadout")

if (localStorage.getItem("wpn_amount") !== null) input_amount.value = localStorage.getItem("wpn_amount")
weapon_amount.textContent = input_amount.value

input_amount.addEventListener("input", (event) => {
    weapon_amount.textContent = event.target.value;
    localStorage.setItem("wpn_amount", event.target.value)
    if (event.target.value < 5) {
        document.querySelector('#guarantee_all_ammo').checked = false
        document.querySelector('#guarantee_all_ammo').disabled = true
        document.querySelector('#guarantee_all_ammo_label').classList.add("strikethrough")
        document.querySelector('#guarantee_all_ammo_disabled').textContent = " You need at least 5 weapons to enable this"


    } else {
        document.querySelector('#guarantee_all_ammo').disabled = false
        document.querySelector('#guarantee_all_ammo_label').classList.remove("strikethrough")
        document.querySelector('#guarantee_all_ammo_disabled').textContent = ""
    }
})

for (let setting of document.querySelectorAll("input[type=checkbox]")) {
    if (setting.id != "darkmode_toggle") {
        if (localStorage.getItem(`setting_${setting.id}`) !== null) setting.checked = (localStorage.getItem(`setting_${setting.id}`) === "true")
        setting.addEventListener("click", function () {
            localStorage.setItem(`setting_${setting.id}`, setting.checked)
        })
    }
}

button_generate.addEventListener("click", generate_loadout)

function random_item(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generate_loadout() {
    var loadout_text = ""
    let loadout = new Set()
    let ammo_types = new Set()
    let guarantee_all_ammo = document.querySelector('#guarantee_all_ammo').checked
    let guarantee_durability = document.querySelector('#guarantee_durability').checked
    let include_aeonstave = document.querySelector('#include_aeonstave').checked
    let include_convergence = document.querySelector('#include_convergence').checked
    let include_chainsaw = document.querySelector('#include_chainsaw').checked
    let roll_augments = document.querySelector('#roll_augments').checked

    let final_weapon_list = [...weapon_list]
    if (!include_aeonstave) {
        for (let index in final_weapon_list) {
            if (final_weapon_list[index].name == "Sacrosanct Aeonstave") {
                final_weapon_list.splice(index, 1)
            }
        }
    }

    if (!include_convergence) {
        for (let index in final_weapon_list) {
            if (final_weapon_list[index].name == "Convergence") {
                final_weapon_list.splice(index, 1)
            }
        }
    }

    if (!include_chainsaw) {
        for (let index in final_weapon_list) {
            if (final_weapon_list[index].name == "Chainsaw") {
                final_weapon_list.splice(index, 1)
            }
        }
    }

    if (guarantee_durability) {
        let weapon
        do {
            weapon = random_item(final_weapon_list)
        } while (!weapon.tags.includes("Durability"))
        ammo_types.add(weapon.ammo)
        loadout.add(weapon)
    }

    if (guarantee_all_ammo) {
        if (input_amount.value >= 5) {
            while (ammo_types.size != 5) {
                let weapon = random_item(final_weapon_list)
                if (!ammo_types.has(weapon.ammo) && weapon.ammo != "Chaos" && weapon.ammo != "None") {
                    ammo_types.add(weapon.ammo)
                    loadout.add(weapon)
                }
            }
        }
    }

    while (loadout.size < input_amount.value) {
        loadout.add(random_item(final_weapon_list))
    }

    document.querySelector("#loadout").innerHTML = ""
    let loadout_display = document.createElement("ul")
    for (let weapon of [...loadout].sort((a, b) => a.slot - b.slot)) {
        let listelem = document.createElement("li")
        let img = document.createElement("img")
        let slot = document.createElement("span")
        let name = document.createElement("span")
        img.src = `img/${weapon.name.replace(/ /g, "_")}.png`
        slot.textContent = `Slot ${weapon.slot} - `
        name.textContent = weapon.name + " "
        if (weapon.name == "Sacrosanct Aeonstave") {
            name.classList.add("wpn_staff")
        }
        if (weapon.name == "Convergence") {
            name.classList.add("wpn_convergence")
        }
        if (weapon.tags.includes("Arcane")) {
            name.classList.add("wpn_arcane")
        }
        if (weapon.name == "Hakkero Magicannon") {
            name.classList.add("wpn_hakkero")
        }
        if (weapon.name == "Raiden Electron Shotgun") {
            name.classList.add("wpn_raiden")
        }
        if (weapon.tags.includes("Durability")) {
            name.classList.add("wpn_durability")
        }
        listelem.appendChild(img)
        listelem.appendChild(slot)
        listelem.appendChild(name)
        let augment_text = ""
        if (roll_augments && !weapon.tags.includes("No Augments")) {
            let augment_list_elem = document.createElement("span")
            let augments = rollAugments(weapon)

            let img_upgrade_path = document.createElement("img")
            let text_upgrade_path = document.createElement("span")
            img_upgrade_path.src = `img/augments/${augments["upgrade_path"]}.gif`
            img_upgrade_path.alt = augments["upgrade_path"]
            img_upgrade_path.title = augments["upgrade_path"]
            text_upgrade_path.textContent = ` ${augments["upgrade_path"]} `
            text_upgrade_path.classList.add(`augment`)
            text_upgrade_path.classList.add(`augment_${augments["upgrade_path"]}`)
            augment_list_elem.appendChild(img_upgrade_path)
            augment_list_elem.appendChild(text_upgrade_path)
            augment_text += `| ${augments["upgrade_path"]} | `

            if (augments["conversion_type"] != "") {
                let img_conversion = document.createElement("img")
                let text_conversion = document.createElement("span")
                img_conversion.src = `img/augments/${augments["conversion_type"]}.gif`
                img_conversion.alt = `${augments["conversion_type"]}`
                img_conversion.title = `${augments["conversion_type"]}`
                text_conversion.textContent = ` ${augments["conversion_type"]} : ${augments["conversion"]} `
                text_conversion.classList.add(`augment`)
                text_conversion.classList.add(`augment_${augments["conversion_type"]}`)
                augment_list_elem.appendChild(img_conversion)
                augment_list_elem.appendChild(text_conversion)
                augment_text += `${augments["conversion_type"]} : ${augments["conversion"]} | `
            }

            for (let index in augments) {
                if (index != "conversion" && index != "conversion_type") {
                    if (augments[index] > 0) {
                        let img_augment = document.createElement("img")
                        let text_augment = document.createElement("span")
                        img_augment.src = `img/augments/${index}.png`
                        img_augment.alt = `${index}`
                        img_augment.title = `${index}`
                        text_augment.textContent = ` ${index} : ${augments[index]} `
                        text_augment.classList.add(`augment`)
                        text_augment.classList.add(`augment_${index}`)
                        augment_list_elem.appendChild(img_augment)
                        augment_list_elem.appendChild(text_augment)
                        augment_text += `${index} : ${augments[index]}  | `
                    }
                }
            }

            listelem.appendChild(augment_list_elem)
        }
        loadout_text += slot.textContent + name.textContent + augment_text + "\n"
        loadout_display.appendChild(listelem)
    }
    document.querySelector("#loadout").appendChild(loadout_display)

    let download_link = document.querySelector("#download_loadout")

    download_link.href = makeTextFile(loadout_text)
    download_link.download = "loadout.txt"
    download_link.style.display = 'block'
}
var textFile = null

function makeTextFile(text) {
    var data = new Blob([text], { type: 'text/plain' });
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
}

function rollAugments(weapon) {
    let limit_capacity = document.querySelector("#limit_capacity").checked
    let augment_list = { upgrade_path: "", conversion_type: "", conversion: 0, Strength: 0, Haste: 0, Capacity: 0, Precision: 0 }
    let used_slots = 0
    augment_list["upgrade_path"] = (weapon.tags.includes("Durability")) ? "Formatter" : (Math.random() < 0.66) ? "Superior" : "Formatter"
    let upgrade_slots = (weapon.tags.includes("Durability")) ? 3 : 5;
    if (augment_list["upgrade_path"] == "Formatter") upgrade_slots += 5
    let upgrade_choices = ["Strength", "Haste"]
    if (!weapon.tags.includes("No Precision")) upgrade_choices.push("Precision")
    if (!limit_capacity) { upgrade_choices.push("Capacity") }
    else if (weapon.tags.includes("Durability") || weapon.tags.includes("Magazine")) { upgrade_choices.push("Capacity") }
    if (!weapon.tags.includes("Arcane") && (Math.random() < 0.5 || (Math.random() < 0.75 && augment_list["upgrade_path"] == "Formatter"))) {
        upgrade_choices.push("conversion")
    }
    while (used_slots < upgrade_slots) {
        let choice = random_item(upgrade_choices)
        if (choice == "conversion") {
            if (augment_list.conversion_type == "") {
                choice = random_item(["Flame", "Blast", "Chaos"])
                let required_slots = (choice == "Chaos") ? 3 : 2;
                if (used_slots + required_slots <= upgrade_slots) {
                    augment_list.conversion_type = choice
                    augment_list.conversion += 1
                    used_slots += required_slots
                }
            } else {
                let required_slots = (augment_list.conversion_type == "chaos") ? 3 : 2;
                if (used_slots + required_slots <= upgrade_slots) {
                    augment_list.conversion += 1
                    used_slots += required_slots
                }
            }

        } else {
            augment_list[choice] += 1
            used_slots += 1
        }
    }

    return augment_list
}