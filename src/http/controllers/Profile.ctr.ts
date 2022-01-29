import { injectable } from "tsyringe";
import { NextFunction } from "express"
import { profileService } from "../../services/profile.service";
import { jwtService } from "../../services/jwt.service";

@injectable()
export class profileController {


    constructor(protected service: profileService, private jwtService: jwtService) {

    }


    getToken = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { password } = req.body;
            res.json(await this.service.generateUserConfirmationToken(id, password));
        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, username, password, newPassword, confirmationCode } = req.body;
            const updated = (await this.service.updateUserProfile(id, confirmationCode, { username, password, newPassword }));

            // regenerate jwt token here to fix logout error
            const encoded = this.jwtService.encode({
                id: updated.id,
                role: updated.role,
                username: updated.username
            })
            res.cookie("X_META_JWT", encoded, {
                expired: Date.now() + 86400,
                httpOnly: process.env.NODE_ENV?.toUpperCase() === "DEVELOPMENT",
                secure: process.env.NODE_ENV?.toUpperCase() === "PRODUCTION",
                sameSite: true
            });

            return res.json({
                updated
            })

        } catch (err) {
            next(err)
        }
    }



}