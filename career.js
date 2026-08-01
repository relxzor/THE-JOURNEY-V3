// ==================== career.js (v4 - WITH TRANSFER INTEREST GENERATION) ====================
(function() {
    'use strict';

    // --- 1. LOAD PLAYER DATA ---
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player || !player.name) {
        window.location.href = 'index.html';
        return;
    }

    // --- 2. DATABASE: TOP 4 LEAGUES (FULL 20 TEAMS) ---
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
    const MID_SEASON_WEEK = 19;

    // --- 3b. CAREER FIELD BOOTSTRAP ---
    const ABILITY_KEYS = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];

    function defaultAbilities(pos, ovr) {
        const p = (pos || '').toUpperCase();
        const base = Math.max(40, Math.min(90, Math.round(ovr || 65)));
        const profile = {
            GK:  { pace: -15, shooting: -25, passing: -8,  dribbling: -18, defending: 4,  physical: 2 },
            CB:  { pace: -8,  shooting: -20, passing: -6,  dribbling: -12, defending: 6,  physical: 6 },
            LB:  { pace: 4,   shooting: -14, passing: 0,   dribbling: -2,  defending: 3,  physical: 0 },
            RB:  { pace: 4,   shooting: -14, passing: 0,   dribbling: -2,  defending: 3,  physical: 0 },
            CDM: { pace: -4,  shooting: -10, passing: 3,   dribbling: -2,  defending: 6,  physical: 4 },
            CM:  { pace: 0,   shooting: -4,  passing: 6,   dribbling: 2,   defending: 0,  physical: 0 },
            CAM: { pace: 2,   shooting: 2,   passing: 6,   dribbling: 5,   defending: -10, physical: -4 },
            LM:  { pace: 5,   shooting: -4,  passing: 3,   dribbling: 4,   defending: -6, physical: -2 },
            RM:  { pace: 5,   shooting: -4,  passing: 3,   dribbling: 4,   defending: -6, physical: -2 },
            LW:  { pace: 7,   shooting: 2,   passing: 1,   dribbling: 7,   defending: -16, physical: -6 },
            RW:  { pace: 7,   shooting: 2,   passing: 1,   dribbling: 7,   defending: -16, physical: -6 },
            ST:  { pace: 5,   shooting: 8,   passing: -4,  dribbling: 3,   defending: -20, physical: 4 },
            CF:  { pace: 4,   shooting: 7,   passing: 0,   dribbling: 5,   defending: -18, physical: 2 }
        }[p] || { pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0 };
        const abilities = {};
        ABILITY_KEYS.forEach(k => {
            abilities[k] = Math.max(30, Math.min(99, base + profile[k]));
        });
        return abilities;
    }

    function computeMarketValue() {
        const ovr = player.ovr || 60;
        const age = player.age || 20;
        let value = Math.pow(Math.max(1, ovr - 40), 3.8) * 25;
        let ageMult = 1;
        if (age <= 20) ageMult = 1.25;
        else if (age <= 27) ageMult = 1.15;
        else if (age <= 30) ageMult = 0.9;
        else if (age <= 33) ageMult = 0.6;
        else if (age <= 36) ageMult = 0.35;
        else ageMult = 0.15;
        value *= ageMult;
        const formBonus = Math.min(value * 0.35, (player.goalsScored || 0) * 30000 + (player.assists || 0) * 20000);
        value += formBonus;
        value += (player.trophies || []).length * 250000;
        return Math.max(10000, Math.round(value / 1000) * 1000);
    }

    function ensureCareerFields() {
        if (!player.currentMatchWeek || isNaN(player.currentMatchWeek)) player.currentMatchWeek = 1;
        if (!player.season) player.season = 1;
        if (typeof player.ovr !== 'number' || isNaN(player.ovr)) player.ovr = 60;
        if (typeof player.age !== 'number' || isNaN(player.age)) player.age = 18;
        if (typeof player.morale !== 'number') player.morale = 70;
        if (!player.trophies) player.trophies = [];
        if (!player.ratingHistory) player.ratingHistory = [];
        if (!player.abilities) player.abilities = defaultAbilities(player.position, player.ovr);
        ABILITY_KEYS.forEach(k => {
            if (typeof player.abilities[k] !== 'number' || isNaN(player.abilities[k])) {
                player.abilities[k] = defaultAbilities(player.position, player.ovr)[k];
            }
        });
        if (!player.marketValue) player.marketValue = computeMarketValue();
        if (!player.seasonMatchHistory) player.seasonMatchHistory = [];
        if (typeof player.careerRatingTotal !== 'number') {
            player.careerRatingTotal = (player.ratingHistory || []).reduce((a, b) => a + b, 0);
            player.careerRatingCount = (player.ratingHistory || []).length;
        }
        ensureEuropeanSeason();
        saveData();
    }

    function growAbilities(points) {
        if (points <= 0) return [];
        const pos = (player.position || '').toUpperCase();
        const weights = {
            GK:  { defending: 3, physical: 2, passing: 2, pace: 1, dribbling: 1, shooting: 0 },
            CB:  { defending: 4, physical: 3, passing: 2, pace: 1, dribbling: 1, shooting: 0 },
            LB:  { pace: 3, defending: 3, passing: 2, dribbling: 2, physical: 2, shooting: 1 },
            RB:  { pace: 3, defending: 3, passing: 2, dribbling: 2, physical: 2, shooting: 1 },
            CDM: { defending: 3, passing: 3, physical: 3, dribbling: 1, pace: 1, shooting: 1 },
            CM:  { passing: 4, dribbling: 2, physical: 2, shooting: 2, defending: 2, pace: 1 },
            CAM: { passing: 4, dribbling: 3, shooting: 3, pace: 2, physical: 1, defending: 0 },
            LM:  { pace: 3, dribbling: 3, passing: 3, shooting: 2, physical: 1, defending: 1 },
            RM:  { pace: 3, dribbling: 3, passing: 3, shooting: 2, physical: 1, defending: 1 },
            LW:  { pace: 4, dribbling: 4, shooting: 3, passing: 2, physical: 1, defending: 0 },
            RW:  { pace: 4, dribbling: 4, shooting: 3, passing: 2, physical: 1, defending: 0 },
            ST:  { shooting: 5, pace: 3, physical: 3, dribbling: 2, passing: 1, defending: 0 },
            CF:  { shooting: 4, dribbling: 3, passing: 2, pace: 3, physical: 2, defending: 0 }
        }[pos] || { pace: 2, shooting: 2, passing: 2, dribbling: 2, defending: 2, physical: 2 };

        const pool = [];
        Object.keys(weights).forEach(k => {
            for (let i = 0; i < weights[k]; i++) pool.push(k);
        });
        const gained = {};
        for (let i = 0; i < points && pool.length > 0; i++) {
            const key = pool[Math.floor(Math.random() * pool.length)];
            if (player.abilities[key] >= 99) continue;
            player.abilities[key] = Math.min(99, player.abilities[key] + 1);
            gained[key] = (gained[key] || 0) + 1;
        }
        return Object.keys(gained).map(k => `${k.toUpperCase()} +${gained[k]}`);
    }

    function seasonAverageRating() {
        const history = player.ratingHistory || [];
        if (history.length === 0) return 6.0;
        return history.reduce((a, b) => a + b, 0) / history.length;
    }

    // --- 3c. TOASTS, CAREER RATING AND MATCH HISTORY ---
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 400);
        }, 4200);
    }

    function registerCareerRating(rating) {
        rating = parseFloat(rating.toFixed(1));
        player.careerRatingTotal = (player.careerRatingTotal || 0) + rating;
        player.careerRatingCount = (player.careerRatingCount || 0) + 1;
        player.lastMatchRating = rating;
        if (!player.ratingHistory) player.ratingHistory = [];
        player.ratingHistory.push(rating);
    }

    function careerAverageRating() {
        if (!player.careerRatingCount) return 0;
        return player.careerRatingTotal / player.careerRatingCount;
    }

    function recordMatchHistory(entry) {
        if (!player.seasonMatchHistory) player.seasonMatchHistory = [];
        player.seasonMatchHistory.unshift(entry);
        if (player.seasonMatchHistory.length > 80) player.seasonMatchHistory.length = 80;
        saveData();
    }

    function formatValue(value) {
        if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `€${Math.round(value / 1000)}K`;
        return `€${value}`;
    }

    // ========================================================================
    // ==================== TRANSFER INTEREST GENERATION ====================
    // ========================================================================
    
    /**
     * Generate transfer interest based on player performance
     * Called after every match and at season milestones
     */
    function generateTransferInterest() {
        // Check if player is performing well enough to attract interest
        const ovr = player.ovr || 60;
        const goals = player.goalsScored || 0;
        const assists = player.assists || 0;
        const matches = player.matchesPlayed || 0;
        const seasonAvg = seasonAverageRating();
        const marketValue = computeMarketValue();
        
        // Calculate performance score (0-100)
        let performanceScore = 0;
        
        // OVR contribution (max 40 points)
        if (ovr >= 85) performanceScore += 40;
        else if (ovr >= 80) performanceScore += 30;
        else if (ovr >= 75) performanceScore += 20;
        else if (ovr >= 70) performanceScore += 10;
        else if (ovr >= 65) performanceScore += 5;
        
        // Goals contribution (max 25 points)
        const goalsPerMatch = matches > 0 ? goals / matches : 0;
        if (goalsPerMatch >= 0.8) performanceScore += 25;
        else if (goalsPerMatch >= 0.5) performanceScore += 20;
        else if (goalsPerMatch >= 0.3) performanceScore += 15;
        else if (goalsPerMatch >= 0.15) performanceScore += 8;
        else if (goalsPerMatch >= 0.05) performanceScore += 3;
        
        // Assists contribution (max 20 points)
        const assistsPerMatch = matches > 0 ? assists / matches : 0;
        if (assistsPerMatch >= 0.5) performanceScore += 20;
        else if (assistsPerMatch >= 0.3) performanceScore += 15;
        else if (assistsPerMatch >= 0.15) performanceScore += 10;
        else if (assistsPerMatch >= 0.05) performanceScore += 5;
        
        // Rating contribution (max 15 points)
        if (seasonAvg >= 7.5) performanceScore += 15;
        else if (seasonAvg >= 7.0) performanceScore += 10;
        else if (seasonAvg >= 6.5) performanceScore += 5;
        else if (seasonAvg >= 6.0) performanceScore += 2;
        
        // Trophies bonus (max 5 points)
        const trophyCount = (player.trophies || []).filter(t => t.season === player.season).length;
        performanceScore += Math.min(5, trophyCount * 2);
        
        // Age adjustment: younger players are more attractive
        const age = player.age || 20;
        if (age <= 21) performanceScore += 10;
        else if (age <= 24) performanceScore += 5;
        else if (age >= 30) performanceScore -= 10;
        else if (age >= 33) performanceScore -= 20;
        
        // Cap at 100
        performanceScore = Math.max(0, Math.min(100, performanceScore));
        
        // Only generate interest if performance score is above threshold
        const INTEREST_THRESHOLD = 30;
        if (performanceScore < INTEREST_THRESHOLD) {
            // Clear existing interests if performance is poor
            if (localStorage.getItem('theJourney_transferInterests')) {
                localStorage.removeItem('theJourney_transferInterests');
            }
            return;
        }
        
        // Generate interested clubs
        const allClubs = [];
        for (const league in worldLeagues) {
            for (const club in worldLeagues[league]) {
                const clubData = worldLeagues[league][club];
                // Skip current club
                if (club === player.club) continue;
                
                // Calculate club interest based on performance score and club status
                const leagueMultiplier = {
                    'Premier League': 1.2,
                    'La Liga': 1.15,
                    'Bundesliga': 1.1,
                    'Serie A': 1.05
                }[league] || 1.0;
                
                // Club prestige (based on position in league)
                const clubsInLeague = Object.keys(worldLeagues[league]);
                const clubIndex = clubsInLeague.indexOf(club);
                const prestige = 100 - ((clubIndex / Math.max(1, clubsInLeague.length - 1)) * 60);
                
                // Interest level
                let interest = (performanceScore / 100) * 80 + (prestige / 100) * 20;
                interest *= leagueMultiplier;
                
                // Random variation
                interest += (Math.random() - 0.5) * 15;
                
                // Adjust for player position - certain clubs might need specific positions
                const positionNeeds = {
                    'ST': { need: 0.8 + Math.random() * 0.4 },
                    'CF': { need: 0.8 + Math.random() * 0.4 },
                    'LW': { need: 0.7 + Math.random() * 0.4 },
                    'RW': { need: 0.7 + Math.random() * 0.4 },
                    'CAM': { need: 0.7 + Math.random() * 0.4 },
                    'CM': { need: 0.6 + Math.random() * 0.4 },
                    'CDM': { need: 0.6 + Math.random() * 0.4 },
                    'LB': { need: 0.6 + Math.random() * 0.4 },
                    'RB': { need: 0.6 + Math.random() * 0.4 },
                    'CB': { need: 0.6 + Math.random() * 0.4 },
                    'GK': { need: 0.5 + Math.random() * 0.4 }
                };
                const posNeed = positionNeeds[player.position]?.need || 0.5;
                interest *= (0.7 + posNeed * 0.3);
                
                interest = Math.max(0, Math.min(100, Math.round(interest)));
                
                if (interest > 25) {
                    // Calculate contract offer
                    const weeklyWage = Math.round((marketValue / 1000000) * 3000 + 2000 + Math.random() * 5000);
                    const contractLength = 2 + Math.floor(Math.random() * 4);
                    const signingBonus = Math.round(marketValue * (0.05 + Math.random() * 0.1));
                    
                    allClubs.push({
                        club: club,
                        league: league,
                        rating: clubData.rating || 70,
                        prestige: Math.round(prestige),
                        interestLevel: interest,
                        offer: {
                            weeklyWage: weeklyWage,
                            contractLength: contractLength,
                            signingBonus: signingBonus,
                            totalValue: weeklyWage * 52 * contractLength + signingBonus
                        },
                        status: 'interested',
                        date: new Date().toISOString()
                    });
                }
            }
        }
        
        // Sort by interest level and take top clubs
        allClubs.sort((a, b) => b.interestLevel - a.interestLevel);
        
        // Determine how many clubs to show (based on performance)
        let numClubs = 0;
        if (performanceScore >= 80) numClubs = Math.min(8, allClubs.length);
        else if (performanceScore >= 65) numClubs = Math.min(6, allClubs.length);
        else if (performanceScore >= 50) numClubs = Math.min(4, allClubs.length);
        else numClubs = Math.min(2, allClubs.length);
        
        const selectedClubs = allClubs.slice(0, numClubs);
        
        // Save to localStorage
        if (selectedClubs.length > 0) {
            localStorage.setItem('theJourney_transferInterests', JSON.stringify(selectedClubs));
            
            // Add media mention about transfer interest
            if (!player.mediaMentions) player.mediaMentions = [];
            const topClub = selectedClubs[0];
            player.mediaMentions.unshift({
                headline: `📰 ${topClub.club} shows interest in ${player.name}!`,
                detail: `${topClub.club} are reportedly monitoring ${player.name}'s progress after impressive performances.`,
                date: new Date().toISOString(),
                type: 'transfer_interest'
            });
            
            // Show toast notification
            if (selectedClubs.length > 0) {
                const clubNames = selectedClubs.slice(0, 3).map(c => c.club).join(', ');
                const more = selectedClubs.length > 3 ? ` and ${selectedClubs.length - 3} more` : '';
                showToast(`📩 Transfer interest from ${clubNames}${more}! Check Transfers page.`, 'success');
            }
            
            saveData();
        }
    }

    /**
     * Check if transfer interest should be generated
     * Called after match completion and at key milestones
     */
    function checkAndGenerateTransferInterest() {
        // Only generate if player is performing well
        const ovr = player.ovr || 60;
        const matches = player.matchesPlayed || 0;
        const goals = player.goalsScored || 0;
        
        // Criteria: OVR >= 65, played at least 3 matches, and either scoring or assisting
        if (ovr >= 65 && matches >= 3 && (goals >= 1 || (player.assists || 0) >= 1)) {
            generateTransferInterest();
        }
        
        // Also generate at mid-season and end-season
        if (player.currentMatchWeek === MID_SEASON_WEEK || player.currentMatchWeek === 1) {
            generateTransferInterest();
        }
    }

    // ========================================================================
    // ==================== DOMESTIC CUPS ====================
    // ========================================================================

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
    const EURO_COMPS = ['UEFA Champions League', 'UEFA Europa League', 'UEFA Conference League'];
    const EURO_SHORT = {
        'UEFA Champions League': 'UCL',
        'UEFA Europa League': 'UEL',
        'UEFA Conference League': 'UECL'
    };
    const EURO_STAGES = ['Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'];
    const EURO_STAGE_WEEKS = [8, 16, 24, 32];

    function getGlobalClubStrength(club) {
        for (const league in worldLeagues) {
            const clubs = Object.keys(worldLeagues[league]);
            const idx = clubs.indexOf(club);
            if (idx !== -1) {
                const span = Math.max(1, clubs.length - 1);
                const leagueBonus = { 'Premier League': 3, 'La Liga': 2, 'Bundesliga': 1, 'Serie A': 1 }[league] || 0;
                return 85 - (idx * (16 / span)) + leagueBonus;
            }
        }
        return 72;
    }

    function leagueQualificationOrder(leagueName) {
        if (leagueName === activeLeagueName && player.lastSeasonTable && player.lastSeasonTable.length > 0) {
            return player.lastSeasonTable.slice();
        }
        return Object.keys(worldLeagues[leagueName]);
    }

    function buildEuropeanSeason() {
        const fields = { 'UEFA Champions League': [], 'UEFA Europa League': [], 'UEFA Conference League': [] };
        for (const league in worldLeagues) {
            const order = leagueQualificationOrder(league);
            fields['UEFA Champions League'].push(...order.slice(0, 4));
            fields['UEFA Europa League'].push(...order.slice(4, 8));
            fields['UEFA Conference League'].push(...order.slice(8, 12));
        }
        const comps = {};
        let userComp = null;
        EURO_COMPS.forEach(comp => {
            const teams = fields[comp].sort(() => Math.random() - 0.5);
            comps[comp] = { teams: teams, alive: teams.slice(), rounds: [], winner: null, runnerUp: null, userExitStage: null };
            if (teams.includes(player.club)) userComp = comp;
        });
        player.europeanState = { season: player.season || 1, stageIndex: 0, comps: comps, userComp: userComp };
        player.europeanResults = {};
        EURO_COMPS.forEach(c => { player.europeanResults[c] = { winner: null, runnerUp: null }; });
        saveData();
    }

    function ensureEuropeanSeason() {
        if (!player.europeanState || player.europeanState.season !== (player.season || 1)) {
            buildEuropeanSeason();
        }
    }

    function simulateEuroTie(teamA, teamB) {
        const sA = getGlobalClubStrength(teamA) + (teamA === player.club ? ((player.ovr || 70) - 70) * 0.1 : 0);
        const sB = getGlobalClubStrength(teamB) + (teamB === player.club ? ((player.ovr || 70) - 70) * 0.1 : 0);
        const expA = Math.max(0.4, Math.min(3.2, 1.4 * Math.pow(sA / sB, 1.8)));
        const expB = Math.max(0.4, Math.min(3.2, 1.4 * Math.pow(sB / sA, 1.8)));
        const poisson = (lambda) => {
            let L = Math.exp(-lambda), k = 0, p = 1;
            do { k++; p *= Math.random(); } while (p > L);
            return k - 1;
        };
        let a = poisson(expA);
        let b = poisson(expB);
        let note = '';
        let winner;
        if (a === b) {
            const pens = Math.random() < (sA / (sA + sB));
            winner = pens ? teamA : teamB;
            note = 'after penalties';
        } else {
            winner = a > b ? teamA : teamB;
        }
        return { home: teamA, away: teamB, homeScore: a, awayScore: b, winner: winner, note: note };
    }

    function recordUserEuropeanMatch(comp, stage, tie) {
        const isHome = tie.home === player.club;
        const opponent = isHome ? tie.away : tie.home;
        const gf = isHome ? tie.homeScore : tie.awayScore;
        const ga = isHome ? tie.awayScore : tie.homeScore;
        const won = tie.winner === player.club;

        const pos = (player.position || '').toUpperCase();
        let goals = 0, assists = 0;
        for (let i = 0; i < gf; i++) {
            if (Math.random() < userScoringShare()) goals++;
            else if (Math.random() < userAssistShare()) assists++;
        }

        let rating = 6.1 + Math.random() * 0.3;
        rating += goals * 1.2 + assists * 0.7;
        rating += won ? 0.3 : (gf === ga ? 0 : -0.3);
        if (['GK', 'CB', 'LB', 'RB'].includes(pos)) rating += ga === 0 ? 0.4 : -0.15 * ga;
        rating += (((player.ovr || 70) - 70) / 100) * 2;
        rating = clampRating(parseFloat(rating.toFixed(1)));

        player.matchesPlayed = (player.matchesPlayed || 0) + 1;
        player.goalsScored = (player.goalsScored || 0) + goals;
        player.assists = (player.assists || 0) + assists;
        registerCareerRating(rating);

        recordMatchHistory({
            competition: EURO_SHORT[comp],
            competitionFull: comp,
            stage: stage,
            week: player.currentMatchWeek,
            season: player.season || 1,
            home: tie.home,
            away: tie.away,
            homeScore: tie.homeScore,
            awayScore: tie.awayScore,
            result: won ? 'W' : (gf === ga ? 'D' : 'L'),
            rating: rating,
            goals: goals,
            assists: assists,
            cleanSheet: ga === 0 ? 1 : 0,
            note: tie.note
        });

        const line = `${EURO_SHORT[comp]} ${stage}: ${tie.home} ${tie.homeScore}-${tie.awayScore} ${tie.away}${tie.note ? ' (' + tie.note + ')' : ''}`;
        if (won) {
            showToast(`🌍 ${line} — ${player.club} march on! Your rating: ${rating.toFixed(1)}`, 'success');
        } else {
            showToast(`🌍 ${line} — ${player.club} are out of the competition. Your rating: ${rating.toFixed(1)}`, 'warning');
        }
    }

    function simulateEuropeanStage() {
        ensureEuropeanSeason();
        const state = player.europeanState;
        if (state.stageIndex >= EURO_STAGES.length) return;
        const stage = EURO_STAGES[state.stageIndex];

        EURO_COMPS.forEach(comp => {
            const c = state.comps[comp];
            if (!c || c.winner) return;
            const alive = c.alive.slice();
            if (alive.length < 2) return;
            const ties = [];
            const nextAlive = [];
            for (let i = 0; i + 1 < alive.length; i += 2) {
                const tie = simulateEuroTie(alive[i], alive[i + 1]);
                ties.push(tie);
                nextAlive.push(tie.winner);
                if (alive[i] === player.club || alive[i + 1] === player.club) {
                    recordUserEuropeanMatch(comp, stage, tie);
                    if (tie.winner !== player.club) c.userExitStage = stage;
                }
            }
            c.rounds.push({ stage: stage, ties: ties });
            c.alive = nextAlive;
            if (stage === 'Final' && ties.length > 0) {
                c.winner = ties[0].winner;
                c.runnerUp = ties[0].winner === ties[0].home ? ties[0].away : ties[0].home;
                player.europeanResults[comp] = { winner: c.winner, runnerUp: c.runnerUp };
                if (c.winner === player.club) {
                    awardTrophy({ name: `${comp} Winner`, season: player.season || 1, type: 'European' });
                    showToast(`🏆 TROPHY MOMENT! ${player.club} are ${comp} champions!`, 'success');
                } else if (c.runnerUp === player.club) {
                    showToast(`🥈 So close — ${player.club} lose the ${comp} final to ${c.winner}.`, 'warning');
                }
            }
        });

        state.stageIndex++;
        saveData();
        updateUI();
    }

    function awardTrophy(trophy) {
        if (!player.trophies) player.trophies = [];
        if (player.trophies.some(t => t.name === trophy.name && t.season === trophy.season)) return false;
        player.trophies.push(Object.assign({ date: new Date().toISOString() }, trophy));
        saveData();
        return true;
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
                addCommentary(`🏆 <strong>${player.club} WIN THE LEAGUE!</strong> ${activeLeagueName} champions in season ${season}!`, 'goal');
            }
        }
        const domesticCups = simulateDomesticCups();
        domesticCups.forEach(cup => {
            if (cup.winner === player.club) {
                const trophy = { name: cup.name, season: season, type: 'Domestic Cup', date: new Date().toISOString() };
                if (!player.trophies.some(t => t.name === trophy.name && t.season === trophy.season)) {
                    player.trophies.push(trophy);
                    addCommentary(`🏆 <strong>${player.club} WIN THE ${cup.name}!</strong> Season ${season}!`, 'goal');
                }
            }
        });
        if (player.ovr >= 80 || seasonAverageRating() >= 7.4) {
            const hasLeagueTrophy = player.trophies.some(t => t.type === 'League' && t.season === season) || seasonAverageRating() >= 7.4;
            if (hasLeagueTrophy) {
                const trophy = { name: `${activeLeagueName} Player of the Season`, season: season, type: 'Individual', date: new Date().toISOString() };
                if (!player.trophies.some(t => t.name === trophy.name && t.season === trophy.season)) {
                    player.trophies.push(trophy);
                    addCommentary(`🏅 <strong>${player.name} - Player of the Season!</strong> Season ${season}!`, 'goal');
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
                playerStats: { goals: 0, assists: 0, cleanSheets: 0, tackles: 0, interceptions: 0, passes: 0, keyPasses: 0, shots: 0, shotsOnTarget: 0 }
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

    // --- 8. UPDATE STANDINGS ---
    function updateStandingsData(home, away, hg, ag, scorers, assisters, matchStats) {
        const leagueRef = player.leagueData[activeLeagueName];
        if (!leagueRef || !leagueRef.standings) return;
        const s = leagueRef.standings;
        if (!s[home]) s[home] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };
        if (!s[away]) s[away] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };

        s[home].played += 1;
        s[away].played += 1;
        s[home].gf += hg;
        s[home].ga += ag;
        s[away].gf += ag;
        s[away].ga += hg;

        if (hg > ag) {
            s[home].won += 1; s[home].pts += 3; s[away].lost += 1;
        } else if (hg < ag) {
            s[away].won += 1; s[away].pts += 3; s[home].lost += 1;
        } else {
            s[home].drawn += 1; s[home].pts += 1; s[away].drawn += 1; s[away].pts += 1;
        }

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

        if (matchStats) {
            const ps = leagueRef.playerStats;
            ps.goals += matchStats.goals || 0;
            ps.assists += matchStats.assists || 0;
            ps.cleanSheets += matchStats.cleanSheets || 0;
            ps.tackles += matchStats.tackles || 0;
            ps.interceptions += matchStats.interceptions || 0;
            ps.passes += matchStats.passes || 0;
            ps.keyPasses += matchStats.keyPasses || 0;
            ps.shots = (ps.shots || 0) + (matchStats.shots || 0);
            ps.shotsOnTarget = (ps.shotsOnTarget || 0) + (matchStats.shotsOnTarget || 0);
        }
    }

    // --- 9. NPC MATCHES SIMULATION ---
    function simulateLeagueNpcMatches(currentUserHome, currentUserAway) {
        const leagueRef = player.leagueData[activeLeagueName];
        let unplayedClubs = activeClubs.filter(c => c !== currentUserHome && c !== currentUserAway);
        unplayedClubs.sort(() => Math.random() - 0.5);

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
                const candidates = players.filter(p => p.name !== scorerName);
                const midfielders = candidates.filter(p => ['CM','CAM','CDM','LW','RW','LM','RM'].includes(p.pos));
                const defenders = candidates.filter(p => ['LB','RB'].includes(p.pos));
                if (midfielders.length > 0 && Math.random() < 0.7) return midfielders[Math.floor(Math.random() * midfielders.length)].name;
                if (defenders.length > 0 && Math.random() < 0.3) return defenders[Math.floor(Math.random() * defenders.length)].name;
                return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)].name : null;
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
            rosterData = [
                { name: "GK", pos: "GK" },
                { name: "RB", pos: "RB" },
                { name: "CB1", pos: "CB" },
                { name: "CB2", pos: "CB" },
                { name: "LB", pos: "LB" },
                { name: "CDM", pos: "CDM" },
                { name: "CM", pos: "CM" },
                { name: "CAM", pos: "CAM" },
                { name: "RW", pos: "RW" },
                { name: "ST", pos: "ST" },
                { name: "LW", pos: "LW" }
            ];
        }
        
        while (rosterData.length < 11) {
            const positions = ["GK", "RB", "CB", "LB", "CDM", "CM", "CAM", "RW", "ST", "LW"];
            const pos = positions[rosterData.length % positions.length];
            rosterData.push({ name: "Player " + (rosterData.length + 1), pos: pos });
        }

        let roster = rosterData.map(p => ({ ...p }));

        let userInserted = false;
        if (teamName === userPlayer.club) {
            const userPosUpper = userPlayer.position.toUpperCase();
            let idx = roster.findIndex(p => p.pos.toUpperCase() === userPosUpper);
            
            if (idx !== -1) {
                roster[idx] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                userInserted = true;
            } else {
                if (userPosUpper === 'ST' || userPosUpper === 'CF') {
                    let stIdx = roster.findIndex(p => p.pos === 'ST');
                    if (stIdx !== -1) {
                        roster[stIdx] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                        userInserted = true;
                    }
                } else if (userPosUpper === 'LW' || userPosUpper === 'LWF') {
                    let lwIdx = roster.findIndex(p => p.pos === 'LW');
                    if (lwIdx !== -1) {
                        roster[lwIdx] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                        userInserted = true;
                    }
                } else if (userPosUpper === 'RW' || userPosUpper === 'RWF') {
                    let rwIdx = roster.findIndex(p => p.pos === 'RW');
                    if (rwIdx !== -1) {
                        roster[rwIdx] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                        userInserted = true;
                    }
                } else if (userPosUpper === 'GK') {
                    let gkIdx = roster.findIndex(p => p.pos === 'GK');
                    if (gkIdx !== -1) {
                        roster[gkIdx] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                        userInserted = true;
                    }
                }
                
                if (!userInserted) {
                    roster[0] = { name: userPlayer.name, pos: userPosUpper, isUser: true };
                    userInserted = true;
                }
            }
        }

        const teamFormations = {
            'Arsenal': '4-3-3', 'Aston Villa': '4-2-3-1', 'Bournemouth': '4-3-3',
            'Brentford': '4-4-2', 'Brighton': '4-3-3', 'Chelsea': '4-3-3',
            'Crystal Palace': '4-4-2', 'Everton': '4-4-2', 'Fulham': '4-2-3-1',
            'Liverpool': '4-3-3', 'Manchester City': '4-3-3', 'Manchester United': '4-2-3-1',
            'Newcastle': '4-3-3', 'Nottm Forest': '4-4-2', 'Southampton': '4-3-3',
            'Tottenham': '4-3-3', 'West Ham': '4-2-3-1', 'Wolves': '4-4-2',
            'Leicester': '4-2-3-1', 'Ipswich': '4-4-2',
            'Real Madrid': '4-3-3', 'Barcelona': '4-3-3', 'Atletico Madrid': '4-4-2',
            'Athletic Bilbao': '4-4-2', 'Betis': '4-2-3-1', 'Celta Vigo': '4-3-3',
            'Girona': '4-3-3', 'Las Palmas': '4-4-2', 'Osasuna': '4-4-2',
            'Rayo Vallecano': '4-2-3-1', 'Real Sociedad': '4-3-3', 'Sevilla': '4-3-3',
            'Valencia': '4-4-2', 'Villarreal': '4-3-3', 'Alavés': '4-4-2',
            'Espanyol': '4-2-3-1', 'Getafe': '4-4-2', 'Mallorca': '4-2-3-1',
            'Leganés': '4-3-3',
            'Bayern Munich': '4-2-3-1', 'Borussia Dortmund': '4-3-3', 'RB Leipzig': '4-2-3-1',
            'Bayer Leverkusen': '4-3-3', 'Stuttgart': '4-4-2', 'Frankfurt': '4-3-3',
            'Wolfsburg': '4-4-2', 'Mainz': '4-3-3', 'Werder Bremen': '4-2-3-1',
            'Augsburg': '4-4-2', 'Hoffenheim': '4-3-3', 'Heidenheim': '4-4-2',
            'Freiburg': '4-2-3-1', 'Gladbach': '4-3-3', 'Union Berlin': '4-4-2',
            'Bochum': '4-2-3-1', 'Darmstadt': '4-3-3', 'St. Pauli': '4-4-2',
            'Holstein Kiel': '4-2-3-1',
            'Inter Milan': '4-3-3', 'AC Milan': '4-3-3', 'Juventus': '4-2-3-1',
            'Napoli': '4-3-3', 'Roma': '4-2-3-1', 'Lazio': '4-3-3',
            'Atalanta': '4-3-3', 'Fiorentina': '4-2-3-1', 'Bologna': '4-3-3',
            'Torino': '4-4-2', 'Genoa': '4-4-2', 'Udinese': '4-4-2',
            'Monza': '4-2-3-1', 'Sassuolo': '4-3-3', 'Lecce': '4-4-2',
            'Cagliari': '4-2-3-1', 'Empoli': '4-3-3', 'Venezia': '4-4-2',
            'Como': '4-3-3'
        };

        const formationKey = teamFormations[teamName] || '4-3-3';
        
        const formationDefs = {
            '4-3-3': {
                rows: [
                    [ { pos: 'LW' }, { pos: 'ST' }, { pos: 'RW' } ],
                    [ { pos: 'CM' }, { pos: 'CAM' }, { pos: 'CM' } ],
                    [ { pos: 'LB' }, { pos: 'CB' }, { pos: 'CB' }, { pos: 'RB' } ],
                    [ { pos: 'GK' } ]
                ]
            },
            '4-4-2': {
                rows: [
                    [ { pos: 'ST' }, { pos: 'ST' } ],
                    [ { pos: 'LM' }, { pos: 'CM' }, { pos: 'CM' }, { pos: 'RM' } ],
                    [ { pos: 'LB' }, { pos: 'CB' }, { pos: 'CB' }, { pos: 'RB' } ],
                    [ { pos: 'GK' } ]
                ]
            },
            '3-5-2': {
                rows: [
                    [ { pos: 'ST' }, { pos: 'ST' } ],
                    [ { pos: 'LM' }, { pos: 'CM' }, { pos: 'CAM' }, { pos: 'CM' }, { pos: 'RM' } ],
                    [ { pos: 'CB' }, { pos: 'CB' }, { pos: 'CB' } ],
                    [ { pos: 'GK' } ]
                ]
            },
            '4-2-3-1': {
                rows: [
                    [ { pos: 'ST' } ],
                    [ { pos: 'LW' }, { pos: 'CAM' }, { pos: 'RW' } ],
                    [ { pos: 'CM' }, { pos: 'CDM' } ],
                    [ { pos: 'LB' }, { pos: 'CB' }, { pos: 'CB' }, { pos: 'RB' } ],
                    [ { pos: 'GK' } ]
                ]
            }
        };

        const selectedFormation = formationDefs[formationKey] || formationDefs['4-3-3'];
        
        const usedPlayers = new Set();
        const lineup = selectedFormation.rows.map(row => {
            return row.map(slot => {
                let player = roster.find(p => p.pos === slot.pos && !usedPlayers.has(p.name));
                if (!player) {
                    const alternatives = {
                        'LW': ['LM', 'RW'], 'RW': ['RM', 'LW'], 'ST': ['CF', 'CAM'],
                        'CAM': ['CM', 'ST'], 'CM': ['CDM', 'CAM'], 'CDM': ['CM', 'CB'],
                        'LB': ['LM', 'RB'], 'RB': ['RM', 'LB'], 'CB': ['CDM', 'RB']
                    };
                    const alt = alternatives[slot.pos] || [];
                    for (let a of alt) {
                        player = roster.find(p => p.pos === a && !usedPlayers.has(p.name));
                        if (player) break;
                    }
                }
                if (!player) {
                    player = roster.find(p => !usedPlayers.has(p.name));
                }
                if (player) {
                    usedPlayers.add(player.name);
                    return player;
                }
                return { name: "Unknown", pos: slot.pos };
            });
        });

        return lineup;
    }

    // --- 11. MATCH ENGINE ---
    const MATCH_DURATION_SEC = 20;
    const TICKS_PER_SECOND = 5;
    const TOTAL_TICKS = MATCH_DURATION_SEC * TICKS_PER_SECOND;
    const MAX_DECISIONS_PER_MATCH = 3;
    const RATING_MIN = 5.0;
    const RATING_MAX = 10.0;

    let matchPlayerStats = {};
    let matchInterval = null;
    let isPausedForDecision = false;
    let isMatchEnded = false;
    let matchScorers = [];
    let matchAssisters = [];
    let decisionsUsed = 0;
    let matchContext = null;
    const savedFace = localStorage.getItem('theJourney_playerFace') || player.faceImage || '';
    let matchStatsTracker = {};
    let globalHomeScore = 0;
    let globalAwayScore = 0;

    function ratingTier(rating) {
        if (rating >= 7.0) return { cls: 'rating-good', color: '#21ba45', label: 'Green' };
        if (rating >= 6.0) return { cls: 'rating-average', color: '#f2711c', label: 'Orange' };
        return { cls: 'rating-bad', color: '#db2828', label: 'Red' };
    }

    function clampRating(rating) {
        return Math.max(RATING_MIN, Math.min(RATING_MAX, rating));
    }

    function getTeamStrength(club) {
        const idx = activeClubs.indexOf(club);
        if (idx === -1) return 72;
        const span = Math.max(1, activeClubs.length - 1);
        return 85 - (idx * (16 / span));
    }

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
                const startRating = parseFloat((6.1 + Math.random() * 0.3).toFixed(1));
                matchPlayerStats[p.name] = { goals: 0, assists: 0, rating: startRating, isUser: isUser, position: p.pos };
                const playerDiv = document.createElement('div');
                playerDiv.className = `pitch-player ${isUser ? 'user-player' : ''}`;
                let avatarContent;
                if (isUser && savedFace) {
                    avatarContent = `<img src="${savedFace}" alt="Player" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                } else {
                    avatarContent = `<i class="fa-solid fa-user"></i>`;
                }
                const tier = ratingTier(startRating);
                playerDiv.innerHTML = `
                    <div class="pitch-avatar">
                        ${avatarContent}
                        <div class="player-rating-badge ${tier.cls}" id="rating_${safeId}" style="background:${tier.color};">${startRating.toFixed(1)}</div>
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
        if (!playerName || !matchPlayerStats[playerName]) return;
        const st = matchPlayerStats[playerName];
        st.goals += goalsDelta;
        st.assists += assistsDelta;
        st.rating = clampRating(st.rating + ratingDelta);
        const safeId = playerName.replace(/[^a-zA-Z0-9]/g, '_');
        const ratingBadge = document.getElementById(`rating_${safeId}`);
        const eventBadge = document.getElementById(`badge_${safeId}`);
        if (ratingBadge) {
            const tier = ratingTier(st.rating);
            ratingBadge.textContent = st.rating.toFixed(1);
            ratingBadge.className = 'player-rating-badge ' + tier.cls;
            ratingBadge.style.background = tier.color;
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

    function getUserRating() {
        const st = matchPlayerStats[player.name];
        return st ? st.rating : 6.0;
    }

    function playGoalSound() {
        try {
            const audio = new Audio('goal.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});
        } catch (e) {}
    }

    function pickScorer(roster) {
        const forwards = roster.filter(p => p.pos === 'ST' || p.pos === 'CF');
        const midfielders = roster.filter(p => ['CM', 'CAM', 'CDM', 'LW', 'RW', 'LM', 'RM'].includes(p.pos));
        const defenders = roster.filter(p => ['CB', 'LB', 'RB'].includes(p.pos));
        const roll = Math.random();
        if (roll < 0.6 && forwards.length > 0) return forwards[Math.floor(Math.random() * forwards.length)].name;
        if (roll < 0.9 && midfielders.length > 0) return midfielders[Math.floor(Math.random() * midfielders.length)].name;
        if (defenders.length > 0) return defenders[Math.floor(Math.random() * defenders.length)].name;
        return roster[Math.floor(Math.random() * roster.length)]?.name || "Player";
    }

    function pickAssister(roster, scorerName) {
        const candidates = roster.filter(p => p.name !== scorerName && p.pos !== 'GK');
        if (candidates.length === 0) return null;
        const creators = candidates.filter(p => ['CM', 'CAM', 'CDM', 'LW', 'RW', 'LM', 'RM', 'LB', 'RB'].includes(p.pos));
        if (creators.length > 0 && Math.random() < 0.8) return creators[Math.floor(Math.random() * creators.length)].name;
        return candidates[Math.floor(Math.random() * candidates.length)].name;
    }

    function userScoringShare() {
        const pos = (player.position || '').toUpperCase();
        if (pos === 'GK') return 0;
        if (pos === 'ST' || pos === 'CF') return 0.42;
        if (['LW', 'RW', 'CAM'].includes(pos)) return 0.32;
        if (['CM', 'LM', 'RM'].includes(pos)) return 0.20;
        return 0.08;
    }

    function userAssistShare() {
        const pos = (player.position || '').toUpperCase();
        if (pos === 'GK') return 0.01;
        if (['CAM', 'CM', 'LW', 'RW', 'LM', 'RM'].includes(pos)) return 0.32;
        if (['LB', 'RB', 'CDM'].includes(pos)) return 0.18;
        if (pos === 'ST' || pos === 'CF') return 0.16;
        return 0.08;
    }

    function registerGoal(scoringTeam, minute, scoreEl) {
        const leaguePool = worldLeagues[activeLeagueName] || worldLeagues["Premier League"];
        const roster = leaguePool[scoringTeam] || [];
        const isUserTeam = scoringTeam === player.club;
        let scorer;

        if (isUserTeam && Math.random() < userScoringShare()) {
            scorer = player.name;
            const userGoalLines = [
                `⚽ <strong>GOOOAL ${minute}'!</strong> ${player.name} rifles it into the back of the net! ${scoringTeam} strike!`,
                `⚽ <strong>GOAL ${minute}'!</strong> Brilliant finish from ${player.name} — the ${scoringTeam} faithful are on their feet!`,
                `⚽ <strong>GOAL ${minute}'!</strong> ${player.name} with a composed, clinical finish! ${scoringTeam} in front!`,
                `⚽ <strong>GOAL ${minute}'!</strong> That man ${player.name} does it again! What a moment for ${scoringTeam}!`,
                `⚽ <strong>GOAL ${minute}'!</strong> ${player.name} finds the corner with precision! ${scoringTeam} celebrate!`
            ];
            addCommentary(userGoalLines[Math.floor(Math.random() * userGoalLines.length)], 'goal');
        } else {
            scorer = pickScorer(roster);
            const npcGoalLines = [
                `⚽ <strong>GOAL ${minute}'!</strong> ${scorer} puts ${scoringTeam} ahead with a clinical strike!`,
                `⚽ <strong>GOAL ${minute}'!</strong> ${scorer} finds the target for ${scoringTeam} — well taken!`,
                `⚽ <strong>GOAL ${minute}'!</strong> It's ${scorer} who breaks through for ${scoringTeam}!`,
                `⚽ <strong>GOAL ${minute}'!</strong> ${scoringTeam} draw first blood — ${scorer} the scorer!`,
                `⚽ <strong>GOAL ${minute}'!</strong> ${scorer} with a superb effort, ${scoringTeam} will be delighted!`
            ];
            addCommentary(npcGoalLines[Math.floor(Math.random() * npcGoalLines.length)], 'goal');
        }
        matchScorers.push(scorer);
        updateTeammateVisuals(scorer, 1, 0, 1.2);
        if (isUserTeam) playGoalSound();

        let assister = null;
        if (Math.random() < 0.68) {
            if (isUserTeam && scorer !== player.name && Math.random() < userAssistShare()) {
                assister = player.name;
            } else {
                assister = pickAssister(roster, scorer);
                if (assister === player.name && Math.random() > userAssistShare()) {
                    assister = pickAssister(roster.filter(p => p.name !== player.name), scorer);
                }
            }
            if (assister) {
                matchAssisters.push(assister);
                updateTeammateVisuals(assister, 0, 1, 0.7);
                addCommentary(`👟 Assist by ${assister}.`, 'goal');
            }
        }

        if (scoringTeam === matchContext.homeTeam) globalHomeScore++;
        else globalAwayScore++;
        if (scoreEl) scoreEl.textContent = `${globalHomeScore} - ${globalAwayScore}`;

        const concedingTeam = scoringTeam === matchContext.homeTeam ? matchContext.awayTeam : matchContext.homeTeam;
        if (concedingTeam === player.club) {
            Object.keys(matchPlayerStats).forEach(name => {
                const pos = matchPlayerStats[name].position;
                if (pos === 'GK') updateTeammateVisuals(name, 0, 0, -0.3);
                else if (['CB', 'LB', 'RB', 'CDM'].includes(pos)) updateTeammateVisuals(name, 0, 0, -0.12);
            });
        }
    }

    function neutralEvent(minute) {
        const home = matchContext.homeTeam;
        const away = matchContext.awayTeam;
        const attacking = Math.random() < 0.5 ? home : away;
        const defending = attacking === home ? away : home;
        const pool = [
            () => addCommentary(`${minute}' ${attacking} push forward — the ball is worked out wide but the cross is cut out by the ${defending} defence.`, 'neutral'),
            () => addCommentary(`${minute}' Patient build-up from ${attacking} as they look to carve open the ${defending} backline.`, 'neutral'),
            () => addCommentary(`${minute}' Set piece opportunity for ${attacking} in a dangerous area... whipped in but ${defending} clear their lines.`, 'neutral'),
            () => addCommentary(`${minute}' ${defending} sitting deep, forcing ${attacking} to try their luck from range — the effort sails harmlessly over.`, 'neutral'),
            () => addCommentary(`🟨 ${minute}' A late challenge from a ${defending} player and the referee reaches for the yellow card.`, 'card'),
            () => addCommentary(`${minute}' Lightning counter-attack from ${attacking} — they break at pace but the final ball lets them down.`, 'neutral'),
            () => addCommentary(`${minute}' ${attacking} win a corner. The delivery is dangerous but the ${defending} goalkeeper comes out to punch clear.`, 'neutral'),
            () => addCommentary(`${minute}' End-to-end stuff here! ${attacking} surge forward but ${defending} stand firm at the back.`, 'neutral'),
        ];
        pool[Math.floor(Math.random() * pool.length)]();
    }

    function registerOpenPlayAction(minute) {
        const pos = (player.position || '').toUpperCase();
        const roll = Math.random();
        
        if (!matchStatsTracker.shots) matchStatsTracker.shots = 0;
        if (!matchStatsTracker.shotsOnTarget) matchStatsTracker.shotsOnTarget = 0;
        if (!matchStatsTracker.tackles) matchStatsTracker.tackles = 0;
        if (!matchStatsTracker.interceptions) matchStatsTracker.interceptions = 0;
        if (!matchStatsTracker.passes) matchStatsTracker.passes = 0;
        if (!matchStatsTracker.keyPasses) matchStatsTracker.keyPasses = 0;
        if (!matchStatsTracker.dribbles) matchStatsTracker.dribbles = 0;
        if (!matchStatsTracker.fouls) matchStatsTracker.fouls = 0;
        if (!matchStatsTracker.saves) matchStatsTracker.saves = 0;
        if (!matchStatsTracker.cleanSheets) matchStatsTracker.cleanSheets = 0;

        if (['ST', 'CF'].includes(pos) && roll < 0.09) {
            matchStatsTracker.shots++;
            matchStatsTracker.dribbles++;
            const onTarget = Math.random() < 0.42;
            if (onTarget) {
                matchStatsTracker.shotsOnTarget++;
                updateTeammateVisuals(player.name, 0, 0, 0.10);
                const lines = [
                    `${minute}' ${player.name} lets fly from the edge of the box — the keeper stretches to tip it behind!`,
                    `${minute}' ${player.name} spins away from his marker and drills it low — the goalkeeper does well to hold on.`,
                    `${minute}' Clever turn in the box by ${player.name}, he gets the shot away — forced into a fine save.`,
                ];
                addCommentary(lines[Math.floor(Math.random() * lines.length)], 'neutral');
            } else {
                const lines = [
                    `${minute}' ${player.name} tries his luck from the edge of the area — just over the crossbar.`,
                    `${minute}' ${player.name} creates a yard of space but drags the effort wide of the far post.`,
                    `${minute}' Ambitious effort from ${player.name} — the strike lacks the curl to trouble the goalkeeper.`,
                ];
                addCommentary(lines[Math.floor(Math.random() * lines.length)], 'neutral');
            }
        }
        else if (['CAM', 'LW', 'RW'].includes(pos) && roll < 0.10) {
            matchStatsTracker.passes += 4;
            matchStatsTracker.dribbles++;
            if (Math.random() < 0.38) {
                matchStatsTracker.keyPasses++;
                updateTeammateVisuals(player.name, 0, 0, 0.07);
                const lines = [
                    `${minute}' ${player.name} threads a delightful through ball — the striker almost latches onto it.`,
                    `${minute}' Vision from ${player.name}! He spots the run and delivers, but the flag goes up for offside.`,
                    `${minute}' ${player.name} glides past one challenge and feeds it wide — positive play from the midfielder.`,
                ];
                addCommentary(lines[Math.floor(Math.random() * lines.length)], 'neutral');
            }
        }
        else if (['CM', 'CDM', 'LM', 'RM'].includes(pos) && roll < 0.10) {
            matchStatsTracker.passes += 3;
            if (Math.random() < 0.30) {
                matchStatsTracker.interceptions++;
                matchStatsTracker.tackles++;
                updateTeammateVisuals(player.name, 0, 0, 0.06);
                const lines = [
                    `${minute}' ${player.name} reads the play superbly and intercepts the pass — intelligent positioning.`,
                    `${minute}' ${player.name} snaps into the tackle and comes away with the ball cleanly.`,
                    `${minute}' Excellent tracking back from ${player.name} — he nips in to win possession.`,
                ];
                addCommentary(lines[Math.floor(Math.random() * lines.length)], 'neutral');
            } else if (Math.random() < 0.25) {
                matchStatsTracker.keyPasses++;
                updateTeammateVisuals(player.name, 0, 0, 0.05);
                addCommentary(`${minute}' ${player.name} switches the play beautifully — great range of passing.`, 'neutral');
            }
        }
        else if (['CB', 'LB', 'RB'].includes(pos) && roll < 0.08) {
            matchStatsTracker.tackles++;
            matchStatsTracker.interceptions++;
            updateTeammateVisuals(player.name, 0, 0, 0.06);
            const lines = [
                `${minute}' ${player.name} stands his ground and makes a crucial intervention to break up the attack.`,
                `${minute}' Strong defensive header from ${player.name} — he rises highest to clear the danger.`,
                `${minute}' ${player.name} reads the danger early and steps across to make an important clearance.`,
                `${minute}' Textbook defending from ${player.name} — he shepherds the ball out for a goal kick.`,
            ];
            addCommentary(lines[Math.floor(Math.random() * lines.length)], 'neutral');
        }
        else if (pos === 'GK' && roll < 0.05) {
            matchStatsTracker.saves++;
            updateTeammateVisuals(player.name, 0, 0, 0.06);
            const lines = [
                `${minute}' ${player.name} gets down smartly to his left to gather a low drive — safe hands.`,
                `${minute}' ${player.name} commands his area well and comes off his line to claim the cross authoritatively.`,
                `${minute}' Good positioning from ${player.name} — he watches the long-range effort sail harmlessly wide.`,
            ];
            addCommentary(lines[Math.floor(Math.random() * lines.length)], 'neutral');
        }
    }

    function startLiveMatchSimulation(homeTeam, awayTeam) {
        const modal = document.getElementById('matchModalOverlay');
        const scoreEl = document.getElementById('simScoreDisplay');
        const clockEl = document.getElementById('simClock');

        isMatchEnded = false;
        isPausedForDecision = false;
        globalHomeScore = 0;
        globalAwayScore = 0;
        matchScorers = [];
        matchAssisters = [];
        decisionsUsed = 0;

        const homeStrength = getTeamStrength(homeTeam) + 2.5 + ((player.club === homeTeam ? (player.ovr || 70) - 70 : 0) * 0.08);
        const awayStrength = getTeamStrength(awayTeam) + ((player.club === awayTeam ? (player.ovr || 70) - 70 : 0) * 0.08);
        const expectedHome = Math.max(0.45, Math.min(2.5, 1.25 * Math.pow(homeStrength / awayStrength, 1.8)));
        const expectedAway = Math.max(0.35, Math.min(2.1, 0.95 * Math.pow(awayStrength / homeStrength, 1.8)));

        matchContext = { homeTeam, awayTeam, homeStrength, awayStrength, expectedHome, expectedAway };

        document.getElementById('simLeagueHeader').textContent = `${activeLeagueName.toUpperCase()} • MD ${player.currentMatchWeek}`;
        document.getElementById('simHomeName').textContent = homeTeam;
        document.getElementById('simAwayName').textContent = awayTeam;
        scoreEl.textContent = "0 - 0";
        document.getElementById('simCommentaryBox').innerHTML = `<div class="commentary-item">🔊 <strong>KICK-OFF!</strong> Matchday ${player.currentMatchWeek} of the ${activeLeagueName} — ${homeTeam} vs ${awayTeam} is under way!</div>`;
        document.getElementById('btnCloseModal').style.display = 'none';
        modal.classList.add('active');

        setupLineupPitch(player.club);

        const decisionMinutes = [
            18 + Math.floor(Math.random() * 10),
            45 + Math.floor(Math.random() * 10),
            72 + Math.floor(Math.random() * 10)
        ];
        let decisionIndex = 0;
        let tick = 0;

        if (matchInterval) clearInterval(matchInterval);

        matchInterval = setInterval(() => {
            if (isPausedForDecision || isMatchEnded) return;

            tick++;
            const matchMinute = Math.min(90, Math.round((tick / TOTAL_TICKS) * 90));
            clockEl.textContent = `${matchMinute < 10 ? '0' : ''}${matchMinute}:00`;

            if (decisionIndex < decisionMinutes.length && matchMinute >= decisionMinutes[decisionIndex]) {
                decisionIndex++;
                triggerDecision(matchMinute, homeTeam, awayTeam, scoreEl);
                return;
            }

            if (Math.random() < expectedHome / TOTAL_TICKS) registerGoal(homeTeam, matchMinute, scoreEl);
            if (Math.random() < expectedAway / TOTAL_TICKS) registerGoal(awayTeam, matchMinute, scoreEl);
            if (Math.random() < 0.06) neutralEvent(matchMinute);
            if (Math.random() < 0.07) registerOpenPlayAction(matchMinute);

            if (tick >= TOTAL_TICKS) {
                finishMatch(homeTeam, awayTeam, clockEl);
            }
        }, 1000 / TICKS_PER_SECOND);
    }

    function finishMatch(homeTeam, awayTeam, clockEl) {
        isMatchEnded = true;
        clearInterval(matchInterval);
        matchInterval = null;
        if (clockEl) clockEl.textContent = "90:00";
        addCommentary(`🔔 <strong>FULL TIME!</strong> The referee blows the final whistle — ${homeTeam} ${globalHomeScore} - ${globalAwayScore} ${awayTeam}. What a contest!`, 'card');

        const pStat = matchPlayerStats[player.name] || { goals: 0, assists: 0, rating: 6.0 };
        const finalRating = parseFloat(clampRating(pStat.rating).toFixed(1));
        const tier = ratingTier(finalRating);
        addCommentary(`⭐ <strong>Your match rating: ${finalRating.toFixed(1)}</strong> (${tier.label} zone).`, 'decision-log');

        const userIsHome = player.club === homeTeam;
        const goalsFor = userIsHome ? globalHomeScore : globalAwayScore;
        const goalsAgainst = userIsHome ? globalAwayScore : globalHomeScore;
        const isDefensivePlayer = ['GK', 'CB', 'LB', 'RB', 'CDM'].includes((player.position || '').toUpperCase());

        player.matchesPlayed = (player.matchesPlayed || 0) + 1;
        player.goalsScored = (player.goalsScored || 0) + pStat.goals;
        player.assists = (player.assists || 0) + pStat.assists;
        registerCareerRating(finalRating);

        let moraleDelta = goalsFor > goalsAgainst ? 4 : (goalsFor === goalsAgainst ? 1 : -3);
        moraleDelta += (finalRating - 6.5) * 3;
        player.morale = Math.max(0, Math.min(100, Math.round((player.morale || 70) + moraleDelta)));

        const matchStats = {
            goals: pStat.goals,
            assists: pStat.assists,
            cleanSheets: (isDefensivePlayer && goalsAgainst === 0) ? 1 : 0,
            tackles: matchStatsTracker.tackles || (isDefensivePlayer ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 2)),
            interceptions: matchStatsTracker.interceptions || (isDefensivePlayer ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 2)),
            shots: matchStatsTracker.shots || 0,
            shotsOnTarget: matchStatsTracker.shotsOnTarget || 0,
            passes: matchStatsTracker.passes || Math.floor(Math.random() * 20) + 10,
            keyPasses: matchStatsTracker.keyPasses || Math.floor(Math.random() * 3),
            dribbles: matchStatsTracker.dribbles || 0,
            saves: matchStatsTracker.saves || 0
        };

        updateStandingsData(homeTeam, awayTeam, globalHomeScore, globalAwayScore, matchScorers, matchAssisters, matchStats);
        simulateLeagueNpcMatches(homeTeam, awayTeam);

        player.leagueData[activeLeagueName].matchHistory.push({
            home: homeTeam, away: awayTeam,
            homeScore: globalHomeScore, awayScore: globalAwayScore,
            userRating: finalRating,
            week: player.currentMatchWeek,
            date: new Date().toISOString()
        });

        recordMatchHistory({
            competition: 'LGE',
            competitionFull: activeLeagueName,
            stage: `Matchday ${player.currentMatchWeek}`,
            week: player.currentMatchWeek,
            season: player.season || 1,
            home: homeTeam,
            away: awayTeam,
            homeScore: globalHomeScore,
            awayScore: globalAwayScore,
            result: goalsFor > goalsAgainst ? 'W' : (goalsFor === goalsAgainst ? 'D' : 'L'),
            rating: finalRating,
            goals: matchStats.goals,
            assists: matchStats.assists,
            tackles: matchStats.tackles,
            interceptions: matchStats.interceptions,
            keyPasses: matchStats.keyPasses,
            shots: matchStats.shots || 0,
            shotsOnTarget: matchStats.shotsOnTarget || 0,
            cleanSheet: matchStats.cleanSheets
        });

        // ====================================================================
        // === GENERATE TRANSFER INTEREST AFTER EVERY MATCH ===
        // ====================================================================
        checkAndGenerateTransferInterest();

        if (player.ovr >= 75 && !player.internationalCall) {
            player.internationalCall = true;
            addCommentary(`🇺🇳 <strong>INTERNATIONAL CALL-UP!</strong> Your performances have earned you a national team call.`, 'goal');
        }

        if (EURO_STAGE_WEEKS.includes(player.currentMatchWeek)) {
            simulateEuropeanStage();
        }

        player.currentMatchWeek++;
        player.nextOpponent = null;

        if (player.currentMatchWeek === MID_SEASON_WEEK) {
            midSeasonProgression();
        }

        if (player.currentMatchWeek > MAX_WEEKS_PER_SEASON) {
            while (player.europeanState && player.europeanState.stageIndex < EURO_STAGES.length) {
                simulateEuropeanStage();
            }
            calculateSeasonOVRChanges();
            checkAndAwardTrophies();
            resetSeason();
            setTimeout(showPressConference, 1000);
        }

        saveData();
        updateUI();
        document.getElementById('btnCloseModal').style.display = 'block';
    }

    function addCommentary(msg, type = '') {
        const box = document.getElementById('simCommentaryBox');
        if (!box) return;
        const log = document.createElement('div');
        log.className = `commentary-item ${type}`;
        log.innerHTML = msg;
        box.prepend(log);
    }

    // --- DECISION SYSTEM ---
    function triggerDecision(minute, homeTeam, awayTeam, scoreEl) {
        if (decisionsUsed >= MAX_DECISIONS_PER_MATCH || isMatchEnded) return;
        decisionsUsed++;
        isPausedForDecision = true;

        const overlay = document.getElementById('decisionOverlay');
        const optionsEl = document.getElementById('decisionOptions');
        optionsEl.innerHTML = '';

        const position = (player.position || '').toUpperCase();
        let scenarios = [];

        if (position === 'ST' || position === 'CF') {
            scenarios = [
                {
                    title: `🔥 ${minute}' Golden Chance!`,
                    desc: `You are one-on-one with the goalkeeper. What do you do?`,
                    opts: [
                        { text: "⚡ Powerful Shot", risk: "High risk, high reward", type: "SHOT" },
                        { text: "🎯 Pass to Teammate", risk: "Give your teammate the chance", type: "PASS" },
                        { text: "🛡️ Hold the Ball", risk: "Keep possession, wait for support", type: "HOLD" }
                    ]
                },
                {
                    title: `🥅 ${minute}' Free Kick!`,
                    desc: `A free kick in a dangerous area. What is your plan?`,
                    opts: [
                        { text: "⚡ Shoot Directly", risk: "Try to score directly", type: "SHOT" },
                        { text: "🎯 Cross into the Box", risk: "Find a teammate for a header", type: "PASS" },
                        { text: "🔄 Short Pass", risk: "Open space for a second ball", type: "HOLD" }
                    ]
                }
            ];
        } else if (['CM', 'CAM', 'CDM', 'LM', 'RM'].includes(position)) {
            scenarios = [
                {
                    title: `🎯 ${minute}' Assist Opportunity!`,
                    desc: `You pick the ball up in midfield with runners ahead of you.`,
                    opts: [
                        { text: "👟 Through Ball", risk: "Try to release the striker", type: "PASS" },
                        { text: "⚡ Long Shot", risk: "Try your luck from distance", type: "SHOT" },
                        { text: "🛡️ Keep the Ball", risk: "Control the game, low risk", type: "HOLD" }
                    ]
                },
                {
                    title: `📐 ${minute}' Corner Kick!`,
                    desc: `You are on the corner. Who is your target?`,
                    opts: [
                        { text: "✈️ High Cross", risk: "Find the tall men in the box", type: "PASS" },
                        { text: "⚡ Low Drive", risk: "Whip it to the edge of the box", type: "SHOT" },
                        { text: "🔄 Short Corner", risk: "Play short and rebuild", type: "HOLD" }
                    ]
                }
            ];
        } else if (['CB', 'LB', 'RB'].includes(position)) {
            scenarios = [
                {
                    title: `🛡️ ${minute}' Defensive Duel!`,
                    desc: `A winger is running straight at you. What is your action?`,
                    opts: [
                        { text: "⚡ Slide Tackle", risk: "Win it back, but risk a foul", type: "SHOT" },
                        { text: "👟 Intercept and Pass", risk: "Read it and start the attack", type: "PASS" },
                        { text: "🛡️ Contain", risk: "Hold your ground, safe option", type: "HOLD" }
                    ]
                },
                {
                    title: `⚔️ ${minute}' Overlap!`,
                    desc: `Space opens up ahead of you on the flank.`,
                    opts: [
                        { text: "💨 Run Forward", risk: "Push up and take a chance", type: "SHOT" },
                        { text: "👟 Early Cross", risk: "Deliver into the box", type: "PASS" },
                        { text: "⏳ Slow It Down", risk: "Keep your shape, control tempo", type: "HOLD" }
                    ]
                }
            ];
        } else if (position === 'GK') {
            scenarios = [
                {
                    title: `🧤 ${minute}' One-on-One!`,
                    desc: `A striker breaks through on goal. What do you do?`,
                    opts: [
                        { text: "🧤 Rush Out", risk: "Close the angle, high risk", type: "SHOT" },
                        { text: "👟 Sweep and Distribute", risk: "Clear it and start a counter", type: "PASS" },
                        { text: "🛡️ Stay Big on the Line", risk: "Safe, wait for the shot", type: "HOLD" }
                    ]
                },
                {
                    title: `⚡ ${minute}' Set Piece Defence!`,
                    desc: `You must organise the wall for a dangerous free kick.`,
                    opts: [
                        { text: "🧤 Come for the Cross", risk: "Claim it yourself, risky", type: "SHOT" },
                        { text: "📢 Organise the Wall", risk: "Direct your defenders", type: "PASS" },
                        { text: "🛡️ Stay Ready", risk: "Hold your position", type: "HOLD" }
                    ]
                }
            ];
        } else {
            scenarios = [
                {
                    title: `⚡ ${minute}' Wing Duel!`,
                    desc: `You take on your marker on the wing. What do you do?`,
                    opts: [
                        { text: "⚡ Cut Inside and Shoot", risk: "Try to score yourself", type: "SHOT" },
                        { text: "👟 Cross into the Box", risk: "Pick out a teammate", type: "PASS" },
                        { text: "🛡️ Hold the Ball", risk: "Recycle possession, low risk", type: "HOLD" }
                    ]
                },
                {
                    title: `🏃 ${minute}' Fast Break!`,
                    desc: `You lead a 3-on-2 counter attack.`,
                    opts: [
                        { text: "⚡ Shoot Early", risk: "Catch the keeper off guard", type: "SHOT" },
                        { text: "👟 Square It", risk: "Find the free man", type: "PASS" },
                        { text: "🛡️ Wait for Support", risk: "Slow it down, safest choice", type: "HOLD" }
                    ]
                }
            ];
        }

        const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        document.getElementById('decisionTitle').textContent = selectedScenario.title;
        document.getElementById('decisionDesc').textContent = selectedScenario.desc;

        selectedScenario.opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-decision';
            btn.innerHTML = `${opt.text} <span>${opt.risk}</span>`;
            btn.onclick = () => {
                overlay.classList.remove('active');
                isPausedForDecision = false;
                resolveDecision(opt, minute, homeTeam, scoreEl);
            };
            optionsEl.appendChild(btn);
        });
        overlay.classList.add('active');
    }

    function decisionSuccessChance(type) {
        const base = { SHOT: 0.42, PASS: 0.52, HOLD: 0.60 }[type] || 0.5;
        const ovrMod = (((player.ovr || 70) - 70) / 100) * 0.4;
        const moraleMod = (((player.morale || 70) - 70) / 100) * 0.1;
        return Math.max(0.28, Math.min(0.68, base + ovrMod + moraleMod));
    }

    function resolveDecision(opt, minute, homeTeam, scoreEl) {
        const position = (player.position || '').toUpperCase();
        const chance = decisionSuccessChance(opt.type);
        const success = Math.random() < chance;

        addCommentary(`🎮 ${minute}' You chose: <strong>${opt.text.replace(/^[^A-Za-z]+/, '')}</strong>.`, 'decision-log');

        if (success) {
            const shotGoesIn = Math.random() < 0.6;
            if (opt.type === "SHOT" && position !== 'GK' && !['CB', 'LB', 'RB'].includes(position) && shotGoesIn) {
                matchScorers.push(player.name);
                playGoalSound();
                if (homeTeam === player.club) globalHomeScore++;
                else globalAwayScore++;
                if (scoreEl) scoreEl.textContent = `${globalHomeScore} - ${globalAwayScore}`;
                updateTeammateVisuals(player.name, 1, 0, 1.2);
                addCommentary(`⚽ <strong>GOOOAL ${minute}'!</strong> ${player.name} seizes the moment and buries it! What a decision!`, 'goal');
            } else if (opt.type === "PASS" && position !== 'GK') {
                const scored = Math.random() < 0.45;
                if (scored) {
                    const leaguePool = worldLeagues[activeLeagueName] || worldLeagues["Premier League"];
                    const roster = (leaguePool[player.club] || []).filter(p => p.name !== player.name);
                    const finisher = roster.length > 0 ? pickScorer(roster) : 'your teammate';
                    matchScorers.push(finisher);
                    matchAssisters.push(player.name);
                    if (homeTeam === player.club) globalHomeScore++;
                    else globalAwayScore++;
                    if (scoreEl) scoreEl.textContent = `${globalHomeScore} - ${globalAwayScore}`;
                    updateTeammateVisuals(finisher, 1, 0, 1.2);
                    updateTeammateVisuals(player.name, 0, 1, 0.7);
                    playGoalSound();
                    addCommentary(`👟 <strong>BRILLIANT ASSIST!</strong> ${player.name} picks out ${finisher} with an inch-perfect pass — goal!`, 'goal');
                } else {
                    updateTeammateVisuals(player.name, 0, 0, 0.25);
                    addCommentary(`✅ ${minute}' ${player.name} delivers a wonderful ball — the cross is begging to be finished but it's just cut out.`, 'decision-log');
                }
            } else if (opt.type === "SHOT") {
                updateTeammateVisuals(player.name, 0, 0, 0.3);
                addCommentary(`✅ ${minute}' ${player.name} unleashes a powerful strike — the goalkeeper is at full stretch to push it away!`, 'decision-log');
            } else {
                updateTeammateVisuals(player.name, 0, 0, 0.25);
                addCommentary(`✅ ${minute}' ${player.name} reads the situation expertly and comes out on top — smart play.`, 'decision-log');
            }
            addCommentary(`🔥 <strong>SUCCESS!</strong> That decision paid off — your rating climbs to ${getUserRating().toFixed(1)}.`, 'decision-log');
        } else {
            const penalty = { SHOT: 0.5, PASS: 0.4, HOLD: 0.3 }[opt.type] || 0.4;
            updateTeammateVisuals(player.name, 0, 0, -penalty);
            const failLines = {
                SHOT: `❌ ${minute}' ${player.name} goes for glory but the effort is well blocked by the defence.`,
                PASS: `❌ ${minute}' ${player.name} overhits the pass and the move breaks down — possession conceded.`,
                HOLD: `❌ ${minute}' ${player.name} hesitates and is dispossessed — a costly moment.`
            };
            addCommentary(failLines[opt.type] || `❌ ${minute}' Your attempt failed.`, 'card');
            addCommentary(`📉 <strong>UNSUCCESSFUL.</strong> Your rating dips to ${getUserRating().toFixed(1)}.`, 'card');
        }
        saveData();
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
            if (goals >= 3) ovrChange += 0.5;
            if (goals >= 5) ovrChange += 0.5;
            if (goals >= 10) ovrChange += 1;
            if (goals >= 15) ovrChange += 1;
            if (assists >= 3) ovrChange += 0.3;
            if (assists >= 5) ovrChange += 0.5;
        } else if (position === 'LW' || position === 'RW' || position === 'LM' || position === 'RM') {
            const goals = seasonStats.goals || 0;
            const assists = seasonStats.assists || 0;
            const keyPasses = seasonStats.keyPasses || 0;
            if (goals >= 3) ovrChange += 0.5;
            if (goals >= 5) ovrChange += 0.5;
            if (assists >= 3) ovrChange += 0.5;
            if (assists >= 5) ovrChange += 0.5;
            if (keyPasses >= 10) ovrChange += 0.5;
        } else if (position === 'CAM' || position === 'CM') {
            const assists = seasonStats.assists || 0;
            const keyPasses = seasonStats.keyPasses || 0;
            const goals = seasonStats.goals || 0;
            if (assists >= 3) ovrChange += 0.5;
            if (assists >= 5) ovrChange += 0.5;
            if (assists >= 10) ovrChange += 1;
            if (keyPasses >= 10) ovrChange += 0.5;
            if (goals >= 3) ovrChange += 0.5;
        } else if (position === 'CDM') {
            const interceptions = seasonStats.interceptions || 0;
            const tackles = seasonStats.tackles || 0;
            const passes = seasonStats.passes || 0;
            if (interceptions >= 15) ovrChange += 0.5;
            if (interceptions >= 30) ovrChange += 1;
            if (tackles >= 15) ovrChange += 0.5;
            if (tackles >= 30) ovrChange += 1;
            if (passes >= 150) ovrChange += 0.5;
        } else if (position === 'CB' || position === 'LB' || position === 'RB') {
            const interceptions = seasonStats.interceptions || 0;
            const tackles = seasonStats.tackles || 0;
            const cleanSheets = seasonStats.cleanSheets || 0;
            if (interceptions >= 15) ovrChange += 0.5;
            if (interceptions >= 30) ovrChange += 1;
            if (tackles >= 15) ovrChange += 0.5;
            if (tackles >= 30) ovrChange += 1;
            if (cleanSheets >= 3) ovrChange += 0.5;
            if (cleanSheets >= 5) ovrChange += 0.5;
        } else if (position === 'GK') {
            const cleanSheets = seasonStats.cleanSheets || 0;
            const saves = Math.floor(Math.random() * 30) + 10;
            if (cleanSheets >= 3) ovrChange += 0.5;
            if (cleanSheets >= 5) ovrChange += 0.5;
            if (cleanSheets >= 10) ovrChange += 1;
            if (saves >= 20) ovrChange += 0.5;
        }

        ovrChange *= 0.5;

        const avgRating = seasonAverageRating();
        if (avgRating >= 7.5) ovrChange += 2;
        else if (avgRating >= 7.0) ovrChange += 1.2;
        else if (avgRating >= 6.5) ovrChange += 0.6;
        else if (avgRating >= 6.0) ovrChange += 0.2;
        else if (avgRating >= 5.5) ovrChange -= 0.8;
        else ovrChange -= 1.5;

        const seasonTrophies = (player.trophies || []).filter(t => t.season === player.season).length;
        ovrChange += Math.min(1, seasonTrophies * 0.3);

        if (age <= 21) ovrChange += 0.8;
        else if (age <= 24) ovrChange += 0.4;
        else if (age >= 30 && age < 33) ovrChange -= 0.5;
        else if (age >= 33 && age < 36) ovrChange -= 1;
        else if (age >= 36) ovrChange -= 1.8;

        if (currentOVR >= 85 && ovrChange > 0) ovrChange *= 0.4;
        else if (currentOVR >= 80 && ovrChange > 0) ovrChange *= 0.6;
        else if (currentOVR >= 75 && ovrChange > 0) ovrChange *= 0.8;
        ovrChange = Math.max(-3, Math.min(3, ovrChange));

        player.ovr = Math.max(40, Math.min(99, currentOVR + ovrChange));

        const abilityPoints = Math.round(ovrChange * 3);
        let abilityText = '';
        if (abilityPoints > 0) {
            const gained = growAbilities(abilityPoints);
            if (gained.length > 0) abilityText = ` Abilities: ${gained.join(', ')}.`;
        } else if (abilityPoints < 0) {
            for (let i = 0; i < Math.abs(abilityPoints); i++) {
                const key = ABILITY_KEYS[Math.floor(Math.random() * ABILITY_KEYS.length)];
                player.abilities[key] = Math.max(30, player.abilities[key] - 1);
            }
            abilityText = ' Some abilities dropped with age.';
        }

        const oldValue = player.marketValue || computeMarketValue();
        player.marketValue = computeMarketValue();

        addCommentary(`📈 <strong>END OF SEASON REVIEW</strong> — Avg rating ${avgRating.toFixed(2)}, OVR ${Math.round(currentOVR)} → ${Math.round(player.ovr)} (${ovrChange >= 0 ? '+' : ''}${ovrChange.toFixed(1)}).${abilityText} Value: ${formatValue(oldValue)} → ${formatValue(player.marketValue)}.`, 'decision-log');

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

    // --- MID-SEASON PROGRESSION ---
    function midSeasonProgression() {
        const avgRating = seasonAverageRating();
        const oldOVR = player.ovr;
        const oldValue = player.marketValue || computeMarketValue();
        let ovrChange = 0;

        if (avgRating >= 7.5) ovrChange = 1;
        else if (avgRating >= 7.0) ovrChange = 0.6;
        else if (avgRating >= 6.5) ovrChange = 0.3;
        else if (avgRating >= 6.0) ovrChange = 0.1;
        else if (avgRating >= 5.5) ovrChange = -0.3;
        else ovrChange = -0.6;

        if ((player.age || 20) <= 23 && ovrChange > 0) ovrChange += 0.2;
        if (player.ovr >= 85 && ovrChange > 0) ovrChange *= 0.4;
        else if (player.ovr >= 80 && ovrChange > 0) ovrChange *= 0.6;

        player.ovr = Math.max(40, Math.min(99, player.ovr + ovrChange));

        let abilityText = '';
        const abilityPoints = Math.round(ovrChange * 3);
        if (abilityPoints > 0) {
            const gained = growAbilities(abilityPoints);
            if (gained.length > 0) abilityText = ` Abilities: ${gained.join(', ')}.`;
        }

        player.marketValue = computeMarketValue();
        addCommentary(`🗓️ <strong>MID-SEASON REVIEW (MD ${MID_SEASON_WEEK})</strong> — Avg rating ${avgRating.toFixed(2)}, OVR ${Math.round(oldOVR)} → ${Math.round(player.ovr)} (${ovrChange >= 0 ? '+' : ''}${ovrChange.toFixed(1)}).${abilityText} Value: ${formatValue(oldValue)} → ${formatValue(player.marketValue)}.`, 'decision-log');
        
        // Generate transfer interest at mid-season too
        checkAndGenerateTransferInterest();
        
        saveData();
        updateUI();
    }

    function resetSeason() {
        const lData = player.leagueData[activeLeagueName];
        if (lData && lData.standings) {
            player.lastSeasonTable = Object.keys(lData.standings)
                .map(c => ({ club: c, ...lData.standings[c] }))
                .sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga))
                .map(t => t.club);
            player.lastSeasonPosition = player.lastSeasonTable.indexOf(player.club) + 1;
        }
        if (!player.seasonArchive) player.seasonArchive = [];
        player.seasonArchive.unshift({
            season: player.season || 1,
            club: player.club,
            position: player.lastSeasonPosition || null,
            matches: (player.seasonMatchHistory || []).length,
            goals: (player.seasonMatchHistory || []).reduce((a, m) => a + (m.goals || 0), 0),
            assists: (player.seasonMatchHistory || []).reduce((a, m) => a + (m.assists || 0), 0),
            avgRating: parseFloat(seasonAverageRating().toFixed(2)),
            ovr: Math.round(player.ovr)
        });
        if (player.seasonArchive.length > 30) player.seasonArchive.length = 30;

        player.age++;
        player.currentMatchWeek = 1;
        player.season = (player.season || 1) + 1;
        if (lData && lData.standings) {
            activeClubs.forEach(club => {
                lData.standings[club] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };
            });
        }
        if (lData) {
            lData.playerStats = { goals: 0, assists: 0, cleanSheets: 0, tackles: 0, interceptions: 0, passes: 0, keyPasses: 0, shots: 0, shotsOnTarget: 0 };
            Object.keys(lData.topScorers || {}).forEach(n => { lData.topScorers[n] = 0; });
            Object.keys(lData.topAssists || {}).forEach(n => { lData.topAssists[n] = 0; });
            lData.matchHistory = [];
        }
        player.ratingHistory = [];
        player.seasonMatchHistory = [];
        player.pressConferenceShown = false;
        player.nextOpponent = null;
        
        // Clear old transfer interests at season start
        if (localStorage.getItem('theJourney_transferInterests')) {
            localStorage.removeItem('theJourney_transferInterests');
        }
        
        buildEuropeanSeason();
        saveData();
        updateUI();
    }

    // --- 13. PRESS CONFERENCE SYSTEM ---
    function showPressConference() {
        const overlay = document.getElementById('decisionOverlay');
        document.getElementById('decisionTitle').textContent = `📰 END OF SEASON PRESS CONFERENCE!`;
        const seasonStats = player.leagueData[activeLeagueName].playerStats;
        const goals = seasonStats.goals || 0;
        const assists = seasonStats.assists || 0;
        const club = player.club;
        const questions = [];
        
        if (goals >= 10) {
            questions.push({
                question: `Outstanding performance with ${goals} goals this season. Are you targeting more next year?`,
                options: ["Yes, I want to reach 20 goals!", "I focus on helping the team first.", "I don't want to put pressure on myself."]
            });
        } else if (assists >= 10) {
            questions.push({
                question: `${assists} assists this season proves your creativity. What's your take?`,
                options: ["I love creative play!", "Credit to my teammates.", "I still need to improve more."]
            });
        } else {
            questions.push({
                question: `How do you rate your first season at ${club}?`,
                options: ["Very positive, I learned a lot.", "Average, need more effort.", "Disappointing, I'm frustrated."]
            });
        }
        questions.push({
            question: `What are your plans for next season?`,
            options: ["Stay and develop here.", "I want to move to a bigger club.", "I'm not sure yet."]
        });

        const selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 2);
        const optionsEl = document.getElementById('decisionOptions');
        optionsEl.innerHTML = '';
        let currentQuestionIndex = 0;

        function showQuestion(index) {
            if (index >= selectedQuestions.length) {
                overlay.classList.remove('active');
                isPausedForDecision = false;
                addCommentary('📰 Press conference ended. Media gave positive responses!', 'goal');
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

        const scorers = Object.keys(data.topScorers).map(n => ({ name: n, goals: data.topScorers[n] })).sort((a, b) => b.goals - a.goals).slice(0, 10);
        let sHtml = `<table class="custom-table"><thead><tr><th>Player</th><th>Goals</th></tr></thead><tbody>`;
        if (scorers.length === 0) {
            sHtml += `<tr><td colspan="2" style="text-align:center; color:#787882;">No records</td></tr>`;
        } else {
            scorers.forEach(i => {
                const isUser = i.name === player.name;
                sHtml += `<tr class="${isUser ? 'user-row' : ''}"><td>${i.name}${isUser ? ' 👤' : ''}</td><td><strong>${i.goals}</strong></td></tr>`;
            });
        }
        document.getElementById('topScorersContainer').innerHTML = sHtml + `</tbody></table>`;

        const assisters = Object.keys(data.topAssists).map(n => ({ name: n, assists: data.topAssists[n] })).sort((a, b) => b.assists - a.assists).slice(0, 10);
        let aHtml = `<table class="custom-table"><thead><tr><th>Player</th><th>Assists</th></tr></thead><tbody>`;
        if (assisters.length === 0) {
            aHtml += `<tr><td colspan="2" style="text-align:center; color:#787882;">No records</td></tr>`;
        } else {
            assisters.forEach(i => {
                const isUser = i.name === player.name;
                aHtml += `<tr class="${isUser ? 'user-row' : ''}"><td>${i.name}${isUser ? ' 👤' : ''}</td><td><strong>${i.assists}</strong></td></tr>`;
            });
        }
        document.getElementById('topAssistsContainer').innerHTML = aHtml + `</tbody></table>`;
    }

    function renderEuropeanResults() {
        const container = document.getElementById('europeanResultsContainer');
        if (!container) return;
        ensureEuropeanSeason();
        const state = player.europeanState;
        const userComp = state.userComp;

        const qualBadge = document.getElementById('euroQualBadge');
        if (qualBadge) {
            qualBadge.textContent = userComp ? EURO_SHORT[userComp] : 'Not qualified';
            qualBadge.className = 'pill ' + (userComp ? 'pill-green' : 'pill-muted');
        }

        let html = '';
        if (!userComp) {
            html += `<div class="euro-note">${player.club} did not qualify for Europe this season — finish in the top 12 of ${activeLeagueName} to earn a place.</div>`;
        } else {
            const c = state.comps[userComp];
            let statusText;
            if (c.winner === player.club) statusText = `🏆 CHAMPIONS of the ${userComp}!`;
            else if (c.userExitStage) statusText = `Eliminated in the ${c.userExitStage}.`;
            else if (state.stageIndex === 0) statusText = `Campaign starts in matchweek ${EURO_STAGE_WEEKS[0]}.`;
            else statusText = `Still alive — next up: ${EURO_STAGES[Math.min(state.stageIndex, EURO_STAGES.length - 1)]}.`;
            html += `<div class="euro-note euro-note-user"><strong>${player.club}</strong> in the <strong>${userComp}</strong> — ${statusText}</div>`;
        }

        EURO_COMPS.forEach(comp => {
            const c = state.comps[comp];
            if (!c) return;
            const isUserComp = comp === userComp;
            html += `<div class="euro-comp ${isUserComp ? 'euro-comp-user' : ''}">
                <div class="euro-comp-head">
                    <span class="euro-tag">${EURO_SHORT[comp]}</span>
                    <span class="euro-comp-name">${comp}</span>
                    ${c.winner ? `<span class="pill pill-gold">🏆 ${c.winner}</span>` : `<span class="pill pill-muted">${c.rounds.length}/4 rounds</span>`}
                </div>`;
            if (c.rounds.length === 0) {
                html += `<div class="euro-empty">Draw completed — ${c.teams.length} teams. Knockout starts in matchweek ${EURO_STAGE_WEEKS[0]}.</div>`;
            } else {
                c.rounds.forEach(round => {
                    html += `<div class="euro-round"><div class="euro-round-title">${round.stage}</div><div class="euro-ties">`;
                    round.ties.forEach(t => {
                        const userTie = t.home === player.club || t.away === player.club;
                        html += `<div class="euro-tie ${userTie ? 'euro-tie-user' : ''}">
                            <span class="euro-team ${t.winner === t.home ? 'euro-win' : ''}">${t.home}</span>
                            <span class="euro-score">${t.homeScore} - ${t.awayScore}</span>
                            <span class="euro-team ${t.winner === t.away ? 'euro-win' : ''}">${t.away}</span>
                            ${t.note ? `<span class="euro-note-small">${t.note}</span>` : ''}
                        </div>`;
                    });
                    html += `</div></div>`;
                });
            }
            html += `</div>`;
        });
        container.innerHTML = html;
    }

    function renderMatchHistory() {
        const container = document.getElementById('matchHistoryContainer');
        if (!container) return;
        const history = player.seasonMatchHistory || [];
        const countEl = document.getElementById('historyCount');
        if (countEl) countEl.textContent = history.length;

        if (history.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-clock-rotate-left"></i><p>No matches yet this season. Your history is cleared every time a new season starts.</p></div>`;
            return;
        }

        let html = '<div class="history-list">';
        history.forEach(m => {
            const tier = ratingTier(m.rating);
            const isHome = m.home === player.club;
            const opponent = isHome ? m.away : m.home;
            const contributions = [];
            if (m.goals) contributions.push(`<span class="contrib">⚽ ${m.goals}</span>`);
            if (m.assists) contributions.push(`<span class="contrib">👟 ${m.assists}</span>`);
            if (m.cleanSheet) contributions.push(`<span class="contrib">🧤 CS</span>`);
            if (m.tackles) contributions.push(`<span class="contrib">🛡️ ${m.tackles}</span>`);
            if (m.keyPasses) contributions.push(`<span class="contrib">🎯 ${m.keyPasses}</span>`);
            if (contributions.length === 0) contributions.push('<span class="contrib contrib-muted">No contributions</span>');

            html += `<div class="history-row result-${m.result}">
                <div class="history-comp"><span class="comp-tag comp-${m.competition}">${m.competition}</span><span class="history-stage">${m.stage}</span></div>
                <div class="history-match">
                    <span class="history-venue">${isHome ? 'H' : 'A'}</span>
                    <span class="history-opponent">vs ${opponent}</span>
                    <span class="history-score">${m.homeScore} - ${m.awayScore}</span>
                    <span class="history-result result-badge-${m.result}">${m.result}</span>
                </div>
                <div class="history-contrib">${contributions.join('')}</div>
                <div class="history-rating" style="background:${tier.color};">${m.rating.toFixed(1)}</div>
            </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    function renderForm() {
        const container = document.getElementById('formContainer');
        if (!container) return;
        const last = (player.seasonMatchHistory || []).slice(0, 5);
        if (last.length === 0) {
            container.innerHTML = '<span class="form-empty">—</span>';
            return;
        }
        container.innerHTML = last.map(m => `<span class="form-dot form-${m.result}" title="${m.home} ${m.homeScore}-${m.awayScore} ${m.away}">${m.result}</span>`).join('');
    }

    function renderSeasonStats() {
        const container = document.getElementById('seasonStatsContainer');
        if (!container) return;
        const history = player.seasonMatchHistory || [];
        const sum = (key) => history.reduce((a, m) => a + (m[key] || 0), 0);
        const apps = history.length;
        const avg = seasonAverageRating();
        const tier = ratingTier(avg);
        const stats = [
            { label: 'Apps', value: apps, icon: 'fa-shirt' },
            { label: 'Goals', value: sum('goals'), icon: 'fa-futbol' },
            { label: 'Assists', value: sum('assists'), icon: 'fa-shoe-prints' },
            { label: 'Shots', value: sum('shots'), icon: 'fa-crosshairs' },
            { label: 'Shots on target', value: sum('shotsOnTarget'), icon: 'fa-bullseye' },
            { label: 'Tackles', value: sum('tackles'), icon: 'fa-shield-halved' },
            { label: 'Interceptions', value: sum('interceptions'), icon: 'fa-hand' },
            { label: 'Key passes', value: sum('keyPasses'), icon: 'fa-paper-plane' },
            { label: 'Clean sheets', value: sum('cleanSheet'), icon: 'fa-lock' }
        ];
        let html = '<div class="stat-grid">';
        stats.forEach(s => {
            html += `<div class="stat-tile"><i class="fa-solid ${s.icon}"></i><span class="stat-tile-value">${s.value}</span><span class="stat-tile-label">${s.label}</span></div>`;
        });
        html += `<div class="stat-tile stat-tile-rating" style="border-color:${tier.color};">
            <i class="fa-solid fa-star" style="color:${tier.color};"></i>
            <span class="stat-tile-value" style="color:${tier.color};">${apps ? avg.toFixed(2) : '—'}</span>
            <span class="stat-tile-label">Season rating</span>
        </div></div>`;
        container.innerHTML = html;
    }

    function renderAbilities() {
        const container = document.getElementById('abilitiesContainer');
        if (!container) return;
        const abilities = player.abilities || {};
        const labels = { pace: 'PAC', shooting: 'SHO', passing: 'PAS', dribbling: 'DRI', defending: 'DEF', physical: 'PHY' };
        let html = '<div class="ability-grid">';
        ABILITY_KEYS.forEach(k => {
            const v = Math.round(abilities[k] || 0);
            const color = v >= 80 ? '#21ba45' : (v >= 65 ? '#f2711c' : '#db2828');
            html += `<div class="ability-row">
                <span class="ability-key">${labels[k]}</span>
                <div class="ability-bar"><div class="ability-fill" style="width:${v}%; background:${color};"></div></div>
                <span class="ability-value" id="ability_${k}">${v}</span>
            </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    function renderSeasonArchive() {
        const container = document.getElementById('seasonArchiveContainer');
        if (!container) return;
        const archive = player.seasonArchive || [];
        if (archive.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-box-archive"></i><p>Finish a season to build your career record.</p></div>`;
            return;
        }
        let html = `<table class="custom-table fc-table"><thead><tr><th>S</th><th>Club</th><th>Pos</th><th>Apps</th><th>G</th><th>A</th><th>Rating</th><th>OVR</th></tr></thead><tbody>`;
        archive.forEach(a => {
            const tier = ratingTier(a.avgRating || 6);
            html += `<tr><td>${a.season}</td><td>${a.club}</td><td>${a.position || '—'}</td><td>${a.matches}</td><td>${a.goals}</td><td>${a.assists}</td>
                <td><span class="mini-rating" style="background:${tier.color};">${(a.avgRating || 0).toFixed(2)}</span></td><td>${a.ovr}</td></tr>`;
        });
        html += `</tbody></table>`;
        container.innerHTML = html;
    }

    function renderHallOfFame() {
        const card = document.getElementById('hallOfFameCard');
        const container = document.getElementById('hallOfFameContainer');
        if (!card || !container) return;
        const hof = player.hallOfFame || [];
        if (hof.length === 0) { card.style.display = 'none'; return; }
        card.style.display = 'block';
        container.innerHTML = hof.map(h => `<div class="hof-entry">
            <div class="hof-name">${h.name}</div>
            <div class="hof-meta">${h.club} • Retired season ${h.season} • OVR ${Math.round(h.ovr)}</div>
            <div class="hof-stats">${h.matches} apps · ${h.goals} goals · ${h.assists} assists · ${(h.trophies || []).length} trophies</div>
        </div>`).join('');
    }

    function renderTrophies() {
        const trophies = player.trophies || [];
        const container = document.getElementById('trophyContainer');
        const countEl = document.getElementById('trophyCount');
        if (countEl) countEl.textContent = trophies.length;
        if (!container) return;
        if (trophies.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-trophy"></i><p>No trophies yet. Win your league, the cups and Europe to fill the cabinet.</p></div>`;
            return;
        }
        const count = type => trophies.filter(t => t.type === type).length;
        let html = `
            <div class="trophy-stats">
                <div class="trophy-stat"><div class="trophy-icon">🏆</div><div class="trophy-number">${count('League')}</div><div class="trophy-label">League</div></div>
                <div class="trophy-stat"><div class="trophy-icon">🌍</div><div class="trophy-number">${count('European')}</div><div class="trophy-label">European</div></div>
                <div class="trophy-stat"><div class="trophy-icon">🥇</div><div class="trophy-number">${count('Domestic Cup')}</div><div class="trophy-label">Domestic</div></div>
                <div class="trophy-stat"><div class="trophy-icon">🏅</div><div class="trophy-number">${count('Individual')}</div><div class="trophy-label">Individual</div></div>
            </div>
            <div class="trophy-scroll"><table class="custom-table fc-table"><thead><tr><th>Season</th><th>Trophy</th><th>Type</th></tr></thead><tbody>`;
        trophies.slice().sort((a, b) => b.season - a.season).forEach(t => {
            html += `<tr><td>${t.season}</td><td>${t.name}</td><td>${t.type}</td></tr>`;
        });
        html += `</tbody></table></div>`;
        container.innerHTML = html;
    }

    function updateUI() {
        ensureEuropeanSeason();
        const careerAvg = careerAverageRating();
        const seasonAvg = seasonAverageRating();

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
            'seasonDisplay': `Season ${player.season || 1}`,
            'careerValue': formatValue(player.marketValue || computeMarketValue()),
            'careerMorale': `${Math.round(player.morale || 70)}%`,
            'careerAvgRating': seasonAvg.toFixed(2),
            'careerLastRating': (player.lastMatchRating || 0).toFixed(1),
            'careerRatingBadge': careerAvg ? careerAvg.toFixed(2) : '—',
            'careerRatingCount': `${player.careerRatingCount || 0} matches`,
            'matchWeekDisplay': `MD ${player.currentMatchWeek} / ${MAX_WEEKS_PER_SEASON}`
        };
        for (const [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }

        const badge = document.getElementById('careerRatingBadge');
        if (badge) {
            const tier = ratingTier(careerAvg || 6.0);
            badge.style.background = careerAvg ? tier.color : '#3a3f4b';
        }
        const avgEl = document.getElementById('careerAvgRating');
        if (avgEl) avgEl.style.color = ratingTier(seasonAvg).color;
        const lastEl = document.getElementById('careerLastRating');
        if (lastEl && player.lastMatchRating) lastEl.style.color = ratingTier(player.lastMatchRating).color;

        const faceContainer = document.getElementById('careerFaceContainer');
        if (savedFace && faceContainer) {
            faceContainer.innerHTML = `<img src="${savedFace}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
        }

        if (!player.nextOpponent || !activeClubs.includes(player.nextOpponent) || player.nextOpponent === player.club) {
            player.nextOpponent = generateOpponent();
            saveData();
        }
        const opponent = player.nextOpponent;
        const userIsHome = (player.currentMatchWeek % 2) === 1;
        const homeEl = document.getElementById('homeTeam');
        const awayEl = document.getElementById('awayTeam');
        if (homeEl) homeEl.textContent = userIsHome ? player.club : opponent;
        if (awayEl) awayEl.textContent = userIsHome ? opponent : player.club;
        const venueEl = document.getElementById('matchVenue');
        if (venueEl) {
            venueEl.textContent = userIsHome ? 'HOME' : 'AWAY';
            venueEl.className = 'pill ' + (userIsHome ? 'pill-green' : 'pill-blue');
        }
        const euroNightEl = document.getElementById('euroNightNotice');
        if (euroNightEl) {
            const isEuroWeek = EURO_STAGE_WEEKS.includes(player.currentMatchWeek) && player.europeanState.userComp;
            euroNightEl.style.display = isEuroWeek ? 'block' : 'none';
            if (isEuroWeek) {
                euroNightEl.textContent = `🌍 European night this week: ${EURO_STAGES[Math.min(player.europeanState.stageIndex, EURO_STAGES.length - 1)]} of the ${player.europeanState.userComp}`;
            }
        }

        renderStandings();
        renderLeaderboards();
        renderEuropeanResults();
        renderTrophies();
        renderMatchHistory();
        renderForm();
        renderSeasonStats();
        renderAbilities();
        renderSeasonArchive();
        renderHallOfFame();

        if (player.retired) {
            const btn = document.getElementById('btnSimulateMatch');
            if (btn) {
                btn.disabled = true;
                btn.textContent = '🏆 RETIRED — Hall of Fame';
            }
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
        const home = document.getElementById('homeTeam').textContent;
        const away = document.getElementById('awayTeam').textContent;
        startLiveMatchSimulation(home, away);
    });
    document.getElementById('btnCloseModal').addEventListener('click', () => {
        if (!isMatchEnded) return;
        document.getElementById('matchModalOverlay').classList.remove('active');
        if (matchInterval) {
            clearInterval(matchInterval);
            matchInterval = null;
        }
    });

    // --- 16. INIT ---
    ensureCareerFields();
    initStandings();
    
    // Generate initial transfer interest if player is performing well
    if ((player.ovr || 60) >= 65 && (player.matchesPlayed || 0) >= 3) {
        generateTransferInterest();
    }
    
    updateUI();

})();