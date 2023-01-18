var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 });

//my clueless router for client defined routes because I don't get it
const cluelessRouter = (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}

var saveChartRouter = require('./routes/saveChart');
var readChartRouter = require('./routes/readChart');

var app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/charts', cluelessRouter);
app.use('/api/saveChart', saveChartRouter);
app.use('/api/readChart', readChartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

let wsMap = new Map();
let gameMap = new Map();

const getPlayerSockets = (currentSocket) => {
    let socket = wsMap.get(currentSocket);
    if (socket === undefined) {
        console.log('could not find socket in wsMap');
        return undefined;
    }

    let game = gameMap.get(socket.gameId);
    if (game === undefined) {
        console.log('could not find game in gameMap');
        return undefined;
    }

    return game.playerSockets;
}

const updateConnectedPlayers = (ws, playerSockets) => {
    let message = {
        type: 'UPDATE_CONNECTION',
        payload: { numberOfConnectedPlayers: playerSockets.length }
    };

    console.log('sending connection update: ' + JSON.stringify(message));

    playerSockets.forEach((client) => {
        if (client !== ws) {
            client.send(JSON.stringify(message));
        }
    });
}

wss.on('connection', (ws, request, client) => {
    console.log("ws connection for gameId: " + request.url);
    let gameId = 1;
    wsMap.set(ws, { gameId: gameId });

    let game = gameMap.get(1);
    if (game == null) {
        console.log('first to join game: ' + gameId);
        game = { playerSockets: [ws] };
        gameMap.set(gameId, game);
    } else {
        game.playerSockets = [...game.playerSockets, ws];
        console.log('joining existing game: ' + gameId + ' number of connected player: ' + game.playerSockets.length);
    }

    updateConnectedPlayers(undefined, game.playerSockets);

    ws.on('open', () => {
        console.log("ws open");
        ws.send('hello');
    });

    ws.on('message', (message) => {
        console.log('received: %s', message);
        let playerSockets = getPlayerSockets(ws);

        if (playerSockets != null) {
            if (playerSockets.length === 1) {
                ws.send(JSON.stringify({ type: 'UPDATE_COMMSTATE', payload: { commState: 'READY' } }));
            } else {
                playerSockets.forEach((client) => {
                    if (client !== ws) {
                        client.send("" + message);
                    }
                });
            }
        }
    });

    ws.on('close', (message) => {
        console.log('closing connection');
        let playerSockets = getPlayerSockets(ws);

        if (playerSockets != null) {
            let index = playerSockets.indexOf(ws);
            playerSockets.splice(index, 1);
            wsMap.delete(ws);

            updateConnectedPlayers(ws, playerSockets);
        }
    });
});
