
import mat1 from "../assets/mat1.jpg"

import mat2 from "../assets/mat2.jpg"
import mat3 from "../assets/mat3.jpg"
import mat4 from "../assets/mat4.jpg"
import mat5 from "../assets/mat5.jpg"
import mat6 from "../assets/mat6.jpg"
import mat7 from "../assets/mat7.jpg"
import mat8 from "../assets/mat8.jpg"
import mat9 from "../assets/mat9.jpg"
import mat10 from "../assets/mat10.jpg"
import mat11 from "../assets/mat11.jpg"
import mat12 from "../assets/mat12.jpg"
import mat13 from "../assets/mat13.jpg"
import mat14 from "../assets/mat14.jpg"
import mat15 from "../assets/mat15.jpg"

import duvet2 from "../assets/duvet2.jpg"
import duvet3 from "../assets/duvet3.jpg"
import duvet4 from "../assets/duvet4.jpg"
import duvet5 from "../assets/duvet5.jpg"
import duvet6 from "../assets/duvet6.jpg"
import duvet7 from "../assets/duvet7.jpg"
import duvet8 from "../assets/duvet8.jpg"
import duvet9 from "../assets/duvet9.jpg"
import duvet10 from "../assets/duvet10.jpg"
import duvet11 from "../assets/duvet11.jpg"
import duvet12 from "../assets/duvet12.jpg"






const homeproducts =[


    
         {
            id: 1,
            img: mat1,
            name: "mat1",
            price: 1500,
            category: "Home-Decor",
          },
             {
            id: 2,
            img: mat2,
            name: "mat2",
            price: 1500,
            category: "Home-Decor",
          },
             {
            id: 3,
            img: mat3,
            name: "mat",
            price: 1500,
            category: "Home-Decor",
          },
             {
            id: 4,
            img: mat4,
            name: "mat",
            price: 1500,
            category: "Home-Decor",
          },
             {
            id: 5,
            img: mat5,
            name: "mat",
            price: 1500,
            category: "Home-Decor",
          },
             {
            id: 6,
            img: mat6,
            name: "mat",
            price: 1500,
            category: "Home-Decor",
          },

           {
                  id:101,
                  img: mat7,
                  name:"mat7",
                  price:1400,
                  category: "Home-Decor",

          
              },
             
          
                 {
                  id:102,
                  img:mat8,
                  name:"mat8",
                  price:1400,
          
              } , 
               {
                  id:103,
                  img:mat9,
                  name:"mat9",
                  price:1400,
                  category: "Home-Decor",

          
              } ,  {
                  id:2,
                  img:mat10,
                  name:"mat10",
                  price:1400,
                  category: "Home-Decor",
              } ,  {
                  id:1,
                  img:mat11,
                  name:"mat11",
                  price:1400,
                  category: "Home-Decor",
          
              } ,  {
                  id:1,
                  img:mat12,
                  name:"mat7",
                  price:1400,
                  category: "Home-Decor",
              } ,  {
                  id:1,
                  img:mat13,
                  name:"mat7",
                  price:1400,
                  category: "Home-Decor",
          
              } ,  {
                  id:1,
                  img:mat14,
                  name:"mat7",
                  price:1400,
                  category: "Home-Decor",
          
              } , 
               {
                  id:1,
                  img:mat15,
                  name:"mat7",
                  price:1400,
                  category: "Home-Decor",
          
              },
          
        


         {
                id:1,
                img:duvet2,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },
              {
                id:1,
                img:duvet3,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },
              {
                id:1,
                img:duvet4,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },
              {
                id:1,
                img:duvet5,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },
              {
                id:1,
                img:duvet6,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },
        
               {
                id:1,
                img:duvet7,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },   {
                id:1,
                img:duvet8,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
            },   {
                id:1,
                img:duvet9,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },   {
                id:1,
                img:duvet10,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },   {
                id:1,
                img:duvet11,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },   {
                id:1,
                img:duvet12,
                name:"duvet",
                price:1400,
                category: "Home-Decor",
        
            },

    
];

export default homeproducts.map((product, index) => ({
    ...product,
    id: `home-decor-${index + 1}`,
}));