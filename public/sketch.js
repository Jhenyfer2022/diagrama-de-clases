var socket;

class Figura {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.alto = 100
    this.ancho = 140
    this.tamañoDeTextoNombre = 20
    this.tamañoDeTextoEstereotipo = 10
    this.tamañoTextoMetodo = 13
    this.tamañoDeTextoAtributo = 13
    this.seleccionado = false
    this.nombre = "{nombre}"
    this.estereotipo = "{estereotipo}"
    this.atributo = "{atributo}"
    this.metodo = "{metodo}"
    this.multiplicidad = ""
    this.centroX = this.x + this.ancho / 2
    this.centroY = this.y + this.alto / 2
    this.colorCajaDeMovimiento = color(255, 255, 255)
  }

  reconstruirFigura(elOtroObjeto) {
    this.x = elOtroObjeto.x
    this.y = elOtroObjeto.y
    this.alto = elOtroObjeto.alto
    this.ancho = elOtroObjeto.ancho
    this.nombre = elOtroObjeto.nombre
    this.multiplicidad = elOtroObjeto.multiplicidad
    this.atributo = elOtroObjeto.atributo
    this.metodo = elOtroObjeto.metodo
    this.centroX = elOtroObjeto.centroX
    this.centroY = elOtroObjeto.centroY
  }
  set setCentroX(centrox) {
    this.centroX = centrox
  }
  set setCentroY(centroy) {
    this.centroY = centroy
  }
  get getCentroX() {
    return this.centroX
  }
  get getCentroY() {
    return this.centroY
  }
  set setNombre(nombre) {
    this.nombre = nombre
  }
  get getNombre() {
    return this.nombre
  }
  set setMultiplicidad(multiplicidad) {
    this.multiplicidad = multiplicidad
  }
  get getMultiplicidad() {
    return this.multiplicidad
  }
  set setMetodo(metodo) {
    this.metodo = metodo
  }
  get getMetodo() {
    return this.metodo
  }
  set setAtributo(atributo) {
    this.atributo = atributo
  }
  get getAtributo() {
    return this.atributo
  }
  get getEstereotipo() {
    return this.estereotipo
  }
  set setAncho(ancho) {
    this.ancho = ancho
    this.centroX = this.x + this.ancho / 2
  }
  get getAncho() {
    return this.ancho
  }
  set setAlto(alto) {
    this.alto = alto
    this.centroY = this.y + this.alto / 2
  }
  get getAlto() {
    return this.alto
  }
  get getSeleccionado() {
    return this.seleccionado
  }
  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado
  }
  set setX(x) {
    this.x = x
    this.centroX = this.x + this.ancho / 2
  }
  get getX() {
    return this.x
  }
  set setY(y) {
    this.y = y
    this.centroY = this.y + this.alto / 2
  }
  get getY() {
    return this.y
  }
  enAreaCentral(x, y) {
    if (this.x < x && this.x + this.ancho > x && this.y < y && this.y + this.alto > y) {
      return true
    } else {
      return false
    }
  }
  dibujarCajaEnMovimiento() {
    push()
    if (this.seleccionado) {
      fill(this.colorCajaDeMovimiento)
      rect(this.x + this.ancho, this.y, 20, 20)
      rect(this.x, this.y + this.alto, 20, 20)
    }
    pop()
  }
  dibujarTexto() {
    push()
    fill(0, 0, 0)
    textAlign(CENTER, CENTER)
    // Dibuja el nombre
    textStyle(BOLD)
    textSize(this.tamañoDeTextoNombre)
    text(this.getNombre, this.getCentroX, this.getY + 20)
    // Dibuja una línea estática entre el nombre y el método
    let lineaNombreMetodoY = this.getY + 35; // Posición Y fija para la línea
    //stroke(0);  // Color de la línea (blanco)
    line(this.getX, lineaNombreMetodoY, this.getX + this.getAncho, lineaNombreMetodoY) // Dibuja la línea

    //textStyle(NORMAL)
    // Dibuja el texto del método
    textSize(this.tamañoDeTextoAtributo)
    text(this.getAtributo, this.getX + 10, this.getY + 50, this.getAncho - 15)

    // Dibuja una línea entre el método y la descripción
    let lineaY = this.getY + 60 + (this.contarSaltosDeLinea(this.getAtributo) * 16) - 20; // Calcula la posición Y

    // stroke(0);  // Color de la línea (blanco)
    line(this.getX, lineaY + 10, this.getX + this.getAncho, lineaY + 10) // Dibuja la línea

    // Dibuja el texto de la descripción
    textSize(this.tamañoTextoMetodo)
    text(this.getMetodo, this.getX + 10, this.getY + 70 + (this.contarSaltosDeLinea(this.getAtributo) * 16), this.getAncho - 15)



    pop()
  }

  contarSaltosDeLinea(texto) {
    // Divide el texto por los saltos de línea y cuenta la cantidad de partes
    return texto.split('\n').length;
  }

  enCajaDerecha(x, y) {
    if (this.x + this.ancho < x && this.x + this.ancho + 20 > x && y > this.y && y < this.y + 20) {
      return true
    }
    return false
  }
  enCajaIzquierda(x, y) {
    if (this.x < x && this.x + 20 > x && y > this.y + this.alto && y < this.y + this.alto + 20) {
      return true
    }
    return false
  }
}

class Clase extends Figura {
  constructor(x, y) {
    super(x, y)
    super.estereotipo = "Class"
  }
  draw() {
    push();
    fill(255, 255, 255)
    rect(this.x, this.y, this.ancho, this.alto)
    // circle(this.x + this.ancho / 2, this.y - 50, 53)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Database extends Figura {
  constructor(x, y) {
    super(x, y)
    super.estereotipo = "Database"
  }
  draw() {
    push();
    stroke(color(138, 138, 138))
    fill(17, 104, 189)
    rect(this.x, this.y, this.ancho, this.alto - 1, 10)
    ellipse(this.x + this.ancho / 2, this.y + 5, this.ancho, 25)
    noStroke()
    ellipse(this.x + this.ancho / 2, this.y + 94.9, this.ancho, 26)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Mobile extends Figura {
  constructor(x, y) {
    super(x, y)
    super.estereotipo = "Mobile"
  }
  draw() {
    push();
    stroke(color(138, 138, 138))
    fill(color(17, 104, 189))
    rect(this.x, this.y, this.ancho, this.alto, 10)
    stroke(8, 66, 123)
    fill(8, 66, 123)
    circle(this.x + this.ancho / 16, this.y + 50, 5)
    rect(this.x - 15 + this.ancho, this.y + 38, this.ancho / 32, this.alto / 4, 20)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Web extends Figura {
  constructor(x, y) {
    super(x, y)
    super.estereotipo = "Web"
  }
  draw() {
    push();
    stroke(color(138, 138, 138))
    fill(color(17, 104, 189))
    rect(this.x, this.y, this.ancho, this.alto, 5)
    stroke(8, 66, 123)
    fill(8, 66, 123)
    circle(this.x + this.ancho / 8, this.y + 8, 4)
    circle(this.x + this.ancho / 16, this.y + 8, 4)
    circle(this.x + this.ancho / 16 + 25, this.y + 8, 4)
    rect(this.x + this.ancho / 16 + 40, this.y + 4, this.ancho - 70, this.alto / 16, 20)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Sistema extends Figura {
  constructor(x, y, esAzul) {
    super(x, y)
    super.estereotipo = "Software System"
    this.esAzul = esAzul
    if (this.esAzul) {
      this.colorCentro = color(17, 104, 189)
      this.colorBorde = color(138, 138, 138)
    } else {
      this.colorCentro = color(153, 153, 153)
      this.colorBorde = color(138, 138, 138)
    }
  }
  draw() {
    push();
    stroke(this.colorBorde)
    fill(this.colorCentro)
    rect(this.x, this.y, this.ancho, this.alto)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Container extends Figura {
  constructor(x, y) {
    super(x, y)
    super.estereotipo = "Container"
    this.colorBorde = color(0, 170, 228)
  }
  draw() {
    push();
    stroke(this.colorBorde)
    fill(0, 170, 228)
    rect(this.x, this.y, this.ancho, this.alto)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Component extends Figura {
  constructor(x, y) {
    super(x, y)
    super.estereotipo = "Component"
    this.colorBorde = color(140, 206, 250)
  }
  draw() {
    push();
    stroke(this.colorBorde)
    fill(135, 206, 235)
    rect(this.x, this.y, this.ancho, this.alto)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Composicion {
  constructor(figura1, figura2) {
    this.figura1 = figura1
    this.figura2 = figura2
    this.multiplicidad1 = ""
    this.multiplicidad2 = ""
    this.radioDeAreaCentral = 20
    this.estereotipo = "composicion"
    this.tieneEstereotipo = true
    this.centroLineaX
    this.centroLineaY
    this.seleccionado = false
    this.nombreDeRelacion = "composicion"
  }
  reconstruirLinea(elOtroObjeto) {
    // this.setEstereotipo = elOtroObjeto.setEstereotipo
    // this.setTieneEstereotipo = elOtroObjeto.tieneEstereotipo
    this.setNombreDeRelacion = elOtroObjeto.nombreDeRelacion
    this.centroLineaX = elOtroObjeto.centroLineaX
    this.centroLineaY = elOtroObjeto.centroLineaY
    this.multiplicidad1 = elOtroObjeto.multiplicidad1
    this.multiplicidad2 = elOtroObjeto.multiplicidad2
  }
  set setMultiplicidad1(multiplicidad1) {
    this.multiplicidad1 = multiplicidad1
  }
  get getMultiplicidad1() {
    return this.multiplicidad1
  }

  set setMultiplicidad2(multiplicidad2) {
    this.multiplicidad2 = multiplicidad2
  }
  get getMultiplicidad2() {
    return this.multiplicidad2
  }
  set setEstereotipo(estereotipo) {
    this.estereotipo = estereotipo
  }
  get getEstereotipo() {
    return this.estereotipo
  }
  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado
  }
  get getSeleccionado() {
    return this.seleccionado
  }
  set setNombreDeRelacion(nombreDeRelacion) {
    this.nombreDeRelacion = nombreDeRelacion
  }
  get getNombreDeRelacion() {
    return this.nombreDeRelacion
  }
  set setTieneEstereotipo(tieneEstereotipo) {
    this.tieneEstereotipo = tieneEstereotipo
  }
  get getTieneEstereotipo() {
    return this.tieneEstereotipo
  }
  draw() {
    push();

    // Calcular las coordenadas en el borde de la figura1 (para el inicio de la línea)
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Centro de la línea
    this.centroLineaX = (x1 + this.figura2.getCentroX) / 2;
    this.centroLineaY = (y1 + this.figura2.getCentroY) / 2;

    // Línea base entre el borde del diamante y la figura2
    drawingContext.setLineDash([]); // Línea continua
    line(x1, y1, this.figura2.getCentroX, this.figura2.getCentroY);


    let ajusteSobresalir = 15; // Valor para el ajuste de sobresalir
    const diamanteSize = 30; // Aumentar el tamaño del diamante para sobresalir más
    // Dibuja el círculo si la línea está seleccionada
    if (this.getSeleccionado) {
      fill(255, 255, 255);
      circle(this.centroLineaX, this.centroLineaY, this.radioDeAreaCentral);
      fill(0, 0, 0);
    }

    // Dibuja el estereotipo y el nombre de la relación
    if (this.getTieneEstereotipo) {
      textAlign(CENTER, CENTER);
      // const diamanteSize = 20; // Aumentar el tamaño del diamante para sobresalir más

      // Calcular las coordenadas en el borde de la figura1
      let dx = this.figura2.getCentroX - this.figura1.getCentroX;
      let dy = this.figura2.getCentroY - this.figura1.getCentroY;
      let dist = sqrt(dx * dx + dy * dy);

      // Posición del borde de la figura1 (donde se dibuja el diamante)
      let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
      let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
      let x1 = this.figura1.getCentroX + offsetX;
      let y1 = this.figura1.getCentroY + offsetY;

      // Calcular el ángulo de la línea para alinear el diamante correctamente
      let angle = atan2(dy, dx);

      // Calcular un pequeño desplazamiento hacia fuera para que sobresalga más
      // let ajusteSobresalir = 15; // Valor para el ajuste de sobresalir
      x1 += cos(angle) * ajusteSobresalir;
      y1 += sin(angle) * ajusteSobresalir;

      // Definir los puntos del diamante relativos al borde de la figura1
      push();
      fill(0); // Color negro para diamante relleno
      noStroke();

      beginShape();
      vertex(x1 + cos(angle) * diamanteSize * 0.5, y1 + sin(angle) * diamanteSize * 0.5); // Punto superior
      vertex(x1 + cos(angle + HALF_PI) * diamanteSize * 0.5, y1 + sin(angle + HALF_PI) * diamanteSize * 0.5); // Punto izquierdo
      vertex(x1 - cos(angle) * diamanteSize * 0.5, y1 - sin(angle) * diamanteSize * 0.5); // Punto inferior
      vertex(x1 + cos(angle - HALF_PI) * diamanteSize * 0.5, y1 + sin(angle - HALF_PI) * diamanteSize * 0.5); // Punto derecho
      endShape(CLOSE); // Cierra el diamante
      pop();
    } else {


      // Calcular las coordenadas en el borde de la figura1
      let dx = this.figura2.getCentroX - this.figura1.getCentroX;
      let dy = this.figura2.getCentroY - this.figura1.getCentroY;
      let dist = sqrt(dx * dx + dy * dy);

      // Posición del borde de la figura1 (donde se dibuja el diamante)
      let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
      let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
      let x1 = this.figura1.getCentroX + offsetX;
      let y1 = this.figura1.getCentroY + offsetY;

      // Calcular el ángulo de la línea para alinear el diamante correctamente
      let angle = atan2(dy, dx);

      // Calcular un pequeño desplazamiento hacia fuera para que sobresalga más

      x1 += cos(angle) * ajusteSobresalir;
      y1 += sin(angle) * ajusteSobresalir;

      // Definir los puntos del diamante relativos al borde de la figura1
      push();
      fill(0); // Color negro para diamante relleno
      noStroke();

      beginShape();
      vertex(x1 + cos(angle) * diamanteSize * 0.5, y1 + sin(angle) * diamanteSize * 0.5); // Punto superior
      vertex(x1 + cos(angle + HALF_PI) * diamanteSize * 0.5, y1 + sin(angle + HALF_PI) * diamanteSize * 0.5); // Punto izquierdo
      vertex(x1 - cos(angle) * diamanteSize * 0.5, y1 - sin(angle) * diamanteSize * 0.5); // Punto inferior
      vertex(x1 + cos(angle - HALF_PI) * diamanteSize * 0.5, y1 + sin(angle - HALF_PI) * diamanteSize * 0.5); // Punto derecho
      endShape(CLOSE); // Cierra el diamante
      pop();
    }
    // Calcular el vector de la línea
    let ux = dx / dist;
    let uy = dy / dist;

    // Calcular las posiciones de las multiplicidades (al lado de las figuras)
    let multiplicidad1X = this.figura1.getCentroX + ux * (this.figura1.getAncho / 2 + 50);
    let multiplicidad1Y = this.figura1.getCentroY + uy * (this.figura1.getAlto / 2 + 120);

    let multiplicidad2X = this.figura2.getCentroX - ux * (this.figura2.getAncho / 2 + 50);
    let multiplicidad2Y = this.figura2.getCentroY - uy * (this.figura2.getAlto / 2 + 50);

    // Dibujar las multiplicidades (si existen)
    textAlign(CENTER, CENTER);
    text(this.multiplicidad1 || '', multiplicidad1X, multiplicidad1Y); // Dibujar multiplicidad en figura1
    text(this.multiplicidad2 || '', multiplicidad2X, multiplicidad2Y); // Dibujar multiplicidad en figura2
    textStyle(BOLD);
    text(this.nombreDeRelacion, this.centroLineaX, this.centroLineaY - 10);
    pop();
  }
  enAreaCentral(x, y) {
    console.log(`Centro de la línea: (${this.centroLineaX}, ${this.centroLineaY}), Clic en: (${x}, ${y})`);

    let distanciaAlCentro = dist(this.centroLineaX, this.centroLineaY, x, y);
    console.log(`Distancia al centro: ${distanciaAlCentro}, Radio del área: ${this.radioDeAreaCentral}`);

    return distanciaAlCentro < this.radioDeAreaCentral;
  }
  // Método para dibujar el diamante relleno (composición)

  /*dibujarDiamanteRelleno() {
    const diamanteSize = 20; // Aumentar el tamaño del diamante para sobresalir más

    // Calcular las coordenadas en el borde de la figura1
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Calcular el ángulo de la línea para alinear el diamante correctamente
    let angle = atan2(dy, dx);

    // Calcular un pequeño desplazamiento hacia fuera para que sobresalga más
    let ajusteSobresalir = 15; // Valor para el ajuste de sobresalir
    x1 += cos(angle) * ajusteSobresalir;
    y1 += sin(angle) * ajusteSobresalir;

    // Definir los puntos del diamante relativos al borde de la figura1
    push();
    fill(0); // Color negro para diamante relleno
    noStroke();

    beginShape();
    vertex(x1 + cos(angle) * diamanteSize * 0.7, y1 + sin(angle) * diamanteSize * 0.7); // Punto superior
    vertex(x1 + cos(angle + HALF_PI) * diamanteSize * 0.5, y1 + sin(angle + HALF_PI) * diamanteSize * 0.5); // Punto izquierdo
    vertex(x1 - cos(angle) * diamanteSize * 0.7, y1 - sin(angle) * diamanteSize * 0.7); // Punto inferior
    vertex(x1 + cos(angle - HALF_PI) * diamanteSize * 0.5, y1 + sin(angle - HALF_PI) * diamanteSize * 0.5); // Punto derecho
    endShape(CLOSE); // Cierra el diamante
    pop();

  }*/

  /*enAreaCentral(x, y) {
    if (this.radioDeAreaCentral > dist(this.centroLineaX, this.centroLineaY, x, y)) {
      return true
    }
    return false
  }*/

}

class Agregacion {
  constructor(figura1, figura2) {
    this.figura1 = figura1
    this.figura2 = figura2
    this.multiplicidad1 = ""
    this.multiplicidad2 = ""
    this.radioDeAreaCentral = 20
    this.estereotipo = "agregacion"
    this.tieneEstereotipo = true
    this.centroLineaX
    this.centroLineaY
    this.seleccionado = false
    this.nombreDeRelacion = "agregacion"
  }
  reconstruirLinea(elOtroObjeto) {
    //  this.setEstereotipo = elOtroObjeto.setEstereotipo
    // this.setTieneEstereotipo = elOtroObjeto.tieneEstereotipo
    this.multiplicidad1 = elOtroObjeto.multiplicidad1
    this.multiplicidad2 = elOtroObjeto.multiplicidad2
    this.setNombreDeRelacion = elOtroObjeto.nombreDeRelacion
    this.centroLineaX = elOtroObjeto.centroLineaX
    this.centroLineaY = elOtroObjeto.centroLineaY
  }
  set setMultiplicidad1(multiplicidad1) {
    this.multiplicidad1 = multiplicidad1
  }
  get getMultiplicidad1() {
    return this.multiplicidad1
  }

  set setMultiplicidad2(multiplicidad2) {
    this.multiplicidad2 = multiplicidad2
  }
  get getMultiplicidad2() {
    return this.multiplicidad2
  }
  set setEstereotipo(estereotipo) {
    this.estereotipo = estereotipo
  }
  get getEstereotipo() {
    return this.estereotipo
  }
  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado
  }
  get getSeleccionado() {
    return this.seleccionado
  }
  set setNombreDeRelacion(nombreDeRelacion) {
    this.nombreDeRelacion = nombreDeRelacion
  }
  get getNombreDeRelacion() {
    return this.nombreDeRelacion
  }
  set setTieneEstereotipo(tieneEstereotipo) {
    this.tieneEstereotipo = tieneEstereotipo
  }
  get getTieneEstereotipo() {
    return this.tieneEstereotipo
  }
  draw() {
    push();

    // Calcular las coordenadas en el borde de la figura1 (para el inicio de la línea)
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Centro de la línea Para el texto
    this.centroLineaX = (x1 + this.figura2.getCentroX) / 2;
    this.centroLineaY = (y1 + this.figura2.getCentroY) / 2;
    // Dibuja el diamante relleno en el borde de la figura1 (composición)
    this.dibujarDiamanteRelleno();
    // Línea base entre el borde del diamante y la figura2
    drawingContext.setLineDash([]); // Línea continua
    line(x1, y1, this.figura2.getCentroX, this.figura2.getCentroY);


    // Calcular el vector de la línea
    let ux = dx / dist;
    let uy = dy / dist;

    // Calcular las posiciones de las multiplicidades (al lado de las figuras)
    let multiplicidad1X = this.figura1.getCentroX + ux * (this.figura1.getAncho / 2 + 50);
    let multiplicidad1Y = this.figura1.getCentroY + uy * (this.figura1.getAlto / 2 + 120);

    let multiplicidad2X = this.figura2.getCentroX - ux * (this.figura2.getAncho / 2 + 50);
    let multiplicidad2Y = this.figura2.getCentroY - uy * (this.figura2.getAlto / 2 + 50);

    // Dibujar las multiplicidades (si existen)
    textAlign(CENTER, CENTER);
    text(this.multiplicidad1 || '', multiplicidad1X, multiplicidad1Y); // Dibujar multiplicidad en figura1
    text(this.multiplicidad2 || '', multiplicidad2X, multiplicidad2Y); // Dibujar multiplicidad en figura2

    // Dibuja el círculo si la línea está seleccionada
    if (this.getSeleccionado) {
      fill(255, 255, 255);
      circle(this.centroLineaX, this.centroLineaY, this.radioDeAreaCentral);
      fill(16, 254, 68);
    }



    textStyle(BOLD);
    text(this.nombreDeRelacion, this.centroLineaX, this.centroLineaY - 10);
    pop();
  }

  // Método para dibujar el diamante relleno (composición)

  dibujarDiamanteRelleno() {
    const diamanteSize = 30; // Aumentar el tamaño del diamante para sobresalir más

    // Calcular las coordenadas en el borde de la figura1
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Calcular el ángulo de la línea para alinear el diamante correctamente
    let angle = atan2(dy, dx);

    // Calcular un pequeño desplazamiento hacia fuera para que sobresalga más
    let ajusteSobresalir = 16; // Valor para el ajuste de sobresalir
    x1 += cos(angle) * ajusteSobresalir;
    y1 += sin(angle) * ajusteSobresalir;

    push();
    noFill(); // Sin relleno
    stroke(0); // Color negro para el contorno
    strokeWeight(2); // Grosor de la línea del contorno

    beginShape();
    vertex(x1 + cos(angle) * diamanteSize * 0.5, y1 + sin(angle) * diamanteSize * 0.5); // Punto superior
    vertex(x1 + cos(angle + HALF_PI) * diamanteSize * 0.5, y1 + sin(angle + HALF_PI) * diamanteSize * 0.5); // Punto izquierdo
    vertex(x1 - cos(angle) * diamanteSize * 0.5, y1 - sin(angle) * diamanteSize * 0.5); // Punto inferior
    vertex(x1 + cos(angle - HALF_PI) * diamanteSize * 0.5, y1 + sin(angle - HALF_PI) * diamanteSize * 0.5); // Punto derecho
    endShape(CLOSE); // Cierra el diamante
    pop();
  }

  enAreaCentral(x, y) {
    if (this.radioDeAreaCentral > dist(this.centroLineaX, this.centroLineaY, x, y)) {
      return true
    }
    return false
  }
}
class Realizacion {
  constructor(figura1, figura2) {
    this.figura1 = figura1
    this.figura2 = figura2
    this.multiplicidad1 = ""
    this.multiplicidad2 = ""
    this.radioDeAreaCentral = 20
    this.estereotipo = "{technology}"
    this.tieneEstereotipo = true
    this.centroLineaX
    this.centroLineaY
    this.seleccionado = false
    this.nombreDeRelacion = "realizacion"
  }
  reconstruirLinea(elOtroObjeto) {
    this.setEstereotipo = elOtroObjeto.setEstereotipo
    this.setTieneEstereotipo = elOtroObjeto.tieneEstereotipo
    this.setNombreDeRelacion = elOtroObjeto.nombreDeRelacion
    this.centroLineaX = elOtroObjeto.centroLineaX
    this.centroLineaY = elOtroObjeto.centroLineaY
  }
  set setMultiplicidad1(multiplicidad1) {
    this.multiplicidad1 = multiplicidad1
  }
  get getMultiplicidad1() {
    return this.multiplicidad1
  }

  set setMultiplicidad2(multiplicidad2) {
    this.multiplicidad2 = multiplicidad2
  }
  get getMultiplicidad2() {
    return this.multiplicidad2
  }
  set setEstereotipo(estereotipo) {
    this.estereotipo = estereotipo
  }
  get getEstereotipo() {
    return this.estereotipo
  }
  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado
  }
  get getSeleccionado() {
    return this.seleccionado
  }
  set setNombreDeRelacion(nombreDeRelacion) {
    this.nombreDeRelacion = nombreDeRelacion
  }
  get getNombreDeRelacion() {
    return this.nombreDeRelacion
  }
  set setTieneEstereotipo(tieneEstereotipo) {
    this.tieneEstereotipo = tieneEstereotipo
  }
  get getTieneEstereotipo() {
    return this.tieneEstereotipo
  }
  draw() {
    push();

    // Calcular las coordenadas en el borde de la figura1 (para el inicio de la línea)
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Centro de la línea Para el texto
    this.centroLineaX = (x1 + this.figura2.getCentroX) / 2;
    this.centroLineaY = (y1 + this.figura2.getCentroY) / 2;

    // Línea base entre el borde del diamante y la figura2
    drawingContext.setLineDash([8]); // Línea continua
    line(x1, y1, this.figura2.getCentroX, this.figura2.getCentroY);
    pop();
    // Dibuja el diamante relleno en el borde de la figura1 (composición)
    this.dibujarDiamanteRelleno();

    // Dibuja el círculo si la línea está seleccionada
    if (this.getSeleccionado) {
      fill(255, 255, 255);
      circle(this.centroLineaX, this.centroLineaY, this.radioDeAreaCentral);
      fill(16, 254, 68);
    }

    // Calcular el vector de la línea
    let ux = dx / dist;
    let uy = dy / dist;

    // Calcular las posiciones de las multiplicidades (al lado de las figuras)
    let multiplicidad1X = this.figura1.getCentroX + ux * (this.figura1.getAncho / 2 + 50);
    let multiplicidad1Y = this.figura1.getCentroY + uy * (this.figura1.getAlto / 2 + 120);

    let multiplicidad2X = this.figura2.getCentroX - ux * (this.figura2.getAncho / 2 + 50);
    let multiplicidad2Y = this.figura2.getCentroY - uy * (this.figura2.getAlto / 2 + 50);

    // Dibujar las multiplicidades (si existen)
    textAlign(CENTER, CENTER);
    text(this.multiplicidad1 || '', multiplicidad1X, multiplicidad1Y); // Dibujar multiplicidad en figura1
    text(this.multiplicidad2 || '', multiplicidad2X, multiplicidad2Y); // Dibujar multiplicidad en figura2

    textStyle(BOLD);
    text(this.nombreDeRelacion, this.centroLineaX, this.centroLineaY - 10);
    pop();
  }

  // Método para dibujar el diamante relleno (composición)

  dibujarDiamanteRelleno() {
    const diamanteSize = 20; // Aumentar el tamaño del diamante para sobresalir más

    // Calcular las coordenadas en el borde de la figura1
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Calcular el ángulo de la línea para alinear el diamante correctamente
    let angle = atan2(dy, dx);

    // Calcular un pequeño desplazamiento hacia fuera para que sobresalga más
    let ajusteSobresalir = 15.5; // Valor para el ajuste de sobresalir
    x1 += cos(angle) * ajusteSobresalir;
    y1 += sin(angle) * ajusteSobresalir;

    push();
    // noFill(); // Sin relleno
    stroke(255); // Color negro para el contorno
    strokeWeight(2); // Grosor de la línea del contorno

    beginShape();
    // vertex(x1 + cos(angle) * diamanteSize * 0.7, y1 + sin(angle) * diamanteSize * 0.7); // Punto superior
    vertex(x1 + cos(angle + HALF_PI) * diamanteSize * 0.7, y1 + sin(angle + HALF_PI) * diamanteSize * 0.7); // Punto izquierdo
    vertex(x1 - cos(angle) * diamanteSize * 0.7, y1 - sin(angle) * diamanteSize * 0.7); // Punto inferior
    vertex(x1 + cos(angle - HALF_PI) * diamanteSize * 0.7, y1 + sin(angle - HALF_PI) * diamanteSize * 0.7); // Punto derecho
    endShape(CLOSE); // Cierra el diamante
    pop();
  }

  enAreaCentral(x, y) {
    if (this.radioDeAreaCentral > dist(this.centroLineaX, this.centroLineaY, x, y)) {
      return true
    }
    return false
  }


}
//herencia
class Inherencia {
  constructor(figura1, figura2) {
    this.figura1 = figura1
    this.figura2 = figura2
    this.multiplicidad1 = ""
    this.multiplicidad2 = ""
    this.radioDeAreaCentral = 20
    this.estereotipo = "herencia"
    this.tieneEstereotipo = true
    this.centroLineaX
    this.centroLineaY
    this.seleccionado = false
    this.nombreDeRelacion = "herencia"
  }
  reconstruirLinea(elOtroObjeto) {
    //this.setEstereotipo = elOtroObjeto.setEstereotipo
    // this.setTieneEstereotipo = elOtroObjeto.tieneEstereotipo
    this.multiplicidad1 = elOtroObjeto.multiplicidad1
    this.multiplicidad2 = elOtroObjeto.multiplicidad2
    this.setNombreDeRelacion = elOtroObjeto.nombreDeRelacion
    this.centroLineaX = elOtroObjeto.centroLineaX
    this.centroLineaY = elOtroObjeto.centroLineaY
  }
  set setMultiplicidad1(multiplicidad1) {
    this.multiplicidad1 = multiplicidad1
  }
  get getMultiplicidad1() {
    return this.multiplicidad1
  }

  set setMultiplicidad2(multiplicidad2) {
    this.multiplicidad2 = multiplicidad2
  }
  get getMultiplicidad2() {
    return this.multiplicidad2
  }
  set setEstereotipo(estereotipo) {
    this.estereotipo = estereotipo
  }
  get getEstereotipo() {
    return this.estereotipo
  }
  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado
  }
  get getSeleccionado() {
    return this.seleccionado
  }
  set setNombreDeRelacion(nombreDeRelacion) {
    this.nombreDeRelacion = nombreDeRelacion
  }
  get getNombreDeRelacion() {
    return this.nombreDeRelacion
  }
  set setTieneEstereotipo(tieneEstereotipo) {
    this.tieneEstereotipo = tieneEstereotipo
  }
  get getTieneEstereotipo() {
    return this.tieneEstereotipo
  }
  draw() {
    push();

    // Calcular las coordenadas en el borde de la figura1 (para el inicio de la línea)
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Centro de la línea Para el texto
    this.centroLineaX = (x1 + this.figura2.getCentroX) / 2;
    this.centroLineaY = (y1 + this.figura2.getCentroY) / 2;

    // Línea base entre el borde del diamante y la figura2
    drawingContext.setLineDash([]); // Línea continua
    line(x1, y1, this.figura2.getCentroX, this.figura2.getCentroY);
    pop();
    // Dibuja el diamante relleno en el borde de la figura1 (composición)
    this.dibujarDiamanteRelleno();

    

    // Calcular el vector de la línea
    let ux = dx / dist;
    let uy = dy / dist;

    // Calcular las posiciones de las multiplicidades (al lado de las figuras)
    let multiplicidad1X = this.figura1.getCentroX + ux * (this.figura1.getAncho / 2 + 50);
    let multiplicidad1Y = this.figura1.getCentroY + uy * (this.figura1.getAlto / 2 + 120);

    let multiplicidad2X = this.figura2.getCentroX - ux * (this.figura2.getAncho / 2 + 50);
    let multiplicidad2Y = this.figura2.getCentroY - uy * (this.figura2.getAlto / 2 + 50);

    // Dibujar las multiplicidades (si existen)
    textAlign(CENTER, CENTER);
    text(this.multiplicidad1 || '', multiplicidad1X, multiplicidad1Y); // Dibujar multiplicidad en figura1
    text(this.multiplicidad2 || '', multiplicidad2X, multiplicidad2Y); // Dibujar multiplicidad en figura2



    textStyle(BOLD);
    text(this.nombreDeRelacion, this.centroLineaX, this.centroLineaY - 10);
    pop();
  }

  // Método para dibujar el diamante relleno (composición)

  dibujarDiamanteRelleno() {
    const diamanteSize = 20; // Aumentar el tamaño del diamante para sobresalir más

    // Calcular las coordenadas en el borde de la figura1
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja el diamante)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Calcular el ángulo de la línea para alinear el diamante correctamente
    let angle = atan2(dy, dx);

    // Calcular un pequeño desplazamiento hacia fuera para que sobresalga más
    let ajusteSobresalir = 15.5; // Valor para el ajuste de sobresalir
    x1 += cos(angle) * ajusteSobresalir;
    y1 += sin(angle) * ajusteSobresalir;

    push();
    noFill(); // Sin relleno
    stroke(0); // Color negro para el contorno
    strokeWeight(2); // Grosor de la línea del contorno

    beginShape();
    // vertex(x1 + cos(angle) * diamanteSize * 0.7, y1 + sin(angle) * diamanteSize * 0.7); // Punto superior
    vertex(x1 + cos(angle + HALF_PI) * diamanteSize * 0.7, y1 + sin(angle + HALF_PI) * diamanteSize * 0.7); // Punto izquierdo
    vertex(x1 - cos(angle) * diamanteSize * 0.7, y1 - sin(angle) * diamanteSize * 0.7); // Punto inferior
    vertex(x1 + cos(angle - HALF_PI) * diamanteSize * 0.7, y1 + sin(angle - HALF_PI) * diamanteSize * 0.7); // Punto derecho
    endShape(CLOSE); // Cierra el diamante
    pop();
  }

  enAreaCentral(x, y) {
    if (this.radioDeAreaCentral > dist(this.centroLineaX, this.centroLineaY, x, y)) {
      return true
    }
    return false
  }





}
class Dependencia {
  constructor(figura1, figura2) {
    this.figura1 = figura1
    this.figura2 = figura2
    this.radioDeAreaCentral = 20
    this.multiplicidad1 = ""
    this.multiplicidad2 = ""
    this.estereotipo = "dependencia"
    this.tieneEstereotipo = true
    this.centroLineaX
    this.centroLineaY
    this.seleccionado = false
    this.nombreDeRelacion = "dependencia"
  }
  reconstruirLinea(elOtroObjeto) {
    this.setEstereotipo = elOtroObjeto.setEstereotipo
    this.setTieneEstereotipo = elOtroObjeto.tieneEstereotipo
    this.multiplicidad1 = elOtroObjeto.multiplicidad1
    this.multiplicidad2 = elOtroObjeto.multiplicidad2
    this.setNombreDeRelacion = elOtroObjeto.nombreDeRelacion
    this.centroLineaX = elOtroObjeto.centroLineaX
    this.centroLineaY = elOtroObjeto.centroLineaY
  }

  set setMultiplicidad1(multiplicidad1) {
    this.multiplicidad1 = multiplicidad1
  }
  get getMultiplicidad1() {
    return this.multiplicidad1
  }
  set setMultiplicidad2(multiplicidad2) {
    this.multiplicidad2 = multiplicidad2
  }
  get getMultiplicidad2() {
    return this.multiplicidad2
  }

  set setEstereotipo(estereotipo) {
    this.estereotipo = estereotipo
  }
  get getEstereotipo() {
    return this.estereotipo
  }
  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado
  }
  get getSeleccionado() {
    return this.seleccionado
  }
  set setNombreDeRelacion(nombreDeRelacion) {
    this.nombreDeRelacion = nombreDeRelacion
  }
  get getNombreDeRelacion() {
    return this.nombreDeRelacion
  }
  set setTieneEstereotipo(tieneEstereotipo) {
    this.tieneEstereotipo = tieneEstereotipo
  }
  get getTieneEstereotipo() {
    return this.tieneEstereotipo
  }
  draw() {
    push();

    // Calcular las coordenadas en el borde de la figura1 (para el inicio de la línea)
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja la flecha)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Centro de la línea Para el texto
    this.centroLineaX = (x1 + this.figura2.getCentroX) / 2;
    this.centroLineaY = (y1 + this.figura2.getCentroY) / 2;

    // Línea base entre el borde del diamante y la figura2
    drawingContext.setLineDash([8]); // Línea continua
    line(x1, y1, this.figura2.getCentroX, this.figura2.getCentroY);
    pop();
    // Dibuja el diamante relleno en el borde de la figura1 (composición)
    this.dibujarFlechaRelleno();

    // Dibuja el círculo si la línea está seleccionada
    if (this.getSeleccionado) {
      fill(255, 255, 255);
      circle(this.centroLineaX, this.centroLineaY, this.radioDeAreaCentral);
      fill(16, 254, 68);
    }
    // Calcular el vector de la línea
    let ux = dx / dist;
    let uy = dy / dist;

    // Calcular las posiciones de las multiplicidades (al lado de las figuras)
    let multiplicidad1X = this.figura1.getCentroX + ux * (this.figura1.getAncho / 2 + 50);
    let multiplicidad1Y = this.figura1.getCentroY + uy * (this.figura1.getAlto / 2 + 120);

    let multiplicidad2X = this.figura2.getCentroX - ux * (this.figura2.getAncho / 2 + 50);
    let multiplicidad2Y = this.figura2.getCentroY - uy * (this.figura2.getAlto / 2 + 50);

    // Dibujar las multiplicidades (si existen)
    textAlign(CENTER, CENTER);
    text(this.multiplicidad1 || '', multiplicidad1X, multiplicidad1Y); // Dibujar multiplicidad en figura1
    text(this.multiplicidad2 || '', multiplicidad2X, multiplicidad2Y); // Dibujar multiplicidad en figura2
    // Dibuja el estereotipo y el nombre de la relación


    textStyle(BOLD);
    text(this.nombreDeRelacion, this.centroLineaX, this.centroLineaY - 10);
    pop();
  }

  // Método para dibujar el diamante relleno (composición)

  dibujarFlechaRelleno() {
    const arrowSize = 20; // Tamaño de la flecha

    // Calcular las coordenadas de la línea desde figura1 a figura2
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde se dibuja la flecha)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Calcular el ángulo de la línea para alinear la flecha correctamente
    let angle = atan2(dy, dx);

    // Ajustar un pequeño desplazamiento para que sobresalga más
    let ajusteSobresalir = 2; // Valor para el ajuste de sobresalir
    x1 += cos(angle) * ajusteSobresalir;
    y1 += sin(angle) * ajusteSobresalir;

    // Dibujar la flecha sin línea que la cruce
    push();
    noFill(); // Sin relleno
    stroke(0); // Color negro para el contorno
    strokeWeight(1); // Grosor de la línea del contorno

    // Dibujar la flecha en el borde sin la línea del centro
    beginShape();
    vertex(x1 + cos(angle + QUARTER_PI) * arrowSize, y1 + sin(angle + QUARTER_PI) * arrowSize); // Punto superior
    vertex(x1, y1); // Punto en el centro de la flecha (punta)
    vertex(x1 + cos(angle - QUARTER_PI) * arrowSize, y1 + sin(angle - QUARTER_PI) * arrowSize); // Punto inferior
    endShape();

    pop();

  }



  enAreaCentral(x, y) {
    console.log(`Centro de la línea: (${this.centroLineaX}, ${this.centroLineaY}), Clic en: (${x}, ${y})`);

    let distanciaAlCentro = dist(this.centroLineaX, this.centroLineaY, x, y);
    console.log(`Distancia al centro: ${distanciaAlCentro}, Radio del área: ${this.radioDeAreaCentral}`);

    return distanciaAlCentro < this.radioDeAreaCentral;
  }
}
class Asociacion {
  constructor(figura1, figura2) {
    this.figura1 = figura1
    this.figura2 = figura2
    this.multiplicidad1 = ""
    this.multiplicidad2 = ""
    this.radioDeAreaCentral = 20
    this.estereotipo = "asociacion"
    this.tieneEstereotipo = true
    this.centroLineaX
    this.centroLineaY
    this.seleccionado = false
    this.nombreDeRelacion = "asociacion"
  }
  reconstruirLinea(elOtroObjeto) {
    // this.setEstereotipo = elOtroObjeto.setEstereotipo
    // this.setTieneEstereotipo = elOtroObjeto.tieneEstereotipo
    this.setMultiplicidad1 = elOtroObjeto.multiplicidad1
    this.setMultiplicidad2 = elOtroObjeto.multiplicidad2
    this.setNombreDeRelacion = elOtroObjeto.nombreDeRelacion
    this.centroLineaX = elOtroObjeto.centroLineaX
    this.centroLineaY = elOtroObjeto.centroLineaY
  }
  set setMultiplicidad1(multiplicidad1) {
    this.multiplicidad1 = multiplicidad1
  }
  get getMultiplicidad1() {
    return this.multiplicidad1
  }
  set setMultiplicidad2(multiplicidad2) {
    this.multiplicidad2 = multiplicidad2
  }
  get getMultiplicidad2() {
    return this.multiplicidad2
  }



  set setEstereotipo(estereotipo) {
    this.estereotipo = estereotipo
  }
  get getEstereotipo() {
    return this.estereotipo
  }
  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado
  }
  get getSeleccionado() {
    return this.seleccionado
  }
  set setNombreDeRelacion(nombreDeRelacion) {
    this.nombreDeRelacion = nombreDeRelacion
  }
  get getNombreDeRelacion() {
    return this.nombreDeRelacion
  }
  set setTieneEstereotipo(tieneEstereotipo) {
    this.tieneEstereotipo = tieneEstereotipo
  }
  get getTieneEstereotipo() {
    return this.tieneEstereotipo
  }

  draw() {
    push();

    // Calcular las coordenadas en el borde de la figura1 (para el inicio de la línea)
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);

    // Posición del borde de la figura1 (donde comienza la línea)
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;

    // Centro de la línea para dibujar el texto
    this.centroLineaX = (x1 + this.figura2.getCentroX) / 2;
    this.centroLineaY = (y1 + this.figura2.getCentroY) / 2;

    // Dibuja la línea entre figura1 y figura2
    drawingContext.setLineDash([]); // Línea continua
    line(x1, y1, this.figura2.getCentroX, this.figura2.getCentroY);

    // Dibuja el círculo si la línea está seleccionada
    if (this.getSeleccionado) {
      fill(255, 255, 255);
      circle(this.centroLineaX, this.centroLineaY, this.radioDeAreaCentral);
      fill(16, 254, 68);
    }

    // Calcular el vector de la línea
    let ux = dx / dist;
    let uy = dy / dist;

    // Calcular las posiciones de las multiplicidades (al lado de las figuras)
    let multiplicidad1X = this.figura1.getCentroX + ux * (this.figura1.getAncho / 2 + 40);
    let multiplicidad1Y = this.figura1.getCentroY + uy * (this.figura1.getAlto / 2 + 40);

    let multiplicidad2X = this.figura2.getCentroX - ux * (this.figura2.getAncho / 2 + 40);
    let multiplicidad2Y = this.figura2.getCentroY - uy * (this.figura2.getAlto / 2 + 40);

    // Dibujar las multiplicidades (si existen)
    textAlign(CENTER, CENTER);
    text(this.multiplicidad1 || '', multiplicidad1X, multiplicidad1Y); // Dibujar multiplicidad en figura1
    text(this.multiplicidad2 || '', multiplicidad2X, multiplicidad2Y); // Dibujar multiplicidad en figura2

    // Dibuja el nombre de la relación en el centro de la línea
    textStyle(BOLD);
    text(this.nombreDeRelacion, this.centroLineaX, this.centroLineaY - 15);

    pop();
  }
  enAreaCentral(x, y) {
    console.log(`Centro de la línea: (${this.centroLineaX}, ${this.centroLineaY}), Clic en: (${x}, ${y})`);

    let distanciaAlCentro = dist(this.centroLineaX, this.centroLineaY, x, y);
    console.log(`Distancia al centro: ${distanciaAlCentro}, Radio del área: ${this.radioDeAreaCentral}`);

    return distanciaAlCentro < this.radioDeAreaCentral;
  }
}
class MuchosAMuchos {
  constructor(figura1, figura2) {
    this.figura1 = figura1;
    this.figura2 = figura2;
    this.multiplicidad1 = "N";
    this.multiplicidad2 = "N";
    this.radioDeAreaCentral = 20;
    this.estereotipo = "muchos_a_muchos";
    this.tieneEstereotipo = true;
    this.centroLineaX;
    this.centroLineaY;
    this.seleccionado = false;
    this.nombreDeRelacion = "muchos_a_muchos";
  }

  draw() {
    push();
    
    // Calcular dirección
    let dx = this.figura2.getCentroX - this.figura1.getCentroX;
    let dy = this.figura2.getCentroY - this.figura1.getCentroY;
    let dist = sqrt(dx * dx + dy * dy);
    
    let offsetX = (dx / dist) * (this.figura1.getAncho / 2);
    let offsetY = (dy / dist) * (this.figura1.getAlto / 2);
    
    let x1 = this.figura1.getCentroX + offsetX;
    let y1 = this.figura1.getCentroY + offsetY;
    
    this.centroLineaX = (x1 + this.figura2.getCentroX) / 2;
    this.centroLineaY = (y1 + this.figura2.getCentroY) / 2;

    // Línea continua
    drawingContext.setLineDash([]);
    line(x1, y1, this.figura2.getCentroX, this.figura2.getCentroY);

    // Si está seleccionada
    if (this.getSeleccionado) {
      fill(255);
      circle(this.centroLineaX, this.centroLineaY, this.radioDeAreaCentral);
      fill(16, 254, 68);
    }

    // Dibujar las multiplicidades
    textAlign(CENTER, CENTER);
    let ux = dx / dist;
    let uy = dy / dist;

    let multiplicidad1X = this.figura1.getCentroX + ux * (this.figura1.getAncho / 2 + 40);
    let multiplicidad1Y = this.figura1.getCentroY + uy * (this.figura1.getAlto / 2 + 40);

    let multiplicidad2X = this.figura2.getCentroX - ux * (this.figura2.getAncho / 2 + 40);
    let multiplicidad2Y = this.figura2.getCentroY - uy * (this.figura2.getAlto / 2 + 40);

    text(this.multiplicidad1, multiplicidad1X, multiplicidad1Y);
    text(this.multiplicidad2, multiplicidad2X, multiplicidad2Y);

    // Dibujar el nombre de la relación
    textStyle(BOLD);
    text(this.nombreDeRelacion, this.centroLineaX, this.centroLineaY - 10);
    
    pop();
  }

  set setSeleccionado(seleccionado) {
    this.seleccionado = seleccionado;
  }
  get getSeleccionado() {
    return this.seleccionado;
  }
}
class LineaPunteada {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    push();
    stroke(0);
    drawingContext.setLineDash([5, 5]); // Línea punteada
    line(this.x1, this.y1, this.x2, this.y2);
    drawingContext.setLineDash([]); // Reset
    pop();
  }
}




var vectorDeEntidades = []
var vectorDeLineas = []
var elementoActual = null
var elementoParaEditar = null
var preparadoParaColocarElemento = false
var elementoQueSeColocara = ''
var ponerElemento = false
var relacionUno = null
var relacionDos = null
var lineaActual = null
var lineaParaEditar = null
var nivelDeDiagrama
var ultimoElementoClickeado
let seArrastroUnaFiguraUsandoElMouse = false
var myCanvas
var room = window.location.href.split('/')[4]

function setup() {
  // put setup code here
  createCanvas(1920, 780)
  socket = io.connect()
  socket.on('welcome', (msg) => {
    console.log('Received: ', msg);
  })
  socket.emit('joinRoom', room)
  socket.on('newUser', (res) => console.log(res))
  socket.on('err', (err) => console.log(err))
  socket.on('success', (res) => console.log(res))
  socket.on('mouse', draw2)
}

function draw() {
  background(220)
  vectorDeLineas.forEach(function (elemento) {
    elemento.draw()
  })
  vectorDeEntidades.forEach(function (elemento) {
    elemento.draw()
  })
}

function draw2(vectorDeEntidades2, vectorDeLineas2, room) {
  let vectorDeEntidadesRecuperadas = []
  let vectorDeLineasRecuperadas = []

  // Recuperar entidades
  vectorDeEntidades2.forEach(function (elemento) {
    let entidadAReconstruir;
    if (elemento.estereotipo === 'Class') {
      entidadAReconstruir = new Clase(0, 0);
    }
    entidadAReconstruir.reconstruirFigura(elemento);
    vectorDeEntidadesRecuperadas.push(entidadAReconstruir);
  });

  vectorDeEntidades = vectorDeEntidadesRecuperadas;

  // Verificar si hay líneas para procesar
  if (vectorDeLineas2 !== undefined) {
    vectorDeLineas2.forEach(function (elemento) {
      let figura1 = null;
      let figura2 = null;

      // Buscar las entidades que forman la relación
      for (let i = 0; i < vectorDeEntidades.length && (figura1 === null || figura2 === null); i++) {
        if (vectorDeEntidades[i].getX === elemento.figura1.x &&
          vectorDeEntidades[i].getY === elemento.figura1.y) {
          figura1 = vectorDeEntidades[i];
        }
        if (vectorDeEntidades[i].getX === elemento.figura2.x &&
          vectorDeEntidades[i].getY === elemento.figura2.y) {
          figura2 = vectorDeEntidades[i];
        }
      }

      // Crear la línea de relación basada en el tipo de relación
      if (figura1 && figura2) {
        let lineaActual;

        // Determinar el tipo de relación (aquí puedes añadir más condiciones según tus necesidades)
        if (elemento.nombreDeRelacion === 'asociacion') {
          lineaActual = new Asociacion(figura1, figura2);
        } else if (elemento.nombreDeRelacion === 'composicion') {
          lineaActual = new Composicion(figura1, figura2);
        } else if (elemento.nombreDeRelacion === 'agregacion') {
          lineaActual = new Agregacion(figura1, figura2);
        } else if (elemento.nombreDeRelacion === 'realizacion') {
          lineaActual = new Realizacion(figura1, figura2);
        } else if (elemento.nombreDeRelacion === 'herencia') {
          lineaActual = new Inherencia(figura1, figura2);
        } else if (elemento.nombreDeRelacion === 'dependencia') {
          lineaActual = new Dependencia(figura1, figura2);
        } else {
          // Manejar otros tipos de relación o lanzar un error
          console.warn('Tipo de relación desconocido:', elemento.nombreDeRelacion);
          return; // Salir si no se reconoce el tipo
        }

        // Reconstruir la línea con los datos del elemento
        lineaActual.reconstruirLinea(elemento);
        vectorDeLineasRecuperadas.push(lineaActual);
      }
    });

    vectorDeLineas = vectorDeLineasRecuperadas;
  }
}

function mousePressed() {
  if (elementoActual != null && elementoActual.getSeleccionado) {
    distanciaX = mouseX - elementoActual.getX
    distanciaY = mouseY - elementoActual.getY
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  }

}

/*function doubleClicked() {
  if (elementoActual !== null && elementoActual.getSeleccionado) {
    if (elementoActual.enAreaCentral(mouseX, mouseY)) {
      if (elementoActual.getEstereotipo === 'Class'
        || elementoActual.getEstereotipo === 'Software System'
        || lineaActual.getEstereotipo === 'asociacion'
        || lineaActual.getEstereotipo === 'composicion'
        || elementoActual.getEstereotipo === 'Web'
        || elementoActual.getEstereotipo === 'Container'
        || elementoActual.getEstereotipo === 'Component') {
        elementoParaEditar = elementoActual
        mostrarModalEditarFigura()

      }
    }
  }

}*/
/*function doubleClicked() {
  // Verificar si el doble clic se hizo sobre un elemento
  if (elementoActual !== null && elementoActual.getSeleccionado()) {
    if (elementoActual.enAreaCentral(mouseX, mouseY)) {
      if (elementoActual.getEstereotipo() === 'Class') {
        elementoParaEditar = elementoActual;
        mostrarModalEditarFigura();
      }
    }
  } else {
    // Verificar si el doble clic se hizo sobre una línea
     for (let i = 0; i < vectorDeLineas.length; i++) {
       let linea = vectorDeLineas[i];
       if (linea.enAreaCentral(mouseX, mouseY)) {
         lineaParaEditar = linea;
         //mostrarModalEditarLinea(); // Mostrar el modal para editar la línea
         mostrarModalEditarLinea()
       
       }
     }
  }

}*/

function doubleClicked() {
  if (elementoActual !== null && elementoActual.getSeleccionado) {
    if (elementoActual.enAreaCentral(mouseX, mouseY)) {
      if (elementoActual.getEstereotipo === 'Class'
        || elementoActual.getEstereotipo === 'Software System'
        //     || elementoActual.getEstereotipo === 'Web'
        || elementoActual.getEstereotipo === 'Mobile'
        || elementoActual.getEstereotipo === 'Web'
        || elementoActual.getEstereotipo === 'Container'
        || elementoActual.getEstereotipo === 'Component') {
        elementoParaEditar = elementoActual
        mostrarModalEditarFigura()
      }
    }
  }
  // Verificar si el doble clic se hizo sobre una línea
  for (let i = 0; i < vectorDeLineas.length; i++) {
    let linea = vectorDeLineas[i];
    if (linea.enAreaCentral(mouseX, mouseY)) {
      lineaParaEditar = linea;
      //mostrarModalEditarLinea(); // Mostrar el modal para editar la línea
      mostrarModalEditarLinea()

    }
  }
}
function mouseDragged() {
  if (elementoActual != null && elementoActual.getSeleccionado) {
    if (elementoActual.enAreaCentral(mouseX, mouseY)) {
      elementoActual.setX = mouseX - distanciaX
      elementoActual.setY = mouseY - distanciaY
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    } else
      if (elementoActual.enCajaDerecha(mouseX, mouseY)) {
        if (mouseIsPressed) {
          if (elementoActual.getX + distanciaX - mouseX < 0) {
            elementoActual.setAncho = elementoActual.getAncho + abs(elementoActual.getX + distanciaX - mouseX)
          } else {
            elementoActual.setAncho = elementoActual.getAncho - abs(elementoActual.getX + distanciaX - mouseX)
          }
          distanciaX = mouseX - elementoActual.getX
          socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
        }
      } else
        if (elementoActual.enCajaIzquierda(mouseX, mouseY)) {
          if (mouseIsPressed) {
            if (elementoActual.getY + distanciaX - mouseY < 0) {
              elementoActual.setAlto = elementoActual.getAlto + abs(elementoActual.getY + distanciaY - mouseY)
            } else {
              elementoActual.setAlto = elementoActual - abs(elementoActual.getY + distanciaY - mouseY)
            }
            distanciaY = mouseY - elementoActual.getY
            socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
          }
        }
    seArrastroUnaFiguraUsandoElMouse = true
  }
}
function crearRelacionMuchosAMuchos(entidad1, entidad2) {
  // 1. Crear la relación muchos a muchos (línea horizontal con multiplicidades)
  let nuevaRelacion = new MuchosAMuchos(entidad1, entidad2);
  vectorDeLineas.push(nuevaRelacion);

  // 2. Calcular el punto medio para colocar la subclase
  let centroX = (entidad1.getCentroX + entidad2.getCentroX) / 2;
  let centroY = (entidad1.getCentroY + entidad2.getCentroY) / 2;

  // 3. Crear la subclase debajo del punto medio
  let nuevaSubclaseX = centroX - 70;
  let nuevaSubclaseY = centroY + 120;

  let nuevaSubclase = new Clase(nuevaSubclaseX, nuevaSubclaseY);
  nuevaSubclase.setNombre = `Sub_${entidad1.getNombre}_${entidad2.getNombre}`;
  nuevaSubclase.setAtributo = "-atributo1\n-atributo2";  // Puedes personalizar
  vectorDeEntidades.push(nuevaSubclase);

  // 4. Crear la línea vertical punteada desde el centro de la relación hacia la subclase
  let lineaPunteada = new LineaPunteada(centroX, centroY, centroX, nuevaSubclaseY);  // Clase personalizada
  vectorDeLineas.push(lineaPunteada);

  // 5. Emitir los cambios para sincronizar con los demás
  socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room);
}

function mouseClicked(event) {
  if (!preparadoParaColocarElemento) {
    buscarElementoEnPizarra()
    //  buscarLineaEnPizarra()
  } else {
    if (elementoQueSeColocara === 'persona' && ponerElemento) {
      let nuevaPersona = new Clase(mouseX - 100, mouseY - 50)
      vectorDeEntidades.push(nuevaPersona)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    } else
      if ((elementoQueSeColocara === 'sistema' || elementoQueSeColocara === 'sistema en diseño') && ponerElemento) {
        let nuevoSistema = new Sistema(mouseX - 100, mouseY - 50, elementoQueSeColocara === 'sistema en diseño')
        vectorDeEntidades.push(nuevoSistema)
        socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
        preparadoParaColocarElemento = false
        ponerElemento = false
      } else
        if (elementoQueSeColocara === 'database' && ponerElemento) {
          let nuevaDb = new Database(mouseX - 100, mouseY - 50)
          vectorDeEntidades.push(nuevaDb)
          socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
          preparadoParaColocarElemento = false
          ponerElemento = false
        } else
          if (elementoQueSeColocara === 'mobile' && ponerElemento) {
            let nuevoMobile = new Mobile(mouseX - 100, mouseY - 50)
            vectorDeEntidades.push(nuevoMobile)
            socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
            preparadoParaColocarElemento = false
            ponerElemento = false
          } else
            if (elementoQueSeColocara === 'web' && ponerElemento) {
              let nuevoWeb = new Web(mouseX - 100, mouseY - 50)
              vectorDeEntidades.push(nuevoWeb)
              socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
              preparadoParaColocarElemento = false
              ponerElemento = false
            } else
              if (elementoQueSeColocara === 'container' && ponerElemento) {
                let nuevoContainer = new Container(mouseX - 100, mouseY - 50)
                vectorDeEntidades.push(nuevoContainer)
                socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                preparadoParaColocarElemento = false
                ponerElemento = false
              } else
                if (elementoQueSeColocara === 'component' && ponerElemento) {
                  let nuevoComponent = new Component(mouseX - 100, mouseY - 50)
                  vectorDeEntidades.push(nuevoComponent)
                  socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                  preparadoParaColocarElemento = false
                  ponerElemento = false
                } else
                  if (elementoQueSeColocara === 'agregacion' && ponerElemento) {
                    buscarElementoEnPizarra()
                    if (relacionUno === null) {
                      relacionUno = elementoActual
                    } else {
                      relacionDos = elementoActual
                    }
                    if (relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos) {
                      let nuevaRelacion = new Agregacion(relacionUno, relacionDos)
                      if (nivelDeDiagrama === 1) {
                        nuevaRelacion.setTieneEstereotipo = false
                      }
                      vectorDeLineas.push(nuevaRelacion)
                      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                      preparadoParaColocarElemento = false
                      ponerElemento = false
                      relacionUno = null
                      relacionDos = null
                    }
                  } else
                    if (elementoQueSeColocara === 'composicion' && ponerElemento) {
                      buscarElementoEnPizarra()
                      //buscarLineaEnPizarra()
                      if (relacionUno === null) {
                        relacionUno = elementoActual
                      } else {
                        relacionDos = elementoActual
                      }
                      if (relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos) {
                        let nuevaRelacion = new Composicion(relacionUno, relacionDos)
                        if (nivelDeDiagrama === 1) {
                          nuevaRelacion.setTieneEstereotipo = false
                        }
                        vectorDeLineas.push(nuevaRelacion)
                        socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                        preparadoParaColocarElemento = false
                        ponerElemento = false
                        relacionUno = null
                        relacionDos = null
                      }
                    } else
                      if (elementoQueSeColocara === 'realizacion' && ponerElemento) {
                        buscarElementoEnPizarra()
                        if (relacionUno === null) {
                          relacionUno = elementoActual
                        } else {
                          relacionDos = elementoActual
                        }
                        if (relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos) {
                          let nuevaRelacion = new Realizacion(relacionUno, relacionDos)
                          if (nivelDeDiagrama === 1) {
                            nuevaRelacion.setTieneEstereotipo = false
                          }
                          vectorDeLineas.push(nuevaRelacion)
                          socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                          preparadoParaColocarElemento = false
                          ponerElemento = false
                          relacionUno = null
                          relacionDos = null
                        }
                      } else
                        if (elementoQueSeColocara === 'inherencia' && ponerElemento) {
                          buscarElementoEnPizarra()
                          if (relacionUno === null) {
                            relacionUno = elementoActual
                          } else {
                            relacionDos = elementoActual
                          }
                          if (relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos) {
                            let nuevaRelacion = new Inherencia(relacionUno, relacionDos)
                            if (nivelDeDiagrama === 1) {
                              nuevaRelacion.setTieneEstereotipo = false
                            }
                            vectorDeLineas.push(nuevaRelacion)
                            socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                            preparadoParaColocarElemento = false
                            ponerElemento = false
                            relacionUno = null
                            relacionDos = null
                          }
                        } else
                          if (elementoQueSeColocara === 'dependencia' && ponerElemento) {
                            buscarElementoEnPizarra()
                            if (relacionUno === null) {
                              relacionUno = elementoActual
                            } else {
                              relacionDos = elementoActual
                            }
                            if (relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos) {
                              let nuevaRelacion = new Dependencia(relacionUno, relacionDos)
                              if (nivelDeDiagrama === 1) {
                                nuevaRelacion.setTieneEstereotipo = false
                              }
                              vectorDeLineas.push(nuevaRelacion)
                              socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                              preparadoParaColocarElemento = false
                              ponerElemento = false
                              relacionUno = null
                              relacionDos = null
                            }
                          } else
                            if (elementoQueSeColocara === 'asociacion' && ponerElemento) {
                              buscarElementoEnPizarra()
                              console.log("TOCO AQUI: ")
                              //buscarLineaEnPizarra()
                              if (relacionUno === null) {
                                relacionUno = elementoActual
                              } else {
                                relacionDos = elementoActual
                              }
                              if (relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos) {
                                let nuevaRelacion = new Asociacion(relacionUno, relacionDos)
                                if (nivelDeDiagrama === 1) {
                                  nuevaRelacion.setTieneEstereotipo = false
                                }
                                vectorDeLineas.push(nuevaRelacion)
                                socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
                                preparadoParaColocarElemento = false
                                ponerElemento = false
                                relacionUno = null
                                relacionDos = null
                              }
                            } else  if (elementoQueSeColocara === 'muchos_a_muchos' && ponerElemento) {
                              buscarElementoEnPizarra();
                              if (relacionUno === null) {
                                relacionUno = elementoActual;
                              } else {
                                relacionDos = elementoActual;
                              }
                              
                              if (relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos) {
                                crearRelacionMuchosAMuchos(relacionUno, relacionDos);
                                preparadoParaColocarElemento = false;
                                ponerElemento = false;
                                relacionUno = null;
                                relacionDos = null;
                              }
                            } else{
                              ponerElemento = true
                            }
                            
  }
  return false
}

function mouseReleased() {
  if (modalEditarFigura.classList.contains('hidden') && seArrastroUnaFiguraUsandoElMouse) {
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    seArrastroUnaFiguraUsandoElMouse = false
  }
}



function buscarElementoEnPizarra() {
  if (elementoActual !== null) {
    elementoActual.setSeleccionado = false
  }
  let encontro = false
  for (let i = 0; i < vectorDeEntidades.length && !encontro; i++) {
    if (vectorDeEntidades[i].enAreaCentral(mouseX, mouseY)) {
      elementoActual = vectorDeEntidades[i]
      elementoActual.setSeleccionado = true
      encontro = true
      ultimoElementoClickeado = elementoActual
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    }
  }
  if (!modalEditarFigura.classList.contains('hidden') || !encontro) {
    elementoActual = null
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  }
}

function buscarLineaEnPizarra() {
  if (lineaActual !== null) {
    lineaActual.setSeleccionado = false
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  }
  for (let i = 0; i < vectorDeLineas.length && !encontro; i++) {
    if (vectorDeLineas[i].enAreaCentral(mouseX, mouseY)) {
      elementoActual = vectorDeLineas[i]
      elementoActual.seleccionado = true
      encontro = true
      ultimoElementoClickeado = elementoActual
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas)
    }
  }
}

function eliminarForma() {
  if (vectorDeLineas.length !== 0) {
    vectorDeLineas.pop()
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  } else {
    vectorDeEntidades.pop()
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  }
}




