import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
dotenv.config()

export const RECORDINGS_PATH = process.env.RECORDINGS_PATH || '/recordings'
export const DB_PATH = process.env.DB_PATH || '/persistent/db.json'
export const TIME_ZONE = process.env.TIME_ZONE || 'GMT'
export const LOCALE = process.env.LOCALE || 'en'
export const WIDTH = parseInt(process.env.WIDTH!, 10) || 1280
export const HEIGHT = parseInt(process.env.HEIGHT!, 10) || 720
export const ALLOWED_CHANNELS = Object.freeze((process.env.ALLOWED_CHANNELS || '').split(',').map(e => e.trim()))
export const RECORDING_READY_MESSAGE_FORMAT = process.env.RECORDING_READY_MESSAGE_FORMAT || 'Recording ready %name%'
export const MS_TEAMS_CREDENTIALS_LOGIN = process.env.MS_TEAMS_CREDENTIALS_LOGIN
export const MS_TEAMS_CREDENTIALS_PASSWORD = process.env.MS_TEAMS_CREDENTIALS_PASSWORD
export const MS_TEAMS_CREDENTIALS_ORIGINS = Object.freeze((process.env.MS_TEAMS_CREDENTIALS_ORIGINS || '').split(',').map(e => e.trim()))

process.env.TZ = TIME_ZONE

console.log(`Using config:
    RECORDINGS_PATH=${RECORDINGS_PATH}
    DB_PATH=${DB_PATH}
    TIME_ZONE=${TIME_ZONE}
    LOCALE=${LOCALE}
    WIDTH=${WIDTH}
    HEIGHT=${HEIGHT}
    ALLOWED_CHANNELS=${ALLOWED_CHANNELS}
    RECORDING_READY_MESSAGE_FORMAT=${RECORDING_READY_MESSAGE_FORMAT}
    MS_TEAMS_CREDENTIALS_LOGIN=${MS_TEAMS_CREDENTIALS_LOGIN}
    MS_TEAMS_CREDENTIALS_PASSWORD=${MS_TEAMS_CREDENTIALS_PASSWORD ? '*preset*' : '*none*'}
    MS_TEAMS_CREDENTIALS_ORIGINS=${MS_TEAMS_CREDENTIALS_ORIGINS}
`);


try {
    await fs.writeFile(`${RECORDINGS_PATH}/access-test`, '')
    await fs.unlink(`${RECORDINGS_PATH}/access-test`)
} catch (e) {
    console.error('Access test to ', RECORDINGS_PATH, 'failed', e?.message)
    process.exit(1)
}