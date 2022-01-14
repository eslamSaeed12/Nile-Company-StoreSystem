import { injectable } from "tsyringe";
import { Connection, Repository } from "typeorm";
import { Supplier } from "../database/models/Supplier";
import { IsUniqueButNotMe } from "../utils/AlterUnique";

@injectable()
export class supplierService {


    private dbContext: Repository<Supplier>;

    constructor(db: Connection) {
        this.dbContext = db.getRepository(Supplier);
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

    async findByName(Supplier_name: string) {
        return await this.dbContext.createQueryBuilder('Supplier').where('Supplier.Supplier_name = :name', { name: Supplier_name }).execute()
    }

    async insert(dto: any) {
        return await this.dbContext.insert({
            Supplier_company: dto.Supplier_company,
            Supplier_name: dto.Supplier_name,
            supplier_addresse: dto.supplier_addresse,
            supplier_phoneNumber: dto.supplier_phoneNumber,
            notes: dto.notes,
        })
    }

    async update(dto: any) {
        return await this.dbContext.update(dto.id, {
            Supplier_company: dto.Supplier_company,
            Supplier_name: dto.Supplier_name,
            supplier_addresse: dto.supplier_addresse,
            supplier_phoneNumber: dto.supplier_phoneNumber,
            notes: dto.notes,
        })
    }

    async delete(id: string) {
        return await this.dbContext.delete(id)
    }

    async isUniqueButNotMe(id: string, fieldValue: any) {
        return IsUniqueButNotMe(this.dbContext.createQueryBuilder('Supplier'), id, 'Supplier.Supplier_name', fieldValue);
    }
}
