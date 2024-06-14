import weapon_list from "./weapon_list.js"

let input_amount = document.querySelector("#input_weapon_amount")
let weapon_amount = document.querySelector('#weapon_amount')
let button_generate = document.querySelector("#generate_loadout")

if (localStorage.getItem("wpn_amount") !== null) input_amount.value = localStorage.getItem("wpn_amount")
weapon_amount.textContent = input_amount.value

input_amount.addEventListener("input", (event) => {
    weapon_amount.textContent = event.target.value;
    localStorage.setItem("wpn_amount", event.target.value)
})

for (let setting of document.querySelectorAll("input[type=checkbox]")) {
    if (setting.id != "darkmode_toggle" && setting.id != "minimise_toggle") {
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

function check_all_ammo () {
    if (document.querySelector("#guarantee_all_ammo").checked) {
        document.querySelector("#all_ammo_exclude_durability").classList.remove("hide")
        document.querySelector("#all_ammo_exclude_durability_label").classList.remove("hide")
        document.querySelector("#all_ammo_exclude_durability_br").classList.remove("hide")
    } else {
        document.querySelector("#all_ammo_exclude_durability").classList.add("hide")
        document.querySelector("#all_ammo_exclude_durability").checked = false
        document.querySelector("#all_ammo_exclude_durability_label").classList.add("hide")
        document.querySelector("#all_ammo_exclude_durability_br").classList.add("hide")
    }
}

document.querySelector("#guarantee_all_ammo").addEventListener("change", check_all_ammo)
check_all_ammo()

document.querySelector("#load_button").addEventListener("click", function () { document.getElementById('load_saved_loadout').click() })
document.querySelector("#load_saved_loadout").addEventListener("change", load_loadout)

function load_loadout() {
    var files = document.querySelector('#load_saved_loadout').files;
    if (files.length <= 0) {
        return false;
    }
    var fr = new FileReader();

    fr.onload = function (e) {
        console.log(e);
        var result = JSON.parse(e.target.result);
        console.log(result)
        var loadout = []
        var augments = []
        for (let object of result) {
            loadout.push(object.weapon)
            augments.push(object.augments)
        }
        display_loadout(loadout, augments)
    }

    fr.readAsText(document.querySelector("#load_saved_loadout").files[0]);
}

function generate_loadout() {
    document.querySelector('#load_saved_loadout').value = ""
    let loadout = new Set()
    let ammo_types = new Set()
    let guarantee_all_ammo = document.querySelector('#guarantee_all_ammo').checked
    let all_ammo_exclude_durability = document.querySelector('#all_ammo_exclude_durability').checked
    let guarantee_durability = document.querySelector('#guarantee_durability').checked
    let include_aeonstave = document.querySelector('#include_aeonstave').checked
    let include_convergence = document.querySelector('#include_convergence').checked
    let include_chainsaw = document.querySelector('#include_chainsaw').checked
    let include_secretweapons = document.querySelector('#include_secretweapons').checked
    let include_gunlocker = document.querySelector('#include_gunlocker').checked
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

    if (!include_secretweapons) {
        for (let index in final_weapon_list) {
            if (final_weapon_list[index].tags.includes("Secret")) {
                final_weapon_list.splice(index, 1)
            }
        }
    }

    if (!include_gunlocker) {
        for (let index in final_weapon_list) {
            if (final_weapon_list[index].tags.includes("Gunlocker")) {
                final_weapon_list.splice(index, 1)
            }
        }
    }


    if (guarantee_all_ammo) {
        if (input_amount.value >= 5) {
            while (ammo_types.size != 5) {
                let weapon = random_item(final_weapon_list)
                if (!ammo_types.has(weapon.ammo) && weapon.ammo != "Chaos" && weapon.ammo != "None" && !(all_ammo_exclude_durability && weapon.tags.includes("Durability"))) {
                    ammo_types.add(weapon.ammo)
                    loadout.add(weapon)
                }
            }
        }
    }


    while (loadout.size < input_amount.value - 1) {
        loadout.add(random_item(final_weapon_list))
    }

    while (loadout.size < input_amount.value) {
        if (guarantee_durability) {
            let weapon
            do {
                weapon = random_item(final_weapon_list)
            } while (!weapon.tags.includes("Durability"))
            loadout.add(weapon)
        } else {
            loadout.add(random_item(final_weapon_list))
        }
    }


    let sorted_loadout = [...loadout].sort((a, b) => a.slot - b.slot)
    let augments = []
    if (roll_augments) {
        for (let index in sorted_loadout) {
            if (!sorted_loadout[index].tags.includes("No Augments")) {
                augments[index] = rollAugments(sorted_loadout[index])
            }
        }
    }

    display_loadout(sorted_loadout, augments)
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
    else if (weapon.tags.includes("Durability") || (weapon.tags.includes("Magazine") && !(weapon.name == "Auto Shotgun" && augment_list["upgrade_path"] == "Superior"))) { upgrade_choices.push("Capacity") }
    if (!weapon.tags.includes("Arcane") && (Math.random() < 0.5 || (Math.random() < 0.67 && augment_list["upgrade_path"] == "Formatter"))) {
        upgrade_choices.push("conversion")
    }
    while (used_slots < upgrade_slots) {
        let choice = random_item(upgrade_choices)
        if (choice == "conversion") {
            if (augment_list.conversion_type == "") {
                let conv_choices = ["Blast"]
                if (weapon.slot != 7) { conv_choices.push("Chaos") }
                if (!weapon.tags.includes("No Flame")) { conv_choices.push("Flame") }
                choice = random_item(conv_choices)
                let required_slots = (choice == "Chaos") ? 3 : 2;
                if (used_slots + required_slots <= upgrade_slots) {
                    augment_list.conversion_type = choice
                    augment_list.conversion += 1
                    used_slots += required_slots
                }
            } else {
                let required_slots = (augment_list.conversion_type == "Chaos") ? 3 : 2;
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

function display_loadout(loadout, augments) {
    document.querySelector("#loadout").innerHTML = ""
    let loadout_display = document.createElement("ul")
    var loadout_save = []
    var loadout_text = ""
    for (let index in loadout) {
        let weapon = loadout[index]
        let wpn_augments = augments[index]

        loadout_save[index] = {}
        loadout_save[index].weapon = weapon
        loadout_text += `Slot ${weapon.slot} - ${weapon.name} `

        let listelem = document.createElement("li")
        let img = document.createElement("img")
        let slot = document.createElement("span")
        let name = document.createElement("span")
        let addon = document.createElement("span")
        img.src = `img/${weapon.name.replace(/ /g, "_")}.png`
        slot.textContent = ` Slot ${weapon.slot} - `
        name.textContent = weapon.name
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
        if (weapon.name == "Maximum") {
            name.classList.add("wpn_maximum")
        }
        if (weapon.tags.includes("Gunlocker")) {
            addon.textContent = "[G] "
            addon.classList.add("wpn_gunlocker")
            addon.title = "Part of the Gunlocker addon"
            loadout_text += `[G] `
        }
        if (weapon.tags.includes("Durability")) {
            name.classList.add("wpn_durability")
        }
        if (weapon.tags.includes("Secret")) {
            name.classList.add("wpn_secret")
        }
        listelem.appendChild(img)
        listelem.appendChild(slot)
        listelem.appendChild(name)
        listelem.innerHTML += " "
        listelem.appendChild(addon)

        if (wpn_augments !== undefined) {
            loadout_save[index].augments = wpn_augments
            for (let prop in wpn_augments) {
                if (prop != "conversion" && !(prop == "conversion_type" && wpn_augments[prop] == "")) {
                    if (wpn_augments[prop] > 0 || prop == "conversion_type" || prop == "upgrade_path") {
                        let aug_elem = document.createElement("span")
                        let aug_img = document.createElement("img")
                        let aug_text = document.createElement("span")
                        aug_img.alt = prop
                        aug_text.classList.add(`augment`)

                        if (prop == "upgrade_path") {
                            aug_img.src = `img/augments/${wpn_augments[prop]}.gif`
                            aug_text.textContent = ` ${wpn_augments[prop]} `
                            aug_text.classList.add(`augment_${wpn_augments[prop]}`)
                            loadout_text += `| ${wpn_augments[prop]} | `
                        } else if (prop == "conversion_type") {
                            aug_img.src = `img/augments/${wpn_augments[prop]}.gif`
                            aug_text.textContent = ` ${wpn_augments[prop]} : ${wpn_augments["conversion"]} `
                            aug_text.classList.add(`augment_${wpn_augments[prop]}`)
                            loadout_text += `${wpn_augments[prop]} : ${wpn_augments["conversion"]} | `
                        } else {
                            aug_img.src = `img/augments/${prop}.png`
                            aug_text.textContent = ` ${prop} : ${wpn_augments[prop]} `
                            aug_text.classList.add(`augment_${prop}`)
                            loadout_text += `${prop} : ${wpn_augments[prop]}  | `
                        }
                        if (wpn_augments[prop] == "Superior") {
                            aug_img.title = weapon.superior
                            aug_text.title = weapon.superior
                        }
                        aug_elem.appendChild(aug_img)
                        aug_elem.appendChild(aug_text)
                        listelem.appendChild(aug_elem)
                    }
                }
            }
        }
        loadout_text += "\n"
        loadout_display.appendChild(listelem)
    }

    console.log(loadout_text)

    document.querySelector("#loadout").appendChild(loadout_display)

    let download_link_txt = document.querySelector("#download_loadout_txt")
    let download_link_json = document.querySelector("#download_loadout_json")

    download_link_txt.href = makeTextFile(loadout_text)
    download_link_txt.download = "loadout.txt"
    download_link_txt.style.display = 'block'

    download_link_json.href = makeTextFile(JSON.stringify(loadout_save))
    download_link_json.download = "loadout.json"
    download_link_json.style.display = 'block'
}