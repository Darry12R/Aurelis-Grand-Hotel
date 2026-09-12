from pathlib import Path
base=Path('outputs/aurelis/dist')
p=base/'js/app.js'
s=p.read_text(encoding='utf-8')
s=s.replace("import * as D from './dialogs.js';", "import * as D from './dialogs.js';\nimport {translatePage,watchTranslations} from './i18n.js';")
s=s.replace('updateBadge();observe();}', 'updateBadge();observe();translatePage();}')
s=s.replace("window.addEventListener('popstate',render);render();", "window.addEventListener('popstate',render);watchTranslations();render();")
s=s.replace("${v.date} ${v.time} · Habitación ${v.room}`);D.Cart();", "${v.date} ${v.time} · Habitación ${v.room}`);state.cart.at(-1).schedule=`${v.date}T${v.time}`;save();D.Cart();")
p.write_text(s,encoding='utf-8')
p=base/'js/dialogs.js'
s=p.read_text(encoding='utf-8')
s=s.replace("if(reset)checkout={step:1,delivery:'Room Service',timing:'now',payment:'Cargo a habitación',info:{}};", "if(reset){const scheduled=state.cart.find(l=>l.schedule);checkout={step:1,delivery:'Room Service',timing:scheduled?'schedule':'now',payment:'Cargo a habitación',info:scheduled?{schedule:scheduled.schedule}:{}};}")
s=s.replace("if(booking.date<today()){", "if(new Date(booking.date+'T12:00:00').getDay()===1){toast('Maison Aurelis descansa los lunes. Elija otro día.');return;}if(booking.date<today()){")
p.write_text(s,encoding='utf-8')
p=base/'js/components.js'
s=p.read_text(encoding='utf-8').replace('<span>01 / 04</span><div></div> WAGYU IMPERIAL','<span>MAISON SIGNATURE</span><div></div> WAGYU IMPERIAL')
p.write_text(s,encoding='utf-8')
