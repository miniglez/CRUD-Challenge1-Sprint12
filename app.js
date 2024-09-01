const express = require("express")
const app = express()
const PORT = 3000

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send(
        `
            <h1>Lista de personajes</h1>
            <ul>
                ${usuarios.map(personaje => `<li>ID: ${personaje.id} | Nombre: ${personaje.nombre}</li>`).join("")}
            </ul>
            <form action="/usuarios" method="post">
                <label for="Personaje">Personaje</label>
                Nombre: <input type="text" id="nombre" name="nombre" required><br>
                Edad: <input type="number" id="edad" name="edad" required><br>
                Procedencia: <input type="text" id="lugarProcedencia" name="procedencia" required><br>
                <button type="submit">Agregar personaje</button>
            </form>
        `)
})

app.get("/usuarios", (req, res) => {
    res.json(usuarios)
})

app.get("/usuarios/:nombre", (req, res) => {
    console.log(req.params)
    const personajes = []
    personajes.push(usuarios.find(personaje => personaje.nombre === req.params.nombre))
    console.log(personajes)
    res.json(personajes)
})

app.post("/usuarios", (req, res) => {
    const nuevoPersonaje = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.procedencia
    }
    usuarios.push(nuevoPersonaje)
    res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})