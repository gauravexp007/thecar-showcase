/**
 * The marque index behind the showcase page.
 *
 * One object per house. Figures are manufacturer press data for the current
 * generation of each car (2024–2026 model years), rounded the way the makers
 * publish them. Prices are starting figures before options and local taxes,
 * where a maker publishes one at all.
 *
 * Photography lives in /public/marques and comes from Wikimedia Commons
 * contributors, cropped for this layout. Each caption names the car in the
 * frame, because a photograph often shows a different trim to the figures.
 */

export const MARQUES = [
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    logo: '/logos/rolls-royce.webp',
    country: 'England',
    city: 'Goodwood',
    founded: '1904',
    tagline: 'Silence, engineered.',
    intro:
      'The marque was built on restraint rather than noise: a 6.75-litre V12 you hear only as a distant hum, rear-hinged coach doors that close themselves, and a cabin trimmed from a single herd of hides. Nothing about the way it moves is hurried.',
    signature: [
      ['Founded', '1904'],
      ['Hand-built in', 'Goodwood, England'],
      ['Known for', 'Silence at speed'],
    ],
    images: [
      {
        src: '/marques/rolls-2.avif',
        alt: 'A pale blue Rolls-Royce Spectre in profile',
        title: 'One unbroken arc',
        caption: 'Rolls-Royce Spectre, in profile.',
        note:
          'From the A-pillar to the tail there is no seam at all. The roof is drawn as one stroke and left to do the work.',
      },
      {
        src: '/marques/rolls-1.avif',
        alt: 'A pale blue Rolls-Royce Spectre in a studio',
        title: 'Spectre, in the studio',
        caption: 'Rolls-Royce Spectre, 2023.',
        note:
          'Pale blue under studio lights: the first Rolls-Royce designed as an electric car from the start, with a grille wide enough to be read from across the hall.',
      },
      {
        src: '/marques/rolls-royce-3.avif',
        alt: 'A dark blue Rolls-Royce Spectre from the front three-quarter',
        title: 'The Pantheon, lit',
        caption: 'Rolls-Royce Spectre, front three-quarter.',
        note:
          'The grille is the oldest logo in the business — upright, polished, and now lit from within. Everything behind it is deliberately quiet.',
      },
    ],
    features: [
      {
        title: 'Planar suspension',
        body:
          'A camera reads the road ahead and the air springs decouple each wheel, so the body stays level while the wheels absorb the surface. Rolls-Royce calls the result a magic carpet; engineers call it a very expensive way to hide a bump.',
      },
      {
        title: 'Starlight headliner',
        body:
          'Hundreds of fibre-optic stars are fitted by hand into the roof lining, each one placed and cut individually. It began as a one-off request in 2007 and is now the most imitated detail in the luxury car business.',
      },
      {
        title: 'Coach doors',
        body:
          'The rear doors are hinged at the back and open to 83 degrees at the press of a button, then close themselves. The point is not theatre: it lets a passenger step out forwards, without turning, at a kerb.',
      },
    ],
    models: [
      {
        name: 'Phantom Series II',
        sub: 'V12 saloon',
        power: '563 hp',
        sprint: '5.1 s',
        top: '155 mph',
        price: 'from $460,000',
        note: '6.75-litre twin-turbo V12, 664 lb-ft, and a body that is still hand-finished at Goodwood.',
      },
      {
        name: 'Spectre',
        sub: 'Electric coupe',
        power: '577 hp',
        sprint: '4.4 s',
        top: '155 mph',
        price: 'from $422,000',
        note: 'The first electric Rolls-Royce: two motors, a 102 kWh battery and 6,350 lb of carefully disguised weight.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'bentley',
    name: 'Bentley',
    logo: '/logos/bentley.webp',
    country: 'England',
    city: 'Crewe',
    founded: '1919',
    tagline: 'The grand tourer, reinvented.',
    intro:
      'Bentley has made the same argument for a century: a car that crosses a continent in one sitting and still feels special at the other end. The current Continental GT Speed adds a plug-in hybrid V8 to that idea — 771 hp, and a few quiet electric miles.',
    signature: [
      ['Founded', '1919'],
      ['Hand-built in', 'Crewe, England'],
      ['Known for', 'The grand tourer'],
    ],
    images: [
      {
        src: '/marques/bentley-1.avif',
        alt: 'A dark blue Bentley Continental GT parked',
        title: 'Continental GT, at rest',
        caption: 'Bentley Continental GT, fourth generation.',
        note:
          'Dark blue over brightwork: the modern Bentley silhouette — long bonnet, hard shoulder, and a roofline that ends in a fastback.',
      },
      {
        src: '/marques/bentley-2.avif',
        alt: 'A pale blue Bentley Bentayga from the front three-quarter',
        title: 'Bentayga EWB',
        caption: 'Bentley Bentayga EWB.',
        note:
          'The tall one. Bentley’s SUV carries the same grille and the same hand-finished cabin, raised a hand’s width off the road.',
      },
      {
        src: '/marques/bentley-3.avif',
        alt: 'A grey Bentley Continental GT in profile',
        title: 'Continental GT, in profile',
        caption: 'Continental GT, in profile.',
        note:
          'Seen flat from the side, the proportions explain the car: the wheels sit at the corners and the cabin is set well back.',
      },
    ],
    features: [
      {
        title: 'The rotating display',
        body:
          'The dashboard turns through three faces at the press of a button: a 12.3-inch touchscreen, three analogue dials with a chronometer, or a plain veneer panel that matches the rest of the cabin. It is the most Bentley thing ever made.',
      },
      {
        title: 'Diamond quilting',
        body:
          'The signature seat and door stitching is done by hand in Crewe, thousands of stitches per panel, with the leather cut from hides chosen for how few scars they carry.',
      },
      {
        title: 'All-wheel steering',
        body:
          'At low speed the rear wheels turn against the fronts to shrink the turning circle; at pace they turn with them for stability. It makes a two-and-a-half-tonne coupe behave like something far smaller.',
      },
    ],
    models: [
      {
        name: 'Continental GT Speed',
        sub: 'Hybrid grand tourer',
        power: '771 hp',
        sprint: '3.1 s',
        top: '208 mph',
        price: 'from $302,000',
        note: '4.0-litre twin-turbo V8 plus an electric motor, 738 lb-ft, and four-wheel steering as standard.',
      },
      {
        name: 'Bentayga EWB',
        sub: 'Extended-wheelbase SUV',
        power: '542 hp',
        sprint: '4.5 s',
        top: '180 mph',
        price: 'from $226,000',
        note: 'The long-wheelbase Bentayga adds 180 mm between the axles and airline-style rear seats with massage.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    logo: '/logos/aston-martin.webp',
    country: 'England',
    city: 'Gaydon',
    founded: '1913',
    tagline: 'Beauty, with a V12 behind it.',
    intro:
      'Aston builds the most sculptural cars in the business and, since 2023, backs them with the power to match. The DB12 was the turning point: a reworked twin-turbo V8, a chassis stiffened at the bulkhead and the first Aston interior that feels worth the money.',
    signature: [
      ['Founded', '1913'],
      ['Hand-built in', 'Gaydon, England'],
      ['Known for', 'The V12 GT'],
    ],
    images: [
      {
        src: '/marques/aston-1.avif',
        alt: 'A grey Aston Martin DB12 from the front three-quarter',
        title: 'DB12, head on',
        caption: 'Aston Martin DB12, 2023.',
        note:
          'The grille sits low and wide, the headlights pull the nose down the road, and the haunch over the rear wheel does the rest.',
      },
      {
        src: '/marques/aston-2.avif',
        alt: 'A grey Aston Martin Vanquish on a forecourt',
        title: 'Vanquish',
        caption: 'Aston Martin Vanquish, 2024.',
        note:
          'The flagship, back after a gap: a carbon body over a twin-turbo V12, drawn with the long tail of the One-77.',
      },
      {
        src: '/marques/aston-martin-3.avif',
        alt: 'A silver Aston Martin DB12 from the front three-quarter',
        title: 'DB12, in silver',
        caption: 'Aston Martin DB12, front three-quarter.',
        note:
          'Silver flatters this shape. The surfacing is calm enough that light does the describing instead of a crease.',
      },
    ],
    features: [
      {
        title: 'The bonded structure',
        body:
          'The body is glued and riveted around a bonded aluminium structure rather than welded steel. It is why a 671 hp grand tourer weighs less than most family saloons, and why the panels fit the way they do.',
      },
      {
        title: 'A V12 in 2025',
        body:
          'The 5.2-litre twin-turbo V12 survives in the Vanquish at 824 hp — the most powerful engine Aston has put in a production car, and one of the last big twelve-cylinders anyone still sells.',
      },
      {
        title: 'The cabin, finally',
        body:
          'Every hide is cut and stitched at Gaydon. The DB12 uses around ten square metres of leather, worked by a single trimmer, around a console of machined metal instead of the borrowed switchgear of previous cars.',
      },
    ],
    models: [
      {
        name: 'DB12',
        sub: 'V8 grand tourer',
        power: '671 hp',
        sprint: '3.5 s',
        top: '202 mph',
        price: 'from $248,000',
        note: '4.0-litre twin-turbo V8, 590 lb-ft, an eight-speed automatic and a 2,000-watt Bowers & Wilkins system.',
      },
      {
        name: 'Vanquish',
        sub: 'V12 flagship',
        power: '824 hp',
        sprint: '3.2 s',
        top: '214 mph',
        price: 'from $429,000',
        note: '5.2-litre twin-turbo V12, 738 lb-ft, carbon-ceramic brakes and a top speed run in one direction only.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    logo: '/logos/porsche.webp',
    country: 'Germany',
    city: 'Stuttgart',
    founded: '1931',
    tagline: 'The rear engine, vindicated.',
    intro:
      'No other house has spent so long proving one idea. The 911 has kept its flat-six behind the rear axle since 1964, and the current car is quicker, better damped and easier to live with than any of its ancestors. Porsche applies the same discipline to the electric Taycan.',
    signature: [
      ['Founded', '1931'],
      ['Built in', 'Stuttgart & Leipzig'],
      ['Known for', 'The rear-engined 911'],
    ],
    images: [
      {
        src: '/marques/porsche-3.avif',
        alt: 'A white Porsche 911 Carrera on a street',
        title: '911, on the street',
        caption: 'Porsche 911 Carrera, 992 generation.',
        note:
          'White and unbothered, parked among ordinary cars, which is where most of them spend their lives.',
      },
      {
        src: '/cars/porsche-taycan.webp',
        alt: 'A pale Porsche Taycan in a studio',
        title: 'Taycan',
        caption: 'Porsche Taycan.',
        note:
          'The electric one: low nose, cut-off tail and no grille at all — Porsche’s aerodynamic argument with four doors.',
      },
      {
        src: '/cars/porsche-911.webp',
        alt: 'A silver Porsche 911 Carrera',
        title: '911 Carrera',
        caption: 'Porsche 911 Carrera, 992 generation.',
        note:
          'The same silhouette since 1963, revised. Engine behind the axle, tail sloping away, and a roofline that has never needed replacing.',
      },
    ],
    features: [
      {
        title: 'Flat-six, behind the axle',
        body:
          'Six horizontally opposed cylinders sit low and behind the rear wheels. The layout keeps the centre of gravity down and loads the driven axle under acceleration — the reason a 911 puts its power down where a front-engined car would spin.',
      },
      {
        title: 'PDK',
        body:
          'Two clutches, seven or eight ratios and shifts measured in milliseconds. Porsche\'s dual-clutch gearbox has been the benchmark for a road car since 2008, and the current one shifts harder the harder you ask it to.',
      },
      {
        title: '800-volt charging',
        body:
          'The Taycan was the first production car on an 800-volt architecture. It is why a charging stop adds around 200 miles in about twenty minutes instead of forty, and why the cables and motors can be smaller for the same power.',
      },
    ],
    models: [
      {
        name: '911 GT3',
        sub: 'Naturally aspirated coupe',
        power: '502 hp',
        sprint: '3.2 s',
        top: '194 mph',
        price: 'from $224,000',
        note: '4.0-litre flat-six at 9,000 rpm, rear-wheel drive only, and a manual gearbox if you ask for it.',
      },
      {
        name: 'Taycan Turbo GT',
        sub: 'Electric four-door',
        power: '1,092 hp',
        sprint: '2.1 s',
        top: '190 mph',
        price: 'from $231,000',
        note: 'Overboost with Launch Control, a 105 kWh battery and the fastest lap any electric four-door has set at the Nürburgring.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/logos/bmw.webp',
    country: 'Germany',
    city: 'Munich',
    founded: '1916',
    tagline: "The driver's saloon, still.",
    intro:
      'BMW built its reputation with small, rear-driven saloons — the 2002, then the 3 Series. Today the range runs from a 717 hp hybrid M5 to the electric iX, but the idea has not moved: weight over the driven wheels, and a chassis set up to talk to whoever is holding the wheel.',
    signature: [
      ['Founded', '1916'],
      ['Based in', 'Munich, Germany'],
      ['Known for', 'The straight-six'],
    ],
    images: [
      {
        src: '/marques/bmw-1.avif',
        alt: 'A Brooklyn Grey BMW M5 from the front three-quarter',
        title: 'M5, under the lights',
        caption: 'BMW M5, G90 generation.',
        note:
          'Brooklyn Grey over black: the G90 M5 with its arches pulled wide, the kidney grille blanked behind glass and a charge port in the front wing.',
      },
      {
        src: '/cars/bmw-ix.webp',
        alt: 'A BMW iX electric SUV',
        title: 'iX',
        caption: 'BMW iX.',
        note:
          'BMW’s electric SUV, the tall kidney blanked off and the cabin pushed forward over the front axle.',
      },
      {
        src: '/marques/bmw-3.avif',
        alt: 'A yellow BMW M5 from the front three-quarter',
        title: 'M5, G90',
        caption: 'BMW M5, G90 generation.',
        note:
          'Yellow, four doors and a plug: the first M5 with a hybrid V8, still wearing the widest arches in the range.',
      },
    ],
    features: [
      {
        title: 'The inline six',
        body:
          'BMW\'s straight-six is the smoothest production engine layout short of a V12, and the company has built them almost continuously since the 1960s. The current 3.0-litre unit appears in everything from a 3 Series to a Toyota Supra.',
      },
      {
        title: 'M hybrid',
        body:
          'The M5 pairs a 4.4-litre twin-turbo V8 with an electric motor for 717 hp, driving all four wheels — with a mode that disconnects the front axle entirely for track work.',
      },
      {
        title: 'iDrive',
        body:
          'One rotary controller and a curved screen, now in its ninth generation. BMW kept the controller when rivals went touch-only, and kept physical climate controls in most of the range.',
      },
    ],
    models: [
      {
        name: 'M5',
        sub: 'Hybrid performance saloon',
        power: '717 hp',
        sprint: '3.4 s',
        top: '190 mph',
        price: 'from $120,000',
        note: '4.4-litre twin-turbo V8 plus a 194 hp motor, 738 lb-ft, and 2,445 kg of it.',
      },
      {
        name: 'iX M70',
        sub: 'Electric SUV',
        power: '650 hp',
        sprint: '3.6 s',
        top: '130 mph',
        price: 'from $111,000',
        note: 'Dual motors, a 111 kWh battery and around 300 miles of range on a charge.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    logo: '/logos/ferrari.webp',
    country: 'Italy',
    city: 'Maranello',
    founded: '1939',
    tagline: 'Twelve cylinders, naturally.',
    intro:
      'Ferrari is the only house still building a naturally aspirated V12 for a road car, and it remains the heart of the range: 6.5 litres, 819 hp and a redline near 9,500 rpm. Everything around it exists to make that engine usable — the dial on the wheel, the electronics, the way the nose turns.',
    signature: [
      ['Founded', '1939'],
      ['Built in', 'Maranello, Italy'],
      ['Known for', 'The V12'],
    ],
    images: [
      {
        src: '/marques/ferrari-1.avif',
        alt: 'A white Ferrari 12Cilindri from the front',
        title: '12Cilindri, head on',
        caption: 'Ferrari 12Cilindri, 2024.',
        note:
          'Maranello’s front-engined V12 coupe, drawn with a black band across the nose that reads as a visor.',
      },
      {
        src: '/marques/ferrari-2.avif',
        alt: 'A grey Ferrari Purosangue from the rear three-quarter',
        title: 'Purosangue',
        caption: 'Ferrari Purosangue.',
        note:
          'The first four-door Ferrari, and the first with the engine behind the front axle and rear doors hinged at the back.',
      },
      {
        src: '/marques/ferrari-3.avif',
        alt: 'A dark green Ferrari 12Cilindri from the front three-quarter',
        title: '12Cilindri, three-quarter',
        caption: 'Ferrari 12Cilindri, front three-quarter.',
        note:
          'Dark green over tan: the long bonnet ends well ahead of the driver, the way a front-engined Ferrari should.',
      },
    ],
    features: [
      {
        title: 'The manettino',
        body:
          'The red dial on the steering wheel selects the whole character of the car: wet, comfort, sport, race, or everything off. It started as a rally switch and became the most copied steering wheel in the industry.',
      },
      {
        title: 'Side Slip Control',
        body:
          'The stability system measures yaw rate and slip angle, then allows the tail to step out exactly as far as the driver asks before gathering it up. It is the difference between a fast car and a car that makes you feel fast.',
      },
      {
        title: 'A V12 without turbos',
        body:
          'The 12Cilindri\'s 6.5-litre engine makes 819 hp at 9,250 rpm with no turbochargers and no hybrid help. It is the last of a line, and Ferrari knows it.',
      },
    ],
    models: [
      {
        name: '12Cilindri',
        sub: 'Front-engined V12 coupe',
        power: '819 hp',
        sprint: '2.9 s',
        top: '211 mph',
        price: 'from $423,000',
        note: '6.5-litre V12 at 9,500 rpm, rear-wheel steering and a body that deliberately echoes the 365 GTB/4.',
      },
      {
        name: 'Purosangue',
        sub: 'Four-door, four-seat V12',
        power: '715 hp',
        sprint: '3.3 s',
        top: '193 mph',
        price: 'from $398,000',
        note: 'Ferrari refuses to call it an SUV. The V12 drives all four wheels through a rear transaxle.',
      },
    ],
    sprintLabel: '0–62 mph',
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    logo: '/logos/lamborghini.webp',
    country: 'Italy',
    city: "Sant'Agata Bolognese",
    founded: '1963',
    tagline: 'Theatre, at speed.',
    intro:
      'Lamborghini has never been subtle, and the Revuelto is the loudest argument yet: a 6.5-litre V12 with three electric motors, 1,001 hp, and a carbon monofuselage lighter than the car it replaced. These are supercars designed to be seen arriving.',
    signature: [
      ['Founded', '1963'],
      ['Built in', "Sant'Agata Bolognese"],
      ['Known for', 'The V12 and the doors'],
    ],
    images: [
      {
        src: '/marques/lambo-1.avif',
        alt: 'A white Lamborghini Revuelto from the front',
        title: 'Revuelto, head on',
        caption: 'Lamborghini Revuelto, 2023.',
        note:
          'The V12 hybrid flagship: a wedge with the engine still behind the seats and a nose cut low to the road.',
      },
      {
        src: '/marques/lambo-2.avif',
        alt: 'A green Lamborghini Urus SE',
        title: 'Urus SE',
        caption: 'Lamborghini Urus SE.',
        note:
          'Green, tall and now hybrid. The Urus is the car that pays for Sant’Agata’s supercars, and it is not shy about it.',
      },
      {
        src: '/marques/lamborghini-3.avif',
        alt: 'A white Lamborghini Revuelto from behind',
        title: 'Revuelto, from behind',
        caption: 'Revuelto, from behind.',
        note:
          'The tail is where Lamborghini lets go: a diffuser the size of a door and two hexagonal pipes set high in the bodywork.',
      },
    ],
    features: [
      {
        title: 'Carbon monofuselage',
        body:
          'A single carbon-fibre tub carries the front structure, the cockpit and the rear powertrain in one piece. It is stiffer and lighter than the Aventador\'s separate aluminium-and-carbon frame, and it is built in-house at Sant\'Agata.',
      },
      {
        title: 'Scissor doors',
        body:
          'Vertical-opening doors, inherited from the Countach and kept ever since. They are heavier than conventional hinges and worse in a tight car park, and nobody at Lamborghini has ever suggested removing them.',
      },
      {
        title: 'V12 plus three motors',
        body:
          'The V12 drives the rear axle; two motors drive the front wheels and a third sits on the gearbox, filling the torque gap between shifts. The result is 1,001 hp and a reverse gear made entirely of electricity.',
      },
    ],
    models: [
      {
        name: 'Revuelto',
        sub: 'Hybrid V12 flagship',
        power: '1,001 hp',
        sprint: '2.5 s',
        top: '217 mph',
        price: 'from $608,000',
        note: '6.5-litre V12 at 9,500 rpm plus three motors, an eight-speed dual-clutch and all-wheel drive.',
      },
      {
        name: 'Urus SE',
        sub: 'Plug-in hybrid SUV',
        power: '789 hp',
        sprint: '3.4 s',
        top: '194 mph',
        price: 'from $258,000',
        note: '4.0-litre twin-turbo V8 with a 25 kWh battery, 37 miles of electric range and a rear-wheel-steering system.',
      },
    ],
    sprintLabel: '0–62 mph',
  },
  {
    id: 'pagani',
    name: 'Pagani',
    logo: '/logos/pagani.webp',
    country: 'Italy',
    city: 'San Cesario sul Panaro',
    founded: '1992',
    tagline: 'Titanium, leather, obsession.',
    intro:
      'Horacio Pagani\'s factory builds fewer than fifty cars a year, and every one is sculpture wrapped around a Mercedes-AMG V12. The Utopia is the most conventional car Pagani has made — a manual gearbox is on the options list — and still nothing about it is ordinary.',
    signature: [
      ['Founded', '1992'],
      ['Built in', 'San Cesario sul Panaro'],
      ['Known for', 'Carbo-titanium'],
    ],
    images: [
      {
        src: '/marques/pagani-1.avif',
        alt: 'A blue Pagani Utopia at a motor show',
        title: 'Utopia',
        caption: 'Pagani Utopia, 2022.',
        note:
          'Horacio Pagani’s third act and his most restrained: exposed carbon, active aero, and a manual gearbox on the options list.',
      },
      {
        src: '/marques/pagani-2.avif',
        alt: 'A Pagani Huayra BC Roadster',
        title: 'Huayra BC Roadster',
        caption: 'Pagani Huayra BC Roadster.',
        note:
          'The track-focused Huayra with the roof off — active flaps at each corner and a carbon body with nothing added for comfort.',
      },
      {
        src: '/marques/pagani-3.avif',
        alt: 'A blue Pagani Utopia from the side',
        title: 'Utopia, in profile',
        caption: 'Pagani Utopia, side profile.',
        note:
          'From the side the cab-forward shape shows: the wheels sit outboard and the cabin is pushed up over the front axle.',
      },
    ],
    features: [
      {
        title: 'Carbo-titanium',
        body:
          'Pagani developed its own composite that weaves titanium thread into carbon fibre, then uses it for the monocoque. It is stronger and lighter than carbon alone, and it is made a few metres from where the cars are assembled.',
      },
      {
        title: 'A manual, in 2025',
        body:
          'The Utopia offers a seven-speed manual with an exposed metal gate alongside the automated gearbox. Pagani built it because owners asked, and refused to hide it under leather.',
      },
      {
        title: 'Quad centre exhaust',
        body:
          'Four titanium tailpipes sit in the centre of the rear, a signature carried from the Zonda through the Huayra. The whole system is made from titanium to save weight and change the note.',
      },
    ],
    models: [
      {
        name: 'Utopia',
        sub: 'V12 hypercar',
        power: '852 hp',
        sprint: '3.0 s',
        top: '217 mph',
        price: 'from $2.5 million',
        note: '6.0-litre twin-turbo AMG V12, 811 lb-ft, a 1,280 kg dry weight and 99 cars planned.',
      },
      {
        name: 'Zonda R',
        sub: 'Track-only V12',
        power: '750 hp',
        sprint: '2.7 s',
        top: '217 mph',
        price: 'track-only',
        note: 'A 6.0-litre AMG V12 in a 1,070 kg carbon chassis, with no road-car concessions at all.',
      },
    ],
    sprintLabel: '0–62 mph',
  },
  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    logo: '/logos/koenigsegg.webp',
    country: 'Sweden',
    city: 'Ängelholm',
    founded: '1994',
    tagline: 'Small factory, absurd numbers.',
    intro:
      'Koenigsegg builds around thirty cars a year in a former fighter-jet hangar in southern Sweden, and its numbers read like a misprint: 1,600 hp from a 5.0-litre twin-turbo V8, a nine-speed gearbox with no synchromesh, and doors that rotate forward around the front wheel.',
    signature: [
      ['Founded', '1994'],
      ['Built in', 'Ängelholm, Sweden'],
      ['Known for', 'Freevalve engines'],
    ],
    images: [
      {
        src: '/marques/koenigsegg-1.avif',
        alt: 'A white Koenigsegg with orange interior trim',
        title: 'Jesko',
        caption: 'Koenigsegg Jesko.',
        note:
          'Ängelholm’s answer to the hypercar question, built around a nine-speed gearbox with seven clutches and a carbon tub.',
      },
      {
        src: '/marques/koenigsegg-2.avif',
        alt: 'A white Koenigsegg Jesko with its doors raised',
        title: 'Jesko, doors raised',
        caption: 'Koenigsegg Jesko, doors raised.',
        note:
          'The dihedral doors swing up and out with a slice of roof, which is the easiest way into a tub this shallow.',
      },
      {
        src: '/marques/koenigsegg-3.avif',
        alt: 'A white Koenigsegg Jesko from the front three-quarter',
        title: 'Jesko, three-quarter',
        caption: 'Koenigsegg Jesko, front three-quarter.',
        note:
          'White over orange: the scheme Koenigsegg uses for press cars, and the clearest view of the rear wing.',
      },
    ],
    features: [
      {
        title: 'Freevalve',
        body:
          'Koenigsegg\'s camless engine replaces camshafts with pneumatic-hydraulic actuators, so each valve is timed individually, cylinder by cylinder, and the engine can run on almost any fuel. It is the biggest change to the combustion engine in a century.',
      },
      {
        title: 'Light Speed Tourbillon',
        body:
          'A nine-speed multi-clutch transmission that can jump from any gear to any other without passing through the ones in between. There is no reverse gear at all — the electric motors handle that.',
      },
      {
        title: 'Dihedral doors',
        body:
          'The synchro-helix doors rotate forward and outward around the front wheel, and can be stopped at any point in their travel. They were designed so the car could be parked against a wall and still let you out.',
      },
    ],
    models: [
      {
        name: 'Jesko Absolut',
        sub: 'Top-speed prototype',
        power: '1,600 hp',
        sprint: '2.5 s',
        top: '330 mph',
        price: 'from $3.4 million',
        note: 'On E85, with a 0.278 drag coefficient and gearing calculated for a theoretical 330 mph.',
      },
      {
        name: 'Gemera',
        sub: 'Four-seat hybrid',
        power: '2,300 hp',
        sprint: '1.9 s',
        top: '249 mph',
        price: 'from $1.7 million',
        note: 'A 2.0-litre three-cylinder Freevalve engine plus three motors, and space for four adults.',
      },
    ],
    sprintLabel: '0–62 mph',
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    logo: '/logos/bugatti.webp',
    country: 'France',
    city: 'Molsheim',
    founded: '1909',
    tagline: 'Speed, as sculpture.',
    intro:
      'Bugatti\'s modern era is defined by one engine: the quad-turbo W16, eight litres, up to 1,578 hp in the Chiron Super Sport. The Tourbillon replaces it with a naturally aspirated V16 and three electric motors — 1,775 hp, and a cabin built like a watch.',
    signature: [
      ['Founded', '1909'],
      ['Built in', 'Molsheim, France'],
      ['Known for', 'The W16'],
    ],
    images: [
      {
        src: '/marques/bugatti-3.avif',
        alt: 'A pale blue Bugatti Tourbillon in profile',
        title: 'Tourbillon, in profile',
        caption: 'Tourbillon, in profile.',
        note:
          'The Molsheim line: horseshoe grille at the front, one continuous arc over the cabin, and a tail cut off flat.',
      },
      {
        src: '/marques/bugatti-2.avif',
        alt: 'A pale blue Bugatti Tourbillon at a show',
        title: 'Tourbillon',
        caption: 'Bugatti Tourbillon, 2024.',
        note:
          'The Chiron’s successor and the first Bugatti in decades without a W16 — a naturally aspirated V16 now sits behind the seats.',
      },
      {
        src: '/marques/bugatti-1.avif',
        alt: 'A dark blue Bugatti Chiron with blue accents',
        title: 'Chiron',
        caption: 'Bugatti Chiron, 2016.',
        note:
          'The car that broke 300 mph: a quad-turbo W16 behind the driver and a body shaped by air rather than fashion.',
      },
    ],
    features: [
      {
        title: 'The W16',
        body:
          'Sixteen cylinders in a W, four turbochargers, 1,578 hp in the Chiron Super Sport. Each engine is assembled by one technician at Molsheim and signed on the cover — and then run on a bench before it goes anywhere near a car.',
      },
      {
        title: 'Two keys for top speed',
        body:
          'The Chiron\'s maximum is locked behind a second key and a separate procedure: the car lowers, the wing retracts, the chassis checks itself, and only then will it run to 273 mph.',
      },
      {
        title: 'Watchmaker cabin',
        body:
          'The Tourbillon\'s instrument cluster is a machined titanium assembly built with Swiss watchmakers — 600 parts, no screen, and a centre console that rotates to reveal the engine-start button.',
      },
    ],
    models: [
      {
        name: 'Chiron Super Sport',
        sub: 'W16 hypercar',
        power: '1,578 hp',
        sprint: '2.4 s',
        top: '273 mph',
        price: 'from $3.9 million',
        note: '8.0-litre quad-turbo W16, 1,180 lb-ft, and a longer tail than the standard Chiron for stability.',
      },
      {
        name: 'Tourbillon',
        sub: 'V16 hybrid',
        power: '1,775 hp',
        sprint: '2.0 s',
        top: '277 mph',
        price: 'from $4.1 million',
        note: '8.3-litre naturally aspirated V16 to 9,000 rpm, three motors and a 25 kWh battery. 250 cars.',
      },
    ],
    sprintLabel: '0–62 mph',
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    logo: '/logos/mclaren.webp',
    country: 'England',
    city: 'Woking',
    founded: '1963',
    tagline: 'Lightness, taken seriously.',
    intro:
      'McLaren\'s road cars came out of its racing team, and the engineering shows: a carbon-fibre tub in every model, suspension linked left to right to cancel roll, and a stubborn refusal to add weight. The 750S is the current benchmark for the breed.',
    signature: [
      ['Founded', '1963'],
      ['Built in', 'Woking, England'],
      ['Known for', 'The carbon tub'],
    ],
    images: [
      {
        src: '/marques/mclaren-1.avif',
        alt: 'An orange McLaren 750S from the front three-quarter',
        title: '750S',
        caption: 'McLaren 750S, 2023.',
        note:
          'Woking’s series-production flagship: carbon tub, twin-turbo V8, and a shape sanded down to the minimum.',
      },
      {
        src: '/marques/mclaren-2.avif',
        alt: 'A white McLaren 750S Spider from the rear',
        title: '750S Spider',
        caption: 'McLaren 750S Spider.',
        note:
          'The same car with the roof off. The rear deck changes and almost nothing else, which is the point of the Spider.',
      },
      {
        src: '/marques/mclaren-3.avif',
        alt: 'A blue McLaren 750S on grass',
        title: '750S, in blue',
        caption: 'McLaren 750S, in blue.',
        note:
          'Away from the show stand the 750S reads as compact — low, wide and smaller than the numbers suggest.',
      },
    ],
    features: [
      {
        title: 'Monocage',
        body:
          'A one-piece carbon-fibre safety cell that includes the roof structure and the windscreen surround. It is why a 750S weighs around 1,389 kg dry, and why the doors can be cut so far into the roof.',
      },
      {
        title: 'Hydraulic suspension',
        body:
          'McLaren links the dampers across the car hydraulically instead of fitting a stiff anti-roll bar, so roll is resisted without costing ride comfort. It is the single biggest reason a McLaren rides better than it has any right to.',
      },
      {
        title: 'Dihedral doors',
        body:
          'Doors that lift forward and up, a McLaren signature since the F1. They also remove the need for a sill to step over, which matters more than it sounds in a car this low.',
      },
    ],
    models: [
      {
        name: '750S',
        sub: 'V8 supercar',
        power: '740 hp',
        sprint: '2.7 s',
        top: '206 mph',
        price: 'from $331,000',
        note: '4.0-litre twin-turbo V8, 590 lb-ft, 1,389 kg dry, and a roof scoop that feeds the engine.',
      },
      {
        name: 'Artura Spider',
        sub: 'Hybrid convertible',
        power: '690 hp',
        sprint: '3.0 s',
        top: '205 mph',
        price: 'from $273,000',
        note: '3.0-litre twin-turbo V6 with an axial-flux motor and a 7.4 kWh battery; 21 miles of electric range.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'mercedes-amg',
    name: 'Mercedes-AMG',
    logo: '/logos/mercedes-amg.webp',
    country: 'Germany',
    city: 'Affalterbach',
    founded: '1967',
    tagline: 'One man, one engine.',
    intro:
      'AMG began as an independent tuner and became Mercedes\' performance arm. The GT is its own car rather than a modified saloon, and its 4.0-litre twin-turbo V8 is still assembled by a single engineer in Affalterbach, whose name goes on a plaque.',
    signature: [
      ['Founded', '1967'],
      ['Built in', 'Affalterbach, Germany'],
      ['Known for', 'Hand-built V8s'],
    ],
    images: [
      {
        src: '/marques/amg-1.avif',
        alt: 'A grey Mercedes-AMG GT 63 from the front',
        title: 'GT 63 Pro',
        caption: 'Mercedes-AMG GT 63 Pro, 2024.',
        note:
          'Affalterbach’s grand tourer with the track package: long bonnet, set-back cabin, and a V8 under all of it.',
      },
      {
        src: '/marques/amg-2.avif',
        alt: 'A white Mercedes-AMG GT 63 S',
        title: 'GT 63 S',
        caption: 'Mercedes-AMG GT 63 S.',
        note:
          'A second reading of the same idea in white. The GT is a two-door coupe in a range that is otherwise SUVs and saloons.',
      },
      {
        src: '/marques/mercedes-amg-3.avif',
        alt: 'A blue Mercedes-AMG GT from the front three-quarter',
        title: 'GT, three-quarter',
        caption: 'Mercedes-AMG GT, front three-quarter.',
        note:
          'Blue over black. The grille is the widest AMG makes, and the rear wing is optional — which tells you who buys it.',
      },
    ],
    features: [
      {
        title: 'One man, one engine',
        body:
          'Every AMG V8 is hand-assembled by one technician, who signs a metal plaque fixed to the engine cover. It is a marketing line that happens to be literally true, and it is why no two sound quite identical.',
      },
      {
        title: 'Active roll stabilisation',
        body:
          'Electromechanical anti-roll bars that stiffen or relax in milliseconds, reading the road and the driver\'s inputs. The body stays flat in a corner and the car still rides properly over a broken surface.',
      },
      {
        title: 'AMG Track Pace',
        body:
          'The car logs lap and sector times, records telemetry, and can replay a ghost lap of your own best effort on the screen while you drive. It is a track-day tool built into the infotainment.',
      },
    ],
    models: [
      {
        name: 'GT 63 4MATIC+',
        sub: 'V8 grand tourer',
        power: '577 hp',
        sprint: '3.1 s',
        top: '196 mph',
        price: 'from $177,000',
        note: '4.0-litre twin-turbo V8, 590 lb-ft, all-wheel drive and rear-wheel steering as standard.',
      },
      {
        name: 'GT 63 S E Performance',
        sub: 'Hybrid flagship',
        power: '831 hp',
        sprint: '2.9 s',
        top: '200 mph',
        price: 'from $197,000',
        note: 'The V8 plus an electric motor on the rear axle, 1,033 lb-ft, and a 6.1 kWh battery for short electric running.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'ford',
    name: 'Ford',
    logo: '/logos/ford.webp',
    country: 'United States',
    city: 'Dearborn',
    founded: '1903',
    tagline: 'The car for everyone, and a pony car.',
    intro:
      'Ford did not invent the car, but it invented the idea that one could be ordinary. The Model T put America on wheels; the Mustang, in 1964, gave the same company a coupe for people who wanted more than transport. Both arguments are still running — one in a Bronco, one in a V8.',
    signature: [
      ['Founded', '1903'],
      ['Based in', 'Dearborn, Michigan'],
      ['Known for', 'The pony car'],
    ],
    images: [
      {
        src: '/marques/ford-1.avif',
        alt: 'A black Ford Mustang GT from the rear three-quarter at night',
        title: 'Mustang GT',
        caption: 'Ford Mustang GT, S650 generation.',
        note:
          'The S650 generation: the last pony car standing, still V8, still rear-drive, still priced like a coupe rather than a legend.',
      },
      {
        src: '/marques/ford-2.avif',
        alt: 'A red Ford Mustang Mach-E from the front three-quarter',
        title: 'Mustang Mach-E',
        caption: 'Ford Mustang Mach-E.',
        note:
          'The electric one that borrowed the name and the badge, then went and earned the sales on its own.',
      },
      {
        src: '/marques/ford-3.avif',
        alt: 'A grey two-door Ford Bronco from the front',
        title: 'Bronco',
        caption: 'Ford Bronco, two-door.',
        note:
          'The two-door on big tyres: a removable roof, doors that come off, and serious 4x4 hardware underneath.',
      },
    ],
    features: [
      {
        title: 'The pony car',
        body:
          'Long bonnet, short rear deck, rear-wheel drive, and a list of options long enough to make the base price a work of fiction. Ford sold a million Mustangs within two years of the 1964 launch, and the current car is still built to the same brief.',
      },
      {
        title: 'A V8 for the middle class',
        body:
          'The 5.0-litre Coyote in the Mustang GT makes 486 hp with no turbochargers and no hybrid help, in a car that starts under $47,000. Nothing else on sale offers that much naturally aspirated V8 for the money — and Ford knows it.',
      },
      {
        title: 'The electric Mustang',
        body:
          'The Mach-E borrowed the badge and took the criticism. It has since become the best-selling electric Ford: two motors, a 91 kWh battery, and a Rally version with raised suspension that will happily leave a tarmac road.',
      },
    ],
    models: [
      {
        name: 'Mustang GT',
        sub: 'V8 coupe',
        power: '486 hp',
        sprint: '4.2 s',
        top: '166 mph',
        price: 'from $46,480',
        note: '5.0-litre Coyote V8, 415 lb-ft, a six-speed manual as standard and a limited-slip axle.',
      },
      {
        name: 'Mustang Mach-E',
        sub: 'Electric crossover',
        power: '365 hp',
        sprint: '4.8 s',
        top: '112 mph',
        price: 'from $41,990',
        note: 'Dual motors and a 91 kWh extended-range battery; 290 miles, and a cabin that seats five.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    logo: '/logos/chevrolet.webp',
    country: 'United States',
    city: 'Detroit',
    founded: '1911',
    tagline: 'The small block, still swinging.',
    intro:
      'Chevrolet built its name on cars that cost less than they looked and went faster than they should. The small-block V8 of 1955 made speed affordable, and the Corvette has carried that idea further than anyone expected: in 2020 it moved its engine behind the driver and became a mid-engined supercar for the price of a German saloon.',
    signature: [
      ['Founded', '1911'],
      ['Based in', 'Detroit, Michigan'],
      ['Known for', 'The small-block V8'],
    ],
    images: [
      {
        src: '/marques/chevrolet-1.avif',
        alt: 'A black Chevrolet Corvette Stingray with white stripes',
        title: 'Corvette Stingray',
        caption: 'Chevrolet Corvette Stingray, C8.',
        note:
          'The C8 moved the engine behind the driver after 67 years of doing it the other way, and the proportions changed overnight.',
      },
      {
        src: '/marques/chevrolet-2.avif',
        alt: 'A blue Chevrolet Corvette Z06 from the front three-quarter',
        title: 'Corvette Z06',
        caption: 'Chevrolet Corvette Z06.',
        note:
          'The flat-plane V8 version: 5.5 litres, a redline past 8,000 rpm, and a soundtrack closer to a race car than a muscle car.',
      },
      {
        src: '/marques/chevrolet-3.avif',
        alt: 'A red Chevrolet Blazer EV from the front three-quarter',
        title: 'Blazer EV SS',
        caption: 'Chevrolet Blazer EV SS.',
        note:
          'Red, and electric: Chevrolet’s performance SUV wearing the SS badge that used to mean a small-block V8.',
      },
    ],
    features: [
      {
        title: 'The small block',
        body:
          'The 1955 Chevrolet V8 was cheap to build, light, and easy to tune — which is why it became the engine every hot rod in America was built around. Seventy years later Chevrolet still sells crate versions of the same architecture.',
      },
      {
        title: 'Mid-engined at last',
        body:
          'After 67 years of front-engined Corvettes, the C8 put the V8 behind the seats. The handling changed completely, the price did not: it still undercuts every other mid-engined car on sale by a wide margin.',
      },
      {
        title: 'A flat-plane V8',
        body:
          'The Z06 uses the LT6, a 5.5-litre V8 with a flat-plane crank that revs to 8,600 rpm and makes 670 hp without a turbocharger. It is the highest-revving production V8 America has built, and it sounds like a race engine because it is one.',
      },
    ],
    models: [
      {
        name: 'Corvette Stingray',
        sub: 'Mid-engined V8 coupe',
        power: '490 hp',
        sprint: '2.9 s',
        top: '194 mph',
        price: 'from $68,300',
        note: '6.2-litre LT2 V8, 465 lb-ft, an eight-speed dual-clutch and a removable roof panel.',
      },
      {
        name: 'Corvette Z06',
        sub: 'Flat-plane V8 coupe',
        power: '670 hp',
        sprint: '2.6 s',
        top: '195 mph',
        price: 'from $112,700',
        note: '5.5-litre LT6 to 8,600 rpm, 460 lb-ft, and carbon-fibre wheels on the option list.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
  {
    id: 'maserati',
    name: 'Maserati',
    logo: '/logos/maserati.webp',
    country: 'Italy',
    city: 'Modena',
    founded: '1914',
    tagline: 'The trident, and a race engine.',
    intro:
      'The Maserati brothers built racing cars before they built road cars, and the badge they chose in 1926 is the trident from Bologna’s Neptune fountain. The company has changed hands more often than any other marque here, but it still builds its own engines — including the Nettuno, a V6 with combustion technology borrowed from Formula 1.',
    signature: [
      ['Founded', '1914'],
      ['Built in', 'Modena, Italy'],
      ['Known for', 'The trident'],
    ],
    images: [
      {
        src: '/marques/maserati-1.avif',
        alt: 'A white Maserati GranTurismo Trofeo from the front three-quarter',
        title: 'GranTurismo Trofeo',
        caption: 'Maserati GranTurismo Trofeo.',
        note:
          'The name came back in 2023 with a Nettuno-derived V6 and a body that keeps the long-bonnet proportions of the original.',
      },
      {
        src: '/marques/maserati-2.avif',
        alt: 'A white Maserati MC20 with its butterfly doors open',
        title: 'MC20',
        caption: 'Maserati MC20, butterfly doors open.',
        note:
          'Butterfly doors open on a carbon tub. The MC20 is Maserati building its own supercar again rather than borrowing one.',
      },
      {
        src: '/marques/maserati-3.avif',
        alt: 'A grey Maserati Grecale from the front three-quarter',
        title: 'Grecale',
        caption: 'Maserati Grecale.',
        note:
          'The volume model: a smaller, cheaper Maserati, and now the one that keeps the lights on in Modena.',
      },
    ],
    features: [
      {
        title: 'The trident',
        body:
          'Mario Maserati drew the badge from the fountain of Neptune in Bologna, and a Maserati Tipo 26 wore it at the 1926 Targa Florio. It has survived six owners, a move to Modena and a decade under Ferrari, and it still means a car built with a racing engine in mind.',
      },
      {
        title: 'Nettuno',
        body:
          'The MC20’s 3.0-litre V6 uses a pre-chamber combustion system developed from Formula 1: a small auxiliary chamber ignites the main charge, which lets the engine run leaner and rev harder. Maserati builds it in Modena, in the same plant as the car.',
      },
      {
        title: 'The grand tourer',
        body:
          'The GranTurismo has been the marque’s long-distance car since 2007. The Folgore version replaces the V8 with three motors and a battery under the floor, keeping the long bonnet and the four seats — and hitting 60 mph in 2.7 seconds.',
      },
    ],
    models: [
      {
        name: 'MC20',
        sub: 'V6 supercar',
        power: '621 hp',
        sprint: '2.9 s',
        top: '202 mph',
        price: 'from $242,000',
        note: 'Nettuno 3.0-litre V6 with pre-chamber ignition, 538 lb-ft, and a carbon monocoque under 1,500 kg.',
      },
      {
        name: 'GranTurismo Folgore',
        sub: 'Electric grand tourer',
        power: '751 hp',
        sprint: '2.7 s',
        top: '199 mph',
        price: 'from $192,000',
        note: 'Three motors, a 92.5 kWh battery and 242 miles of range in a four-seat body.',
      },
    ],
    sprintLabel: '0–60 mph',
  },
];

export const marqueById = (id) => MARQUES.find((marque) => marque.id === id) || null;
