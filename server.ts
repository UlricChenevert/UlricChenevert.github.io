import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { logEventsBase } from './Scripts/LogEvent'
import { ServeFile } from './Scripts/ServeFile';
import { ServeAPI } from './Scripts/ServeAPI';
import { setFunctionArguments } from './Scripts/GeneralHelpers';
import serverConfig from './Configurations/server.json';

const hostname = serverConfig['HostName'];
const port = serverConfig['Port'];
const logEvents = setFunctionArguments(logEventsBase, path.join(__dirname, serverConfig['LogLocation']), serverConfig["LogEncoding"])

process.on('uncaughtException', err => {
  logEvents(`${err}`)
  throw err
})

const server = createServer((req : IncomingMessage, res :  ServerResponse) => determineResponse(req, res, logEvents)); 

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const isFile = (url : string) => {return path.extname(url) != ''}

function determineResponse (request :  IncomingMessage, response : ServerResponse, logger : Function) {
  logger(`${request.url} ${request.method}`)

  // Determine if request is trying to access api or files
  let url = (request.url === undefined)? '' : request.url

  // Files
  if (isFile(url)) ServeFile(request, response, logger)

  else ServeAPI(request, response, logger)
  
  return
}
