
// import beuty1 from "../Assets/beuty1.jpg";
// import beut2 from "../Assets/beut2.jpg";
// import beut3 from "../Assets/beut3.jpg";
// import beut4 from "../Assets/beut4.jpg";
// import beut5 from "../Assets/beut5.jpg";
// import beut6 from "../Assets/beut6.jpg";
// import beut7 from "../Assets/beut7.jpg";
// import beut8 from "../Assets/beut8.jpg";
// import beut9 from "../Assets/beut9.jpg";
// import beut10 from "../Assets/beut10.jpg";
// import beut11 from "../Assets/beut11.jpg";
import beut12 from "../Assets/beut12.jpg";
import beut13 from "../Assets/beut13.jpg";
import beut14 from "../Assets/beut14.jpg";
import beut15 from "../Assets/beut15.jpg";
import beut16 from "../Assets/beut16.jpg";
import beut17 from "../Assets/beut17.jpg";


import beut18 from "../Assets/beut18.jpg";
import beut19 from "../Assets/beut19.jpg";
import beut20 from "../Assets/beut20.jpg";
import beut21 from "../Assets/beut21.jpg";
import beut22 from "../Assets/beut22.jpg";







const beauty=[



    //  {

    //     id:201,
    //     img:beut8,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },
  
    //     {

    //     id:201,
    //     img:beut2,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },
    //     {

    //     id:201,
    //     img:beut3,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // }, 



       
    
    // {

    //     id:201,
    //     img:beut5,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },   
    
    // {

    //     id:201,
    //     img:beut6,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },  
    //   {

    //     id:201,
    //     img:beut7,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },
       
    //     {

    //     id:201,
    //     img:beut9,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },



    //   {

    //     id:201,
    //     img:beuty1,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },
    //     {

    //     id:201,
    //     img:beut10,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },
    //  {

    //     id:201,
    //     img:beut11,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },
     {

        id:201,
        img:beut12,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
     {

        id:201,
        img:beut13,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
     {

        id:201,
        img:beut14,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
     {

        id:201,
        img:beut15,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },



    // {

    //     id:201,
    //     img:beut4,
    //     name:"Beauty",
    //     price:500,
    //     category:"Beauty & Selfcare"

    // },
     {

        id:201,
        img:beut16,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
     {

        id:201,
        img:beut17,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },






        {

        id:201,
        img:beut18,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
        {

        id:201,
        img:beut19,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
        {

        id:201,
        img:beut20,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
        {

        id:201,
        img:beut21,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
        {

        id:201,
        img:beut22,
        name:"Beauty",
        price:500,
        category:"Beauty & Selfcare"

    },
];

export default beauty.map((product, index) => ({
    ...product,
    id: `beauty-${index + 1}`,
}));