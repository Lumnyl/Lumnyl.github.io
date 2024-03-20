import character_list from "./characters.json" assert {type: 'json'}

const table_body = document.querySelector("tbody")

for (let world of character_list) {
    for (let character of world.characters) {

        let table_row = document.createElement("tr")
        let char_img = document.createElement("td")
        let char_name = document.createElement("td")
        let char_desc = document.createElement("td")
        let char_appearance = document.createElement("td")
        let char_personality = document.createElement("td")
        let char_world = document.createElement("td")
        let char_ability = document.createElement("td")
        let char_notes = document.createElement("td")

        if (character.image) {
            let image = document.createElement('img')
            image.src = `img/${character.name}.png`
            char_img.appendChild(image)
        }

        char_name.textContent = character.name
        char_desc.textContent = character.desc
        char_appearance.textContent = character.appearance
        char_personality.textContent = character.personality
        char_world.textContent = world.world
        char_ability.textContent = character.ability
        char_notes.textContent = character.notes

        table_row.appendChild(char_img)
        table_row.appendChild(char_name)
        table_row.appendChild(char_desc)
        table_row.appendChild(char_appearance)
        table_row.appendChild(char_personality)
        table_row.appendChild(char_world)
        table_row.appendChild(char_ability)
        table_row.appendChild(char_notes)
        table_body.appendChild(table_row)
    }
}