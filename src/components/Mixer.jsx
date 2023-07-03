import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../css/mixer.css';

const Mixer = () => {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    };

    const combinarColores = (id_area, id_area_a, id_area_b) => {
        var area1 = document.getElementById(id_area_a);
        var area2 = document.getElementById(id_area_b);
      
        if (area1 && area2) {
            var background1 = window.getComputedStyle(area1).getPropertyValue("background-color").slice(4, -1);
            var background2 = window.getComputedStyle(area2).getPropertyValue("background-color").slice(4, -1);
            const [red, green, blue] = background1.split(",").map(value => parseInt(value.trim(), 10));
            const [red2, green2, blue2] = background2.split(",").map(value => parseInt(value.trim(), 10));
            var redMix = Math.ceil((red + red2) / 2);
            var greenMix = Math.ceil((green + green2) / 2);
            var blueMix = Math.ceil((blue + blue2) / 2);
            var coloresRGB = [redMix, greenMix, blueMix];
            var combinacionRGB = 'rgb(' + coloresRGB[0] + ', ' + coloresRGB[1] + ', ' + coloresRGB[2] + ')';
            document.getElementById(id_area).style.background = combinacionRGB;
            console.log("me actualice");
            setTimeout(() => {
                const elemento = document.querySelector(`#${id_area}`);
                console.log(elemento)
                escribirColorFondoEnParrafo(elemento);
            }, 100)
            
        }
    }

    const recibirColor = async(id_area, id_area2, id_area_mix) => {
        const url = 'http://colormind.io/api/';
        const data = {
        model: 'default',
        input: ['N', 'N', 'N', 'N', 'N']
        };

        fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            const random = getRandomInt(0, 5);
            const red = (result.result[random][0]);
            const green = (result.result[random][1]);
            const blue = (result.result[random][2]);
            var colorRGB = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
            document.getElementById(id_area).style.background = colorRGB;
            console.log("cambie de color")
            setTimeout(() => {
                combinarColores(id_area_mix, id_area, id_area2);
            }, 500)
            setTimeout(() => {
                const elemento = document.querySelector(`#${id_area}`);
                console.log(elemento)
                escribirColorFondoEnParrafo(elemento);
            }, 100)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // const escribirColorFondoEnParrafo = (elementoId, parrafoId) => {
    //     var elemento = document.getElementById(elementoId);
    //     var colorFondo = window.getComputedStyle(elemento).getPropertyValue('background-color');
    //     var parrafoExistente = document.querySelector(parrafoId);
    //     // Si existe un párrafo, actualizar su texto con el nuevo valor
    //     if (parrafoExistente) {
    //       parrafoExistente.textContent = colorFondo;
    //     } else {
    //       // Si no existe un párrafo, crear uno nuevo y asignarle la clase 'rgb-value'
    //       var parrafoNuevo = document.createElement('p');
    //       parrafoNuevo.textContent = colorFondo;
    //       parrafoNuevo.classList.add('rgb-value');
    //     }
    // }

    const escribirColorFondoEnParrafo = (elemento) => {
        console.log(window.getComputedStyle(elemento).getPropertyValue('background-color'))
        var colorFondo = window.getComputedStyle(elemento).getPropertyValue('background-color');
        var parrafoExistente = elemento.children[0];
        // Si existe un párrafo, actualizar su texto con el nuevo valor
        if (parrafoExistente) {
          parrafoExistente.textContent = colorFondo;
        } else {
          // Si no existe un párrafo, crear uno nuevo y asignarle la clase 'rgb-value'
          var parrafoNuevo = document.createElement('p');
          parrafoNuevo.textContent = colorFondo;
          parrafoNuevo.classList.add('rgb-value');
        }
    }

    setTimeout(() => {
        document.querySelectorAll('.color-area').forEach((elemento) => {
            escribirColorFondoEnParrafo(elemento);
        })
    }, 1)

    return (
        <Fragment>
            <Container className='mixer-container'>
                <h1 className='title'>Random Mixer</h1>
                <p className='info'>generates two random colors and seamlessly blends them into a single harmonious hue.</p>       
                <Row className='row-letters'>
                    <Col xs={12} md={4}>
                        Color 1
                    </Col>
                    <Col xs={12} md={4}>
                        Color 2
                    </Col>
                    <Col xs={12} md={4}>
                        Mix
                    </Col>
                </Row>
                <Row>
                    <Col className='invisible-row'>

                    </Col>
                    <Col xs={12} sm={5} md={3}>
                        <div className="color-area" id="area-a">
                            <p className='rgb-value' id="p-a">rgb(250, 10, 20)</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={2} md={1} className='col-operators'>
                        +
                    </Col>
                    <Col xs={12} sm={5} md={3}>
                        <div className="color-area" id="area-b">
                            <p className='rgb-value' id="p-b">rgb(250, 10, 20)</p>
                        </div>
                    </Col>
                    <Col xs={12} md={1} className='col-operators'>
                        =
                    </Col>
                    <Col xs={12} md={3}>
                        <div className="color-area" id="area-c">
                            <p className='rgb-value' id="p-c">rgb(250, 10, 20)</p>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <Button variant="outline-dark" className='mixer-btn' id="btn-1" onClick={() => recibirColor("area-a", "area-b", "area-c")}>Randomize A</Button>{' '}
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Button variant="outline-dark" className='mixer-btn' id="btn-2" onClick={() => recibirColor("area-b", "area-a", "area-c")}>Randomize B</Button>{' '}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default Mixer;