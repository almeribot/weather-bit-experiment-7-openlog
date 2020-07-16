input.onButtonPressed(Button.A, function () {
    if (logging_data == 0) {
        logging_data = 1
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
    } else if (logging_data == 1) {
        logging_data = 0
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
let row = ""
let header = ""
let logging_data = 0
logging_data = -1
basic.showLeds(`
    # . . . #
    . # . # .
    . . # . .
    . # . # .
    # . . . #
    `)
while (logging_data == -1) {
    weatherbit.startWeatherMonitoring()
    serial.redirect(
    SerialPin.P15,
    SerialPin.P14,
    BaudRate.BaudRate9600
    )
    header = "time" + "," + "luz" + "," + "temperatura" + "," + "brujula" + "," + "magnetico"
    serial.writeLine(header)
    logging_data = 0
}
basic.forever(function () {
    if (logging_data == 1) {
        row = "" + input.runningTime() + "," + input.lightLevel() + "," + input.temperature() + "," + input.compassHeading() + "," + input.magneticForce(Dimension.X)
        serial.writeLine(row)
        basic.pause(1 * 30000)
    }
})
