import { injectable } from "tsyringe";
import { Connection, getRepository, Repository } from "typeorm";
import { Shipper } from "../database/models/Shipper";
import { IsUniqueButNotMe } from "../utils/AlterUnique";

@injectable()
export class shipperService {


    private dbContext: Repository<Shipper>;

    constructor(db: Connection) {
        this.dbContext = db.getRepository(Shipper);
    }

    async All() {
        return await this.dbContext.find();
    }

    async count() {
        return await this.dbContext.count();
    }


    async find(id: string) {
        return await this.dbContext.findOneOrFail(id);
    }

    async insert(dto: any) {

        return await this.dbContext.insert({
            shipper_addresse: dto.shipper_addresse,
            shipper_name: dto.shipper_name,
            shipper_phoneNumber: dto.shipper_phoneNumber,
            notes: dto.notes
        })
    }

    async update(dto: any) {
        return await this.dbContext.update(dto.id, {
            shipper_addresse: dto.shipper_addresse,
            shipper_name: dto.shipper_name,
            shipper_phoneNumber: dto.shipper_phoneNumber,
            notes: dto.notes
        })
    }

    async delete(id: string) {
        return await this.dbContext.delete(id)
    }


    async findByName(shipper_name: string) {
        return await this.dbContext.createQueryBuilder().where('shipper_name = :name', { name: shipper_name }).execute()
    }


    async isUniqueButNotMe(id: string, fieldValue: any) {
        return IsUniqueButNotMe(this.dbContext.createQueryBuilder('Shipper'), id, 'shipper_name', fieldValue);
    }
}
