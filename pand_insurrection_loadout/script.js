import { weapon_list } from "./weapon_list.js";

let input_amount = document.querySelector("#input_weapon_amount")
let weapon_amount = document.querySelector('#weapon_amount')
let button_generate = document.querySelector("#generate_loadout")

weapon_amount.textContent = input_amount.value

input_amount.addEventListener("input", (event) => {
    weapon_amount.textContent = event.target.value;
    if (event.target.value < 5) {
        document.querySelector('#guarantee_all_ammo').checked = false
        document.querySelector('#guarantee_all_ammo').disabled = true
        document.querySelector('#guarantee_all_ammo_label').classList.add("strikethrough")
        document.querySelector('#guarantee_all_ammo_disabled').textContent = " You need at least 5 weapons to enable this"
        
        
    } else {
        document.querySelector('#guarantee_all_ammo').disabled = false
        document.querySelector('#guarantee_all_ammo_label').classList.remove("strikethrough")
        document.querySelector('#guarantee_all_ammo_disabled').textContent= ""
    }
});

button_generate.addEventListener("click", generate_loadout)

function random_item(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var loadout_text

function generate_loadout() {
    loadout_text = ""
    let loadout = new Set()
    let ammo_types = new Set()
    let guarantee_all_ammo = document.querySelector('#guarantee_all_ammo').checked
    let include_aeonstave = document.querySelector('#include_aeonstave').checked
    let include_convergence = document.querySelector('#include_convergence').checked
    let include_chainsaw = document.querySelector('#include_chainsaw').checked

    let final_weapon_list = [...weapon_list]
    if (include_aeonstave) {
        final_weapon_list.push({slot: 8, name: "Sacrosanct Aeonstave", ammo: "Chaos"})
    }
    
    if (include_convergence) {
        final_weapon_list.push({slot: 8, name: "Convergence", ammo: "Demon"})
    }
    
    if (include_chainsaw) {
        final_weapon_list.push({slot: 1, name: "Chainsaw", ammo: "None"})
    }

    if (guarantee_all_ammo) {
        if (input_amount.value >= 5) {
            while (ammo_types.size != 5) {
                let weapon = random_item(final_weapon_list)
                let weapon_ammo = weapon.ammo
                if (!ammo_types.has(weapon_ammo) && weapon_ammo != "Chaos" && weapon_ammo != "None") {
                    ammo_types.add(weapon_ammo)
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
    for (let weapon of [...loadout].sort((a, b) => a.slot - b.slot )) {
        let listelem = document.createElement("li")
        let img = document.createElement("img")
        let name = document.createElement("span")
        img.src = `img/${weapon.name.replace(/ /g, "_")}.png`
        name.textContent = `Slot ${weapon.slot} - ${weapon.name}`
        loadout_text += name.textContent + "\n"
        listelem.appendChild(img)
        listelem.appendChild(name)
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
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
}