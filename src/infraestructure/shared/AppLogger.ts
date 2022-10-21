import { Logger } from "@nestjs/common";

export class AppLogger {
    static log(msg: string, foo?: any) {
        const json = foo ? `\n${JSON.stringify(foo, null, 2)}` : ''
        Logger.log(`${msg} ${json}`)
    }
}