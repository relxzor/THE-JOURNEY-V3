// ==================== career.js (ULTIMATE FINAL EDITION - 20 TEAMS & 38 MD) ====================
(function() {
    'use strict';

    // --- 1. LOAD PLAYER DATA ---
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player || !player.name) {
        window.location.href = 'index.html';
        return;
    }

    // --- 2. MEGA DATABASE: TOP 4 LEAGUES (FULL 20 TEAMS) ---
    const worldLeagues = {
        "Premier League": {
            'Arsenal': [{name:"Raya",pos:"GK"},{name:"White",pos:"RB"},{name:"Saliba",pos:"CB"},{name:"Gabriel",pos:"CB"},{name:"Calafiori",pos:"LB"},{name:"Partey",pos:"CDM"},{name:"Rice",pos:"CM"},{name:"Ødegaard",pos:"CAM"},{name:"Saka",pos:"RW"},{name:"Havertz",pos:"ST"},{name:"Martinelli",pos:"LW"}],
            'Aston Villa': [{name:"Martínez",pos:"GK"},{name:"Cash",pos:"RB"},{name:"Konsa",pos:"CB"},{name:"Torres",pos:"CB"},{name:"Digne",pos:"LB"},{name:"Kamara",pos:"CDM"},{name:"Tielemans",pos:"CM"},{name:"McGinn",pos:"CAM"},{name:"Bailey",pos:"RW"},{name:"Watkins",pos:"ST"},{name:"Ramsey",pos:"LW"}],
            'Bournemouth': [{name:"Travers",pos:"GK"},{name:"Smith",pos:"RB"},{name:"Zabarnyi",pos:"CB"},{name:"Senesi",pos:"CB"},{name:"Kerkez",pos:"LB"},{name:"Cook",pos:"CDM"},{name:"Christie",pos:"CM"},{name:"Evanilson",pos:"CAM"},{name:"Semenyo",pos:"RW"},{name:"Solanke",pos:"ST"},{name:"Tavarnier",pos:"LW"}],
            'Brentford': [{name:"Flekken",pos:"GK"},{name:"Hickey",pos:"RB"},{name:"Collins",pos:"CB"},{name:"Pinnock",pos:"CB"},{name:"Henry",pos:"LB"},{name:"Nørgaard",pos:"CDM"},{name:"Jensen",pos:"CM"},{name:"Damsgaard",pos:"CAM"},{name:"Mbeumo",pos:"RW"},{name:"Wissa",pos:"ST"},{name:"Schade",pos:"LW"}],
            'Brighton': [{name:"Verbruggen",pos:"GK"},{name:"Veltman",pos:"RB"},{name:"Dunk",pos:"CB"},{name:"Van Hecke",pos:"CB"},{name:"Estupiñán",pos:"LB"},{name:"Milner",pos:"CDM"},{name:"Groß",pos:"CM"},{name:"Ferguson",pos:"CAM"},{name:"Mitoma",pos:"RW"},{name:"Welbeck",pos:"ST"},{name:"Adingra",pos:"LW"}],
            'Chelsea': [{name:"Sánchez",pos:"GK"},{name:"James",pos:"RB"},{name:"Fofana",pos:"CB"},{name:"Colwill",pos:"CB"},{name:"Cucurella",pos:"LB"},{name:"Caicedo",pos:"CDM"},{name:"Enzo",pos:"CM"},{name:"Palmer",pos:"CAM"},{name:"Madueke",pos:"RW"},{name:"Jackson",pos:"ST"},{name:"Neto",pos:"LW"}],
            'Crystal Palace': [{name:"Henderson",pos:"GK"},{name:"Munoz",pos:"RB"},{name:"Guehi",pos:"CB"},{name:"Lacroix",pos:"CB"},{name:"Mitchell",pos:"LB"},{name:"Wharton",pos:"CDM"},{name:"Hughes",pos:"CM"},{name:"Eze",pos:"CAM"},{name:"Sarr",pos:"RW"},{name:"Mateta",pos:"ST"},{name:"Nketiah",pos:"LW"}],
            'Everton': [{name:"Pickford",pos:"GK"},{name:"Young",pos:"RB"},{name:"Tarkowski",pos:"CB"},{name:"Branthwaite",pos:"CB"},{name:"Mykolenko",pos:"LB"},{name:"Gueye",pos:"CDM"},{name:"Doucouré",pos:"CM"},{name:"McNeil",pos:"CAM"},{name:"Harrison",pos:"RW"},{name:"Calvert-Lewin",pos:"ST"},{name:"Ndiaye",pos:"LW"}],
            'Fulham': [{name:"Leno",pos:"GK"},{name:"Castagne",pos:"RB"},{name:"Bassey",pos:"CB"},{name:"Diop",pos:"CB"},{name:"Robinson",pos:"LB"},{name:"Palhinha",pos:"CDM"},{name:"Reed",pos:"CM"},{name:"Pereira",pos:"CAM"},{name:"Iwobi",pos:"RW"},{name:"Jimenez",pos:"ST"},{name:"Wilson",pos:"LW"}],
            'Liverpool': [{name:"Alisson",pos:"GK"},{name:"Alexander-Arnold",pos:"RB"},{name:"Van Dijk",pos:"CB"},{name:"Konaté",pos:"CB"},{name:"Robertson",pos:"LB"},{name:"Mac Allister",pos:"CDM"},{name:"Szoboszlai",pos:"CM"},{name:"Jones",pos:"CAM"},{name:"Salah",pos:"RW"},{name:"Jota",pos:"ST"},{name:"Díaz",pos:"LW"}],
            'Manchester City': [{name:"Ederson",pos:"GK"},{name:"Walker",pos:"RB"},{name:"Dias",pos:"CB"},{name:"Akanji",pos:"CB"},{name:"Gvardiol",pos:"LB"},{name:"Rodri",pos:"CDM"},{name:"De Bruyne",pos:"CM"},{name:"Foden",pos:"CAM"},{name:"Savinho",pos:"RW"},{name:"Haaland",pos:"ST"},{name:"Doku",pos:"LW"}],
            'Manchester United': [{name:"Onana",pos:"GK"},{name:"Dalot",pos:"RB"},{name:"De Ligt",pos:"CB"},{name:"Martínez",pos:"CB"},{name:"Shaw",pos:"LB"},{name:"Casemiro",pos:"CDM"},{name:"Mainoo",pos:"CM"},{name:"B. Fernandes",pos:"CAM"},{name:"Garnacho",pos:"RW"},{name:"Højlund",pos:"ST"},{name:"Rashford",pos:"LW"}],
            'Newcastle': [{name:"Pope",pos:"GK"},{name:"Trippier",pos:"RB"},{name:"Botman",pos:"CB"},{name:"Schar",pos:"CB"},{name:"Hall",pos:"LB"},{name:"Guimarães",pos:"CDM"},{name:"Tonali",pos:"CM"},{name:"Joelinton",pos:"CAM"},{name:"Gordon",pos:"RW"},{name:"Isak",pos:"ST"},{name:"Barnes",pos:"LW"}],
            'Nottm Forest': [{name:"Sels",pos:"GK"},{name:"Aina",pos:"RB"},{name:"Milenkovic",pos:"CB"},{name:"Murillo",pos:"CB"},{name:"Moreno",pos:"LB"},{name:"Yates",pos:"CDM"},{name:"Dominguez",pos:"CM"},{name:"Gibbs-White",pos:"CAM"},{name:"Hudson-Odoi",pos:"RW"},{name:"Wood",pos:"ST"},{name:"Elanga",pos:"LW"}],
            'Southampton': [{name:"Ramsdale",pos:"GK"},{name:"Sugawara",pos:"RB"},{name:"Harwood-Bellis",pos:"CB"},{name:"Bednarek",pos:"CB"},{name:"Walker-Peters",pos:"LB"},{name:"Downes",pos:"CDM"},{name:"Fernandes",pos:"CM"},{name:"Dibling",pos:"CAM"},{name:"Sulemana",pos:"RW"},{name:"Archer",pos:"ST"},{name:"Armstrong",pos:"LW"}],
            'Tottenham': [{name:"Vicario",pos:"GK"},{name:"Porro",pos:"RB"},{name:"Romero",pos:"CB"},{name:"Van de Ven",pos:"CB"},{name:"Udogie",pos:"LB"},{name:"Bissouma",pos:"CDM"},{name:"Kulusevski",pos:"CM"},{name:"Maddison",pos:"CAM"},{name:"Johnson",pos:"RW"},{name:"Solanke",pos:"ST"},{name:"Son",pos:"LW"}],
            'West Ham': [{name:"Areola",pos:"GK"},{name:"Coufal",pos:"RB"},{name:"Zouma",pos:"CB"},{name:"Mavropanos",pos:"CB"},{name:"Emerson",pos:"LB"},{name:"Souček",pos:"CDM"},{name:"Ward-Prowse",pos:"CM"},{name:"Paquetá",pos:"CAM"},{name:"Bowen",pos:"RW"},{name:"Antonio",pos:"ST"},{name:"Kudus",pos:"LW"}],
            'Wolves': [{name:"Sa",pos:"GK"},{name:"Semedo",pos:"RB"},{name:"Toti",pos:"CB"},{name:"Dawson",pos:"CB"},{name:"Ait-Nouri",pos:"LB"},{name:"Gomes",pos:"CDM"},{name:"Sarabia",pos:"CM"},{name:"Cunha",pos:"CAM"},{name:"Doyle",pos:"RW"},{name:"Larsen",pos:"ST"},{name:"Bellegarde",pos:"LW"}],
            'Leicester': [{name:"Hermansen",pos:"GK"},{name:"Pereira",pos:"RB"},{name:"Faes",pos:"CB"},{name:"Vestergaard",pos:"CB"},{name:"Kristiansen",pos:"LB"},{name:"Winks",pos:"CDM"},{name:"Ndidi",pos:"CM"},{name:"Mavididi",pos:"CAM"},{name:"Fatawu",pos:"RW"},{name:"Vardy",pos:"ST"},{name:"Buonanotte",pos:"LW"}],
            'Ipswich': [{name:"Muric",pos:"GK"},{name:"Tuanzebe",pos:"RB"},{name:"O'Shea",pos:"CB"},{name:"Greaves",pos:"CB"},{name:"Davis",pos:"LB"},{name:"Morsy",pos:"CDM"},{name:"Cajuste",pos:"CM"},{name:"Hutchinson",pos:"CAM"},{name:"Chaplin",pos:"RW"},{name:"Delap",pos:"ST"},{name:"Broadhead",pos:"LW"}]
        },
        "La Liga": {
            'Real Madrid': [{name:"Courtois",pos:"GK"},{name:"Carvajal",pos:"RB"},{name:"Rüdiger",pos:"CB"},{name:"Militão",pos:"CB"},{name:"Mendy",pos:"LB"},{name:"Tchouaméni",pos:"CDM"},{name:"Valverde",pos:"CM"},{name:"Bellingham",pos:"CAM"},{name:"Rodrygo",pos:"RW"},{name:"Mbappé",pos:"ST"},{name:"Vinícius Jr",pos:"LW"}],
            'Barcelona': [{name:"Ter Stegen",pos:"GK"},{name:"Koundé",pos:"RB"},{name:"Araújo",pos:"CB"},{name:"Cubarsí",pos:"CB"},{name:"Balde",pos:"LB"},{name:"De Jong",pos:"CDM"},{name:"Pedri",pos:"CM"},{name:"Olmo",pos:"CAM"},{name:"Yamal",pos:"RW"},{name:"Lewandowski",pos:"ST"},{name:"Raphinha",pos:"LW"}],
            'Atletico Madrid': [{name:"Oblak",pos:"GK"},{name:"Molina",pos:"RB"},{name:"Giménez",pos:"CB"},{name:"Le Normand",pos:"CB"},{name:"Lino",pos:"LB"},{name:"Koke",pos:"CDM"},{name:"De Paul",pos:"CM"},{name:"Griezmann",pos:"CAM"},{name:"Correa",pos:"RW"},{name:"Álvarez",pos:"ST"},{name:"Sørloth",pos:"LW"}],
            'Athletic Bilbao': [{name:"Simón",pos:"GK"},{name:"De Marcos",pos:"RB"},{name:"Vivian",pos:"CB"},{name:"Paredes",pos:"CB"},{name:"Lekue",pos:"LB"},{name:"Vesga",pos:"CDM"},{name:"Sancet",pos:"CM"},{name:"Muniain",pos:"CAM"},{name:"Berenguer",pos:"RW"},{name:"I. Williams",pos:"ST"},{name:"N. Williams",pos:"LW"}],
            'Betis': [{name:"Silva",pos:"GK"},{name:"Bellerín",pos:"RB"},{name:"Bartra",pos:"CB"},{name:"Llorente",pos:"CB"},{name:"Perraud",pos:"LB"},{name:"Cardoso",pos:"CDM"},{name:"Altimira",pos:"CM"},{name:"Fekir",pos:"CAM"},{name:"Diao",pos:"RW"},{name:"Roque",pos:"ST"},{name:"Juanmi",pos:"LW"}],
            'Celta Vigo': [{name:"Villar",pos:"GK"},{name:"Mingueza",pos:"RB"},{name:"Starfelt",pos:"CB"},{name:"Núñez",pos:"CB"},{name:"Manquillo",pos:"LB"},{name:"Beltrán",pos:"CDM"},{name:"Damián",pos:"CM"},{name:"Iago Aspas",pos:"CAM"},{name:"Swedberg",pos:"RW"},{name:"Borja Iglesias",pos:"ST"},{name:"Bamba",pos:"LW"}],
            'Girona': [{name:"Gazzaniga",pos:"GK"},{name:"Martínez",pos:"RB"},{name:"Blind",pos:"CB"},{name:"Juanpe",pos:"CB"},{name:"Gutiérrez",pos:"LB"},{name:"Romero",pos:"CDM"},{name:"N. Pérez",pos:"CM"},{name:"García",pos:"CAM"},{name:"Tsygankov",pos:"RW"},{name:"Stuani",pos:"ST"},{name:"Portu",pos:"LW"}],
            'Las Palmas': [{name:"Cillessen",pos:"GK"},{name:"Mármol",pos:"RB"},{name:"McKenna",pos:"CB"},{name:"Herrero",pos:"CB"},{name:"Álvarez",pos:"LB"},{name:"Campbell",pos:"CDM"},{name:"Kirian",pos:"CM"},{name:"Moleiro",pos:"CAM"},{name:"Sandoval",pos:"RW"},{name:"Fábio Silva",pos:"ST"},{name:"Muñoz",pos:"LW"}],
            'Osasuna': [{name:"Herrera",pos:"GK"},{name:"Areso",pos:"RB"},{name:"Catena",pos:"CB"},{name:"Boyomo",pos:"CB"},{name:"Cruz",pos:"LB"},{name:"Moncayola",pos:"CDM"},{name:"Torró",pos:"CM"},{name:"Oroz",pos:"CAM"},{name:"R. García",pos:"RW"},{name:"Budimir",pos:"ST"},{name:"Zaragoza",pos:"LW"}],
            'Rayo Vallecano': [{name:"Cárdenas",pos:"GK"},{name:"Balliu",pos:"RB"},{name:"Lejeune",pos:"CB"},{name:"Mumin",pos:"CB"},{name:"Pacha",pos:"LB"},{name:"López",pos:"CDM"},{name:"Trejo",pos:"CM"},{name:"Palazón",pos:"CAM"},{name:"De Frutos",pos:"RW"},{name:"Camilo",pos:"ST"},{name:"García",pos:"LW"}],
            'Real Sociedad': [{name:"Remiro",pos:"GK"},{name:"Traoré",pos:"RB"},{name:"Zubeldia",pos:"CB"},{name:"Le Normand",pos:"CB"},{name:"Muñoz",pos:"LB"},{name:"Zubimendi",pos:"CDM"},{name:"Méndez",pos:"CM"},{name:"Zorro",pos:"CAM"},{name:"Barrenetxea",pos:"RW"},{name:"Oyarzabal",pos:"ST"},{name:"Cho",pos:"LW"}],
            'Sevilla': [{name:"Nyland",pos:"GK"},{name:"Navas",pos:"RB"},{name:"Bade",pos:"CB"},{name:"Ramos",pos:"CB"},{name:"Acuña",pos:"LB"},{name:"Sow",pos:"CDM"},{name:"Toro",pos:"CM"},{name:"Ocampos",pos:"CAM"},{name:"Lukebakio",pos:"RW"},{name:"En-Nesyri",pos:"ST"},{name:"Ejuke",pos:"LW"}],
            'Valencia': [{name:"Mamardashvili",pos:"GK"},{name:"Foulquier",pos:"RB"},{name:"Moskera",pos:"CB"},{name:"Tárrega",pos:"CB"},{name:"Gayà",pos:"LB"},{name:"Barrenechea",pos:"CDM"},{name:"Pepelu",pos:"CM"},{name:"Guerra",pos:"CAM"},{name:"López",pos:"RW"},{name:"Duro",pos:"ST"},{name:"Mir",pos:"LW"}],
            'Villarreal': [{name:"Jørgensen",pos:"GK"},{name:"Femenía",pos:"RB"},{name:"Albiol",pos:"CB"},{name:"Mandi",pos:"CB"},{name:"Moreno",pos:"LB"},{name:"Parejo",pos:"CDM"},{name:"Coquelin",pos:"CM"},{name:"Baena",pos:"CAM"},{name:"Pino",pos:"RW"},{name:"Morales",pos:"ST"},{name:"Sorloth",pos:"LW"}],
            'Alavés': [{name:"Sivera",pos:"GK"},{name:"Tenaglia",pos:"RB"},{name:"Abqar",pos:"CB"},{name:"Mouriño",pos:"CB"},{name:"López",pos:"LB"},{name:"Guevara",pos:"CDM"},{name:"Blanco",pos:"CM"},{name:"Guridi",pos:"CAM"},{name:"Vicente",pos:"RW"},{name:"Martínez",pos:"ST"},{name:"Rebbach",pos:"LW"}],
            'Espanyol': [{name:"García",pos:"GK"},{name:"Pereira",pos:"RB"},{name:"Gómez",pos:"CB"},{name:"Cabrera",pos:"CB"},{name:"Olmo",pos:"LB"},{name:"Darder",pos:"CDM"},{name:"Roca",pos:"CM"},{name:"Puado",pos:"CAM"},{name:"Jofre",pos:"RW"},{name:"Tejero",pos:"ST"},{name:"Cardona",pos:"LW"}],
            'Getafe': [{name:"Soria",pos:"GK"},{name:"Iglesias",pos:"RB"},{name:"Duarte",pos:"CB"},{name:"Alderete",pos:"CB"},{name:"García",pos:"LB"},{name:"Milla",pos:"CDM"},{name:"Maksimovic",pos:"CM"},{name:"Ramos",pos:"CAM"},{name:"Pérez",pos:"RW"},{name:"Mayoral",pos:"ST"},{name:"Oscar",pos:"LW"}],
            'Mallorca': [{name:"Greif",pos:"GK"},{name:"Maffeo",pos:"RB"},{name:"Copete",pos:"CB"},{name:"Raíllo",pos:"CB"},{name:"Lato",pos:"LB"},{name:"Mascarell",pos:"CDM"},{name:"Morlanes",pos:"CM"},{name:"Sánchez",pos:"CAM"},{name:"A. Sánchez",pos:"RW"},{name:"Murillo",pos:"ST"},{name:"Darder",pos:"LW"}],
            'Leganés': [{name:"Soriano",pos:"GK"},{name:"Sáenz",pos:"RB"},{name:"González",pos:"CB"},{name:"Cruz",pos:"CB"},{name:"Franquesa",pos:"LB"},{name:"S. González",pos:"CDM"},{name:"Neyou",pos:"CM"},{name:"Cissé",pos:"CAM"},{name:"García",pos:"RW"},{name:"D. García",pos:"ST"},{name:"Raba",pos:"LW"}]
        },
        "Bundesliga": {
            'Bayern Munich': [{name:"Neuer",pos:"GK"},{name:"Kimmich",pos:"RB"},{name:"Kim",pos:"CB"},{name:"Upamecano",pos:"CB"},{name:"Davies",pos:"LB"},{name:"Goretzka",pos:"CDM"},{name:"Pavlovic",pos:"CM"},{name:"Musiala",pos:"CAM"},{name:"Sané",pos:"RW"},{name:"Kane",pos:"ST"},{name:"Coman",pos:"LW"}],
            'Borussia Dortmund': [{name:"Kobel",pos:"GK"},{name:"Ryerson",pos:"RB"},{name:"Schlotterbeck",pos:"CB"},{name:"Süle",pos:"CB"},{name:"Bensebaini",pos:"LB"},{name:"Can",pos:"CDM"},{name:"Sabitzer",pos:"CM"},{name:"Brandt",pos:"CAM"},{name:"Malen",pos:"RW"},{name:"Guirassy",pos:"ST"},{name:"Adeyemi",pos:"LW"}],
            'RB Leipzig': [{name:"Gulácsi",pos:"GK"},{name:"Henrichs",pos:"RB"},{name:"Orbán",pos:"CB"},{name:"Simakan",pos:"CB"},{name:"Raum",pos:"LB"},{name:"Kampl",pos:"CDM"},{name:"Xavi Simons",pos:"CM"},{name:"Olmo",pos:"CAM"},{name:"Openda",pos:"RW"},{name:"Sesko",pos:"ST"},{name:"Lukeba",pos:"LW"}],
            'Bayer Leverkusen': [{name:"Hradecký",pos:"GK"},{name:"Tah",pos:"RB"},{name:"Tapsoba",pos:"CB"},{name:"Hincapié",pos:"CB"},{name:"Grimaldo",pos:"LB"},{name:"Xhaka",pos:"CDM"},{name:"Andrich",pos:"CM"},{name:"Wirtz",pos:"CAM"},{name:"Hofmann",pos:"RW"},{name:"Boniface",pos:"ST"},{name:"Frimpong",pos:"LW"}],
            'Stuttgart': [{name:"Nübel",pos:"GK"},{name:"Vagnoman",pos:"RB"},{name:"Anton",pos:"CB"},{name:"Ito",pos:"CB"},{name:"Mittelstädt",pos:"LB"},{name:"Stiller",pos:"CDM"},{name:"Karazor",pos:"CM"},{name:"Undav",pos:"CAM"},{name:"Guirassy",pos:"RW"},{name:"Koulibaly",pos:"ST"},{name:"Zagadou",pos:"LW"}],
            'Frankfurt': [{name:"Trapp",pos:"GK"},{name:"Tuta",pos:"RB"},{name:"Koch",pos:"CB"},{name:"Pacho",pos:"CB"},{name:"Götze",pos:"LB"},{name:"Skhiri",pos:"CDM"},{name:"Larsson",pos:"CM"},{name:"Marmoush",pos:"CAM"},{name:"Schafer",pos:"RW"},{name:"Ekitike",pos:"ST"},{name:"Hasebe",pos:"LW"}],
            'Wolfsburg': [{name:"Casteels",pos:"GK"},{name:"Baku",pos:"RB"},{name:"Lacroix",pos:"CB"},{name:"Bornauw",pos:"CB"},{name:"Maehle",pos:"LB"},{name:"Arnold",pos:"CDM"},{name:"Gerhardt",pos:"CM"},{name:"Wind",pos:"CAM"},{name:"Tomás",pos:"RW"},{name:"Behrens",pos:"ST"},{name:"Bode",pos:"LW"}],
            'Mainz': [{name:"Zentner",pos:"GK"},{name:"Caci",pos:"RB"},{name:"van den Berg",pos:"CB"},{name:"Leitsch",pos:"CB"},{name:"Mwene",pos:"LB"},{name:"Kohr",pos:"CDM"},{name:"Amiri",pos:"CM"},{name:"Burkardt",pos:"CAM"},{name:"Lee",pos:"RW"},{name:"Onisiwo",pos:"ST"},{name:"Widmer",pos:"LW"}],
            'Werder Bremen': [{name:"Zetterer",pos:"GK"},{name:"Friedl",pos:"RB"},{name:"Stark",pos:"CB"},{name:"Veljkovic",pos:"CB"},{name:"Jung",pos:"LB"},{name:"Lynen",pos:"CDM"},{name:"Eggestein",pos:"CM"},{name:"Bittencourt",pos:"CAM"},{name:"Njinmah",pos:"RW"},{name:"Füllkrug",pos:"ST"},{name:"Woltemade",pos:"LW"}],
            'Augsburg': [{name:"Labrović",pos:"GK"},{name:"Gouweleeuw",pos:"RB"},{name:"Matsima",pos:"CB"},{name:"Tietz",pos:"CB"},{name:"Iago",pos:"LB"},{name:"Jakic",pos:"CDM"},{name:"Vargas",pos:"CM"},{name:"Rexhbecaj",pos:"CAM"},{name:"T. Werner",pos:"RW"},{name:"Tietz",pos:"ST"},{name:"Maier",pos:"LW"}],
            'Hoffenheim': [{name:"Baumann",pos:"GK"},{name:"Kadeřábek",pos:"RB"},{name:"Akpoguma",pos:"CB"},{name:"Kabak",pos:"CB"},{name:"Skov",pos:"LB"},{name:"Stach",pos:"CDM"},{name:"Bischof",pos:"CM"},{name:"Kramarić",pos:"CAM"},{name:"Beier",pos:"RW"},{name:"Weghorst",pos:"ST"},{name:"Berisha",pos:"LW"}],
            'Heidenheim': [{name:"Müller",pos:"GK"},{name:"Traoré",pos:"RB"},{name:"Mainka",pos:"CB"},{name:"Gimber",pos:"CB"},{name:"Föhrenbach",pos:"LB"},{name:"Maloney",pos:"CDM"},{name:"Schöppner",pos:"CM"},{name:"Dinkçi",pos:"CAM"},{name:"Wanner",pos:"RW"},{name:"Kleindienst",pos:"ST"},{name:"Pieringer",pos:"LW"}],
            'Freiburg': [{name:"Atubolu",pos:"GK"},{name:"Kübler",pos:"RB"},{name:"Lienhart",pos:"CB"},{name:"Ginter",pos:"CB"},{name:"Günter",pos:"LB"},{name:"Eggestein",pos:"CDM"},{name:"Höfler",pos:"CM"},{name:"Griffo",pos:"CAM"},{name:"Doan",pos:"RW"},{name:"Høler",pos:"ST"},{name:"Sallai",pos:"LW"}],
            'Gladbach': [{name:"Omlin",pos:"GK"},{name:"Itakura",pos:"RB"},{name:"Elvedi",pos:"CB"},{name:"Neuhaus",pos:"CB"},{name:"Scally",pos:"LB"},{name:"Weigl",pos:"CDM"},{name:"Reitz",pos:"CM"},{name:"Pléa",pos:"CAM"},{name:"Hack",pos:"RW"},{name:"Čvančara",pos:"ST"},{name:"Honorat",pos:"LW"}],
            'Union Berlin': [{name:"Rønnow",pos:"GK"},{name:"Trimmel",pos:"RB"},{name:"Knoche",pos:"CB"},{name:"Doekhi",pos:"CB"},{name:"Rothe",pos:"LB"},{name:"Khedira",pos:"CDM"},{name:"Kral",pos:"CM"},{name:"Hollerbach",pos:"CAM"},{name:"Volland",pos:"RW"},{name:"Siebatcheu",pos:"ST"},{name:"Becker",pos:"LW"}],
            'Bochum': [{name:"Riemann",pos:"GK"},{name:"Passlack",pos:"RB"},{name:"Ordets",pos:"CB"},{name:"Bernardo",pos:"CB"},{name:"Wittek",pos:"LB"},{name:"Losilla",pos:"CDM"},{name:"Osterhage",pos:"CM"},{name:"Broschinski",pos:"CAM"},{name:"Miyoshi",pos:"RW"},{name:"Hofmann",pos:"ST"},{name:"Daschner",pos:"LW"}],
            'Darmstadt': [{name:"Schuhen",pos:"GK"},{name:"Isherwood",pos:"RB"},{name:"Klaus",pos:"CB"},{name:"Nürnberger",pos:"CB"},{name:"Holland",pos:"LB"},{name:"Gjasula",pos:"CDM"},{name:"Müller",pos:"CM"},{name:"Mehlem",pos:"CAM"},{name:"Bader",pos:"RW"},{name:"Honsak",pos:"ST"},{name:"Vilhelmsson",pos:"LW"}],
            'St. Pauli': [{name:"Vasilj",pos:"GK"},{name:"Saliakas",pos:"RB"},{name:"Smith",pos:"CB"},{name:"Wahl",pos:"CB"},{name:"Zielinski",pos:"LB"},{name:"Irvine",pos:"CDM"},{name:"Kewell",pos:"CM"},{name:"Saad",pos:"CAM"},{name:"Eggestein",pos:"RW"},{name:"Albers",pos:"ST"},{name:"Banks",pos:"LW"}],
            'Holstein Kiel': [{name:"Weiner",pos:"GK"},{name:"M. Schulz",pos:"RB"},{name:"Holtby",pos:"CB"},{name:"Erras",pos:"CB"},{name:"Rohl",pos:"LB"},{name:"Pichler",pos:"CDM"},{name:"Sander",pos:"CM"},{name:"K. Schulz",pos:"CAM"},{name:"Ibsen",pos:"RW"},{name:"Arp",pos:"ST"},{name:"Benezet",pos:"LW"}]
        },
        "Serie A": {
            'Inter Milan': [{name:"Sommer",pos:"GK"},{name:"Dumfries",pos:"RB"},{name:"Pavard",pos:"CB"},{name:"Bastoni",pos:"CB"},{name:"Dimarco",pos:"LB"},{name:"Çalhanoğlu",pos:"CDM"},{name:"Barella",pos:"CM"},{name:"Mkhitaryan",pos:"CAM"},{name:"Frattesi",pos:"RW"},{name:"Martinez",pos:"ST"},{name:"Thuram",pos:"LW"}],
            'AC Milan': [{name:"Maignan",pos:"GK"},{name:"Calabria",pos:"RB"},{name:"Tomori",pos:"CB"},{name:"Thiaw",pos:"CB"},{name:"Hernández",pos:"LB"},{name:"Bennacer",pos:"CDM"},{name:"Reijnders",pos:"CM"},{name:"Pulisic",pos:"CAM"},{name:"Chukwueze",pos:"RW"},{name:"Morata",pos:"ST"},{name:"Leão",pos:"LW"}],
            'Juventus': [{name:"Perin",pos:"GK"},{name:"Danilo",pos:"RB"},{name:"Bremer",pos:"CB"},{name:"Gatti",pos:"CB"},{name:"Cambiaso",pos:"LB"},{name:"Locatelli",pos:"CDM"},{name:"McKennie",pos:"CM"},{name:"Vlahović",pos:"CAM"},{name:"Chiesa",pos:"RW"},{name:"Yildiz",pos:"ST"},{name:"Kostic",pos:"LW"}],
            'Napoli': [{name:"Meret",pos:"GK"},{name:"Di Lorenzo",pos:"RB"},{name:"Rrahmani",pos:"CB"},{name:"Juan Jesus",pos:"CB"},{name:"Olivera",pos:"LB"},{name:"Lobotka",pos:"CDM"},{name:"Anguissa",pos:"CM"},{name:"Zielinski",pos:"CAM"},{name:"Politano",pos:"RW"},{name:"Osimhen",pos:"ST"},{name:"Kvaratskhelia",pos:"LW"}],
            'Roma': [{name:"Svilar",pos:"GK"},{name:"Mancini",pos:"RB"},{name:"Ndicka",pos:"CB"},{name:"Huijsen",pos:"CB"},{name:"Spinazzola",pos:"LB"},{name:"Cristante",pos:"CDM"},{name:"Paredes",pos:"CM"},{name:"Pellegrini",pos:"CAM"},{name:"Dybal",pos:"RW"},{name:"Lukaku",pos:"ST"},{name:"El Shaarawy",pos:"LW"}],
            'Lazio': [{name:"Provedel",pos:"GK"},{name:"Marusic",pos:"RB"},{name:"Romagnoli",pos:"CB"},{name:"Casale",pos:"CB"},{name:"Hysaj",pos:"LB"},{name:"Kamada",pos:"CDM"},{name:"Guendouzi",pos:"CM"},{name:"Zaccagni",pos:"CAM"},{name:"Anderson",pos:"RW"},{name:"Immobile",pos:"ST"},{name:"Pedro",pos:"LW"}],
            'Atalanta': [{name:"Carnesecchi",pos:"GK"},{name:"Hateboer",pos:"RB"},{name:"Scalvini",pos:"CB"},{name:"Djimsiti",pos:"CB"},{name:"Ruggeri",pos:"LB"},{name:"Ederson",pos:"CDM"},{name:"Koopmeiners",pos:"CM"},{name:"Lookman",pos:"CAM"},{name:"De Ketelaere",pos:"RW"},{name:"Zapata",pos:"ST"},{name:"Miranchuk",pos:"LW"}],
            'Fiorentina': [{name:"Terracciano",pos:"GK"},{name:"Dodô",pos:"RB"},{name:"Martínez Quarta",pos:"CB"},{name:"Comuzzo",pos:"CB"},{name:"Biraghi",pos:"LB"},{name:"Amrabat",pos:"CDM"},{name:"Mandragora",pos:"CM"},{name:"Gudmundsson",pos:"CAM"},{name:"Ikoné",pos:"RW"},{name:"Kean",pos:"ST"},{name:"Sottil",pos:"LW"}],
            'Bologna': [{name:"Skorupski",pos:"GK"},{name:"Posch",pos:"RB"},{name:"Beukema",pos:"CB"},{name:"Lucumí",pos:"CB"},{name:"Miranda",pos:"LB"},{name:"Freuler",pos:"CDM"},{name:"Aebischer",pos:"CM"},{name:"Orsolini",pos:"CAM"},{name:"Ndoye",pos:"RW"},{name:"Castro",pos:"ST"},{name:"Karlsson",pos:"LW"}],
            'Torino': [{name:"Milinković-Savić",pos:"GK"},{name:"Tameze",pos:"RB"},{name:"Buongiorno",pos:"CB"},{name:"Masic",pos:"CB"},{name:"Sosa",pos:"LB"},{name:"Ricci",pos:"CDM"},{name:"Ilic",pos:"CM"},{name:"Vlasic",pos:"CAM"},{name:"Seck",pos:"RW"},{name:"Zapata",pos:"ST"},{name:"Sanabria",pos:"LW"}],
            'Genoa': [{name:"Martinez",pos:"GK"},{name:"Sabelli",pos:"RB"},{name:"Bani",pos:"CB"},{name:"Vasquez",pos:"CB"},{name:"Martin",pos:"LB"},{name:"Strootman",pos:"CDM"},{name:"Malinovskyi",pos:"CM"},{name:"Gudmundsson",pos:"CAM"},{name:"Messias",pos:"RW"},{name:"Retegui",pos:"ST"},{name:"Vitinha",pos:"LW"}],
            'Udinese': [{name:"Okoye",pos:"GK"},{name:"Kabasele",pos:"RB"},{name:"Bijol",pos:"CB"},{name:"Giannetti",pos:"CB"},{name:"Zemura",pos:"LB"},{name:"Walace",pos:"CDM"},{name:"Lovric",pos:"CM"},{name:"Pereyra",pos:"CAM"},{name:"Thauvin",pos:"RW"},{name:"Lucca",pos:"ST"},{name:"Brenner",pos:"LW"}],
            'Monza': [{name:"Di Gregorio",pos:"GK"},{name:"Caldarola",pos:"RB"},{name:"Mari",pos:"CB"},{name:"Izzo",pos:"CB"},{name:"Carlos Augusto",pos:"LB"},{name:"Pessina",pos:"CDM"},{name:"Colpani",pos:"CM"},{name:"Mota",pos:"CAM"},{name:"Dany Mota",pos:"RW"},{name:"L. Martínez",pos:"ST"},{name:"Caprari",pos:"LW"}],
            'Sassuolo': [{name:"Consigli",pos:"GK"},{name:"Toljan",pos:"RB"},{name:"Ferrari",pos:"CB"},{name:"Erlic",pos:"CB"},{name:"Doig",pos:"LB"},{name:"Henrique",pos:"CDM"},{name:"Thorstvedt",pos:"CM"},{name:"Bajrami",pos:"CAM"},{name:"Berardi",pos:"RW"},{name:"Pinamonti",pos:"ST"},{name:"Laurienté",pos:"LW"}],
            'Lecce': [{name:"Falcone",pos:"GK"},{name:"Gendrey",pos:"RB"},{name:"Baschirotto",pos:"CB"},{name:"Pongracic",pos:"CB"},{name:"Dorgu",pos:"LB"},{name:"Ramadani",pos:"CDM"},{name:"Gonzalez",pos:"CM"},{name:"Krstovic",pos:"CAM"},{name:"Banda",pos:"RW"},{name:"Sansone",pos:"ST"},{name:"Oudin",pos:"LW"}],
            'Cagliari': [{name:"Scuffet",pos:"GK"},{name:"Zappa",pos:"RB"},{name:"Goldaniga",pos:"CB"},{name:"Mina",pos:"CB"},{name:"Augello",pos:"LB"},{name:"Deiola",pos:"CDM"},{name:"Makoumbou",pos:"CM"},{name:"Gaetano",pos:"CAM"},{name:"Luvumbo",pos:"RW"},{name:"Lapadula",pos:"ST"},{name:"Pavoletti",pos:"LW"}],
            'Empoli': [{name:"Berisha",pos:"GK"},{name:"Pezzella",pos:"RB"},{name:"Ismajli",pos:"CB"},{name:"Viti",pos:"CB"},{name:"Cacace",pos:"LB"},{name:"Fazzini",pos:"CDM"},{name:"M. Maleh",pos:"CM"},{name:"Esposito",pos:"CAM"},{name:"Gyasi",pos:"RW"},{name:"Colombo",pos:"ST"},{name:"Baldanzi",pos:"LW"}],
            'Venezia': [{name:"Joronen",pos:"GK"},{name:"Candela",pos:"RB"},{name:"Idzes",pos:"CB"},{name:"Svoboda",pos:"CB"},{name:"Haps",pos:"LB"},{name:"Tessmann",pos:"CDM"},{name:"Duncan",pos:"CM"},{name:"Busio",pos:"CAM"},{name:"Oristanio",pos:"RW"},{name:"Pohjanpalo",pos:"ST"},{name:"Zampano",pos:"LW"}],
            'Como': [{name:"Audero",pos:"GK"},{name:"Iovine",pos:"RB"},{name:"Goldaniga",pos:"CB"},{name:"Dossena",pos:"CB"},{name:"Sala",pos:"LB"},{name:"Perrone",pos:"CDM"},{name:"Da Cunha",pos:"CM"},{name:"Strefezza",pos:"CAM"},{name:"Braunöder",pos:"RW"},{name:"Cerri",pos:"ST"},{name:"Mazzitelli",pos:"LW"}]
        }
    };

    // --- 3. HELPER FUNCTIONS ---
    function getPlayerLeagueInfo(clubName) {
        for (const league in worldLeagues) {
            if (worldLeagues[league].hasOwnProperty(clubName)) {
                return { leagueName: league, clubs: Object.keys(worldLeagues[league]) };
            }
        }
        return { leagueName: "Premier League", clubs: Object.keys(worldLeagues["Premier League"]) };
    }

    const leagueInfo = getPlayerLeagueInfo(player.club);
    const activeLeagueName = leagueInfo.leagueName;
    const activeClubs = leagueInfo.clubs;
    const MAX_WEEKS_PER_SEASON = 38;
    const TOTAL_TEAMS = activeClubs.length;

    // --- 4. DOMESTIC CUPS (SIMULATED) ---
    function simulateDomesticCups() {
        const domesticCups = {
            'Premier League': ['FA Cup', 'Carabao Cup', 'Community Shield'],
            'La Liga': ['Copa del Rey', 'Supercopa de España'],
            'Bundesliga': ['DFB-Pokal', 'DFL-Supercup'],
            'Serie A': ['Coppa Italia', 'Supercoppa Italiana']
        };
        const cups = domesticCups[activeLeagueName] || ['FA Cup', 'League Cup'];
        const winners = [];
        cups.forEach(cup => {
            const winner = activeClubs[Math.floor(Math.random() * activeClubs.length)];
            winners.push({ name: cup, winner: winner });
        });
        return winners;
    }

    // --- 5. EUROPEAN COMPETITIONS ---
    const europeanCompetitions = {
        'UEFA Champions League': { teams: [], matches: [], winner: null, runnerUp: null },
        'UEFA Europa League': { teams: [], matches: [], winner: null, runnerUp: null },
        'UEFA Conference League': { teams: [], matches: [], winner: null, runnerUp: null }
    };

    function generateEuropeanTeams() {
        const uclTeams = [], uelTeams = [], ueclTeams = [];
        for (const league in worldLeagues) {
            const clubs = Object.keys(worldLeagues[league]);
            if (clubs.length >= 3) {
                uclTeams.push(clubs[0], clubs[1], clubs[2]);
                if (clubs.length >= 4) uelTeams.push(clubs[3]);
                if (clubs.length >= 5) ueclTeams.push(clubs[4]);
            }
        }
        europeanCompetitions['UEFA Champions League'].teams = uclTeams;
        europeanCompetitions['UEFA Europa League'].teams = uelTeams;
        europeanCompetitions['UEFA Conference League'].teams = ueclTeams;
    }

    function simulateEuropeanCompetitions() {
        generateEuropeanTeams();
        const uclTeams = europeanCompetitions['UEFA Champions League'].teams;
        if (uclTeams.length >= 2) {
            let currentRound = uclTeams;
            while (currentRound.length > 1) {
                const nextRound = [];
                for (let i = 0; i < currentRound.length - 1; i += 2) {
                    const teamA = currentRound[i];
                    const teamB = currentRound[i + 1];
                    const hg = Math.floor(Math.random() * 3) + 1;
                    const ag = Math.floor(Math.random() * 3);
                    const winner = hg > ag ? teamA : teamB;
                    nextRound.push(winner);
                    europeanCompetitions['UEFA Champions League'].matches.push({ home: teamA, away: teamB, homeScore: hg, awayScore: ag, winner: winner });
                }
                currentRound = nextRound;
            }
            europeanCompetitions['UEFA Champions League'].winner = currentRound[0];
        }
        const uelTeams = europeanCompetitions['UEFA Europa League'].teams;
        if (uelTeams.length >= 2) {
            let currentRound = uelTeams;
            while (currentRound.length > 1) {
                const nextRound = [];
                for (let i = 0; i < currentRound.length - 1; i += 2) {
                    const teamA = currentRound[i];
                    const teamB = currentRound[i + 1];
                    const hg = Math.floor(Math.random() * 2) + 1;
                    const ag = Math.floor(Math.random() * 2);
                    const winner = hg > ag ? teamA : teamB;
                    nextRound.push(winner);
                    europeanCompetitions['UEFA Europa League'].matches.push({ home: teamA, away: teamB, homeScore: hg, awayScore: ag, winner: winner });
                }
                currentRound = nextRound;
            }
            europeanCompetitions['UEFA Europa League'].winner = currentRound[0];
        }
        const ueclTeams = europeanCompetitions['UEFA Conference League'].teams;
        if (ueclTeams.length >= 2) {
            let currentRound = ueclTeams;
            while (currentRound.length > 1) {
                const nextRound = [];
                for (let i = 0; i < currentRound.length - 1; i += 2) {
                    const teamA = currentRound[i];
                    const teamB = currentRound[i + 1];
                    const hg = Math.floor(Math.random() * 2);
                    const ag = Math.floor(Math.random() * 2);
                    const winner = hg > ag ? teamA : teamB;
                    nextRound.push(winner);
                    europeanCompetitions['UEFA Conference League'].matches.push({ home: teamA, away: teamB, homeScore: hg, awayScore: ag, winner: winner });
                }
                currentRound = nextRound;
            }
            europeanCompetitions['UEFA Conference League'].winner = currentRound[0];
        }
        player.europeanResults = europeanCompetitions;
        saveData();
    }

    // --- 6. TROPHY SYSTEM ---
    function checkAndAwardTrophies() {
        const leagueRef = player.leagueData[activeLeagueName];
        if (!leagueRef || !leagueRef.standings) return;
        const s = leagueRef.standings;
        const sorted = Object.keys(s).map(c => ({ club: c, ...s[c] })).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
        if (sorted.length === 0) return;
        const champion = sorted[0].club;
        const season = player.season || 1;
        if (!player.trophies) player.trophies = [];
        if (champion === player.club) {
            const trophy = { name: `${activeLeagueName} Champion`, season: season, type: 'League', date: new Date().toISOString() };
            if (!player.trophies.some(t => t.name === trophy.name && t.season === trophy.season)) {
                player.trophies.push(trophy);
                addCommentary(`🏆 <strong>${player.club} MENANG LIGA!</strong> ${activeLeagueName} musim ${season}!`, 'goal');
            }
        }
        const europeResults = player.europeanResults;
        if (europeResults) {
            for (const comp in europeResults) {
                const compData = europeResults[comp];
                if (compData.winner === player.club) {
                    const trophy = { name: `${comp} Winner`, season: season, type: 'European', date: new Date().toISOString() };
                    if (!player.trophies.some(t => t.name === trophy.name && t.season === trophy.season)) {
                        player.trophies.push(trophy);
                        addCommentary(`🏆 <strong>${player.club} MENANG ${comp}!</strong> Musim ${season}!`, 'goal');
                    }
                }
            }
        }
        const domesticCups = simulateDomesticCups();
        domesticCups.forEach(cup => {
            if (cup.winner === player.club) {
                const trophy = { name: cup.name, season: season, type: 'Domestic Cup', date: new Date().toISOString() };
                if (!player.trophies.some(t => t.name === trophy.name && t.season === trophy.season)) {
                    player.trophies.push(trophy);
                    addCommentary(`🏆 <strong>${player.club} MENANG ${cup.name}!</strong> Musim ${season}!`, 'goal');
                }
            }
        });
        if (player.ovr >= 80 && player.trophies.length > 0) {
            const hasLeagueTrophy = player.trophies.some(t => t.type === 'League' && t.season === season);
            if (hasLeagueTrophy) {
                const trophy = { name: `${activeLeagueName} Player of the Season`, season: season, type: 'Individual', date: new Date().toISOString() };
                if (!player.trophies.some(t => t.name === trophy.name && t.season === trophy.season)) {
                    player.trophies.push(trophy);
                    addCommentary(`🏅 <strong>${player.name} - Player of the Season!</strong> Musim ${season}!`, 'goal');
                }
            }
        }
        saveData();
    }

    // --- 7. INITIALISE STANDINGS & STATS ---
    function initStandings() {
        if (!player.leagueData) player.leagueData = {};
        if (!player.leagueData[activeLeagueName]) {
            player.leagueData[activeLeagueName] = {
                standings: {},
                topScorers: {},
                topAssists: {},
                matchHistory: [],
                playerStats: { goals: 0, assists: 0, cleanSheets: 0, tackles: 0, interceptions: 0, passes: 0, keyPasses: 0 }
            };
            activeClubs.forEach(club => {
                player.leagueData[activeLeagueName].standings[club] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };
                const roster = worldLeagues[activeLeagueName][club];
                if (roster) {
                    roster.forEach(p => {
                        if (p.pos !== 'GK') {
                            player.leagueData[activeLeagueName].topScorers[p.name] = 0;
                            player.leagueData[activeLeagueName].topAssists[p.name] = 0;
                        }
                    });
                }
            });
        }
        saveData();
    }

    function saveData() {
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
    }

    function generateOpponent() {
        const opps = activeClubs.filter(c => c !== player.club);
        if (opps.length === 0) return activeClubs[0] || "Arsenal";
        return opps[Math.floor(Math.random() * opps.length)];
    }

    // --- 8. UPDATE STANDINGS (FIXED: POINT SYSTEM) ---
    function updateStandingsData(home, away, hg, ag, scorers, assisters, matchStats) {
        const leagueRef = player.leagueData[activeLeagueName];
        if (!leagueRef || !leagueRef.standings) return;
        const s = leagueRef.standings;
        if (!s[home]) s[home] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };
        if (!s[away]) s[away] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };

        // Update basic stats
        s[home].played += 1;
        s[away].played += 1;
        s[home].gf += hg;
        s[home].ga += ag;
        s[away].gf += ag;
        s[away].ga += hg;

        // Update wins/losses/draws and points
        if (hg > ag) {
            s[home].won += 1;
            s[home].pts += 3;
            s[away].lost += 1;
        } else if (hg < ag) {
            s[away].won += 1;
            s[away].pts += 3;
            s[home].lost += 1;
        } else {
            s[home].drawn += 1;
            s[home].pts += 1;
            s[away].drawn += 1;
            s[away].pts += 1;
        }

        // Update Top Scorers & Assists (Hanya tambah jika ada)
        if (scorers && scorers.length > 0) {
            scorers.forEach(scorer => {
                if (leagueRef.topScorers[scorer] !== undefined) {
                    leagueRef.topScorers[scorer] = (leagueRef.topScorers[scorer] || 0) + 1;
                } else {
                    leagueRef.topScorers[scorer] = 1;
                }
            });
        }
        if (assisters && assisters.length > 0) {
            assisters.forEach(assister => {
                if (leagueRef.topAssists[assister] !== undefined) {
                    leagueRef.topAssists[assister] = (leagueRef.topAssists[assister] || 0) + 1;
                } else {
                    leagueRef.topAssists[assister] = 1;
                }
            });
        }

        // Update player season stats
        if (matchStats) {
            const ps = leagueRef.playerStats;
            ps.goals += matchStats.goals || 0;
            ps.assists += matchStats.assists || 0;
            ps.cleanSheets += matchStats.cleanSheets || 0;
            ps.tackles += matchStats.tackles || 0;
            ps.interceptions += matchStats.interceptions || 0;
            ps.passes += matchStats.passes || 0;
            ps.keyPasses += matchStats.keyPasses || 0;
        }
    }

    // --- 9. NPC MATCHES SIMULATION (FIXED: SEMUA MATCH DIKIRA) ---
    function simulateLeagueNpcMatches(currentUserHome, currentUserAway) {
        const leagueRef = player.leagueData[activeLeagueName];
        let unplayedClubs = activeClubs.filter(c => c !== currentUserHome && c !== currentUserAway);
        unplayedClubs.sort(() => Math.random() - 0.5);

        // Pastikan bilangan genap untuk pairing
        if (unplayedClubs.length % 2 !== 0) {
            unplayedClubs.push(null);
        }

        for (let i = 0; i < unplayedClubs.length - 1; i += 2) {
            const teamA = unplayedClubs[i];
            const teamB = unplayedClubs[i + 1];
            if (!teamA || !teamB) continue;

            const teamARoster = worldLeagues[activeLeagueName][teamA] || [];
            const teamBRoster = worldLeagues[activeLeagueName][teamB] || [];
            const teamAStrength = teamARoster.length > 0 ? Math.floor(Math.random() * 15) + 65 : 50;
            const teamBStrength = teamBRoster.length > 0 ? Math.floor(Math.random() * 15) + 65 : 50;

            let hg, ag;
            if (teamAStrength > teamBStrength) {
                hg = Math.floor(Math.random() * 3) + 1;
                ag = Math.floor(Math.random() * 2);
            } else if (teamBStrength > teamAStrength) {
                ag = Math.floor(Math.random() * 3) + 1;
                hg = Math.floor(Math.random() * 2);
            } else {
                hg = Math.floor(Math.random() * 2);
                ag = Math.floor(Math.random() * 2);
            }

            let scorers = [], assisters = [];
            const teamAPlayers = teamARoster.filter(p => p.pos !== 'GK');
            const teamBPlayers = teamBRoster.filter(p => p.pos !== 'GK');

            const getScorerByPosition = (players) => {
                const forwards = players.filter(p => p.pos === 'ST' || p.pos === 'CF');
                const midfielders = players.filter(p => ['CM','CAM','CDM','LW','RW','LM','RM'].includes(p.pos));
                const defenders = players.filter(p => ['CB','LB','RB'].includes(p.pos));
                if (forwards.length > 0 && Math.random() < 0.6) return forwards[Math.floor(Math.random() * forwards.length)].name;
                if (midfielders.length > 0 && Math.random() < 0.3) return midfielders[Math.floor(Math.random() * midfielders.length)].name;
                if (defenders.length > 0 && Math.random() < 0.1) return defenders[Math.floor(Math.random() * defenders.length)].name;
                return players[Math.floor(Math.random() * players.length)]?.name || "Unknown";
            };

            const getAssisterByPosition = (players, scorerName) => {
                const midfielders = players.filter(p => ['CM','CAM','CDM','LW','RW','LM','RM'].includes(p.pos) && p.name !== scorerName);
                const defenders = players.filter(p => ['LB','RB'].includes(p.pos) && p.name !== scorerName);
                if (midfielders.length > 0 && Math.random() < 0.7) return midfielders[Math.floor(Math.random() * midfielders.length)].name;
                if (defenders.length > 0 && Math.random() < 0.3) return defenders[Math.floor(Math.random() * defenders.length)].name;
                return players.find(p => p.name !== scorerName)?.name || null;
            };

            for (let g = 0; g < hg; g++) {
                if (teamAPlayers.length > 0) {
                    const scorer = getScorerByPosition(teamAPlayers);
                    scorers.push(scorer);
                    const assister = getAssisterByPosition(teamAPlayers, scorer);
                    if (assister) assisters.push(assister);
                }
            }
            for (let g = 0; g < ag; g++) {
                if (teamBPlayers.length > 0) {
                    const scorer = getScorerByPosition(teamBPlayers);
                    scorers.push(scorer);
                    const assister = getAssisterByPosition(teamBPlayers, scorer);
                    if (assister) assisters.push(assister);
                }
            }

            // Update standings for NPC matches
            updateStandingsData(teamA, teamB, hg, ag, scorers, assisters);

            leagueRef.matchHistory.push({
                home: teamA, away: teamB, homeScore: hg, awayScore: ag,
                date: new Date().toISOString(),
                week: player.currentMatchWeek
            });
        }
        saveData();
    }

    // --- 10. TEAM FORMATION GENERATOR ---
    function generateTeamFormation(teamName, userPlayer) {
        let leaguePool = worldLeagues[activeLeagueName] || worldLeagues["Premier League"];
        let rosterData = leaguePool[teamName];
        if (!rosterData || rosterData.length === 0) {
            rosterData = [{ name: "GK", pos: "GK" }, { name: "RB", pos: "RB" }, { name: "CB1", pos: "CB" }, { name: "CB2", pos: "CB" }, { name: "LB", pos: "LB" }, { name: "CDM", pos: "CDM" }, { name: "CM", pos: "CM" }, { name: "CAM", pos: "CAM" }, { name: "RW", pos: "RW" }, { name: "ST", pos: "ST" }, { name: "LW", pos: "LW" }];
        }
        let roster = rosterData.map(p => ({ ...p }));
        if (teamName === userPlayer.club) {
            const userPosUpper = userPlayer.position.toUpperCase();
            let idx = roster.findIndex(p => p.pos.toUpperCase() === userPosUpper);
            if (idx !== -1) {
                roster[idx] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
            } else {
                if (userPosUpper === 'ST' || userPosUpper === 'CF') {
                    let stIdx = roster.findIndex(p => p.pos === 'ST');
                    if (stIdx !== -1) {
                        roster[stIdx] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                    } else {
                        roster.push({ name: userPlayer.name, pos: userPosUpper, isUser: true });
                    }
                } else {
                    roster[0] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                }
            }
        }
        return [
            [ roster.find(p => p.pos === 'LW' || p.pos === 'LWF') || roster[10] || { name: 'LW', pos: 'LW' }, roster.find(p => p.pos === 'ST' || p.pos === 'CF') || roster[9] || { name: 'ST', pos: 'ST' }, roster.find(p => p.pos === 'RW' || p.pos === 'RWF') || roster[8] || { name: 'RW', pos: 'RW' } ],
            [ roster.find(p => p.pos === 'CM') || roster[6] || { name: 'CM', pos: 'CM' }, roster.find(p => p.pos === 'CAM') || roster[7] || { name: 'CAM', pos: 'CAM' }, roster.find(p => p.pos === 'CDM') || roster[5] || { name: 'CDM', pos: 'CDM' } ],
            [ roster.find(p => p.pos === 'LB') || roster[4] || { name: 'LB', pos: 'LB' }, roster.find(p => p.pos === 'CB') || roster[2] || { name: 'CB', pos: 'CB' }, roster.find(p => p.pos === 'RB') || roster[1] || { name: 'RB', pos: 'RB' } ],
            [ roster.find(p => p.pos === 'GK') || roster[0] || { name: 'GK', pos: 'GK' } ]
        ];
    }

    // --- 11. MATCH ENGINE (FIXED: SCOREBOARD, VISUALS, TOP SCORERS) ---
    let matchPlayerStats = {};
    let matchInterval = null;
    let isPausedForDecision = false;
    let isMatchEnded = false;
    const savedFace = localStorage.getItem('theJourney_playerFace') || player.faceImage || '';

    function setupLineupPitch(homeTeam) {
        const grid = document.getElementById('pitchLineupGrid');
        if (!grid) return;
        grid.innerHTML = '';
        matchPlayerStats = {};
        const formation = generateTeamFormation(homeTeam, player);
        formation.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'pitch-row';
            row.forEach(p => {
                if (!p) return;
                const isUser = (p.name === player.name) || (p.isUser === true);
                const safeId = p.name.replace(/[^a-zA-Z0-9]/g, '_');
                matchPlayerStats[p.name] = { goals: 0, assists: 0, rating: parseFloat((6.0 + Math.random() * 1.5).toFixed(1)), isUser: isUser, position: p.pos };
                const playerDiv = document.createElement('div');
                playerDiv.className = `pitch-player ${isUser ? 'user-player' : ''}`;
                let avatarContent;
                if (isUser && savedFace) {
                    avatarContent = `<img src="${savedFace}" alt="Player" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                } else {
                    avatarContent = `<i class="fa-solid fa-user"></i>`;
                }
                let rating = matchPlayerStats[p.name].rating;
                playerDiv.innerHTML = `
                    <div class="pitch-avatar">
                        ${avatarContent}
                        <div class="player-rating-badge rating-average" id="rating_${safeId}">${rating.toFixed(1)}</div>
                        <div class="event-badge-container" id="badge_${safeId}" style="display:none;"></div>
                    </div>
                    <div class="pitch-player-name" title="${p.name} (${p.pos})">${p.name}</div>
                `;
                rowDiv.appendChild(playerDiv);
            });
            grid.appendChild(rowDiv);
        });
    }

    function updateTeammateVisuals(playerName, goalsDelta, assistsDelta, ratingDelta) {
        if (!matchPlayerStats[playerName]) return;
        const st = matchPlayerStats[playerName];
        st.goals += goalsDelta;
        st.assists += assistsDelta;
        st.rating = Math.max(3.0, Math.min(10.0, st.rating + ratingDelta));
        const safeId = playerName.replace(/[^a-zA-Z0-9]/g, '_');
        const ratingBadge = document.getElementById(`rating_${safeId}`);
        const eventBadge = document.getElementById(`badge_${safeId}`);
        if (ratingBadge) {
            ratingBadge.textContent = st.rating.toFixed(1);
            ratingBadge.className = 'player-rating-badge ' + (st.rating >= 7.5 ? 'rating-good' : (st.rating >= 6.0 ? 'rating-average' : 'rating-bad'));
        }
        if (eventBadge) {
            let iconsHtml = '';
            for (let i = 0; i < st.goals; i++) iconsHtml += `<span class="event-icon" style="font-size:0.45rem; margin:0 -4px;">⚽</span>`;
            for (let i = 0; i < st.assists; i++) iconsHtml += `<span class="event-icon" style="font-size:0.45rem; margin:0 -4px;">👟</span>`;
            if (iconsHtml !== '') {
                eventBadge.innerHTML = iconsHtml;
                eventBadge.style.display = 'flex';
            }
        }
    }

    function playGoalSound() {
        try {
            const audio = new Audio('goal.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});
        } catch (e) {}
    }

    function startLiveMatchSimulation(homeTeam, awayTeam) {
        const modal = document.getElementById('matchModalOverlay');
        const scoreEl = document.getElementById('simScoreDisplay');
        const clockEl = document.getElementById('simClock');
        isMatchEnded = false;

        document.getElementById('simLeagueHeader').textContent = `${activeLeagueName.toUpperCase()} • MD ${player.currentMatchWeek}`;
        document.getElementById('simHomeName').textContent = homeTeam;
        document.getElementById('simAwayName').textContent = awayTeam;
        scoreEl.textContent = "0 - 0";
        document.getElementById('simCommentaryBox').innerHTML = `<div class="commentary-item">Kick-off! Matchday ${player.currentMatchWeek} (${activeLeagueName}) bermula...</div>`;
        document.getElementById('btnCloseModal').style.display = 'none';
        modal.classList.add('active');

        setupLineupPitch(homeTeam);

        let second = 0, homeScore = 0, awayScore = 0;
        let decision30Triggered = false, decision70Triggered = false;
        let scorers = [], assisters = [];

        if (matchInterval) clearInterval(matchInterval);

        matchInterval = setInterval(() => {
            if (isPausedForDecision || isMatchEnded) return;

            second++;
            const matchMinute = Math.min(90, Math.floor((second / 60) * 90));
            clockEl.textContent = `${matchMinute < 10 ? '0' : ''}${matchMinute}:00`;

            if (matchMinute >= 30 && !decision30Triggered) {
                decision30Triggered = true;
                triggerDecision(matchMinute, homeTeam, awayTeam, scoreEl, homeScore, awayScore, scorers, assisters);
            }
            if (matchMinute >= 70 && !decision70Triggered) {
                decision70Triggered = true;
                triggerDecision(matchMinute, homeTeam, awayTeam, scoreEl, homeScore, awayScore, scorers, assisters);
            }

            // Goal events - FIXED: Scoreboard and visuals for ALL players
            if (Math.random() < 0.035) {
                const scoringTeam = Math.random() < 0.5 ? homeTeam : awayTeam;
                const leaguePool = worldLeagues[activeLeagueName] || worldLeagues["Premier League"];
                const roster = leaguePool[scoringTeam] || [];
                
                const forwards = roster.filter(p => p.pos === 'ST' || p.pos === 'CF');
                const midfielders = roster.filter(p => ['CM','CAM','CDM','LW','RW','LM','RM'].includes(p.pos));
                const defenders = roster.filter(p => ['CB','LB','RB'].includes(p.pos));
                
                let scorer = null, assister = null;

                const roll = Math.random();
                if (roll < 0.6 && forwards.length > 0) {
                    scorer = forwards[Math.floor(Math.random() * forwards.length)].name;
                } else if (roll < 0.9 && midfielders.length > 0) {
                    scorer = midfielders[Math.floor(Math.random() * midfielders.length)].name;
                } else if (defenders.length > 0) {
                    scorer = defenders[Math.floor(Math.random() * defenders.length)].name;
                } else {
                    scorer = roster[Math.floor(Math.random() * roster.length)]?.name || "Player";
                }

                // If scoring team is user's club, 25% chance user scores
                if (scoringTeam === player.club && Math.random() < 0.25) {
                    scorer = player.name;
                    updateTeammateVisuals(player.name, 1, 0, 1.0);
                    addCommentary(`⚽ <strong>GOL ${matchMinute}'!</strong> ${player.name} menyudahkan hantaran rakan sepasukan!`, 'goal');
                    scorers.push(player.name);
                    playGoalSound();
                    
                    const teammates = roster.filter(p => p.name !== player.name);
                    if (teammates.length > 0 && Math.random() < 0.7) {
                        const midAssisters = teammates.filter(p => ['CM','CAM','CDM','LW','RW','LM','RM'].includes(p.pos));
                        if (midAssisters.length > 0 && Math.random() < 0.8) {
                            assister = midAssisters[Math.floor(Math.random() * midAssisters.length)].name;
                        } else {
                            assister = teammates[Math.floor(Math.random() * teammates.length)].name;
                        }
                        assisters.push(assister);
                        updateTeammateVisuals(assister, 0, 1, 0.5);
                        addCommentary(`👟 Assist oleh ${assister}!`, 'goal');
                    }
                } else {
                    addCommentary(`⚽ <strong>GOL ${matchMinute}'!</strong> ${scoringTeam} menjaringkan gol menerusi ${scorer}!`, 'goal');
                    scorers.push(scorer);
                    // Update visual for scorer (teammate or opponent)
                    updateTeammateVisuals(scorer, 1, 0, 1.0);
                    
                    const teammates = roster.filter(p => p.name !== scorer);
                    if (teammates.length > 0 && Math.random() < 0.6) {
                        const midAssisters = teammates.filter(p => ['CM','CAM','CDM','LW','RW','LM','RM'].includes(p.pos));
                        if (midAssisters.length > 0 && Math.random() < 0.8) {
                            assister = midAssisters[Math.floor(Math.random() * midAssisters.length)].name;
                        } else {
                            assister = teammates[Math.floor(Math.random() * teammates.length)].name;
                        }
                        assisters.push(assister);
                        updateTeammateVisuals(assister, 0, 1, 0.5);
                        addCommentary(`👟 Assist oleh ${assister}!`, 'goal');
                    }
                }

                // FIXED: Correct score update
                if (scoringTeam === homeTeam) {
                    homeScore++;
                } else {
                    awayScore++;
                }
                scoreEl.textContent = `${homeScore} - ${awayScore}`;
            }

            if (second >= 60) {
                isMatchEnded = true;
                clearInterval(matchInterval);
                clockEl.textContent = "90:00";
                addCommentary(`🔔 <strong>TAMAT PERLAWANAN!</strong> ${homeTeam} ${homeScore} - ${awayScore} ${awayTeam}.`, 'card');

                const pStat = matchPlayerStats[player.name] || { goals: 0, assists: 0, rating: 6.5 };
                player.matchesPlayed = (player.matchesPlayed || 0) + 1;
                player.goalsScored = (player.goalsScored || 0) + pStat.goals;
                player.assists = (player.assists || 0) + pStat.assists;

                const matchStats = {
                    goals: pStat.goals,
                    assists: pStat.assists,
                    cleanSheets: (player.position === 'GK' && awayScore === 0) ? 1 : 0,
                    tackles: Math.floor(Math.random() * 3),
                    interceptions: Math.floor(Math.random() * 3),
                    passes: Math.floor(Math.random() * 20) + 10,
                    keyPasses: Math.floor(Math.random() * 2)
                };
                
                // FIXED: Update standings with correct data
                updateStandingsData(homeTeam, awayTeam, homeScore, awayScore, scorers, assisters, matchStats);

                // FIXED: Simulate NPC matches AFTER user match
                simulateLeagueNpcMatches(homeTeam, awayTeam);

                if (player.ovr >= 75 && !player.internationalCall) {
                    player.internationalCall = true;
                    addCommentary(`🇺🇳 <strong>CALL UP NEGARA!</strong> Prestasi luar biasa membolehkan anda terpilih menyarung jersi skuad kebangsaan!`, 'goal');
                }

                player.currentMatchWeek++;
                if (player.currentMatchWeek > MAX_WEEKS_PER_SEASON) {
                    calculateSeasonOVRChanges();
                    simulateEuropeanCompetitions();
                    checkAndAwardTrophies();
                    resetSeason();
                    setTimeout(showPressConference, 1000);
                }

                saveData();
                updateUI();
                document.getElementById('btnCloseModal').style.display = 'block';
            }
        }, 1000);
    }

    function addCommentary(msg, type = '') {
        const box = document.getElementById('simCommentaryBox');
        if (!box) return;
        const log = document.createElement('div');
        log.className = `commentary-item ${type}`;
        log.innerHTML = msg;
        box.prepend(log);
    }

    function triggerDecision(minute, homeTeam, awayTeam, scoreEl, hScore, aScore, scorers, assisters) {
        isPausedForDecision = true;
        const overlay = document.getElementById('decisionOverlay');
        document.getElementById('decisionTitle').textContent = `⚡ ${minute}' KEPUTUSAN UTAMA (${player.position})!`;
        const optionsEl = document.getElementById('decisionOptions');
        optionsEl.innerHTML = '';

        const opts = [
            { text: "🚀 Rembatan Kencang", risk: "Peluang Gol Tinggi", type: "SHOT" },
            { text: "🎯 Hantaran Lorong Pintar", risk: "Peluang Assist", type: "PASS" }
        ];

        let currentHome = hScore;
        let currentAway = aScore;

        opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-decision';
            btn.innerHTML = `<strong>${opt.text}</strong><span>${opt.risk}</span>`;
            btn.onclick = () => {
                overlay.classList.remove('active');
                isPausedForDecision = false;
                if (Math.random() < 0.5) {
                    updateTeammateVisuals(player.name, opt.type === 'SHOT' ? 1 : 0, opt.type === 'PASS' ? 1 : 0, 1.2);
                    addCommentary(`🔥 <strong>BERJAYA!</strong> Tindakan cemerlang anda mengubah momentum perlawanan!`, 'decision-log');
                    if (opt.type === 'SHOT') {
                        scorers.push(player.name);
                        playGoalSound();
                        // FIXED: Correct team scoring
                        if (homeTeam === player.club) {
                            currentHome++;
                            scoreEl.textContent = `${currentHome} - ${currentAway}`;
                            addCommentary(`⚽ ${player.name} menjaringkan gol!`, 'goal');
                        } else {
                            currentAway++;
                            scoreEl.textContent = `${currentHome} - ${currentAway}`;
                            addCommentary(`⚽ ${player.name} menjaringkan gol!`, 'goal');
                        }
                    } else if (opt.type === 'PASS') {
                        assisters.push(player.name);
                        addCommentary(`👟 ${player.name} membuat hantaran assist!`, 'goal');
                    }
                } else {
                    addCommentary(`❌ Pertahanan lawan berjaya membaca gerakan anda.`, 'card');
                }
            };
            optionsEl.appendChild(btn);
        });
        overlay.classList.add('active');
    }

    // --- 12. OVR CALCULATION & AGING ---
    function calculateSeasonOVRChanges() {
        const seasonStats = player.leagueData[activeLeagueName].playerStats;
        const position = player.position;
        const age = player.age;
        const currentOVR = player.ovr;
        let ovrChange = 0;

        if (position === 'ST' || position === 'CF') {
            const goals = seasonStats.goals || 0;
            const assists = seasonStats.assists || 0;
            if (goals >= 5) ovrChange += 1;
            if (goals >= 10) ovrChange += 1;
            if (goals >= 15) ovrChange += 1;
            if (goals >= 20) ovrChange += 2;
            if (assists >= 5) ovrChange += 0.5;
        } else if (position === 'LW' || position === 'RW' || position === 'LM' || position === 'RM') {
            const goals = seasonStats.goals || 0;
            const assists = seasonStats.assists || 0;
            const keyPasses = seasonStats.keyPasses || 0;
            if (goals >= 5) ovrChange += 0.5;
            if (goals >= 10) ovrChange += 1;
            if (assists >= 5) ovrChange += 0.5;
            if (assists >= 10) ovrChange += 1;
            if (keyPasses >= 10) ovrChange += 0.5;
        } else if (position === 'CAM' || position === 'CM') {
            const assists = seasonStats.assists || 0;
            const keyPasses = seasonStats.keyPasses || 0;
            const goals = seasonStats.goals || 0;
            if (assists >= 5) ovrChange += 0.5;
            if (assists >= 10) ovrChange += 1;
            if (assists >= 15) ovrChange += 1.5;
            if (keyPasses >= 15) ovrChange += 0.5;
            if (goals >= 3) ovrChange += 0.5;
        } else if (position === 'CDM') {
            const interceptions = seasonStats.interceptions || 0;
            const tackles = seasonStats.tackles || 0;
            const passes = seasonStats.passes || 0;
            if (interceptions >= 20) ovrChange += 0.5;
            if (interceptions >= 40) ovrChange += 1;
            if (tackles >= 20) ovrChange += 0.5;
            if (tackles >= 40) ovrChange += 1;
            if (passes >= 200) ovrChange += 0.5;
        } else if (position === 'CB' || position === 'LB' || position === 'RB') {
            const interceptions = seasonStats.interceptions || 0;
            const tackles = seasonStats.tackles || 0;
            const cleanSheets = seasonStats.cleanSheets || 0;
            if (interceptions >= 20) ovrChange += 0.5;
            if (interceptions >= 40) ovrChange += 1;
            if (tackles >= 20) ovrChange += 0.5;
            if (tackles >= 40) ovrChange += 1;
            if (cleanSheets >= 5) ovrChange += 0.5;
            if (cleanSheets >= 10) ovrChange += 1;
        } else if (position === 'GK') {
            const cleanSheets = seasonStats.cleanSheets || 0;
            const saves = Math.floor(Math.random() * 30) + 10;
            if (cleanSheets >= 5) ovrChange += 0.5;
            if (cleanSheets >= 10) ovrChange += 1;
            if (cleanSheets >= 15) ovrChange += 1.5;
            if (saves >= 30) ovrChange += 0.5;
        }

        if (age >= 30 && age < 35) ovrChange -= 0.5;
        else if (age >= 35 && age < 40) ovrChange -= 1;
        else if (age >= 40 && age < 45) ovrChange -= 1.5;
        else if (age >= 45) ovrChange -= 2;

        player.ovr = Math.max(0, Math.min(99, currentOVR + ovrChange));

        if (age >= 51) {
            player.retired = true;
            player.retirementSeason = player.season;
            if (!player.hallOfFame) player.hallOfFame = [];
            player.hallOfFame.push({
                name: player.name,
                club: player.club,
                season: player.season,
                ovr: player.ovr,
                goals: player.goalsScored || 0,
                assists: player.assists || 0,
                matches: player.matchesPlayed || 0,
                trophies: player.trophies || []
            });
        }
        saveData();
    }

    function resetSeason() {
        player.age++;
        player.currentMatchWeek = 1;
        player.season = (player.season || 1) + 1;
        const lData = player.leagueData[activeLeagueName];
        if (lData && lData.standings) {
            activeClubs.forEach(club => {
                lData.standings[club] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };
            });
        }
        if (lData) {
            lData.playerStats = { goals: 0, assists: 0, cleanSheets: 0, tackles: 0, interceptions: 0, passes: 0, keyPasses: 0 };
        }
        saveData();
        updateUI();
    }

    // --- 13. PRESS CONFERENCE SYSTEM ---
    function showPressConference() {
        const overlay = document.getElementById('decisionOverlay');
        document.getElementById('decisionTitle').textContent = `📰 KONFERENSI PERS AKHIR MUSIM!`;
        const seasonStats = player.leagueData[activeLeagueName].playerStats;
        const goals = seasonStats.goals || 0;
        const assists = seasonStats.assists || 0;
        const club = player.club;
        const questions = [];
        
        if (goals >= 10) {
            questions.push({
                question: `Prestasi cemerlang dengan ${goals} gol musim ini. Adakah anda sasarkan lebih musim depan?`,
                options: ["Ya, saya mahu mencapai 20 gol!", "Saya fokus membantu pasukan dahulu.", "Saya tidak mahu memberi tekanan pada diri sendiri."]
            });
        } else if (assists >= 10) {
            questions.push({
                question: `${assists} assist musim ini membuktikan kepandaian anda. Bagaimana pandangan anda?`,
                options: ["Saya sukakan permainan kreatif!", "Kredit untuk rakan sepasukan.", "Saya masih perlu tingkatkan lagi."]
            });
        } else {
            questions.push({
                question: `Bagaimana anda menilai musim ini di ${club}?`,
                options: ["Sangat positif, saya belajar banyak.", "Biasa-biasa saja, perlu lebih usaha.", "Kurang memuaskan, saya kecewa."]
            });
        }
        questions.push({
            question: `Apa rancangan anda untuk musim depan?`,
            options: ["Kekal dan berkembang di sini.", "Saya mahu berpindah ke kelab lebih besar.", "Saya tidak pasti lagi."]
        });

        const selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 2);
        const optionsEl = document.getElementById('decisionOptions');
        optionsEl.innerHTML = '';
        let currentQuestionIndex = 0;

        function showQuestion(index) {
            if (index >= selectedQuestions.length) {
                overlay.classList.remove('active');
                isPausedForDecision = false;
                addCommentary('📰 Konferensi pers tamat. Media memberi respon positif!', 'goal');
                return;
            }
            const q = selectedQuestions[index];
            document.getElementById('decisionDesc').textContent = q.question;
            optionsEl.innerHTML = '';
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'btn-decision';
                btn.textContent = opt;
                btn.onclick = () => {
                    const responseEffect = Math.floor(Math.random() * 5) + 1;
                    player.morale = Math.min(100, (player.morale || 70) + responseEffect);
                    player.reputation = (player.reputation || 0) + 1;
                    addCommentary(`📰 ${player.name}: "${opt}"`, 'goal');
                    saveData();
                    currentQuestionIndex++;
                    setTimeout(() => showQuestion(currentQuestionIndex), 1000);
                };
                optionsEl.appendChild(btn);
            });
        }
        overlay.classList.add('active');
        isPausedForDecision = true;
        showQuestion(0);
    }

    // --- 14. UI RENDER ---
    function renderStandings() {
        const leagueRef = player.leagueData[activeLeagueName];
        if (!leagueRef || !leagueRef.standings) return;
        const s = leagueRef.standings;
        const sorted = Object.keys(s).map(c => ({ club: c, ...s[c] })).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
        let html = `<table class="custom-table"><thead><tr><th>#</th><th>Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>PTS</th></tr></thead><tbody>`;
        sorted.forEach((item, idx) => {
            const gd = item.gf - item.ga;
            html += `<tr class="${item.club === player.club ? 'user-row' : ''}">
                <td>${idx + 1}</td><td><strong>${item.club}</strong></td>
                <td>${item.played}</td><td>${item.won}</td><td>${item.drawn}</td><td>${item.lost}</td>
                <td>${gd > 0 ? '+'+gd : gd}</td><td><strong>${item.pts}</strong></td>
            </tr>`;
        });
        document.getElementById('standingsContainer').innerHTML = html + `</tbody></table>`;
    }

    function renderLeaderboards() {
        const data = player.leagueData[activeLeagueName];
        if (!data) return;

        // TOP SCORERS - SORT & SLICE
        const scorers = Object.keys(data.topScorers).map(n => ({ name: n, goals: data.topScorers[n] })).sort((a, b) => b.goals - a.goals).slice(0, 10);
        let sHtml = `<table class="custom-table"><thead><tr><th>Player</th><th>Goals</th></tr></thead><tbody>`;
        if (scorers.length === 0) {
            sHtml += `<tr><td colspan="2" style="text-align:center; color:#787882;">Tiada rekod</td></tr>`;
        } else {
            scorers.forEach(i => {
                const isUser = i.name === player.name;
                sHtml += `<tr class="${isUser ? 'user-row' : ''}"><td>${i.name}${isUser ? ' 👤' : ''}</td><td><strong>${i.goals}</strong></td></tr>`;
            });
        }
        document.getElementById('topScorersContainer').innerHTML = sHtml + `</tbody></table>`;

        // TOP ASSISTS - SORT & SLICE
        const assisters = Object.keys(data.topAssists).map(n => ({ name: n, assists: data.topAssists[n] })).sort((a, b) => b.assists - a.assists).slice(0, 10);
        let aHtml = `<table class="custom-table"><thead><tr><th>Player</th><th>Assists</th></tr></thead><tbody>`;
        if (assisters.length === 0) {
            aHtml += `<tr><td colspan="2" style="text-align:center; color:#787882;">Tiada rekod</td></tr>`;
        } else {
            assisters.forEach(i => {
                const isUser = i.name === player.name;
                aHtml += `<tr class="${isUser ? 'user-row' : ''}"><td>${i.name}${isUser ? ' 👤' : ''}</td><td><strong>${i.assists}</strong></td></tr>`;
            });
        }
        document.getElementById('topAssistsContainer').innerHTML = aHtml + `</tbody></table>`;
    }

    function renderEuropeanResults() {
        const results = player.europeanResults;
        if (!results) return;
        let html = '<div class="european-results">';
        for (const comp in results) {
            const compData = results[comp];
            html += `<h4>${comp}</h4>`;
            if (compData.winner) html += `<p>🏆 Winner: <strong>${compData.winner}</strong></p>`;
            if (compData.runnerUp) html += `<p>🥈 Runner-up: <strong>${compData.runnerUp}</strong></p>`;
        }
        html += '</div>';
        const container = document.getElementById('europeanResultsContainer');
        if (container) container.innerHTML = html;
    }

    function renderTrophies() {
        const trophies = player.trophies || [];
        const container = document.getElementById('trophyContainer');
        if (!container) return;
        if (trophies.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted); font-size:0.8rem;">No trophies yet. Win leagues and cups to fill your cabinet!</p>';
            return;
        }
        const leagueTrophies = trophies.filter(t => t.type === 'League').length;
        const europeanTrophies = trophies.filter(t => t.type === 'European').length;
        const domesticTrophies = trophies.filter(t => t.type === 'Domestic Cup').length;
        const individualTrophies = trophies.filter(t => t.type === 'Individual').length;
        let html = `
            <div class="trophy-stats">
                <div class="trophy-stat"><div class="trophy-icon">🏆</div><div class="trophy-number">${leagueTrophies}</div><div class="trophy-label">League</div></div>
                <div class="trophy-stat"><div class="trophy-icon">🏆</div><div class="trophy-number">${europeanTrophies}</div><div class="trophy-label">European</div></div>
                <div class="trophy-stat"><div class="trophy-icon">🏆</div><div class="trophy-number">${domesticTrophies}</div><div class="trophy-label">Domestic Cup</div></div>
                <div class="trophy-stat"><div class="trophy-icon">🏅</div><div class="trophy-number">${individualTrophies}</div><div class="trophy-label">Individual</div></div>
            </div>
            <div style="max-height:200px; overflow-y:auto;"><table class="custom-table"><thead><tr><th>Season</th><th>Trophy</th><th>Type</th></tr></thead><tbody>`;
        const sortedTrophies = trophies.sort((a, b) => b.season - a.season);
        sortedTrophies.forEach(t => {
            html += `<tr><td>${t.season}</td><td>${t.name}</td><td>${t.type}</td></tr>`;
        });
        html += `</tbody></table></div>`;
        container.innerHTML = html;
    }

    function updateUI() {
        const elements = {
            'careerPlayerName': player.name,
            'careerPosition': player.position,
            'careerAge': `Age: ${player.age}`,
            'careerNationality': player.nationality,
            'careerOVR': `OVR: ${Math.round(player.ovr)}`,
            'careerClub': player.club,
            'currentLeagueBadge': activeLeagueName,
            'matchLeague': `${activeLeagueName} • MD ${player.currentMatchWeek}`,
            'careerMatches': player.matchesPlayed || 0,
            'careerGoals': player.goalsScored || 0,
            'careerAssists': player.assists || 0,
            'seasonDisplay': `Season ${player.season || 1}`
        };
        for (const [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }
        const faceContainer = document.getElementById('careerFaceContainer');
        if (savedFace && faceContainer) {
            faceContainer.innerHTML = `<img src="${savedFace}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
        }
        const opponent = generateOpponent();
        const homeEl = document.getElementById('homeTeam');
        const awayEl = document.getElementById('awayTeam');
        if (homeEl) homeEl.textContent = player.club;
        if (awayEl) awayEl.textContent = opponent;
        renderStandings();
        renderLeaderboards();
        renderEuropeanResults();
        renderTrophies();
        if (player.retired) {
            document.getElementById('btnSimulateMatch').disabled = true;
            document.getElementById('btnSimulateMatch').textContent = '🏆 RETIRED - Hall of Fame';
        }
        if (player.currentMatchWeek > MAX_WEEKS_PER_SEASON && !player.pressConferenceShown) {
            player.pressConferenceShown = true;
            setTimeout(showPressConference, 500);
        }
    }

    // --- 15. EVENT LISTENERS ---
    document.getElementById('btnSimulateMatch').addEventListener('click', () => {
        if (player.retired) {
            alert('🏆 Your player has retired! You can start a new career from the home page.');
            return;
        }
        const away = document.getElementById('awayTeam').textContent;
        startLiveMatchSimulation(player.club, away);
    });
    document.getElementById('btnCloseModal').addEventListener('click', () => {
        document.getElementById('matchModalOverlay').classList.remove('active');
        if (matchInterval) {
            clearInterval(matchInterval);
            matchInterval = null;
        }
    });

    // --- 16. INIT ---
    initStandings();
    updateUI();

})();