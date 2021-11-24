import * as Knex from "knex";
import { hashPassword } from "../hash";


export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex('order_detail_option').del();
    await knex('order_detail').del();
    await knex('order').del();
    await knex('product_option_price').del();
    await knex('product').del();
    await knex('option').del();
    await knex('users_donation').del();
    await knex('product_category').del();
    await knex('option_category').del();
    await knex('donation').del();
    await knex('users').del();

    // Inserts seed entries
    const user: number[] = await knex.insert([
        {
            name: 'user',
            password: await hashPassword('user'),
            facebook_id: "",
            role: "user",
            point: 0,
            stripe_id: "cus_G7ayiJfFkGF1Pk",
            progress: 0

        },
        {
            name: 'admin',
            password: await hashPassword('admin'),
            facebook_id: "",
            role: "admin",
            point: 0,
            stripe_id: "",
            progress: 0

        }
    ]).into('users').returning('id');

    const donation: number[] = await knex.insert([
        {
            organization: 'Animals Asia',
            amount: 200,
            img:'animals-asia.png'
        },
        {
            organization: 'Food Angel',
            amount: 200,
            img:'foodangel-logo.png'
        },
        {
            organization: 'The Nesbitt Centre',
            amount: 200,
            img:'nesbitt-logo.png'
        }

    ]).into('donation').returning('id');

    //option category
    const oc: number[] = await knex.insert([
        {
            name: "Decaf"
        },
        {
            name: "Size"
        },
        {
            name: "Milk"
        },
        {
            name: "Syrup"
        },
        {
            name: "Extra_shot"
        },
        {
            name: "Hot_Or_Iced"
        },
    ]).into('option_category').returning('id');

    // product category
    const pc: number[] = await knex.insert([
        {
            name: "Coffee"
        },
        {
            name: "Special_drink"
        },
        {
            name: "Belgian_chocolate"
        },
        {
            name: "Tea"
        },
        {
            name: "Savoury"
        },
        {
            name: "Sweet"
        },
    ]).into('product_category').returning('id');


    await knex.insert([
        {
            users_id: user[0],
            donation_id: donation[0]
        }

    ]).into('users_donation');
    //option
    const o: number[] = await knex.insert([
        {
            option_category_id: oc[0],
            name: "decaf"
        },
        {
            option_category_id: oc[0],
            name: "normal"
        },
        {
            option_category_id: oc[1],
            name: "small"
        },
        {
            option_category_id: oc[1],
            name: "large"
        },
        {
            option_category_id: oc[2],
            name: "whole"
        },
        {
            option_category_id: oc[2],
            name: "skimmed"
        },
        {
            option_category_id: oc[2],
            name: "soy"
        },
        {
            option_category_id: oc[3],
            name: "caramel"
        },
        {
            option_category_id: oc[3],
            name: "hazelnut"
        },
        {
            option_category_id: oc[3],
            name: "vanilla"
        },
        {
            option_category_id: oc[3],
            name: "mint"
        },
        // {
        //     option_category_id: oc[4],
        //     name: "normal"
        // },
        {
            option_category_id: oc[4],
            name: "1 shot"
        },
        {
            option_category_id: oc[4],
            name: "2 shots"
        },
        {
            option_category_id: oc[4],
            name: "3 shots"
        },
        {
            option_category_id: oc[5],
            name: "hot"
        },
        {
            option_category_id: oc[5],
            name: "Iced"
        },
    ]).into('option').returning('id');



    //product
    const p: number[] = await knex.insert([
        {
            product_category_id: pc[0],
            name: "Espresso",
            price: 25.00,
            image:"espresso.jpeg"
        },
        {
            product_category_id: pc[0],
            name: "Macchiato",
            price: 28.00,
            image:"macchiato.jpeg"
        },
        {
            product_category_id: pc[0],
            name: "Piccolo latte",
            price: 30.00,
            image:"piccoloLatte.jpeg"
        },
        {
            product_category_id: pc[0],
            name: "Brew coffee",
            price: 20.00,
            image:"brewCoffee.jpeg"

        },
        {
            product_category_id: pc[0],
            name: "Americano",
            price: 30.00,
            image:'americano.jpeg'
        },
        {
            product_category_id: pc[0],
            name: "Flat white",
            price: 32.00,
            image:"flatWhite.jpeg"
        },
        {
            product_category_id: pc[0],
            name: "Caffe latte",
            price: 32.00,
            image:"caffeeLatte.jpeg"
        },
        {
            product_category_id: pc[0],
            name: "Cappuccino",
            price: 32.00,
            image:"cappuccino.jpeg"
        },
        {
            product_category_id: pc[0],
            name: "Mocha",
            price: 36.00,
            image:"mocha.jpg"
        },
        {
            product_category_id: pc[0],
            name: "Iced Americano",
            price: 32.00,
            image:"icedAmericano.jpg"
        },
        {
            product_category_id: pc[0],
            name: "Iced Milk Coffee",
            price: 40.00,
            image:"icedMilkCoffee.jpg"
        },
        {
            product_category_id: pc[0],
            name: "Iced Mocha",
            price: 46.00,
            image:"icedMocha.jpg"
        },
        {
            product_category_id: pc[0],
            name: "Iced Honey Americano",
            price: 37.00,
            image:"icedHoneyAmericano.jpg"
        },
        {
            product_category_id: pc[1],
            name: "Lemon Ginger Honey",
            price: 32.00,
            image:"lemonGingerHoney.jpg"

        },
        {
            product_category_id: pc[1],
            name: "Chai Latte",
            price: 32.00,
            image:"chaiLatte.jpg"
        },
        {
            product_category_id: pc[1],
            name: "Matcha Latte",
            price: 36.00,
            image:"matchaLatte.jpg"
        },

        {
            product_category_id: pc[2],
            name: "70% Dark Chocolate",
            price: 36.00,
            image:"darkChocolate.jpg"

        },
        {
            product_category_id: pc[2],
            name: "Pink Chocolate",
            price: 40.00,
            image:"pink.jpg"
        },
        {
            product_category_id: pc[2],
            name: "Dark & Pink",
            price: 40.00,
            image:"dark&pink.jpg"
        },
        {
            product_category_id: pc[3],
            name: "English Breakfast",
            price: 25.00,
            image:"englishBreakfast.jpg"

        },
        {
            product_category_id: pc[3],
            name: "Earl Grey",
            price: 25.00,
            image:"earlGrey.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Jasmine",
            price: 25.00,
            image:"Jasmine.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Camomile Surprise",
            price: 25.00,
            image:"camomileSurpise.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Moroccan Mint",
            price: 25.00,
            image:"moroccanMintTea.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Japanese Hoji Tea",
            price: 25.00,
            image:"JapaneseHojiTea.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Janpanese Green Tea",
            price: 25.00,
            image:"janpaneseGreenTea.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Kir Royal",
            price: 25.00,
            image:"kirRoyal.jpeg"
        },
        {
            product_category_id: pc[3],
            name: "Orange Rooibos",
            price: 25.00,
            image:"orangeRooibos.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Cold Brew Tea",
            price: 28.00,
            image:"coldBrewTea.png"
        },
        {
            product_category_id: pc[3],
            name: "Iced Lemon Tea",
            price: 28.00,
            image:"icedLemonTea.jpg"
        },
        {
            product_category_id: pc[3],
            name: "Iced Peach Tea",
            price: 35.00,
            image:"icedPeachTea.jpeg"
        },
        {
            product_category_id: pc[4],
            name: "Whole Sandwich",
            price: 40.00,
            image:"wholeSandwich.jpeg"
        },
        {
            product_category_id: pc[4],
            name: "Half Sandwich",
            price: 23.00,
            image:"halfSandwich.jpeg"
        },
        {
            product_category_id: pc[4],
            name: "Whole Wrap",
            price: 40.00,
            image:"wholeWrap.jpg"
        },
        {
            product_category_id: pc[4],
            name: "Half Wrap",
            price: 23.00,
            image:"halfWrap.jpg"
        },
        {
            product_category_id: pc[4],
            name: "Ham And Chese Croissant",
            price: 25.00,
            image:"hamAndCheseCroissant.jpg"
        },
        {
            product_category_id: pc[4],
            name: "Tie Tie Pie (meat)",
            price: 50.00,
            image:"TieTiePieMeat.jpg"

        },
        {
            product_category_id: pc[4],
            name: "Tie Tie Pie (vegetable)",
            price: 50.00,
            image:"TieTiePieVegetable.jpg"
        },
        {
            product_category_id: pc[4],
            name: "Toastie (cheese&ham)",
            price: 22.00,
            image:"Toastie(chese&ham).jpg"
        },
        {
            product_category_id: pc[4],
            name: "Toastie (cheese&tomato)",
            price: 22.00,
            image:"Toastie(chese&tomato).jpg"
        },
        {
            product_category_id: pc[5],
            name: "Croisant",
            price: 15.00,
            image:"croisant.jpeg"
        },
        {
            product_category_id: pc[5],
            name: "Muffin",
            price: 20.00,
            image:"muffin.jpg"

        },
        {
            product_category_id: pc[5],
            name: "Banana Bread",
            price: 20.00,
            image:"bananaBread.jpg"
        },
        {
            product_category_id: pc[5],
            name: "Cookie",
            price: 20.00,
            image:"cookie.jpeg"

        },
        {
            product_category_id: pc[5],
            name: "Scone",
            price: 20.00,
            image:"Scone.png"
        },
        {
            product_category_id: pc[5],
            name: "Lemon Tart",
            price: 30.00,
            image:"lemonTart.jpeg"
        },
        {
            product_category_id: pc[5],
            name: "Mont Blanc",
            price: 30.00,
            image:"montBlanc.jpg"
        },
        {
            product_category_id: pc[5],
            name: "Brownie",
            price: 30.00,
            image:"brownie.jpeg"
        },
        {
            product_category_id: pc[5],
            name: "Cheese Cake",
            price: 35.00,
            image:"chesecake.jpg"
        },
        {
            product_category_id: pc[5],
            name: "Honey Cake",
            price: 38.00,
            image:"honeyCake.jpg"
        },
        {
            product_category_id: pc[5],
            name: "Apple Crumble",
            price: 38.00,
            image:"appleCrumble.jpg"
        },

    ]).into('product').returning('id');

    // product_option_price
    const addCharge = [
        // Special drink //
        //(small size)
        {
            product_id: p[13],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[14],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[15],
            option_id: o[2],
            extra_charge: 0.00
        },
        //(large size)
        {
            product_id: p[13],
            option_id: o[3],
            extra_charge: 6.00
        },
        {
            product_id: p[14],
            option_id: o[3],
            extra_charge: 6.00
        },
        {
            product_id: p[15],
            option_id: o[3],
            extra_charge: 6.00
        },
        //(hot)
        {
            product_id: p[13],
            option_id: o[14],
            extra_charge: 0.00
        },
        {
            product_id: p[14],
            option_id: o[14],
            extra_charge: 0.00
        },
        {
            product_id: p[15],
            option_id: o[14],
            extra_charge: 0.00
        },
        //(cold)
        {
            product_id: p[13],
            option_id: o[15],
            extra_charge: 2.00
        },
        {
            product_id: p[14],
            option_id: o[15],
            extra_charge: 2.00
        },
        {
            product_id: p[15],
            option_id: o[15],
            extra_charge: 2.00
        },

        // Chocolate //
        //(small size)
        {
            product_id: p[16],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[17],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[18],
            option_id: o[2],
            extra_charge: 0.00
        },
        //(large size)
        {
            product_id: p[16],
            option_id: o[3],
            extra_charge: 6.00
        },
        {
            product_id: p[17],
            option_id: o[3],
            extra_charge: 4.00
        },
        {
            product_id: p[18],
            option_id: o[3],
            extra_charge: 4.00
        },
        //(hot)
        {
            product_id: p[16],
            option_id: o[14],
            extra_charge: 0.00
        },
        {
            product_id: p[17],
            option_id: o[14],
            extra_charge: 0.00
        },
        {
            product_id: p[18],
            option_id: o[14],
            extra_charge: 0.00
        },
        //(cold)
        {
            product_id: p[16],
            option_id: o[15],
            extra_charge: 2.00
        },
        {
            product_id: p[17],
            option_id: o[15],
            extra_charge: 2.00
        },
        {
            product_id: p[18],
            option_id: o[15],
            extra_charge: 2.00
        },
        //Coffee 
        //(small size)
        {
            product_id: p[3],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[4],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[5],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[6],
            option_id: o[2],
            extra_charge: 0.00
        }, {
            product_id: p[7],
            option_id: o[2],
            extra_charge: 0.00
        },
        {
            product_id: p[8],
            option_id: o[2],
            extra_charge: 0.00
        },
        //(large size)
        {
            product_id: p[3],
            option_id: o[3],
            extra_charge: 10.00
        },
        {
            product_id: p[4],
            option_id: o[3],
            extra_charge: 10.00
        },
        {
            product_id: p[5],
            option_id: o[3],
            extra_charge: 6.00
        },
        {
            product_id: p[6],
            option_id: o[3],
            extra_charge: 6.00
        }, {
            product_id: p[7],
            option_id: o[3],
            extra_charge: 6.00
        },
        {
            product_id: p[8],
            option_id: o[3],
            extra_charge: 6.00
        },

    ]

    //coffee general option
    const normalcaf = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[1],
        extra_charge: 0.00
    }))

    const decaf = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[0],
        extra_charge: 0.00
    }))

    const whole = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[4],
        extra_charge: 0.00
    }))

    const skimmed = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[5],
        extra_charge: 0.00
    }))

    const soy = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[6],
        extra_charge: 0.00
    }))

    const caramel = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[7],
        extra_charge: 5.00
    }))

    const hazelnut = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[8],
        extra_charge: 5.00
    }))

    const vanilla = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[9],
        extra_charge: 5.00
    }))

    const mint = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[10],
        extra_charge: 5.00
    }))

    // const normal = Array(13).fill(0).map((_, idx) => ({
    //     product_id: p[idx],
    //     option_id: o[11],
    //     extra_charge: 0.00
    // }))

    const extra1 = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[11],
        extra_charge: 5.00
    }))

    const extra2 = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[12],
        extra_charge: 10.00
    }))

    const extra3 = Array(13).fill(0).map((_, idx) => ({
        product_id: p[idx],
        option_id: o[13],
        extra_charge: 15.00
    }))

    const drinkOption = addCharge.concat(normalcaf, decaf, whole, skimmed, soy, caramel, hazelnut, vanilla, mint,  extra1, extra2, extra3);

    await knex.insert(drinkOption).into('product_option_price').returning('id');


    const order: number[] = await knex.insert([

        {
            users_id: user[0],
            taken_time: "2019-11-01T10:53:44.627Z" ,
            amount: 25,
            finished: false,
            delivered: false,
            stripe_receipt:"123"//paid
        },
        {
            users_id: user[0],
            taken_time: "2019-11-02T10:53:44.627Z" ,
            amount: 88,
            finished: false,
            delivered: false
          
        }

    ]).into('order').returning('id');


    const orderDetail: number[] = await knex.insert([

        {
            order_id: order[0],
            product_id: p[0],//Espresso
            price_per_unit: 25,
            quantity:1,
            myfav:false,
            isDeleted:false

        },
        {
            order_id: order[1],
            product_id: p[1],//Macchiato
            price_per_unit: 28,
            quantity:1,
            myfav:false,
            isDeleted:false

        },
        {
            order_id: order[1],
            product_id: p[2],//Piccolo latte
            price_per_unit: 30,
            quantity:2,
            myfav:false,
            isDeleted:false

        }

    ]).into('order_detail').returning('id');


   await knex.insert([

        {
            option_id: o[0],//decaf
            order_detail_id: orderDetail[0]
        },
        {
            option_id: o[0],//decaf
            order_detail_id: orderDetail[1]
        },
        {
            option_id: o[12],//
            order_detail_id: orderDetail[2]
        },
        {
            option_id: o[1],//normal
            order_detail_id: orderDetail[2]
        }

    ]).into('order_detail_option');


};
