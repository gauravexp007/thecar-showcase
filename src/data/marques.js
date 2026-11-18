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
        src: '/marques/rolls-1.webp',
        alt: 'A pale blue Rolls-Royce Spectre in a studio',
        caption: 'Rolls-Royce Spectre, 2023.',
      },
      {
        src: '/marques/rolls-2.webp',
        alt: 'Coach door and leather trim of a Rolls-Royce',
        caption: 'Coach door, hand-finished hide.',
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
        src: '/marques/bentley-1.webp',
        alt: 'A dark blue Bentley Continental GT parked',
        caption: 'Bentley Continental GT, fourth generation.',
      },
      {
        src: '/marques/bentley-2.webp',
        alt: 'A pale blue Bentley Bentayga from the front three-quarter',
        caption: 'Bentley Bentayga EWB.',
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
        src: '/marques/aston-1.webp',
        alt: 'A grey Aston Martin DB12 from the front three-quarter',
        caption: 'Aston Martin DB12, 2023.',
      },
      {
        src: '/marques/aston-2.webp',
        alt: 'A grey Aston Martin Vanquish on a forecourt',
        caption: 'Aston Martin Vanquish, 2024.',
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
        src: '/cars/porsche-911.webp',
        alt: 'A silver Porsche 911 Carrera',
        caption: 'Porsche 911 Carrera, 992 generation.',
      },
      {
        src: '/cars/porsche-taycan.webp',
        alt: 'A pale Porsche Taycan in a studio',
        caption: 'Porsche Taycan.',
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
        src: '/cars/bmw-5.webp',
        alt: 'A BMW 5 Series in profile',
        caption: 'BMW 5 Series, eighth generation.',
      },
      {
        src: '/cars/bmw-ix.webp',
        alt: 'A BMW iX electric SUV',
        caption: 'BMW iX.',
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
        src: '/marques/ferrari-1.webp',
        alt: 'A white Ferrari 12Cilindri from the front',
        caption: 'Ferrari 12Cilindri, 2024.',
      },
      {
        src: '/marques/ferrari-2.webp',
        alt: 'A grey Ferrari Purosangue from the rear three-quarter',
        caption: 'Ferrari Purosangue.',
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
        src: '/marques/lambo-1.webp',
        alt: 'A white Lamborghini Revuelto from the front',
        caption: 'Lamborghini Revuelto, 2023.',
      },
      {
        src: '/marques/lambo-2.webp',
        alt: 'A green Lamborghini Urus SE',
        caption: 'Lamborghini Urus SE.',
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
        src: '/marques/pagani-1.webp',
        alt: 'A blue Pagani Utopia at a motor show',
        caption: 'Pagani Utopia, 2022.',
      },
      {
        src: '/marques/pagani-2.webp',
        alt: 'A Pagani Huayra BC Roadster',
        caption: 'Pagani Huayra BC Roadster.',
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
        src: '/marques/koenigsegg-1.webp',
        alt: 'A white Koenigsegg with orange interior trim',
        caption: 'Koenigsegg Jesko.',
      },
      {
        src: '/marques/koenigsegg-2.webp',
        alt: 'The cabin and door of a green Koenigsegg Gemera',
        caption: 'Gemera door and cabin.',
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
        src: '/marques/bugatti-1.webp',
        alt: 'A dark blue Bugatti Chiron with blue accents',
        caption: 'Bugatti Chiron, 2016.',
      },
      {
        src: '/marques/bugatti-2.webp',
        alt: 'A pale blue Bugatti Tourbillon at a show',
        caption: 'Bugatti Tourbillon, 2024.',
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
        src: '/marques/mclaren-1.webp',
        alt: 'An orange McLaren 750S from the front three-quarter',
        caption: 'McLaren 750S, 2023.',
      },
      {
        src: '/marques/mclaren-2.webp',
        alt: 'A white McLaren 750S Spider from the rear',
        caption: 'McLaren 750S Spider.',
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
        src: '/marques/amg-1.webp',
        alt: 'A grey Mercedes-AMG GT 63 from the front',
        caption: 'Mercedes-AMG GT 63 Pro, 2024.',
      },
      {
        src: '/marques/amg-2.webp',
        alt: 'A white Mercedes-AMG GT 63 S',
        caption: 'Mercedes-AMG GT 63 S.',
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
];

export const marqueById = (id) => MARQUES.find((marque) => marque.id === id) || null;
