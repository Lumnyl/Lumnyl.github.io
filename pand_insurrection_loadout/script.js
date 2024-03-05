const weapon_list = [
    // {slot: 1, name: "Chainsaw", ammo: "None"},

    {slot: 2, name: "Pistol", ammo: "Bullets"},
    {slot: 2, name: "Laser Rifle", ammo: "Cells"},

    {slot: 3, name: "Shotgun", ammo: "Shells"},
    {slot: 3, name: "Slug Shotgun", ammo: "Shells"},
    {slot: 3, name: "Super Shotgun", ammo: "Shells"},
    {slot: 3, name: "Shrapnel Shotgun", ammo: "Shells"},
    {slot: 3, name: "Auto Shotgun", ammo: "Shells"},
    {slot: 3, name: "Riot Shotgun", ammo: "Shells"},
    {slot: 3, name: "Quad Shotgun", ammo: "Shells"},
    {slot: 3, name: "Raiden Electron Shotgun", ammo: "Shells"},
    {slot: 3, name: "Streetsweeper", ammo: "Shells"},

    {slot: 4, name: "Assault Rifle", ammo: "Bullets"},
    {slot: 4, name: "Burst Rifle", ammo: "Bullets"},
    {slot: 4, name: "Nailgun", ammo: "Bullets"},
    {slot: 4, name: "Atom Blaster", ammo: "Bullets"},
    {slot: 4, name: "Light Machinegun", ammo: "Bullets"},
    {slot: 4, name: "Firestorm", ammo: "Bullets"},

    {slot: 5, name: "Rocket Launcher", ammo: "Rockets"},
    {slot: 5, name: "Direct Hit", ammo: "Rockets"},
    {slot: 5, name: "Grenade Launcher", ammo: "Rockets"},
    {slot: 5, name: "Napalm Bomber", ammo: "Rockets"},
    {slot: 5, name: "Stickybomb Launcher", ammo: "Rockets"},
    {slot: 5, name: "Dual Missile Launcher", ammo: "Rockets"},
    {slot: 5, name: "Dark Blaster", ammo: "Demon"},
    {slot: 5, name: "HE Rocket Launcher", ammo: "Rockets"},
    {slot: 5, name: "Meteorite", ammo: "Rockets"},
    
    {slot: 6, name: "Plasma Rifle", ammo: "Cells"},
    {slot: 6, name: "Overcharge Rifle", ammo: "Cells"},
    {slot: 6, name: "Railgun", ammo: "Cells"},
    {slot: 6, name: "Railbeam", ammo: "Cells"},
    {slot: 6, name: "Plasma Repeater", ammo: "Cells"},
    {slot: 6, name: "Laser Minigun", ammo: "Cells"},
    {slot: 6, name: "Scourge Rifle", ammo: "Demon"},
    {slot: 6, name: "Spinfusor", ammo: "Cells"},
    
    {slot: 7, name: "BFG 9000", ammo: "Cells"},
    {slot: 7, name: "Gauss Annihilator", ammo: "Cells"},
    {slot: 7, name: "BFG 10000", ammo: "Cells"},
    {slot: 7, name: "Hakkero Magicannon", ammo: "Cells"},
    {slot: 7, name: "Heliacal Arc", ammo: "Demon"},
    
    // {slot: 8, name: "Sacrosanct Aeonstave", ammo: "Chaos"},
    // {slot: 8, name: "Convergence", ammo: "Demon"},
]

let input_amount = document.querySelector("#input_weapon_amount")
let weapon_amount = document.querySelector('#weapon_amount')

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

function random_item(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generate_loadout() {
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
    for (weapon of [...loadout].sort((a, b) => a.slot - b.slot )) {
        let listelem = document.createElement("li")
        let img = document.createElement("img")
        let name = document.createElement("span")
        img.src = `img/${weapon.name.replace(/ /g, "_")}.png`
        name.textContent = `Slot ${weapon.slot} - ${weapon.name}`
        listelem.appendChild(img)
        listelem.appendChild(name)
        loadout_display.appendChild(listelem)
    }
    document.querySelector("#loadout").appendChild(loadout_display)

}