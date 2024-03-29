const categorias = [ 
    {
        id:1,
        name: "suculentas",
        img1: '/images/categorias/cat1.webp',
        img2: '/images/categorias/cat1.jpg'
    },
    {
        id:2,
        name: "plantas",
        img1: '/images/categorias/cat2.webp',
        img2: '/images/categorias/cat2.jpg'
    },
    {
        id:3,
        name: "captus",
        img1: '/images/categorias/cat3.webp',
        img2: '/images/categorias/cat3.jpg'
    },
]
const instagram = [ 
    {
        img: "/images/instagram/instagram1.jpg",
        url: '#'
    },
    {
        img: "/images/instagram/instagram2.jpg",
        url: '#'
    },
    {
        img: "/images/instagram/instagram3.jpg",
        url: '#'
    },
]

const productos =[
    {
        id:1,
        nombre:"Adromischus Cooperii",
        sub_titulo: "Rupicola o Huevos de Pato",
        slug:"adromischus_cooperii",
        categoria:"suculentas",
        stock: 10,
        destacado: true,
        descripcion: "La Adromischus Cooperi es una suculenta enana, originaria de Sudáfrica, tiene hojas gordas con una textura parecida a la de los huevos de pato, de hecho Huevos de Pato es uno de los nombres coloquiales con la que se la conoce. Crece en forma de mata y no supera los 20 cm de altura. Ideal para rocallas, canteros y macetas",
        descripcion_altura: "Altura/anchura estimada: 6 cm.",
        descripcion_maceta: "Presentación en maceta de 10.5cm",
        precio: 10.12,
        cuidados:"Riegos más seguidos en primavera y verano, preferentemente con agua de lluvia. El sustrato debe drenar a la perfección ya que corren peligro de pudrirse. En macetas, regar por el plato, evitando el agua en la superficie. Resiste hasta 5°",
        agua: 1,
        luz: 2,
        imagen:["https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/adromischus-cooperii-m-105-cm-removebg-preview_U3_bVG77z.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656949423010", "https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/adromischus-cooperii-m-105-cm__1_-removebg-preview_I2sEHnKTy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656949422576"]
    },
    {
        id:2,
        nombre:"Aeonium Diplocyclum",
        sub_titulo: "Diplocycla de Greenovia - Bea Simple",
        slug:"aeonium_diplocyclum",
        categoria:"suculentas",
        stock: 10,
        destacado: true,
        descripcion: "Pequeña suculenta de una belleza indescriptible. Rosetas solitarias, que ramifican formando grupos con tonos verdosos, en una gama de verdes con matices rojizos. Recuerda un capullo de rosa abriéndose. Endémica de las Islas Canarias, este bellezón de suculenta, es de fácil cultivo, como la mayoría del género aeonium.",
        descripcion_altura: "Altura/anchura estimada: 9 cm.",
        descripcion_maceta: "Presentación en maceta de 5.5cm",
        precio: 5.86,
        cuidados:"En clima continental, mejor sol de mañana en verano, no castigarla con fuerte insolación, pues las hojas se arrugan y se vuelven hacia abajo. Le gusta el clima húmedo y suave, por lo que es ideal en clima mediterráneo , cantábrico o atlántico. Puede estar en interior con buena iluminación. Podemos ponerla en un platos con guijarros en la base para que aporte humedad ambiente en clima seco o continental. No le gusta el frío intenso, ni las heladas. Dejar secar entre riegos el sustrato.",
        agua: 3,
        luz: 3,
        imagen:["https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/aeonium-diplocyclum-greenovia-diplocyca-m-55-removebg-preview_VyTD1GeBg.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656950002311", "https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/aeonium-diplocyclum-greenovia-diplocyca-m-55__1_-removebg-preview_arpVhtwOU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656950002158"]
    },
    {
        id:3,
        nombre:"Cereus Forbesii",
        sub_titulo: "Cactus Espiral",
        slug:"cereus_forbesii",
        categoria:"suculentas",
        stock: 10,
        destacado: true,
        descripcion: "Como buen espécimen del género de los Cereus, es un cactus de crecimiento rápido que puede alcanzar alturas de hasta 4 metros. Para los ejemplares jóvenes se recomiendan interiores luminosos y para los adultos, exteriores a pleno sol. La variedad Spiralis crece en forma espiralada. Aquí una selección con las mejores espirales.",
        descripcion_altura: "Altura/anchura estimada 15 cm.",
        descripcion_maceta: "Presentación en maceta de 14cm",
        precio: 20.32,
        cuidados:"Riego abundante en primavera y verano y asilados en otoño e invierno. De rápido crecimiento, se recomienda transplantarlo todas las primaveras.",
        agua: 1,
        luz: 4,
        imagen:["https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/cereus-forbesii-var-spiralis-superspiralis-removebg-preview_0PCyUCbHm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656951483095", "https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/cereus-forbesii-var-spiralis-superspiralis__1_-removebg-preview_vRh0fwXQm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656951483310"]
    },
    {
        id:4,
        nombre:"Echeveria Runyonii",
        sub_titulo: "Echeveria al revés",
        slug:"echeveria_runyonii",
        categoria:"suculentas",
        stock: 10,
        destacado: true,
        descripcion: "Singular cultivar de echeveria tremendamente original. Su aspecto, como si de una variedad monstruosa se tratara, aunque más cálido, es de los más llamativos que existen en el género echeveria. Hojas estrechas de color azul pálido, o blanco azulado, según la luz y con una geometría similar a la de un calzador de pie. ",
        descripcion_altura: "Altura/anchura estimada 10cm.",
        descripcion_maceta: "Presentación en maceta de 8,5cm",
        precio: 7.32,
        cuidados:"Luz brillante y sol directo, para mantener los colores y la forma. Riegos espaciados, dejando secar el sustrato al menos la mitad. Tolera el frío con suelo seco, heladas no.",
        agua: 3,
        luz: 4,
        imagen:["https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/echeveria-runyonii-topsy-turvy-m-85-removebg-preview_hKCppV3DU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656951843049", "https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/echeveria-runyonii-topsy-turvy-m-85__1_-removebg-preview_6S7pVwkfS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656951842950"]
    },
    {
        id:5,
        nombre:"Gasteria Hippo",
        sub_titulo: "Gasteria Hipopótamo",
        slug:"gasteria_hippo",
        categoria:"suculentas",
        stock: 10,
        destacado: true,
        descripcion: "Gasteria es un género de plantas con numerosas y variadas especies e híbridos. Son plantas suculentas, muy resistentes, y tolerantes a diversos ambientes. están dentro del grupo de las suculentas más adaptadas a cultivo en interior, junto con haworthia y sanseviera. La variedad hippo, destaca por sus gruesas hojas, dispuestas en una roseta simétrica.",
        descripcion_altura: "Altura/anchura estimada 15cm.",
        descripcion_maceta: "Presentación en maceta de 10.5cm",
        precio: 6.55,
        cuidados:"Luz media, o intensa, sin sol directo. Riegos espaciados, dejar secar el sustrato algo más de la mitad antes de volver a regar. Tolera el frío con suelo seco.",
        agua: 3,
        luz: 1,
        imagen:["https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/gasteria-hippo-removebg-preview_7GQoTB3OK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656952185399", "https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/gasteria-hippo__1_-removebg-preview__QjtZzsHj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656952186741"]
    },
    {
        id:6,
        nombre:"Kalanchoe Tomentosa",
        sub_titulo: "Kalanchoe peludo",
        slug:"kalanchoe_tomentosa",
        categoria:"suculentas",
        stock: 10,
        destacado: false,
        descripcion: "Los Kalanchoe pertenecen a la familia de las Crassulaceae y son originarios de Madagascar. Son plantas muy hermosas que tienden a cultivarse en macetas.Es de crecimiento lento y su follaje tiene un aspecto muy peculiar, esto se debe a que sus hojas están cubiertas de unos finos vellos que le dan un aspecto y tacto aterciopelado. Debe situarse en jardineras o en interiores muy bien iluminados. Son plantas de mínimos cuidados, ya que sus hojas tienen la capacidad de recoger grandes cantidades de agua. Es ¡la planta perfecta! para aquellos que se inician en el maravilloso mundo de las suculentas.",
        descripcion_altura: "Altura/anchura estimada 15cm.",
        descripcion_maceta: "Presentación en maceta de 10.5cm",
        precio: 6.71,
        cuidados:"A pesar de ser una planta muy rústica, le viene bien un poco de fresco. No se debe exponer a temperaturas inferiores a los 10ºC, ya que puede sufrir daños.Si se tiene en interiores, se debe colocar en un lugar muy soleado. Riego: moderado, en invierno muy leve y en las épocas cálidas del año más frecuentes.",
        agua: 1,
        luz: 4,
        imagen:["https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/kalanchoe-tomentosa-nigrum--removebg-preview_OaGPRwoqZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656953300176", "https://ik.imagekit.io/qhofyjbl4/sylvestris/productos/kalanchoe-tomentosa-nigrum-__1_-removebg-preview_1FXPGaBwH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656953299960"]
    },
]


module.exports= {
    categorias,
    instagram,
    productos
}