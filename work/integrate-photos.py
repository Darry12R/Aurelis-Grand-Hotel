from pathlib import Path
from PIL import Image
src=Path('work/images/new');dst=Path('outputs/aurelis/dist/assets')
for p in src.glob('*.png'):
    im=Image.open(p).convert('RGB')
    im.thumbnail((1200,1000))
    im.save(dst/(p.stem+'.webp'),'WEBP',quality=86)
mapping={2:'garden',3:'burrata',4:'crudo',5:'tartare',7:'seabass',8:'scallops',10:'duck',11:'lamb',13:'ravioli',14:'garden',15:'cauliflower',17:'pear',18:'espresso',19:'tea',26:'healthy',28:'eggs'}
p=Path('outputs/aurelis/dist/js/data.js')
s=p.read_text(encoding='utf-8')
s+='\n// Original photographs matched to each plated dish.\nconst dishPhotography='+str(mapping).replace("'",'"')+';\nfor (const dish of dishes) if (dishPhotography[dish.id]) dish.image=`/assets/${dishPhotography[dish.id]}.webp`;\n'
p.write_text(s,encoding='utf-8')
for p in src.glob('*.json'):
    (Path('outputs/aurelis/art-direction')/('catalog-'+p.name)).write_bytes(p.read_bytes())
