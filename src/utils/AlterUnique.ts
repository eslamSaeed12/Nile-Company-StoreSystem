import { SelectQueryBuilder } from "typeorm";

export function IsUniqueButNotMe(query: SelectQueryBuilder<any>, id: string, field: string, fieldValue: any) {
    return query.where('id != :id', { id }).andWhere(`${field}=:fieldValue`, { fieldValue }).execute();
}