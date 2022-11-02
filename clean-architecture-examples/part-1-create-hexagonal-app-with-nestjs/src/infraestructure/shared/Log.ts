import { Logger } from "@nestjs/common";

export class Log {
    static info(msg: string, foo?: any) {
        const json = foo ? `\n${JSON.stringify(foo, null, 2)}` : ''
        Logger.log(`${msg} ${json}`)
    }
    static table(object: any) {
        console.table(object)
    }
}