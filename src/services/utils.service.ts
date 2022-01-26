import { injectable } from "tsyringe";
import { Connection } from "typeorm";
import { Shipper } from "../database/models/Shipper";

@injectable()
export class UtilsService {

    constructor(private con: Connection) {

    }


    // debts is the money that we should paid to suppliers for orders
    // sum(total_price - paid ) where customer.id == us.id as customer


    // funds the money that should we have from orders funds is
    // sum(total - paid) where supplier.id === us.id  


    // paid is the money that actually we has now in 
    // sum(paid) where customer.id !== us.id

    /* 
    
    select  c.customers,o.orders, d.debts , f.funds , p_.paid

    from (select count(*) as customers from customer) as c,

     (select count(*) as orders  from public."order" ) as o,
     
     (select sum(total_price - paid) as debts from "order" where "customerId" = 1 ) as d,
     
     (select sum(total_price - paid) as funds from "order" where "supplierId" = 1 ) as f,
     
     (select sum(paid) as paid from "order" where "supplierId" = 1 ) as p_

     */

    async getFinancialSums() {

        const co_name = process.env['COMPANY_NAME'];

        const [co] = await this.con.query('select id from customer where customer.customer_name = $1 ', [co_name]);

        const [sup] = await this.con.query('select id from supplier where "supplier"."Supplier_name" = $1 ', [co_name]);


        if (!(co && sup)) {
            return null;
        }


        const query_ = ` select  c.customers,o.orders, d.debts , f.funds , p_.paid

                        from (select count(*) as customers from customer) as c,
                        
                            (select count(*) as orders  from public."order" ) as o,
                            
                            (select sum(total_price - paid) as debts from "order" where "customerId" = $1 ) as d,
                            
                            (select sum(total_price - paid) as funds from "order" where "supplierId" = $2 ) as f,
                            
                            (select sum(paid) as paid from "order" where "supplierId" = $3 ) as p_

                        `
        return await this.con.query(query_, [co?.id, sup?.id, sup?.id]);
    }


    async getTopFiveShippers() {
        const query_ = `select count(o."shipperId") as orders, s.shipper_name
        from shipper as s
        LEFT JOIN "order" as o on o."shipperId" = s.id
        group by s.shipper_name
        order by orders desc
        limit 5`;

        return await this.con.query(query_);
    }



    async getTopFiveCategories() {

        const query_ = `SELECT c.title as category_, count(p_."categoryId") as orders
        FROM "product" as p_
        LEFT JOIN category as c on p_."categoryId" = c.id
        group by c.title
        order by orders desc
        limit 5`;

        return await this.con.query(query_);
    }


    async getTopFiveProducts() {

        const query_ = `SELECT product_name , quantity
        FROM  product
        order by quantity desc
        limit 5`;

        return await this.con.query(query_);
    }


    async getTopFiveSuppliers() {
        const query_ = `SELECT s."Supplier_name" , count(o."supplierId") as total
        FROM "order" as o
        LEFT JOIN supplier as s on o."supplierId" = s.id
        GROUP BY s."Supplier_name"
        ORDER BY total desc
        limit 5`;
        return await this.con.query(query_);
    }


    async getTopCustomers() {
        const query_ = `SELECT c."customer_name" , count(o."customerId") as total
        FROM "order" as o
        LEFT JOIN customer as c on o."customerId" = c.id
        GROUP BY c."customer_name"
        ORDER BY total desc
        limit 5`;

        return await this.con.query(query_);
    }


    /* 
    
    
        select [month,sum of order in this month]
    
    
    */

    async getFundsOflast5Months(){

    }

}