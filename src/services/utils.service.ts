import { injectable } from "tsyringe";
import { Connection } from "typeorm";

@injectable()
export class UtilsService {

    constructor(private con: Connection) {

    }


    async getFinancialSums() {

        const co_name = process.env['COMPANY_NAME'];

        const [co] = await this.con.query('select customer."id" from customer where customer.customer_name = $1 ', [co_name]);

        const [sup] = await this.con.query('select supplier."id" from supplier where "supplier"."Supplier_name" = $1 ', [co_name]);


        if (!(co && sup)) {
            return null;
        }


        const query_ = ` select  c.customers,o.orders, d.debts , f.funds
                        from (select count(*) as customers from customer) as c,
                        
                            (select count(*) as orders  from public."order" ) as o,
                            
                            (select sum(cost - paid) as debts from "order" where "customerId" = $1 and cost != paid ) as d,
                            
                            (select sum(cost - paid) as funds from "order" where "supplierId" = $2 and cost != paid ) as f
                            

                        `
        return await this.con.query(query_, [co?.id, sup?.id]);
    }


    // done tested
    async getTopFiveShippers() {
        const query_ = `select count(o."shipperId") as orders, s.shipper_name
        from shipper as s
        LEFT JOIN "order" as o on o."shipperId" = s.id
        group by s.shipper_name
        order by orders desc
        limit 5`;

        return await this.con.query(query_);
    }


    // done
    async getTopFiveCategories() {

        const query_ = `SELECT c.title as category_, count(p_."categoryId") as orders
        FROM "product" as p_
        LEFT JOIN category as c on p_."categoryId" = c.id
        group by c.title
        order by orders desc
        limit 5`;

        return await this.con.query(query_);
    }


    // done
    async getTopFiveProducts() {

        const query_ = `SELECT product_name , quantity
        FROM  product
        order by quantity desc
        limit 5`;

        return await this.con.query(query_);
    }

    // not tested
    async getTopFiveSuppliers() {
        const co_name = process.env['COMPANY_NAME'];

        const query_ = `SELECT s."Supplier_name" , count(o."supplierId") as total
        FROM "order" as o
        LEFT JOIN supplier as s on o."supplierId" = s.id
        WHERE s."Supplier_name" != '${co_name}'
        GROUP BY s."Supplier_name"
        ORDER BY total desc
        limit 5`;
        return await this.con.query(query_);
    }


    // not tested
    async getTopCustomers() {
        const co_name = process.env['COMPANY_NAME'];
        const query_ = `SELECT c."customer_name" , count(o."customerId") as total
        FROM "order" as o
        LEFT JOIN customer as c on o."customerId" = c.id
        WHERE c."customer_name" != '${co_name}'
        GROUP BY c."customer_name"
        ORDER BY total desc
        limit 5`;

        return await this.con.query(query_);
    }

    // not tested
    async getFundsOflastYear() {
        const co_name = process.env['COMPANY_NAME'];
        const query = `SELECT
        SUM(o.cost) as funds,
        EXTRACT(
            MONTH
            FROM
                o."createdAt"
        ) as month_
    FROM
        "order" as o
        LEFT JOIN customer as c on c.id = o."customerId"
    where
        c.customer_name != '${co_name}'
    group by
        month_
    ORDER BY
        month_ desc
    LIMIT
        12`;
        return await this.con.query(query);
    }

}