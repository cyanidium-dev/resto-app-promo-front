# MySaniTrace — бриф на генерацию изображений

Для ChatGPT (gpt-image-1). Всё, что ниже — копипастится в чат как есть.

---

## Статус: 10 из 19 готово

**Лежит в проекте** (08.08.2026): `hero-dashboard` · `temperatures` · `checklists` · `mobile-checklist` · `mobile-temperature` · `photo-kitchen` · `photo-coldroom` · `photo-hotel` · `photo-bakery` · `photo-catering`

**Осталось сгенерировать — 9:**

| № | Файл | Раздел |
|---|---|---|
| 3.4 | `cleaning.png` | §3.4 |
| 3.5 | `tasks.png` | §3.5 |
| 3.6 | `alerts.png` | §3.6 |
| 3.7 | `corrective-actions.png` | §3.7 |
| 3.8 | `reports.png` | §3.8 |
| 3.9 | `photo-evidence.png` | §3.9 |
| 3.10 | `multi-location.png` | §3.10 |
| 5 | `photo-production.jpg` | §5 |
| 6 | `og.png` | §6 |

Первая партия получилась точной — те же промпты, ничего менять не нужно. Не забудь перед каждым следующим экраном добавлять `Same UI style, same colors, same density as the previous image.`

Фото присылай как есть — PNG, я сам пережму в JPEG (2 МБ → 200 КБ).

---

## Как этим пользоваться

1. **Один раз** отправь в чат блок «Общие правила» (§2). Он задаёт стиль.
2. Дальше кидай промпты из §3 по одному. После первой картинки добавляй к каждому следующему: `Same UI style, same colors, same density as the previous image.` — так весь комплект будет выглядеть как один продукт.
3. Файлы называй ровно как в колонке «Имя файла» и клади в `public/images/screens/` (интерфейсы) и `public/images/photos/` (фото).
4. Формат: **PNG** для интерфейсов, **JPG** для фото. Я потом сконвертирую в AVIF/WebP.

### Три правила, которые сильно улучшают результат

- **Генерируй по одной.** Пакетом модель начинает смешивать стили.
- **Не переделывай с нуля.** Если что-то не так — пиши `Keep everything exactly the same, change only: <что>`.
- **Меньше текста — лучше картинка.** Модель нормально рисует короткие английские слова и цифры, но плывёт на плотных таблицах с мелким шрифтом. Промпты ниже уже написаны с учётом этого.

### Почему все скриншоты тёмные и на английском

**Тёмные** — потому что тёмная рамка продукта одинаково хорошо смотрится и на светлой, и на тёмной странице сайта. Это стандартный приём, и он экономит нам второй комплект.

**Английские** — потому что модель хуже всего справляется с румынской диакритикой (`ș`, `ț`, `ă`) и кириллицей: получается каша, которая на сайте про доказуемость записей выглядит плохо. Реальные скриншоты на RO/RU зальются позже через админку.

---

## 1. Что генерируем, а что нет

| Делаем изображением | Делаем кодом |
|---|---|
| Скриншоты интерфейса приложения | Иконки (набор Lucide) |
| Экраны мобильного приложения | Схема цикла PLAN → … → IMPROVE |
| Фотографии кухонь и производств | OG-картинки для соцсетей |

Иконки и схема цикла — кодом по одной причине: **их подписи переводятся на три языка.** На картинке текст зашит намертво, и для RO/RU пришлось бы генерировать всё заново. Иконки при этом остаются иконками — никаких «нарисованных интерфейсов».

---

## 2. Общие правила — отправить один раз перед началом

```
I need a series of dark UI product screenshots for a food-safety and operations
platform called MySaniTrace, used by restaurants, hotels and food producers.

Render every image as a flat 2D interface, viewed straight on. No device frame,
no laptop mockup, no desk, no room, no perspective, no reflections.

Strict design system — follow these exactly:
- Page background #08090A
- Panel and card surface #17181B
- Hairline borders 1px, color #26272B
- Primary text #FAFAFA, secondary text #A1A1AA
- Accent cyan #22D3EE — used ONLY for the active sidebar item and ONE primary button
- Status colors appear ONLY inside small status pills:
  green #4ADE80 = OK, amber #FBBF24 = WARNING, red #F87171 = ALERT
- Corner radius 2px on every element. Pill shape only for status badges.
- No gradients, no glow, no drop shadows, no glassmorphism, no blur
- No large rounded cards. Everything is square and precise.
- UI text in a clean sans-serif (Inter style)
- All numbers, temperatures and timestamps in a monospace font
- Dense, precise, instrument-panel feel — like an observability console
  or a control room, not a friendly consumer app

Text rules:
- All interface text in short, real English words
- No lorem ipsum, no invented words, no misspellings, no random letters
- Keep the total amount of text low — prefer large numbers, short labels
  and status pills over sentences

Confirm you understand, then wait for my first screen request.
```

---

## 3. Скриншоты интерфейса

Все — **соотношение 16:10**, минимум 2560×1600.

Сквозная левая панель навигации во всех экранах (для консистентности):
`Dashboard · Checklists · Temperatures · Cleaning · Tasks · Alerts · Reports`

---

### 3.1 `hero-dashboard.png` — главный экран

Идёт в первый экран сайта. Самая важная картинка комплекта — на неё потратить больше всего итераций.

```
Screen 1 — Main dashboard.

Left sidebar with the logo text "MySaniTrace" at top and 7 short nav items:
Dashboard, Checklists, Temperatures, Cleaning, Tasks, Alerts, Reports.
"Dashboard" is the active item, marked with cyan #22D3EE text and a 2px cyan
left bar. Other items in #A1A1AA.

Top bar: title "All locations" on the left, a date "12 Aug 2026" and a small
user avatar circle on the right.

Main area, top row — 4 equal stat tiles side by side. Each tile has a small
uppercase label in #A1A1AA and one large monospace number in #FAFAFA:
  TASKS COMPLETED  98%
  OPEN ALERTS      4
  LOCATIONS        12
  CHECKS TODAY     156

Below the tiles — a table with the header "Locations" and 6 rows.
Each row: location name on the left, a temperature in monospace in the middle,
a status pill on the right.
  Central Kitchen    4.2°C    OK       (green pill)
  Downtown Bistro    3.8°C    OK       (green pill)
  Hotel Grand        7.9°C    WARNING  (amber pill)
  Riverside Cafe     4.1°C    OK       (green pill)
  Bakery North       5.0°C    OK       (green pill)
  Catering Hub       2.6°C    OK       (green pill)

16:10 aspect ratio.
```

### 3.2 `temperatures.png` — мониторинг температур

```
Screen 2 — Temperature monitoring. "Temperatures" is the active sidebar item.

Main area: a wide line chart showing a fridge temperature over 24 hours.
Thin 2px cyan #22D3EE line on the dark background. A thin dashed horizontal
threshold line in #A1A1AA labeled "Limit 8°C". In one section on the right the
cyan line rises above the dashed line — that segment of the line is amber
#FBBF24. X axis shows hours: 00 04 08 12 16 20. Y axis shows 0 4 8 12.

Below the chart — a table of 5 equipment rows:
  Fridge 1     4.2°C    OK       (green pill)
  Fridge 2     3.8°C    OK       (green pill)
  Freezer A   -18.4°C   OK       (green pill)
  Cold room    9.1°C    WARNING  (amber pill)
  Display 3    5.5°C    OK       (green pill)

Columns: Equipment, Current, Status. All temperatures in monospace.

16:10 aspect ratio.
```

### 3.3 `checklists.png` — цифровые чек-листы

```
Screen 3 — Digital checklists. "Checklists" is the active sidebar item.

Main area split in two columns.
Left column, narrower — a list of 5 checklist names with small progress
counters: "Opening 8/8", "Hygiene 6/7", "Closing 0/9", "Delivery 4/4",
"Production 5/5".

Right column, wider — an open checklist titled "Opening — Central Kitchen"
with 7 rows. Each row has a small square checkbox on the left, a short task
label, and a timestamp in monospace on the right. Five checkboxes are filled
with a cyan #22D3EE check mark, two are empty.
  Check fridge temperatures    07:12
  Inspect delivery area        07:20
  Sanitize prep surfaces       07:31
  Verify hot holding units     07:44
  Check waste containers       07:52
  Review allergen labels       —
  Confirm staff hygiene        —

16:10 aspect ratio.
```

### 3.4 `cleaning.png` — план уборки

```
Screen 4 — Cleaning plan. "Cleaning" is the active sidebar item.

Main area: a weekly grid. Columns are days: Mon Tue Wed Thu Fri Sat Sun.
Rows are areas: Kitchen, Cold Room, Prep Area, Storage, Dishwash, Front.

Each cell contains a small square status marker, 2px radius:
mostly green #4ADE80 filled squares, three amber #FBBF24 squares, one red
#F87171 square, and several empty squares with only a #26272B border for
future days.

Above the grid: a row of 3 small stat tiles — "COMPLETED 87%",
"OVERDUE 3", "SCHEDULED 42" with large monospace numbers.

16:10 aspect ratio.
```

### 3.5 `tasks.png` — задачи и ответственность

```
Screen 5 — Tasks and responsibilities. "Tasks" is the active sidebar item.

Main area: a table with 7 rows. Columns: Task, Assignee, Location, Due, Status.
Assignee column shows a small circular avatar plus a first name.
  Morning temperature log   Ana     Central Kitchen  08:00  DONE     (green)
  Sanitize prep station     Mihai   Downtown Bistro  09:30  DONE     (green)
  Check delivery documents  Elena   Hotel Grand      10:00  OVERDUE  (red)
  Weekly deep clean         Victor  Bakery North     12:00  OPEN     (amber)
  Verify allergen labels    Ana     Central Kitchen  14:00  OPEN     (amber)
  Freezer defrost check     Dan     Catering Hub     16:00  DONE     (green)
  Closing checklist         Maria   Riverside Cafe   22:00  OPEN     (amber)

Above the table, a row of small filter chips: All, Today, Overdue, By location.
"Today" is active with cyan #22D3EE text.

16:10 aspect ratio.
```

### 3.6 `alerts.png` — оповещения

```
Screen 6 — Alerts. "Alerts" is the active sidebar item.

Main area: a vertical feed of 6 alert rows. Each row has a 2px colored bar on
the left edge, a short bold title, one line of grey #A1A1AA detail text, and a
monospace timestamp on the right.
  amber  Temperature above limit    Cold room, Hotel Grand — 9.1°C   14:32
  red    Check not completed        Closing, Riverside Cafe          23:05
  amber  Task overdue               Delivery documents, Hotel Grand  10:15
  amber  Temperature above limit    Display 3, Downtown Bistro       11:48
  red    Equipment offline          Freezer A, Catering Hub          06:20
  amber  Cleaning task missed       Storage, Bakery North            18:00

Above the feed, three small tabs: "All 6", "Critical 2", "Resolved 41".

16:10 aspect ratio.
```

### 3.7 `corrective-actions.png` — корректирующие действия

```
Screen 7 — Corrective action detail.

Main area: a single panel titled "Corrective action #CA-1042".
Top of the panel: a red pill "OPEN", and a monospace line
"Opened 12 Aug 2026 · 14:32".

Below, 4 label-value rows in two columns:
  Issue      Temperature above limit
  Location   Hotel Grand — Cold room
  Owner      Elena P.
  Due        13 Aug 2026

Below that, a vertical timeline with 4 steps connected by a thin vertical
#26272B line. Each step has a small square marker, a short title and a
monospace time. First three markers cyan #22D3EE, last one empty:
  Issue detected      14:32
  Owner assigned      14:40
  Action in progress  15:05
  Verification        —

16:10 aspect ratio.
```

### 3.8 `reports.png` — отчёты и история

```
Screen 8 — Reports. "Reports" is the active sidebar item.

Main area, top: a row of 3 stat tiles with large monospace numbers —
"CHECKS LOGGED 4218", "COMPLIANCE 96%", "ISSUES CLOSED 137".

Middle: a vertical bar chart, 12 thin bars in cyan #22D3EE with month labels
Jan through Dec underneath. Two of the bars are amber #FBBF24.

Bottom: a table of 4 report rows. Columns: Report, Period, Generated, Format.
  Monthly HACCP summary   July 2026    01 Aug 2026   PDF
  Temperature log         July 2026    01 Aug 2026   PDF
  Cleaning verification   Q2 2026      01 Jul 2026   PDF
  Audit export            H1 2026      01 Jul 2026   CSV

16:10 aspect ratio.
```

### 3.9 `photo-evidence.png` — фотофиксация

```
Screen 9 — Photo evidence.

Main area: a grid of 6 evidence cards, 3 across and 2 down. Each card has a
photo area on top and a thin info strip below.

The photo areas show clean, well-lit professional kitchen details, slightly
desaturated: a stainless steel prep counter, a fridge thermometer display,
a clean floor drain, a sanitized cutting board, a storage shelf with labeled
containers, a stainless sink.

Each info strip: a short task label on the left, a monospace timestamp on the
right, and a small green #4ADE80 OK pill.

16:10 aspect ratio.
```

### 3.10 `multi-location.png` — сеть локаций

```
Screen 10 — Multi-location overview.

Main area: a comparison table with 8 location rows.
Columns: Location, Checks, Compliance, Open issues, Status.
Compliance column shows a percentage in monospace plus a thin horizontal bar
underneath, filled in cyan #22D3EE proportionally to the value.
  Central Kitchen   156   98%   0   OK       (green)
  Downtown Bistro   142   96%   1   OK       (green)
  Hotel Grand       138   81%   4   WARNING  (amber)
  Riverside Cafe    121   94%   1   OK       (green)
  Bakery North      118   92%   2   OK       (green)
  Catering Hub      165   97%   0   OK       (green)
  Airport Deli       98   74%   6   ALERT    (red)
  Mall Food Court   110   89%   3   WARNING  (amber)

Above the table, a row of 3 stat tiles: "LOCATIONS 12",
"AVG COMPLIANCE 91%", "OPEN ISSUES 17".

16:10 aspect ratio.
```

---

## 4. Мобильные экраны

Соотношение **9:19.5**, минимум 1170×2532. Нужны для секции «А персонал будет этим пользоваться?» — поэтому интерфейс должен выглядеть **крупным и простым**, это и есть месседж.

### 4.1 `mobile-checklist.png`

```
Mobile app screen, portrait, 9:19.5 aspect ratio.
Same dark design system. Include a thin dark phone bezel with rounded corners
around the screen, nothing else — no hand, no desk, no background scene.

Screen content:
- Status bar at top with time 08:14
- Header: back arrow, title "Opening check", subtitle "Central Kitchen"
- A large progress row: monospace "5 / 8" on the left, a thin cyan #22D3EE
  progress bar filled about 60%
- Below, 5 large task rows with generous vertical spacing. Each row has a big
  square checkbox on the left and a short label:
    Check fridge temperatures   (checked, cyan)
    Inspect delivery area       (checked, cyan)
    Sanitize prep surfaces      (checked, cyan)
    Verify hot holding units    (empty)
    Check waste containers      (empty)
- A full-width cyan #22D3EE button at the bottom with dark text: "Continue"

Everything large and finger-friendly. Very little text.
```

### 4.2 `mobile-temperature.png`

```
Mobile app screen, portrait, 9:19.5 aspect ratio, same phone bezel.

Screen content:
- Status bar, time 08:20
- Header: back arrow, title "Record temperature", subtitle "Fridge 1"
- A very large monospace number in the centre: "4.2°C" in #FAFAFA,
  taking about a quarter of the screen height
- Under it a small green #4ADE80 pill: "WITHIN LIMITS"
- Below, a simple numeric keypad, 3 columns by 4 rows, dark keys with
  #26272B borders
- A full-width cyan #22D3EE button at the bottom with dark text: "Save"

Minimal text, very large touch targets.
```

---

## 5. Фотографии

Соотношение **3:2**, минимум 2400×1600. Идут в секцию локальности и на страницу решений по типам бизнеса, всегда под тёмным оверлеем — поэтому снимать «в тёмную».

**Общая арт-дирекция для всех фото:**

```
Documentary-style photograph of a professional food environment.
Dark, cool-toned, desaturated. Deep shadows, one soft directional light source.
Shallow depth of field. Shot at eye level.

Absolutely no visible faces — people may appear only as blurred silhouettes
or hands in the background, out of focus.

No smiling stock-photo staff, no thumbs up, no bright cheerful lighting,
no orange-teal colour grading, no lens flare, no text, no logos.

The mood is early morning, quiet, before service. Clean and professional,
not styled or glossy.

3:2 aspect ratio.
```

| Имя файла | Промпт (добавить к арт-дирекции выше) |
|---|---|
| `photo-kitchen.jpg` | `Subject: a professional restaurant kitchen prep line, stainless steel surfaces, empty and clean, before the shift starts.` |
| `photo-coldroom.jpg` | `Subject: the interior of a walk-in cold room. Stainless steel shelving with stacked labelled containers. A digital temperature display glowing faintly on the wall.` |
| `photo-hotel.jpg` | `Subject: a large hotel banquet kitchen, long stainless steel pass, empty plates stacked, quiet before service.` |
| `photo-bakery.jpg` | `Subject: a bakery production room at night. Dough trays on steel racks, flour dust in the air catching the light.` |
| `photo-catering.jpg` | `Subject: an industrial catering kitchen, large steel pots on a range, high volume production scale, empty of people.` |
| `photo-production.jpg` | `Subject: a food production facility corridor, stainless steel equipment, hygienic white and steel surfaces, industrial scale.` |

---

## 6. Картинка для соцсетей

Одна штука, `1200×630`, кладётся в `public/images/og.png`. Показывается, когда ссылку на сайт кидают в WhatsApp, Telegram, LinkedIn или Facebook. Пока файла нет, сайт просто не отдаёт превью-карточку — это лучше, чем битая ссылка на картинку.

```
A 1200x630 social preview card. Flat 2D graphic, no device mockup.

Background: near-black #08090A with a very subtle dot grid pattern.
Left-aligned composition with generous margins.

Top left: small monospace label in grey #71717A, uppercase, letter-spaced:
"DIGITAL HACCP · OPERATIONAL CONTROL"

Centre left: large bold white #FAFAFA sans-serif text on three lines:
"Every task.
Every location.
Under control."

Bottom left: the word "MySaniTrace" in medium-weight white text, preceded by
a small 24x24 square outline containing the letter S.

Right side: a simple abstract arrangement of small squares in a grid, most in
dark grey #26272B, three of them in cyan #22D3EE. Nothing else.

No photographs, no gradients, no glow, no shadows.
```

---

## 6.5. Фон первого экрана — `hero-split.jpg`

Кладётся в `public/images/photos/hero-split.jpg`. Соотношение **16:9**, минимум 2560×1440.

Замысел: слева реальная кухня, справа она перетекает в интерфейс платформы. Стык — не резкая граница, а растворение: посуда и сталь распадаются на панели, графики и переключатели.

Три вещи, от которых зависит, ляжет картинка или нет:

- **Левые 40% — тёмные и малодетальные.** Поверх них идёт заголовок, и сайт дополнительно кладёт скрим 95% слева против 55% справа. Любая мелкая деталь слева всё равно утонет, а контраст текста испортит.
- **Вся техника — в правой трети.** Там затемнение слабее всего, только там интерфейс будет виден.
- **Никакого текста крупнее подписи.** Модель ломает буквы, а на первом экране это заметят все. Цифры и короткие метки — можно, абзацы — нет.

```
A single wide cinematic image, 16:9, that transitions left-to-right from a
real photograph into a digital interface.

LEFT 40%: a dark professional restaurant kitchen. Stainless steel prep line,
empty and clean, before service. Very dark, cool-toned, heavily desaturated,
deep shadows, one soft directional light. Low detail and low contrast — this
area sits behind headline text. No people, no faces.

MIDDLE 20%: the transition zone. The photograph dissolves into the interface.
Steel surfaces break apart into thin rectangular panels and hairline grid
lines. Fragments of the kitchen still visible, becoming progressively more
abstract and geometric from left to right. The blend is gradual and organic,
never a hard vertical seam.

RIGHT 40%: a dark hi-tech monitoring interface floating in space. Semi-
transparent rectangular panels layered at slight depth, containing:
- a line chart with a thin glowing cyan #22D3EE curve and a dashed threshold
- a few small circular gauges
- two or three toggle switches
- a vertical bar chart
- small status pills in green and amber
- large monospace numerals like "4.2" and "98%"
Panels have 1px borders and sharp corners. No text longer than two short
words anywhere.

Global look:
- Background near-black #08090A throughout, unifying photo and interface
- Cyan #22D3EE is the only bright colour; a little green and amber inside
  status pills only
- No purple, no orange, no rainbow, no neon grid floor, no sci-fi hologram
  clichés, no glowing wireframe human, no circuit-board texture
- Flat and precise, not glossy. No lens flare, no heavy bloom, no vignette
- Photographic on the left, graphic on the right, one continuous image

16:9 aspect ratio.
```

Если первый заход даст резкий шов посередине — не перегенерируй с нуля, допиши:
`Keep everything the same, but make the transition between the photograph and the interface much more gradual and blended across the middle third.`

### Планшет — `hero-split-tablet.jpg`

Соотношение **3:4 портрет**, минимум 1600×2133. Слева направо переход не работает на узком экране, поэтому здесь он идёт по диагонали: кухня в левом нижнем углу, интерфейс в правом верхнем.

```
A single cinematic image, 3:4 portrait, transitioning diagonally from a
photograph in the lower left to a digital interface in the upper right.

LOWER LEFT: a dark professional restaurant kitchen. Stainless steel prep
line, empty and clean, before service. Very dark, cool-toned, heavily
desaturated, deep shadows. Low detail — headline text sits over this area.
No people, no faces.

DIAGONAL BAND through the centre: the photograph dissolves into the
interface. Steel surfaces break apart into thin rectangular panels and
hairline grid lines, becoming more geometric toward the upper right. The
blend is gradual and organic, never a hard edge.

UPPER RIGHT: a dark hi-tech monitoring interface floating in space. Semi-
transparent rectangular panels layered at slight depth, containing a line
chart with a thin glowing cyan #22D3EE curve and a dashed threshold, two
small circular gauges, a couple of toggle switches, and large monospace
numerals like "4.2" and "98%". Panels have 1px borders and sharp corners.
No text longer than two short words anywhere.

Global look:
- Background near-black #08090A throughout, unifying photo and interface
- Cyan #22D3EE is the only bright colour; a little green and amber inside
  small status pills only
- No purple, no orange, no rainbow, no neon grid floor, no sci-fi hologram
  clichés, no glowing wireframe human, no circuit-board texture
- Flat and precise, not glossy. No lens flare, no heavy bloom, no vignette

3:4 portrait aspect ratio.
```

### Телефон — `hero-split-mobile.jpg`

Соотношение **9:16 портрет**, минимум 1440×2560. Здесь переход вертикальный: кухня сверху, интерфейс снизу.

Ключевое отличие: на телефоне текст закрывает почти весь экран, поэтому **верхние две трети должны быть тихими**, а вся техника — в нижней трети. Крупных читаемых панелей не надо, они всё равно уйдут под плашки — нужен намёк на интерфейс, а не сам интерфейс.

```
A single cinematic image, 9:16 portrait, transitioning vertically from a
photograph at the top into a digital interface at the bottom.

TOP 55%: a dark professional restaurant kitchen. Stainless steel prep line,
empty and clean, before service. Very dark, cool-toned, heavily desaturated,
deep shadows, minimal detail and low contrast — headline text sits over this
whole area. No people, no faces.

MIDDLE 20%: the photograph dissolves downward into the interface. Steel
surfaces break apart into thin horizontal panels and hairline grid lines.
Gradual and organic, never a hard horizontal seam.

BOTTOM 25%: an abstract suggestion of a monitoring interface — thin
horizontal panels, a glowing cyan #22D3EE line chart, a few small bars, a
scattering of tiny status dots in green and amber. Kept simple and low
contrast: this is atmosphere, not a readable dashboard. No numerals larger
than small, no text.

Global look:
- Background near-black #08090A throughout, unifying photo and interface
- Cyan #22D3EE is the only bright colour
- No purple, no orange, no rainbow, no neon grid floor, no sci-fi hologram
  clichés, no glowing wireframe human, no circuit-board texture
- Flat and precise, not glossy. No lens flare, no heavy bloom, no vignette

9:16 portrait aspect ratio.
```

Оба файла кладутся в `public/images/photos/`. Пока их нет, оба брейкпоинта показывают десктопную картинку — сайт не сломается.

---

## 7. Логотип

Важно понимать ограничение: **ChatGPT отдаёт растр, а не вектор.** Для сайта этого хватит, но для вывески, меню, печати и фавикона нужен SVG. Поэтому схема такая: генерируем варианты знака в ChatGPT → выбираем один → я перерисовываю его в SVG под систему сайта.

Генерируй знак **без текста** — буквы модель рисует криво, а «MySaniTrace» я наберу шрифтом сайта (Unbounded) и это будет точнее любой генерации.

```
Design a minimal, geometric logo mark for a food-safety and operations
control platform called MySaniTrace. Mark only — no text, no lettering,
no wordmark.

Show 6 distinct options in a 3x2 grid on a plain #08090A background.
Each mark rendered in a single flat cyan #22D3EE, centred in its cell,
with generous empty space around it.

Style constraints:
- Flat 2D vector look. No 3D, no gradients, no glow, no shadows,
  no bevels, no shine.
- Built from simple geometry: straight lines, right angles, one or two
  precise diagonal cuts. Consistent stroke weight throughout.
- Must stay legible at 24x24 pixels — no thin hairlines, no fine detail,
  no more than 5 elements per mark.
- Reads as precision instrumentation and verification, not as food.
  No chef hats, no forks, no cutlery, no plates, no wheat, no leaves.

Concepts to explore across the six options:
1. A checkmark constructed from two straight segments with a chamfered
   corner cut
2. A shield abstracted into a simple angular polygon with one corner
   sliced off
3. A thermometer reduced to a vertical bar with a single gauge notch
4. A grid of four squares where one square is offset or filled
5. A location pin simplified to a hard-edged geometric outline
6. A monogram-like "S" built only from straight strokes and 45-degree
   angles, no curves
```

Дальше: скинь результат, я выберу с тобой один и соберу финальный SVG — знак плюс наборный логотип, с версиями для светлой и тёмной темы и фавиконом.

Сейчас на сайте стоит временный текстовый логотип: квадрат со срезанным углом и буквой S плюс название шрифтом Unbounded.

---

## 8. Итог: 19 картинок

| Группа | Кол-во | Куда класть |
|---|---|---|
| Экраны интерфейса (§3) | 10 | `public/images/screens/` |
| Мобильные экраны (§4) | 2 | `public/images/screens/` |
| Фотографии (§5) | 6 | `public/images/photos/` |
| Картинка для соцсетей (§6) | 1 | `public/images/og.png` |

До получения картинок я собираю сайт со слотами-заглушками правильных пропорций — вёрстка не поедет, когда файлы появятся. Достаточно положить их по путям выше с этими именами.
