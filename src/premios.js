import Stats from "./stats";

let premiosPosibles3 = [
  ['cuadrado', 'cuadrado', 'cuadrado'],
  ['rombo', 'rombo', 'rombo'],
  ['circulo', 'circulo', 'circulo']
]
let premiosPosibles2 = [
  ['cuadrado', 'rombo', 'circulo'],
  ['cuadrado', 'circulo', 'rombo'],
  ['rombo', 'cuadrado', 'circulo'],
  ['rombo', 'circulo', 'cuadrado'],
  ['circulo', 'rombo', 'cuadrado'],
  ['circulo', 'cuadrado', 'rombo']
]

function cargar() {
  let premiosGanados = []

  const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

  for (let i = 0; i < premiosPosibles3.length; i++) {
    if (equals((Stats.turnoActual), (premiosPosibles3[i]))) {
      premiosGanados.push(10)
      return premiosGanados
    }
  }
  for (let i = 0; i < premiosPosibles2.length; i++) {
    if (equals((Stats.turnoActual), (premiosPosibles2[i]))) {
      premiosGanados.push(5)
      return premiosGanados
    }
  }

}

export default cargar;