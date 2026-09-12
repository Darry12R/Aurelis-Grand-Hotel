export const categories=['Degustación','Entradas','Mar','Tierra','Pastas','Vegetarianos','Postres','Café & Té','Bebidas','Champagne','Vinos','Cócteles'];
const rows=[
['Signature Degustation','Degustación',390,'Siete tiempos que recorren el mar, la tierra y la temporada.','Selección de temporada, pesca, carne, vegetales','Signature','Gluten, leche, pescado, crustáceos','hero'],
['Garden Degustation','Degustación',290,'Seis tiempos dedicados a la riqueza del mundo vegetal.','Setas, raíces, flores, legumbres','Vegano','Soja, frutos secos','risotto'],
['Burrata de Temporada','Entradas',68,'Cremosa burrata, tomates confitados y aceite de albahaca.','Burrata, tomate, albahaca','Vegetariano','Leche','risotto'],
['Crudo de Corvina','Entradas',78,'Cortes delicados con leche de tigre de cítricos.','Corvina, lima, cilantro','Seafood','Pescado','lobster'],
['Tartare Maison','Entradas',88,'Res cortada a cuchillo, mostaza suave y brioche.','Res, mostaza, huevo, brioche',"Chef's Selection",'Huevo, mostaza, gluten','hero'],
['Lobster Aurelis','Mar',165,'Langosta, beurre blanc, caviar, cítricos y hierbas frescas.','Langosta, mantequilla, caviar, limón','Signature','Crustáceos, pescado, leche','lobster'],
['Atlantic Sea Bass','Mar',125,'Pesca blanca, beurre noisette, espárragos y emulsión de limón.','Lubina, mantequilla, espárragos','Seafood','Pescado, leche','lobster'],
['Vieiras de Medianoche','Mar',115,'Vieiras doradas, puré de coliflor y aceite de hierbas.','Vieiras, coliflor, crema','Gluten Free','Moluscos, leche','lobster'],
['Wagyu Imperial','Tierra',185,'Wagyu marmoleado, reducción de vino, trufa negra y vegetales de temporada.','Wagyu, vino tinto, trufa, zanahorias','Signature','Leche, sulfitos','hero'],
['Pato Grand Réserve','Tierra',145,'Magret rosado con cerezas, apionabo y jus especiado.','Pato, cerezas, apionabo',"Chef's Selection",'Apio, sulfitos, leche','hero'],
['Cordero de Altura','Tierra',158,'Lomo de cordero con costra de hierbas y berenjena ahumada.','Cordero, romero, berenjena','Gluten Free','Leche','hero'],
['Risotto de Trufa Negra','Pastas',95,'Arroz carnaroli, parmesano añejo y trufa negra.','Carnaroli, parmesano, trufa','Vegetariano','Leche','risotto'],
['Ravioli del Bosque','Pastas',92,'Pasta artesanal de setas con mantequilla de salvia.','Harina, huevo, setas, salvia','Vegetariano','Gluten, huevo, leche','risotto'],
['Jardín de Estación','Vegetarianos',78,'Vegetales asados, crema de almendras y flores comestibles.','Zanahoria, betarraga, almendras','Vegano','Frutos secos','risotto'],
['Coliflor Dorada','Vegetarianos',72,'Coliflor asada con tahini, granada y especias suaves.','Coliflor, sésamo, granada','Vegano','Sésamo','risotto'],
['Chocolate Noir','Postres',48,'Chocolate 70%, avellana, caramelo salado y vainilla.','Cacao, avellana, caramelo, vainilla','Signature','Leche, huevo, frutos secos','dessert'],
['Poire Belle Nuit','Postres',46,'Pera pochada, crema de vainilla y crumble de almendra.','Pera, vainilla, almendra','Vegetariano','Leche, gluten, frutos secos','dessert'],
['Espresso Grand Cru','Café & Té',22,'Extracción precisa, notas de cacao y nuez.','Café arábica','Vegano','Sin alérgenos declarados','breakfast'],
['Té Blanc Impérial','Café & Té',26,'Té blanco de hojas enteras con delicadas notas florales.','Té blanco, pétalos','Vegano','Sin alérgenos declarados','breakfast'],
['Botánica Cítrica','Bebidas',32,'Refrescante mezcla sin alcohol de cítricos y romero.','Pomelo, limón, romero','Vegano','Sin alérgenos declarados','cocktail'],
['Aurelis Brut Étoile','Champagne',98,'Copa de burbuja fina, brioche y fruta blanca.','Chardonnay, pinot noir','Signature','Sulfitos','wine'],
['Maison Noir Réserve 2019','Vinos',68,'Copa de tinto con fruta negra, cedro y taninos sedosos.','Cabernet sauvignon','Signature','Sulfitos','wine'],
['Aurelis Old Fashioned','Cócteles',58,'Whisky, bitter aromático y una nota de naranja.','Whisky, bitter, naranja','Signature','Sulfitos','cocktail'],
['Jardin de Minuit','Cócteles',54,'Gin, flor de saúco y una expresión fresca de pepino.','Gin, saúco, pepino',"Chef's Selection",'Sulfitos','cocktail'],
['Continental Aurelis','Desayuno',78,'Croissant, pan artesanal, fruta y café.','Trigo, mantequilla, frutas, café','Vegetariano','Gluten, leche, huevo','breakfast'],
['Healthy Morning','Desayuno',68,'Bowl de frutas, granola y yogur vegetal.','Avena, frutos rojos, coco','Vegano','Frutos secos','breakfast'],
['American Breakfast','Desayuno',88,'Huevos al gusto, brioche, panceta y tomates.','Huevos, trigo, cerdo, tomate',"Chef's Selection",'Huevo, gluten, leche','breakfast'],
['Eggs à la Carte','Desayuno',58,'Huevos poché, espinaca y salsa holandesa.','Huevo, espinaca, mantequilla','Vegetariano','Huevo, leche','breakfast']];
export const dishes=rows.map((r,id)=>({id:id+1,name:r[0],category:r[1],price:r[2],description:r[3],ingredients:r[4],tags:[r[5],...(r[5]==='Vegano'?['Vegetariano']:[])],allergens:r[6],image:`/assets/${r[7]}.webp`,available:id!==10,chef:'Disfrútelo recién servido para apreciar cada textura. Nuestro equipo puede asesorarle sobre preferencias y maridajes.'}));
export const experiences=[{id:'chef',name:"Chef’s Table",description:'Una cena junto a la cocina. Ocho invitados, un menú irrepetible y una conversación con el chef.',price:650,unit:'por persona',max:8,image:'chef'},{id:'private',name:'Private Dining',description:'Un salón íntimo, un menú a medida y un equipo dedicado exclusivamente a sus invitados.',price:2800,unit:'por experiencia',max:14,image:'restaurant'},{id:'romantic',name:'Romantic Dinner',description:'Una mesa para dos, luz de velas y un menú degustación diseñado para celebrar.',price:1250,unit:'para dos',max:2,image:'restaurant'},{id:'wine',name:'Wine Experience',description:'Un recorrido privado por nuestra bodega, guiado por el sommelier de la casa.',price:480,unit:'por persona',max:10,image:'wine'}];
export const wines=[['Maison Noir Réserve','Francia',2019,'Fruta negra, cedro y taninos estructurados.',68,320],['Étoile de Lune Brut','Champagne',2018,'Brioche, pera y burbuja persistente.',98,580],['Tenuta Aurea','Italia',2020,'Cereza, cuero fino y especias.',64,290],['Finca del Silencio','España',2018,'Ciruela, vainilla y roble delicado.',58,270],['Altura Secreta','Argentina',2021,'Violeta, mora y final aterciopelado.',52,240],['Valle de Bruma','Chile',2022,'Cítricos, mineralidad y frescura.',46,210],['Lumière Blanche','Francia',2021,'Flores blancas, limón y notas salinas.',62,280]].map((r,id)=>({id,name:r[0],region:r[1],year:r[2],notes:r[3],glass:r[4],bottle:r[5]}));
export const slots=['18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
