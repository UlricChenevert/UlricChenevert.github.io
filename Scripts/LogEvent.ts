import { v4 as uuid } from 'uuid'
import { ensureFileSizeManagable } from './FileSystemHelpers'

import fsPromsises from 'node:fs/promises'

export const logEventsBase = async (logFilePath : string, encoding : BufferEncoding, message : string) => {
    const dateTime = (new Date()).toISOString() 
    const logMessageObject = JSON.stringify({
        "id" : uuid(),
        "timestamp" : dateTime,
        "message": message,
    })

    const logMessageString = logMessageObject.toString() + "\n"

    console.log("Log: " + message + "\n")

    ensureFileSizeManagable(logFilePath)
    fsPromsises.appendFile(logFilePath, logMessageString, encoding)
}