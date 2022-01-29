import { inject, injectable } from "tsyringe";
import { userService } from "./user.service";
import crypto from 'crypto';
import { Redis } from "ioredis";
import { Forbidden, Unauthorized } from 'http-errors'
import { Connection } from "typeorm";
import { User } from "../database/models/User";
import { compareSync, hashSync } from "bcryptjs";



@injectable()
export class profileService {
    constructor(private con: Connection, private userService: userService, @inject('cacheManager') private cacheManager: Redis) {

    }

    async updateUserProfile(userId: number, confirmationCode: string, dto: any) {
        if (!(await this.isUserConfirmationTokenValid(userId, confirmationCode))) {
            throw new Forbidden('كود التأكيد غير صحيح!');
        }
        const repo = this.con.getRepository(User);

        let updated;

        if (dto.password) {
            updated = await repo.update(userId, {
                username: dto.username,
                password: hashSync(dto.password)
            });
        } else {
            updated = await repo.update(userId, {
                username: dto.username,
            });
        }

        if (updated) {
            await this.removeConfirmationToken(userId);
        }



        return await repo.findOneOrFail(userId);
    }


    async generateUserConfirmationToken(userId: number, password: string) {

        if (!(await this.checkRequestPassowrd(userId, password))) {
            throw new Unauthorized('الرقم السري غير صحيح !');
        }

        const token = crypto.randomBytes(32).toString('hex');
        await this.cacheManager.set(`user_${userId}`, token);
        return token;
    }


    async isUserConfirmationTokenValid(userId: number, token: string) {
        const cachedToken = await this.cacheManager.get(`user_${userId}`);

        if (!cachedToken) {
            return false;
        }

        if (cachedToken !== token.trim()) {
            return false;
        }

        return true;
    }

    async removeConfirmationToken(userId: number) {
        return await this.cacheManager.del(`user_${userId}`);
    }


    async checkRequestPassowrd(userId: number, password: string) {
        const userRepo = await this.con.getRepository(User).findOneOrFail(userId);

        if (compareSync(password, userRepo?.password)) {
            return true;
        }

        return false;
    }
}