# 1-on-1 Courses
## Opis

Táto mobilná aplikácia umožňuje používateľom vytvárať kurzy s hodinovými “one on one” lekciami, ktoré sa opakujú každý týždeň v rovnakom čase. Následne sa iný používatelia môžu prihlásiť na voľný časový blok (timeslot). Používateľ si potom môže zobraziť svoj rozvrh. Súčasťou aplikácie sú “one on one” lekcie formou videohovorov medzi učiteľom a študentom.

## Frontend
![courses.png](docs%2Fscreenshots%2Fcourses.png)    ![create course.png](docs%2Fscreenshots%2Fcreate%20course.png)  ![timetable.png](docs%2Fscreenshots%2Ftimetable.png)

V tejto časti dokumentácie sa zameriame na nami vytvorený frontend a jeho realizáciu. Veľká časť nami navrhnutých obrazoviek ostala v takej podobe, v akej bol aj návrh vo Figme. Spomenieme najmä tie, kde k nejakým drobným zmenám došlo a následne aj tieto zmeny bližšie popíšeme. Rovnako tak sa aj vyjadríme k navrhnutým akceptačným testom,  či sme ich splnili a ak nie, k akým zmenám došlo.

Frontend bol implementovaný v Javascripte s použitým softvérového rámca React Native a platformy Expo pre tento rámec. Pre nainštalovanie potrebných balíčkov je treba spustiť príkazy npm install, yarn install, expo install. Samotná aplikácia je zostavená pomocou Expo Application Services a jej build sa da stiahnuť na adrese
https://expo.dev/accounts/revilo602/projects/1on1-courses/builds/f8893e9d-4f42-440f-81c2-275215ae2204
Po stiahnutí treba v konzole spustiť development client pomocou príkazu expo start --dev-client . Aplikácia funguje správne iba ak je spustený aj backend a je na rovnakej sieti ako frontend. Adresu, na ktorej je backend dostupný je treba pridať do súboru Server.tsx v priečinku constants.

### BottomTabNavigator

Táto časť aplikácie nie je obrazovkou, avšak používateľ ju neustále vidí pri prechádzaní po jednotlivých častiach aplikácie. V pôvodnom návrhu sa nenachádzal Log out button, my sme ho tam však pridali, pretože v dnešnej dobe každá aplikácia umožňuje odhlásiť sa zo svojho účtu. Zároveň sme si týmto spôsobom aj overili funkcionalitu, či sa pri zmene používateľa zmení aj obsah, ktorý vidí.

### Courses

Na tejto obrazovke sa zachovalo všetko okrem farebnej schémy (kombinácia zelených a modrých odtieňov pôsobí živšie) a Search baru. Dôvodom odstránenia Search baru bol fakt, že tento element tam pôsobil zbytočne, keďže máme limitovaný počet kategórii, ktoré je všetky vidieť na obrazovke, a ak by aj používateľ potreboval v aplikácii niečo vyhľadávať, určite by to nerobil na tejto obrazovke.

### Course Detail

Na tejto obrazovke je zmenená orientácia rozvrhu, pretože sme použili existujúci TimeTableView komponent, ktorý sa nám ľahko implementoval a vedeli sme si ho prispôsobiť podľa našej potreby. Rovnako tak sa na obrazovke nenachádza tlačidlo Join course z pôvodného návrhu, pretože je rýchlejšie a intuitívnejšie si rovno vybrať konkrétnu hodinu iba kliknutím na dostupný timeslot v rozvrhu, ktorý následne priradí prihlásenému používateľovi zvolenú lekciu.

### Create Course

Pri obrazovke Create course došlo len k malej zmene, pretože v našom pôvodnom návrhu sme nevolili kategóriu, do ktorej má kurz patriť. Vo finálnej podobe aplikácie si ešte používateľ dodatočne volí kategóriu, v ktorej bude kurz viditeľný. Add timeslot a Delete timeslot fungujú na princípe dialógového okna a pomocou komponentu Picker si používateľ vyberie začiatok a koniec kurzu.

### Course Detail (Teacher)

Táto obrazovka dostala len jednu zmenu, a to pridanie tlačidla Delete course, kde ak user je učiteľ daného kurzu, môže tento kurz vymazať. Študentom, ktorí sa na tento kurz prihlásili, následne kurz aj zmizne z ponuky ich kurzov.

### Course Detail (Student)

Na obrazovke Course detail u študenta sme sa rozhodli vynechať tlačidlo Leave course, pretože v iných častiach aplikácie (konkrétne pri rezervácii lekcie) sa študent prihlási pomocou kliknutia na hodinu v rozvrhu. Z tohto dôvodu, pre zachovanie “konvencie”, sme podobne riešili aj odhlasovanie z kurzu kliknutím na konkrétnu hodinu v rozvrhu (študent vidí len jemu priradené). Ďalšou zmenou je tlačidlo Call teacher, ktoré pôsobí tak, že študent môže zavolať učiteľovi a “prizvať” ho do hovoru. V našej finálnej implementácii však vidíme miesto toho tlačidlo Join call with teacher, kde sa študent pridá do hovoru, ktorý medzitým učiteľ pripraví.

### Timetable

Táto obrazovka je pomerne jednoduchá, zobrazuje len rozvrh konkrétne prihláseného používateľa. Malou detailnou zmenou je len to, že nemáme dole legendu farebne rozlišujúcu, či daný používateľ je v danom čase študentom alebo učiteľom. Miesto toho sme pridali detailný popis konkrétneho timeslotu priamo do rozvrhu, pretože komponent TimeTableView poskytuje možnosť dodatočných informácii ako extra_descriptions, location a podobne.

### WebRTC

Volania s použitím technológie WebRTC sú umožnené medzi učiteľom kurzu a konkrétnym študentom. Učiteľ založí “miestnosť” s ID v tvare course<id kurzu>-user<id študenta> a študent sa vie na toto volanie pripojiť. Na frontende sme implementovali riešenie dostupné tu: https://github.com/DipanshKhandelwal/react-native-webrtc-firebase . Na backend sme použili službu Cloud Firestore poskytovanú v rámci Google Firebase. V tejto databáze dokumentov ukladáme pre každú “miestnosť” SDP údaje zakladateľa spojenia ako “offer” a SDP údaje druhej strany ako “answer”. Zároveň tu ukladáme zoznam ICE kandidátov pre obe strany (“callerCandidates” a “calleeCandidates”) pričom využívame Google STUN serveri. To nám umožňuje nadviazať peer-to-peer spojenie.

_Icon made by Freepik from www.flaticon.com_