let municipios = []

setInputFilter(document.querySelector("#nit-field"), function (value) {
	return /^\d*\¬?\d*$/.test(value);
}, "Únicamente números");

setInputFilter(document.querySelector("#cell-field"), function (value) {
	return /^\d*\¬?\d*$/.test(value);
}, "Únicamente números");

setInputFilter(document.querySelector("#nombres-field"), function (value) {
	return /^[A-Za-z\s]+$/.test(value);
}, "Únicamente letras");

setInputFilter(document.querySelector("#apellidos-field"), function (value) {
	return /^[A-Za-z\s]+$/.test(value);
}, "Únicamente letras");

setInputFilter(document.querySelector("#ciudad-field"), function (value) {
	return /^[A-Za-z\s]+$/.test(value);
}, "Únicamente letras");

let sucursales = [
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 4001 - SANTA MARTA (UNIVERSIDAD CUN)",
		"direccion": "CARRERA 32 NO.18-61 AVENIDA EL LIBERTADOR",
		"codigo": 4001
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 4002 - SANTA MARTA (FRENTE POLICIA)",
		"direccion": "CALLE 22 NO.2-07",
		"codigo": 4002
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 4003 - SANTA MARTA (IGLESIA SAN FRANSISCO)",
		"direccion": "CALLE 14 NO.3-94",
		"codigo": 4003
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 4015 - SANTA MARTA (HOSPITAL)",
		"direccion": "CARRERA 14 NO.22-55",
		"codigo": 4015
	},
	{
		"ciudad": "Rodadero",
		"nombre pventa": "ECONOMIA 4033 - RODADERO",
		"direccion": "CALLE 7 CARRERA 2 ESQUINA",
		"codigo": 4033
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 4054 - SANTA MARTA (AV. LIBERTADOR)",
		"direccion": "CARRERA 15 NO.17-09",
		"codigo": 4054
	},
	{
		"ciudad": "Cienaga",
		"nombre pventa": "ECONOMIA 4096 - CIENAGA",
		"direccion": "CALLE 17 NO.12-11",
		"codigo": 4096
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 6016 - SANTA MARTA (AVE 5TA)",
		"direccion": "CARRERA 5 NO.14-24",
		"codigo": 6016
	},
	{
		"ciudad": "Cienaga",
		"nombre pventa": "ECONOMIA 6017 - CIENAGA",
		"direccion": "CALLE 17 NO.19-51",
		"codigo": 6017
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 6037 - SANTA MARTA (MERCADO)",
		"direccion": "CARRERA 11 NO.11-13",
		"codigo": 6037
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 7084 - PALMA REAL",
		"direccion": "CALLE 12 NO.18-124 LOCAL 23 Y 24 PALMA REAL",
		"codigo": 7084
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 8022 - URB SIERRADENTRO",
		"direccion": "CARRERA 43 NO.34-06 LOC 6 URB SIERRADENTRO",
		"codigo": 8022
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 8043 - URB ANDREA CAROLINA",
		"direccion": "MANZANA 20 PISO 1 CALLE 42B2 NO.30-06",
		"codigo": 8043
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 8073 - PLAZA MERCADO",
		"direccion": "CALLE 11 NO.9-163 LOCAL 05 EDIF PLAZA MERCADO PUEBLITO",
		"codigo": 8073
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 8094 - SANTA MARTA (HOSPITAL URG)",
		"direccion": "CALLE 15 NO.23-51 LOCAL 5 URGENCIA HOSPITAL",
		"codigo": 8094
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 8098 - SANTA MARTA (GAIRA)",
		"direccion": "CALLE 6 NO.13-88 LOCAL 4 GAIRA",
		"codigo": 8098
	},
	{
		"ciudad": "Rodadero",
		"nombre pventa": "ECONOMIA 9011 - RODADERO",
		"direccion": "CALLE 6 NO.2-30",
		"codigo": 9011
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 10044 - SANTA MARTA (VILLA OLIMPICA)",
		"direccion": "CALLE 22 NO.17A-107 BARRIO VILLA OLIMPICA",
		"codigo": 10044
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 10045 - SANTA MARTA (CIUDAD DEL SOL)",
		"direccion": "URB. EL CIUDAD EL SOL SECTOR 3 NO.42-34",
		"codigo": 10045
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 10046 - SANTA MARTA (URB LAS CASAS)",
		"direccion": "URB. LAS CASAS MANZANA 1 CASA 1",
		"codigo": 10046
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 10066 - SANTA MARTA (TESORO DEL MAR)",
		"direccion": "CARRERA 1 N� 15_07 LOCAL 1C Y 1 D C.C TESORO DEL MAR",
		"codigo": 10066
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 10076 - SANTA MARTA (BAVARIA COUNTRY)",
		"direccion": "MANZANA C CASA 28  URB. BAVARIA COUNTRY",
		"codigo": 10076
	},
	{
		"ciudad": "Cienaga",
		"nombre pventa": "ECONOMIA 10107 - CIENAGA",
		"direccion": "CALLE 16 NO.10 - 75",
		"codigo": 10107
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 10117 - SANTA MARTA (EDS PRIMAX CALLE 30)",
		"direccion": "CALLE 30 NO.21E 50 LOCAL 101",
		"codigo": 10117
	},
	{
		"ciudad": "Cienaga",
		"nombre pventa": "ECONOMIA 13043 - CIENAGA (CAR-02)",
		"direccion": "CALLE 12 NO.11-10",
		"codigo": 13043
	},
	{
		"ciudad": "Cienaga",
		"nombre pventa": "ECONOMIA 13044 - CIENAGA (CENTRAL)",
		"direccion": "CARRERA 11 NO.16-32",
		"codigo": 13044
	},
	{
		"ciudad": "Turbaco",
		"nombre pventa": "ECONOMIA 4058 - TURBACO (AV. PASTRANA)",
		"direccion": "AVENIDA PASTRANA NO.20-38",
		"codigo": 4058
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 4060 - CARTAGENA (SANTA LUCIA)",
		"direccion": "CENTRO COMERCIAL SANTA LUCIA LOCAL 8",
		"codigo": 4060
	},
	{
		"ciudad": "Turbaco",
		"nombre pventa": "ECONOMIA 4062 - TURBACO (PLAZA)",
		"direccion": "CALLE REAL NO.11-05",
		"codigo": 4062
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6033 - BARRIO SAN FERNANDO",
		"direccion": "CALLE 15 NO. 81A - 64",
		"codigo": 6033
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 7088 - SAN FERNANDO",
		"direccion": "CALLE 31 NO.82-237 TERNERA CCIAL SAN FERNANDO 214",
		"codigo": 7088
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 7098 - VILLA CANDELARIA",
		"direccion": "URB VILLA DE LA CANDELARIA M 8 L 1",
		"codigo": 7098
	},
	{
		"ciudad": "Arjona",
		"nombre pventa": "ECONOMIA 8056 - ARJONA (PLAZA PRINCIPAL)",
		"direccion": "CALLE 51A NO.39-8 PISO 1 LOCAL 1",
		"codigo": 8056
	},
	{
		"ciudad": "Turbana",
		"nombre pventa": "ECONOMIA 8082 - TURBANA (LA PLAZA)",
		"direccion": "CALLE EL COCO KRA 9 # 14-118 LA PLAZA",
		"codigo": 8082
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 9091 - CARTAGENA (URB. VILLA GRANDE)",
		"direccion": "MANZANA 27 LOTE 16 URB VILLA GRANDE",
		"codigo": 9091
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 10036 - CARTAGENA (URB. LA CAROLINA)",
		"direccion": "URBANIZACION LA CAROLINA MZ I LOTE 1",
		"codigo": 10036
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 10049 - CARTAGENA (URB. LAS PALMERAS)",
		"direccion": "LAS PALMERAS MANZ 7 LOTE 21 (BOMBA TERPEL)",
		"codigo": 10049
	},
	{
		"ciudad": "Turbaco",
		"nombre pventa": "ECONOMIA 10050 - TURBACO (AV PASTRANA)",
		"direccion": "BARRIO 13 DE JUNIO KRA 15 #23-16 PISO 1 APTO 1 (AV PASTRANA)",
		"codigo": 10050
	},
	{
		"ciudad": "Arjona",
		"nombre pventa": "ECONOMIA 10084 - ARJONA (POZO REAL)",
		"direccion": "BARRIO POZO REAL CALLE 51 CRA 44-17 APTO 1",
		"codigo": 10084
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 10085 - CARTAGENA (BARRIO CARMELO)",
		"direccion": "BARRIO EL CARMELO CARRERA 68 MZ C LOTE 2 LOCAL 1",
		"codigo": 10085
	},
	{
		"ciudad": "Turbaco",
		"nombre pventa": "ECONOMIA 10095 � TURBACO BOLIVAR ( CALLE REAL)",
		"direccion": "CALLE REAL CALLE 17 # 18-41 APTO 3",
		"codigo": 10095
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 10109 - CARTAGENA (EL POZON)",
		"direccion": "POZON LA CENTRAL TRANSVERSAL 72 NO.52-99 PISO 1 APTO 2",
		"codigo": 10109
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 10110 - CARTAGENA (SAN JOSE DE LOS CAMPANOS)",
		"direccion": "CARRERA 102 CALLE 39A - 05 LOCALES 1A Y 2A",
		"codigo": 10110
	},
	{
		"ciudad": "Baranoa",
		"nombre pventa": "ECONOMIA 4018 - BARANOA (HOSPITAL)",
		"direccion": "CALLE 19 NO 19-100",
		"codigo": 4018
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "ECONOMIA 4019 - SABANALARGA (TELECOM)",
		"direccion": "CALLE 18 NO 19-17",
		"codigo": 4019
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "ECONOMIA 4020 - SABANALARGA (MERCADO VIEJO)",
		"direccion": "CALLE 20 NO 18-10",
		"codigo": 4020
	},
	{
		"ciudad": "Soledad",
		"nombre pventa": "ECONOMIA 4026 - SOLEDAD",
		"direccion": "CARRERA 19 NO 16-08",
		"codigo": 4026
	},
	{
		"ciudad": "Pivijay",
		"nombre pventa": "ECONOMIA 4031 - PIVIJAY",
		"direccion": "CARRERA 11 NO 11-30 COMERCIO",
		"codigo": 4031
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4078 - BARRANQUILLA (MURILLO CON 1)",
		"direccion": "CALLE 45B NO 2B-03",
		"codigo": 4078
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 6039 - BARRANQUILLA (METROCENTRO)",
		"direccion": "CALLE 45 N� 1-85 L-118-119 METRO C.",
		"codigo": 6039
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "ECONOMIA 6045 - SABANALARGA (POLICIA)",
		"direccion": "CALLE 18 N� 17-43",
		"codigo": 6045
	},
	{
		"ciudad": "Baranoa",
		"nombre pventa": "ECONOMIA 6052 - BARANOA (FRENTE ELECTRICARIBE)",
		"direccion": "CARRERA 19 N� 19 -06",
		"codigo": 6052
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "ECONOMIA 7026 - SABANALARGA (MERCADO NUEVO)",
		"direccion": "CARRERA 24 NO.24-297 MERCADO NUEVO",
		"codigo": 7026
	},
	{
		"ciudad": "Pivijay",
		"nombre pventa": "ECONOMIA 7057 - PIVIJAY",
		"direccion": "CALLE� 11 NO.9-04",
		"codigo": 7057
	},
	{
		"ciudad": "Malambo",
		"nombre pventa": "ECONOMIA 8032 - MALAMBO",
		"direccion": "CALLE 10 NO.12-16",
		"codigo": 8032
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "ECONOMIA 8049 - SABANALARGA (CERCA PLAZA)",
		"direccion": "CALLE 21 NO.17-48",
		"codigo": 8049
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "ECONOMIA 8067 - SABANALARGA (PLAZA PPAL)",
		"direccion": "CALLE 21 NO.18-25 LOCAL 1",
		"codigo": 8067
	},
	{
		"ciudad": "Soledad",
		"nombre pventa": "ECONOMIA 8074 - MANUELA BELTRAN",
		"direccion": "CALLE 30 NO.15A-13",
		"codigo": 8074
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "CONCESIONARIO OLIMPICA 10009 - SABANALARGA (MERCADO VIEJO)",
		"direccion": "CALLE 20 NO 18-09",
		"codigo": 10009
	},
	{
		"ciudad": "Sabanalarga",
		"nombre pventa": "ECONOMIA 10067 - SABANALARGA",
		"direccion": "CALLE 22 NO 19 � 03 �L.101-102 BARRIO CE",
		"codigo": 10067
	},
	{
		"ciudad": "Santa Marta",
		"nombre pventa": "ECONOMIA 6044 - SANTA MARTA (CLINICA CAPRI)",
		"direccion": "CARRERA 8 NO.10-40",
		"codigo": 6044
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4022 - BARRANQUILLA (CLINICA DEL NORTE)",
		"direccion": "CALLE 70 NO 48-28",
		"codigo": 4022
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4023 - BARRANQUILLA (CALLE 30)",
		"direccion": "CALLE 30 NO 40-38",
		"codigo": 4023
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4028 - BARRANQUILLA (CC COLOMBIA)",
		"direccion": "CALLE 35 KRA 44 ESQ. CENTRO COM COLOMBIA LOCAL 182",
		"codigo": 4028
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4032 - BARRANQUILLA (CARI)",
		"direccion": "CALLE 57 NO 23-65",
		"codigo": 4032
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4043 - BARRANQUILLA (CALLE 96)",
		"direccion": "CARRERA 46 #93-244      NUEVA",
		"codigo": 4043
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4044 - BARRANQUILLA (LAS VISTAS)",
		"direccion": "CALLE 82 NO 49C ESQUINA",
		"codigo": 4044
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4066 - BARRANQUILLA (EL GOLF)",
		"direccion": "CALLE 82 NO 57-07",
		"codigo": 4066
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4067 - BARRANQUILLA (ISSA ABUCHAIBE)",
		"direccion": "CARRERA 51 B NO 94-334",
		"codigo": 4067
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4071 - BARRANQUILLA (COUNTRY)",
		"direccion": "CALLE 76 NO 53-66",
		"codigo": 4071
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4097 - BARRANQUILLA (VIA 40)",
		"direccion": "VIA 40 NO 71 - 124",
		"codigo": 4097
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 6054 - BARRANQUILLA (VILLATAREL)",
		"direccion": "CALLE 72 NO 66-173",
		"codigo": 6054
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 7079 - BARRANQUILLA (PORTO AZUL)",
		"direccion": "UNIDAD MEDICA PORTO AZUL LOCAL 209-210",
		"codigo": 7079
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "CONCESIONARIO OLIMPICA 10006 - BARRANQUILLA",
		"direccion": "CARRERA 43 NO 34-64",
		"codigo": 10006
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "CONCESIONARIO OLIMPICA 10007 - BARRANQUILLA (PASEO BOLIVAR)",
		"direccion": "CALLE 34 NO 43-70",
		"codigo": 10007
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 10059 - BARRANQUILLA (PLAZA GOLF 64)",
		"direccion": "CARRERA 64 NO.81-62 LOCAL 3-4 (PLAZA GOLF 64)",
		"codigo": 10059
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 10062 - BARRANQUILLA (CLINICA CENTRO)",
		"direccion": "CALLE 40 NO 41-117 LOCAL 2  CENTRO",
		"codigo": 10062
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 10071 - BARRANQUILLA (VILLA CAMPESTRE)",
		"direccion": "VILLACAMPESTRE CALLE 3A TRANSVERSAL 3A-115 LOCAL 2 PLA",
		"codigo": 10071
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 10080 - BARRANQUILLA (PRADO)",
		"direccion": "CARRERA 52 NO.72 - 65  LOCAL 106",
		"codigo": 10080
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 10106 - BARRANQUILLA (CLINICA DE LA COSTA)",
		"direccion": "CARRERA 50 NO 80-117 LOCAL 1",
		"codigo": 10106
	},
	{
		"ciudad": "Barranquilla",
		"nombre pventa": "ECONOMIA 4053 - CLINICA DEL CARIBE",
		"direccion": "CALLE 80 # 50 - 16",
		"codigo": 13041
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 4027 - CARTAGENA (BAZURTO)",
		"direccion": "AV. PEDRO HEREDIA CALLE 30 NO.27-86",
		"codigo": 4027
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 4064 - CARTAGENA (CENTRO ED. MONROY)",
		"direccion": "CALLE 32 NO.10-09 LA MATUNA EDIFICIO MONROY",
		"codigo": 4064
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 4087 - CARTAGENA (ZARAGOCILLA)",
		"direccion": "CARRERA 50 NO.30-22 (SECTOR ZARAGOCILLA)",
		"codigo": 4087
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 4091 - CARTAGENA (CRESPO)",
		"direccion": "CALLE 70 NO.3-55 LOCAL 105 CRESPO",
		"codigo": 4091
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6003 - CARTAGENA (LAGUITO)",
		"direccion": "CARRERA 1A NO.3-232 EDIFICIO NAUTILUS",
		"codigo": 6003
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6011 - CARTAGENA (CALLE CANDILEJO)",
		"direccion": "CENTRO CALLE CANDILEJO NO.33-63",
		"codigo": 6011
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6018 - CARTAGENA (CRISANTO LUQUE)",
		"direccion": "CALLE SAN CARLOS NO.33A-05",
		"codigo": 6018
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6023 - CARTAGENA (CC CASTELLANA)",
		"direccion": "CENTRO COMERCIAL LA CASTELLANA LOCAL 111",
		"codigo": 6023
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6030 - CARTAGENA (MANGA)",
		"direccion": "AV. LA ASAMBLEA NO.29-04  MANGA",
		"codigo": 6030
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6032 - CARTAGENA (TORICES)",
		"direccion": "CARRERA 17 NO.42-07 BARRIO TORICES",
		"codigo": 6032
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6034 - CARTAGENA (ED. CLARIN)",
		"direccion": "CARRERA 11 NO.11-13",
		"codigo": 6034
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 6077 - CARTAGENA (HOTEL CARIBE)",
		"direccion": "CARRERA 2 NO.4-15 EDIFICIO ANTILLAS",
		"codigo": 6077
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 8097 - CARTAGENA (LOS CARACOLES)",
		"direccion": "BARRIO LOS CARACOLES MZ 58 LT 6 ETAPA 1",
		"codigo": 8097
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 9084 - CARTAGENA (BOCAGRANDE)",
		"direccion": "AV SAN MARTIN NO.6-83 LOCAL 3 EDIFICIO SAN MARTIN BOCAGRANDE",
		"codigo": 9084
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 10035 - CARTAGENA (BARRIO LA MARIA)",
		"direccion": "CARRERA 30 N� 41A - 49  BARRIO LA MARIA",
		"codigo": 10035
	},
	{
		"ciudad": "Cartagena",
		"nombre pventa": "ECONOMIA 10052 - CARTAGENA (URB CAMPESTRE)",
		"direccion": "URBANIZACION CAMPESTRE MANZANA 74 LOTE 4 ETAPA VII",
		"codigo": 10052
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 7014 - RINCON DEL CHICO 1",
		"direccion": "AVENIDA 9 NO.103-96",
		"codigo": 7014
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 7017 - LA SALLE",
		"direccion": "CALLE 65 NO.6-15",
		"codigo": 7017
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 7019 - CHAPINERO",
		"direccion": "CALLE 61 NO.9-28",
		"codigo": 7019
	},
	{
		"ciudad": "Madrid",
		"nombre pventa": "ECONOMIA 7020 - MADRID",
		"direccion": "CALLE 8 NO.6-20 LOCAL 1",
		"codigo": 7020
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 7027 - VILLA LUZ",
		"direccion": "TRANSV 85 NO.64B-30 VILLA LUZ",
		"codigo": 7027
	},
	{
		"ciudad": "Chiquinquira",
		"nombre pventa": "ECONOMIA 8015 - CHIQUINQUIRA",
		"direccion": "CARRERA 10 NO 15-13 L-102  CENTRO  CCOMERCIAL LA  TERRAZA",
		"codigo": 8015
	},
	{
		"ciudad": "Cajica",
		"nombre pventa": "ECONOMIA 8018 - CAJICA",
		"direccion": "CALLE 5 NO 2-65 CAJICA",
		"codigo": 8018
	},
	{
		"ciudad": "Simijaca",
		"nombre pventa": "ECONOMIA 8024 - SIMIJACA",
		"direccion": "CALLE� 9 NO 6-101� CENTRO CCIAL SIMICENTRO PLAZA",
		"codigo": 8024
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 8077 - AV. LAS AMERICAS",
		"direccion": "CARRERA 82A NO.6-16 LOC 32 CC CIAL TABAKU DE LAS AMERICAS",
		"codigo": 8077
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 9088 - CENTRO CCIAL PRIMAVERA",
		"direccion": "CALLE 80 NO.89A-40 CENTRO CCIAL PRIMAVERA LOCAL 108",
		"codigo": 9088
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 10038 - BOGOTA (BARRIO MARSELLA)",
		"direccion": "CARRERA 69C # 6C 26 (BARRIO MARSELLA)",
		"codigo": 10038
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 10051 - BOGOTA (BARRIO CARVAJAL)",
		"direccion": "AC 26 SUR NO.71D-77 LOCAL 105",
		"codigo": 10051
	},
	{
		"ciudad": "Villavicencio",
		"nombre pventa": "ECONOMIA 10055 - VILLAVICENCIO (CRUZ ROJA)",
		"direccion": "CALLE 39 NO.29 - 44 LOCAL 1",
		"codigo": 10055
	},
	{
		"ciudad": "Raquira",
		"nombre pventa": "ECONOMIA 10077 - RAQUIRA (PARQUE PRINCIPAL)",
		"direccion": "CARRERA 3 NO 2-120",
		"codigo": 10077
	},
	{
		"ciudad": "Soacha",
		"nombre pventa": "ECONOMIA 10079 - SOACHA (C.CIAL VENTURA-TERREROS)",
		"direccion": "CARRERA 1 NO.38 � 89 LOCAL 101 CENTRO COMERCIAL VENTURA TERREROS",
		"codigo": 10079
	},
	{
		"ciudad": "Ramiriqui",
		"nombre pventa": "ECONOMIA 10094 - RAMIRIQUI (BOYACA)",
		"direccion": "CALLE 8 NO.4-52",
		"codigo": 10094
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 10115 - BOGOTA (CEDRITOS)",
		"direccion": "CALLE 151 # 18A - 07",
		"codigo": 10115
	},
	{
		"ciudad": "Bogota",
		"nombre pventa": "ECONOMIA 10116 - BOGOTA (EDS CALLE 80)",
		"direccion": "CALLE 80 NO.68H-39 LOCAL 1-2",
		"codigo": 10116
	},
	{
		"ciudad": "Cimitarra",
		"nombre pventa": "ECONOMIA 7012 - CIMITARRA",
		"direccion": "CARRERA 5 N- 7-51 CENTRO",
		"codigo": 7012
	},
	{
		"ciudad": "Sabana de Torres",
		"nombre pventa": "ECONOMIA 7037 - SABANA DE TORRES",
		"direccion": "CALLE 12 N11-19 CENTRO SABANA DE TORREZ",
		"codigo": 7037
	},
	{
		"ciudad": "Cimitarra",
		"nombre pventa": "ECONOMIA 8038 - CIMITARRA (CENTRO)",
		"direccion": "CARRERA 4  NO 4-02 CENTRO",
		"codigo": 8038
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 9082 - BARRANCABERMEJA (BARRIO GALAN)",
		"direccion": "DIAGONAL 56 NO.18A-108 LOCAL 9 BARRIO GALAN GOMEZ",
		"codigo": 9082
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 12007 - BARRANCABERMEJA (COMERCIO)",
		"direccion": "CALLE 49 N- 6-40 SECTOR COMERCIAL",
		"codigo": 12007
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 12009 - BARRANCABERMEJA (PARQUE INFANTIL)",
		"direccion": "CALLE 49 N- 16-05 PARQUE INFANTIL",
		"codigo": 12009
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 12010 - BARRANCABERMEJA (HOSPITAL)",
		"direccion": "CARRERA 17 DIAGONAL 58 ESQ HOSPITAL",
		"codigo": 12010
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 12011 - BARRANCABERMEJA (B. COLOMBIA)",
		"direccion": "CALLE 52 N- 17-10 BARRIO COLOMBIA",
		"codigo": 12011
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 12012 - BARRANCABERMEJA (SATELITE)",
		"direccion": "AV 39 N- 63A-03 BARRIO LA ESPERANZA",
		"codigo": 12012
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 12013 - BARRANCABERMEJA (TORCOROMA)",
		"direccion": "CALLE 54 N- 20-84 BARRIO TORCOROMA",
		"codigo": 12013
	},
	{
		"ciudad": "Barrancabermeja",
		"nombre pventa": "ECONOMIA 12014 - BARRANCABERMEJA (P. DE LA VIDA)",
		"direccion": "CARRERA 25 N- 49-77 PARQUE LA VIDA",
		"codigo": 12014
	},
	{
		"ciudad": "Puerto wilches",
		"nombre pventa": "ECONOMIA 12016 - PUERTO WILCHES",
		"direccion": "CARRERA  3 # 2-93 LC 1-2 CENTRO",
		"codigo": 12016
	},
	{
		"ciudad": "Yondo",
		"nombre pventa": "ECONOMIA 7039 - YONDO",
		"direccion": "CARRERA 50 N- 53-23 CENTRO",
		"codigo": 7039
	},
	{
		"ciudad": "Puerto Berrio",
		"nombre pventa": "ECONOMIA 10101 - PUERTO BERRIO (HOSPITAL)",
		"direccion": "CARRERA 7 #47-28 FRENTE HOSPITAL PTO BERRIO",
		"codigo": 10101
	},
	{
		"ciudad": "San Gil",
		"nombre pventa": "DROGUERIA UNIFAMILIAR 4030 - SAN GIL (CENTRO)",
		"direccion": "CALLE 13 NO. 9-20 CENTRO SAN GIL PARQUE PPAL",
		"codigo": 4030
	},
	{
		"ciudad": "Zapatoca",
		"nombre pventa": "ECONOMIA 6058 - ZAPATOCA",
		"direccion": "CARRERA 10 N- 19-54",
		"codigo": 6058
	},
	{
		"ciudad": "Velez",
		"nombre pventa": "ECONOMIA 7093 - VELEZ",
		"direccion": "CALLE 9 N- 2-83 CC PLAZA REAL LOCAL 02",
		"codigo": 7093
	},
	{
		"ciudad": "Cucuta",
		"nombre pventa": "ECONOMIA 8069 - CUCUTA (FRENTE A CAJA SOCIAL)",
		"direccion": "AVENIDA 4 NO.10-10 CENTRO",
		"codigo": 8069
	},
	{
		"ciudad": "Cucuta",
		"nombre pventa": "ECONOMIA 8070 - CUCUTA (EDIF BANCO BOGOTA)",
		"direccion": "CALLE 11 NO.6-32 LOCAL 5",
		"codigo": 8070
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 8071 - BUCARAMANGA (BARRIO MUTIS)",
		"direccion": "CALLE 61 A  2W  - 02   LOCAL 1 EDIF MULTIFAMILIAR MUTIS",
		"codigo": 8071
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 8072 - BUCARAMANGA (HOSP. UNIVERSITARIO)",
		"direccion": "CARRERA 33 NO 30A-79A LA AURORA FRENTE HOSP UNIVERSITARIO",
		"codigo": 8072
	},
	{
		"ciudad": "Cucuta",
		"nombre pventa": "ECONOMIA 9080 - LOS PATIOS",
		"direccion": "AVENIDA 10 MZ. E � LOTE 87 � CONJUNTO VILLA ANSEP � LOS PATIOS.",
		"codigo": 9080
	},
	{
		"ciudad": "Cucuta",
		"nombre pventa": "ECONOMIA 9086 - CUCUTA (ATALAYA)",
		"direccion": "AVENIDA 21 NO.ACN - 36 L.1 MZ R1 LOTE 18 SECTOR DE NATILAN",
		"codigo": 9086
	},
	{
		"ciudad": "Floridablanca",
		"nombre pventa": "ECONOMIA 10020 - FLORIDABLANCA (CLINICA GUANE)",
		"direccion": "CALLE 4 # 7-04 LOCAL 3 ESQUINA - CASCO ANTIGUO FLORIDABLANCA",
		"codigo": 10020
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 10041 - BUCARAMANGA (BARRIO SOTOMAYOR)",
		"direccion": "CARRERA 29 NO.40-110 ESQUINA B. SOTOMAYOR B/MANGA",
		"codigo": 10041
	},
	{
		"ciudad": "Cucuta",
		"nombre pventa": "ECONOMIA 10063 - CUCUTA (LA PLAYA)",
		"direccion": "CALLE 11 NO.2-84 L.1A  LA PLAYA",
		"codigo": 10063
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 10065 - BUCARAMANGA (EDIFICIO CHAVEZ)",
		"direccion": "CALLE 40 NO.27-18 LOCAL 2 EDIFICIO CHAVEZ",
		"codigo": 10065
	},
	{
		"ciudad": "Pamplona",
		"nombre pventa": "ECONOMIA 10068 - PAMPLONA",
		"direccion": "CALLE 7 NO 5 - 04 CENTRO  MERCADO",
		"codigo": 10068
	},
	{
		"ciudad": "Pamplona",
		"nombre pventa": "ECONOMIA 10072 - PAMPLONA (BARRIO CENTRO)",
		"direccion": "CARRERA 6 # 8B � 04  LOCAL 2  BARRIO: CENTRO",
		"codigo": 10072
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 10074 - BUCARAMANGA (BARRIO CAMPESTRE)",
		"direccion": "CARRERA 29 # 48-15  BARRIO CAMPESTRE",
		"codigo": 10074
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 10075 - BUCARAMANGA (CABECERA DEL LLANO)",
		"direccion": "CARRERA  35  # 52 �  24  CABECERA DEL LLANO",
		"codigo": 10075
	},
	{
		"ciudad": "San Gil",
		"nombre pventa": "ECONOMIA 10097 - SAN GIL (CENTRO MERCADO)",
		"direccion": "CARRERA 11 # 12-64  BARRIO CENTRO",
		"codigo": 10097
	},
	{
		"ciudad": "Floridablanca",
		"nombre pventa": "ECONOMIA 10099 - FLORIDABLANCA",
		"direccion": "CALLE 31 # 24 -68 L.2 TORRES DE CA�AVERAL I.",
		"codigo": 10099
	},
	{
		"ciudad": "Cucuta",
		"nombre pventa": "ECONOMIA 10100 - CUCUTA (PANAMERICANO)",
		"direccion": "CALLE 12 #  4- 25 EDIF. PANAMERICANA L.102",
		"codigo": 10100
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 10102 - BUCARAMANGA (BOLARQUI)",
		"direccion": "CALLE 51 # 26 A � 46 L.1 EDIF MICHELLA BARRIO BOLARQUI",
		"codigo": 10102
	},
	{
		"ciudad": "Giron",
		"nombre pventa": "ECONOMIA 10103 - GIRON (URB. VILLA LINDA)",
		"direccion": "CALLE 21 # 18 - 63 URB. VILLA LINDA",
		"codigo": 10103
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 10104 - BUCARAMANGA (PROVENZA)",
		"direccion": "CALLE 105 # 22-149  BARRIO PROVENZA",
		"codigo": 10104
	},
	{
		"ciudad": "Villa del Rosario",
		"nombre pventa": "ECONOMIA 10105 - VILLA DEL ROSARIO (CENTRO)",
		"direccion": "CARRERA 8 N. 5-11 CENTRO, VILLA DEL ROSARIO",
		"codigo": 10105
	},
	{
		"ciudad": "Bucaramanga",
		"nombre pventa": "ECONOMIA 12003 - BUCARAMANGA (CABECERA)",
		"direccion": "CALLE 49 N- 34-20 CABECERA",
		"codigo": 12003
	},
	{
		"ciudad": "Cucuta",
		"nombre pventa": "ECONOMIA 12015 - CUCUTA (CENTRO)",
		"direccion": "CALLE 16 NO.2 - 02  BARRIO AEROPUERTO",
		"codigo": 12015
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 7043 - MERCAR",
		"direccion": "CARRERA 29 NO. 19-93 B/ SANTA ELENA",
		"codigo": 7043
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 7044 - PLAZA CAICEDO",
		"direccion": "CARRERA 4 NO. 11-79 B/ PLAZA CAICEDO",
		"codigo": 7044
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 7045 -  REPUBLICA DE ISRAEL",
		"direccion": "CARRERA 46 NO. 46-97 B/ REPUBLICA DE ISRAEL",
		"codigo": 7045
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 7046 - MELENDEZ",
		"direccion": "CARRERA 94 NO. 4-41 B/ MELENDEZ",
		"codigo": 7046
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 7049 - CIUDAD JARDIN",
		"direccion": "CARRERA 105 NO. 15A-55 B/ CIUDAD JARDIN",
		"codigo": 7049
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 7050 - LA LUNA",
		"direccion": "CALLE 13 NO. 23A - 02 B/ JUNIN",
		"codigo": 7050
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 7052 - LA 44 PANAMERICANA",
		"direccion": "CARRERA 44 NO. 13-09 B/ PANAMERICANO",
		"codigo": 7052
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 8020 - CALDAS",
		"direccion": "CARRERA 70 NO. 2B - 59 B/ CALDAS",
		"codigo": 8020
	},
	{
		"ciudad": "Ibague",
		"nombre pventa": "ECONOMIA 8036 - IBAGUE",
		"direccion": "CARRERA 5 NO. 30-81 B/ HIPODROMO",
		"codigo": 8036
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 8044 - LOS ANDES",
		"direccion": "CARRERA 2 #  59 -05 B/ ANDES",
		"codigo": 8044
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 8054 - OLIMPICO",
		"direccion": "CARRERA 36 NO. 12C - 55 B/ OLIMPICO",
		"codigo": 8054
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 8064 - MORICHAL",
		"direccion": "CALLE 54 NO. 42A -18 B/ CIUDAD CORDOBA",
		"codigo": 8064
	},
	{
		"ciudad": "Buga",
		"nombre pventa": "ECONOMIA 8075 - BUGA CARIBE",
		"direccion": "CARRERA 14 NO. 12-08 B/ SUCRE",
		"codigo": 8075
	},
	{
		"ciudad": "Ibague",
		"nombre pventa": "ECONOMIA 8091 - IBAGUE (JORDAN)",
		"direccion": "MANZANA 57 CASA 9 JORDAN 7 ETAPA",
		"codigo": 8091
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 8092 - CALI (VERSALLES)",
		"direccion": "AV. 6N NO. 17-92 LOCAL A10 - A19",
		"codigo": 8092
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 8093 - CALI (CENTRO)",
		"direccion": "CALLE 14 NO. 4-02",
		"codigo": 8093
	},
	{
		"ciudad": "Buga",
		"nombre pventa": "ECONOMIA 8095 - BUGA SANTA BARBARA",
		"direccion": "CALLE 16 NO. 12-01",
		"codigo": 8095
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 9092 - CALI (CENTRO LA 10)",
		"direccion": "CARRERA 10 NO. 10 -14",
		"codigo": 9092
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 10043 - CALI (POPULAR)",
		"direccion": "AV 3 BIS NORTE NO.24-05 B/SAN VICENTE",
		"codigo": 10043
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 10056 - CALI (BARRIO CALIMA)",
		"direccion": "CARRERA 5NORTE NO.66N-36 LOCAL 1 BARRIO CALIMA",
		"codigo": 10056
	},
	{
		"ciudad": "Armenia",
		"nombre pventa": "ECONOMIA 10057 - ARMENIA (CENTRO)",
		"direccion": "CARRERA 16 NO. 18-53 CENTRO",
		"codigo": 10057
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 10069 - CALI (MELENDEZ 2)",
		"direccion": "CARRERA 94 NO. 4-82 B / MELENDEZ",
		"codigo": 10069
	},
	{
		"ciudad": "El Cerrito",
		"nombre pventa": "ECONOMIA 10087 - EL CERRITO",
		"direccion": "CALLE 9 NO.12-02",
		"codigo": 10087
	},
	{
		"ciudad": "Cartago",
		"nombre pventa": "ECONOMIA 10098���CARTAGO",
		"direccion": "CARRERA 4 # 9-93  B/ CENTRO",
		"codigo": 10098
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 10112 - CALI (NORMANDIA)",
		"direccion": "AV. 4 OESTE NO. 3-80 LOCAL 4",
		"codigo": 10112
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 10113 - CALI (SANTA TERESITA)",
		"direccion": "CARRERA 1 NRO 5-289 OESTE LOCAL 105 ED TORRES CHARCO DEL BURRO",
		"codigo": 10113
	},
	{
		"ciudad": "Cali",
		"nombre pventa": "ECONOMIA 10114 - CALI (PALMETTO)",
		"direccion": "CALLE 9 NO.44-18 LOCAL 1",
		"codigo": 10114
	},
	{
		"ciudad": "Mompos",
		"nombre pventa": "ECONOMIA 4035 - MOMPOS (RIO)",
		"direccion": "CARRERA 3 NO.17-17",
		"codigo": 4035
	},
	{
		"ciudad": "Corozal",
		"nombre pventa": "ECONOMIA 4040 - COROZAL (CENTRO)",
		"direccion": "CARRERA 25 NO. 30-43",
		"codigo": 4040
	},
	{
		"ciudad": "El Carmen",
		"nombre pventa": "ECONOMIA 4041 - EL CARMEN DE BOLIVAR",
		"direccion": "CALLE 25 NO.49-92 ESQUINA",
		"codigo": 4041
	},
	{
		"ciudad": "Magangu�",
		"nombre pventa": "ECONOMIA 4049 - MAGANGUE (CENTRO)",
		"direccion": "TRANS.3 NO. 14A64",
		"codigo": 4049
	},
	{
		"ciudad": "Magangu�",
		"nombre pventa": "ECONOMIA 4051 - MAGANGUE (HOSPITAL)",
		"direccion": "AV.COLOMBIA CALLE 16 NO 13-139",
		"codigo": 4051
	},
	{
		"ciudad": "Mompos",
		"nombre pventa": "ECONOMIA 4056 - MOMPOS (HOSPITAL)",
		"direccion": "CARRERA 20 # 3-04",
		"codigo": 4056
	},
	{
		"ciudad": "Sinc�",
		"nombre pventa": "ECONOMIA 6022 - SINCE",
		"direccion": "CARRERA 11 # 8 -50",
		"codigo": 6022
	},
	{
		"ciudad": "Magangu�",
		"nombre pventa": "ECONOMIA 6027 - MAGANGUE (MERCADO)",
		"direccion": "CALLE 15 NO. 3 - 66",
		"codigo": 6027
	},
	{
		"ciudad": "San Juan Nepo",
		"nombre pventa": "ECONOMIA 6040 - SAN JUAN NEPOMUCENO",
		"direccion": "CARRERA 9 NO 11 - 78",
		"codigo": 6040
	},
	{
		"ciudad": "Ovejas",
		"nombre pventa": "ECONOMIA 7034 - OVEJAS",
		"direccion": "CARRERA 20 # 15-20",
		"codigo": 7034
	},
	{
		"ciudad": "San Jacinto",
		"nombre pventa": "ECONOMIA 7099 - SAN JACINTO",
		"direccion": "CALLE 21 CRA �41 ESQUINA LOCAL 4",
		"codigo": 7099
	},
	{
		"ciudad": "Santa Ana",
		"nombre pventa": "ECONOMIA 8026 - SANTA ANA",
		"direccion": "CALLE 11 NO.7B -143 SECTOR LOS TUBOS",
		"codigo": 8026
	},
	{
		"ciudad": "Galeras",
		"nombre pventa": "ECONOMIA 8042 - GALERAS",
		"direccion": "CARRERA 11  N� 13-26",
		"codigo": 8042
	},
	{
		"ciudad": "El Carmen",
		"nombre pventa": "ECONOMIA 9017 - EL CARMEN DE BOLIVAR",
		"direccion": "CALLE 24 # 50-06",
		"codigo": 9017
	},
	{
		"ciudad": "Magangu�",
		"nombre pventa": "ECONOMIA 10003 - MAGANGUE (AUTOSERVICIO)",
		"direccion": "CARRERA 3 TRANSV. 3ESQUINA",
		"codigo": 10003
	},
	{
		"ciudad": "Magangu�",
		"nombre pventa": "ECONOMIA 13020 - MAGANGUE (CENTRO)",
		"direccion": "CALLE 16 NO. 3 - 84 ESQ.",
		"codigo": 13020
	},
	{
		"ciudad": "Corozal",
		"nombre pventa": "ECONOMIA 13033 - COROZAL (CENTRO)",
		"direccion": "CALLE 31 NO. 25-02",
		"codigo": 13033
	},
	{
		"ciudad": "Mompos",
		"nombre pventa": "ECONOMIA 13038 - MOMPOS (LA CONCEPCION)",
		"direccion": "CALLE 18 NO. 1A - 18",
		"codigo": 13038
	},
	{
		"ciudad": "Lorica",
		"nombre pventa": "ECONOMIA 4047 - LORICA (IGLESIA)",
		"direccion": "CALLE 1 NO.16A-70",
		"codigo": 4047
	},
	{
		"ciudad": "Lorica",
		"nombre pventa": "ECONOMIA 4050 - LORICA (MERCADO)",
		"direccion": "CALLE 2 NO.19-30",
		"codigo": 4050
	},
	{
		"ciudad": "Cienaga de Oro",
		"nombre pventa": "ECONOMIA 4088 - CIENAGA DE ORO (MERCADO)",
		"direccion": "CALLE 8 NO.15-27",
		"codigo": 4088
	},
	{
		"ciudad": "Lorica",
		"nombre pventa": "ECONOMIA 6019 - LORICA (TERMINAL)",
		"direccion": "CARRERA 25 NO. 11 - 23",
		"codigo": 6019
	},
	{
		"ciudad": "Cienaga de Oro",
		"nombre pventa": "ECONOMIA 6064 - CIENAGA DE ORO (IGLESIA)",
		"direccion": "CARRERA 15 #  8 - 81",
		"codigo": 6064
	},
	{
		"ciudad": "Tol�",
		"nombre pventa": "ECONOMIA 7009 - TOLU",
		"direccion": "CALLE 16 NO.3-80 LOCAL 2",
		"codigo": 7009
	},
	{
		"ciudad": "Lorica",
		"nombre pventa": "ECONOMIA 7028 - LORICA",
		"direccion": "CALLE 4 NO.18-30 CENTRO EDIFICIO SICARA",
		"codigo": 7028
	},
	{
		"ciudad": "San Bernardo",
		"nombre pventa": "ECONOMIA 7031 - SAN BERNARDO",
		"direccion": "CARRERA 7 # 8 -74 CALLE DEL COMERCIO",
		"codigo": 7031
	},
	{
		"ciudad": "San Antero",
		"nombre pventa": "ECONOMIA 7059 - SAN ANTERO",
		"direccion": "CALLE 12 NO.14-100",
		"codigo": 7059
	},
	{
		"ciudad": "Cove�as",
		"nombre pventa": "ECONOMIA 7091 - COVE�AS",
		"direccion": "CALLE 10 NO.22B-51 URB ALICANTE",
		"codigo": 7091
	},
	{
		"ciudad": "San Onofre",
		"nombre pventa": "ECONOMIA 8023 - SAN ONOFRE",
		"direccion": "CARRERA 18 CON CALLE 23 LOCAL 2",
		"codigo": 8023
	},
	{
		"ciudad": "Maria la Baja",
		"nombre pventa": "ECONOMIA 8031 - MARIA LA BAJA",
		"direccion": "CARRERA 15 NO.15-115",
		"codigo": 8031
	},
	{
		"ciudad": "San Andres Sotavento",
		"nombre pventa": "ECONOMIA 8047 - SAN ANDRES SOTAVENTO",
		"direccion": "CALLE 9 NO.10-79",
		"codigo": 8047
	},
	{
		"ciudad": "Lorica",
		"nombre pventa": "ECONOMIA 8062 - LORICA (PUENTE LINO)",
		"direccion": "CALLE 4 N� 22-76 B/ CASCAJAL",
		"codigo": 8062
	},
	{
		"ciudad": "Cove�as",
		"nombre pventa": "ECONOMIA 8066 - COVE�AS (GUAYABAL)",
		"direccion": "CARRERA 29A CALLE 38 LOCAL 2",
		"codigo": 8066
	},
	{
		"ciudad": "Lorica",
		"nombre pventa": "ECONOMIA 8081 - BARRIO KENEDDY",
		"direccion": "CARRERA 21 NO.17A-31 BARRIO KENEDDY",
		"codigo": 8081
	},
	{
		"ciudad": "San Pelayo",
		"nombre pventa": "ECONOMIA 10029 - SAN PELAYO (PARQUE PRINCIPAL)",
		"direccion": "CALLE 8 -617 LOCAL 1 PARQUE PRICIPAL",
		"codigo": 10029
	},
	{
		"ciudad": "Cienaga de Oro",
		"nombre pventa": "ECONOMIA 10030 - CIENAGA DE ORO",
		"direccion": "CALLE 6 N�16-44 PARQUE PRINCIPAL",
		"codigo": 10030
	},
	{
		"ciudad": "Lorica",
		"nombre pventa": "ECONOMIA 10032 - LORICA (PARQUE DE LA CRUZ)",
		"direccion": "B/CENTRO CALLE 3 N 18-32 PARQUE DE LA CRUZ",
		"codigo": 10032
	},
	{
		"ciudad": "Maria la Baja",
		"nombre pventa": "ECONOMIA 10048 - MARIA LA BAJA (PLAZA PRINCIPAL)",
		"direccion": "CALLE 19 CARRERRA 12-9 LOCAL 1 PLAZA PRINCIPAL",
		"codigo": 10048
	},
	{
		"ciudad": "Mo�itos",
		"nombre pventa": "ECONOMIA 10073 - MO�ITOS (CENTRO)",
		"direccion": "CALLE 22B NO.4A-8  CENTRO",
		"codigo": 10073
	},
	{
		"ciudad": "San Onofre",
		"nombre pventa": "ECONOMIA 10078 - SAN ONOFRE",
		"direccion": "CARRERA 20 CALLE 19-72",
		"codigo": 10078
	},
	{
		"ciudad": "Cotorra",
		"nombre pventa": "ECONOMIA 10086 - COTORRA",
		"direccion": "LT C 15 13A 148 BARRIO SANTA LUCIA",
		"codigo": 10086
	},
	{
		"ciudad": "Maria la Baja",
		"nombre pventa": "ECONOMIA 10111 - MARIA LA BAJA",
		"direccion": "CARRERA 15 # 11-193 BARRIO EL PRADO",
		"codigo": 10111
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 4036 - SINCELEJO (IGLESIA)",
		"direccion": "CARRERA 19 #21-20",
		"codigo": 4036
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 4037 - SINCELEJO (PLAZA)",
		"direccion": "CARRERA 18 #20-06",
		"codigo": 4037
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 4038 - SINCELEJO (MERCADO VIEJO)",
		"direccion": "CALLE 21 #22-04 ESQUINA",
		"codigo": 4038
	},
	{
		"ciudad": "Sahag�n",
		"nombre pventa": "ECONOMIA 4039 - SAHAGUN (CENTRO)",
		"direccion": "CARRERA 11 # 13 - 03",
		"codigo": 4039
	},
	{
		"ciudad": "Chin�",
		"nombre pventa": "ECONOMIA 4048 - CHINU (PLAZA)",
		"direccion": "CALLE 16 NO. 7-01",
		"codigo": 4048
	},
	{
		"ciudad": "Sahag�n",
		"nombre pventa": "ECONOMIA 4077 - SAHAGUN (PARQUE)",
		"direccion": "CARRERA 9 NO. 14-73",
		"codigo": 4077
	},
	{
		"ciudad": "Sampues",
		"nombre pventa": "ECONOMIA 6031 - SAMPUES",
		"direccion": "CARRERA 20 NO. 23 - 23",
		"codigo": 6031
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 6041 - SINCELEJO (VENECIA)",
		"direccion": "CALLE 25 NO. 36 - 07 LOCAL 1",
		"codigo": 6041
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 6042 - SINCELEJO (MOCHILA)",
		"direccion": "CARRERA 14 NO. 24 - 10",
		"codigo": 6042
	},
	{
		"ciudad": "San Marcos",
		"nombre pventa": "ECONOMIA 6050 - SAN MARCOS",
		"direccion": "CARRERA 24 NO. 15 - 71",
		"codigo": 6050
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 6061 - SINCELEJO (AV SAN CARLOS)",
		"direccion": "CARRERA 14 NO.15-04 CENTRO COMERCIAL SAN CARLOS",
		"codigo": 6061
	},
	{
		"ciudad": "San Marcos",
		"nombre pventa": "ECONOMIA 7025 - SAN MARCOS",
		"direccion": "CALLE 19 # 23B -19",
		"codigo": 7025
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 7056 - MINIMERCADO SINCELEJO",
		"direccion": "CALLE 28 NO.15-215",
		"codigo": 7056
	},
	{
		"ciudad": "Sampues",
		"nombre pventa": "ECONOMIA 8041 - SAMPUES",
		"direccion": "CARRERA 20 NO.23-76",
		"codigo": 8041
	},
	{
		"ciudad": "Majagual",
		"nombre pventa": "ECONOMIA 8087 - CALLE PRINCIPAL",
		"direccion": "CALLE 5 NO.15-45 LOCAL 1",
		"codigo": 8087
	},
	{
		"ciudad": "Majagual",
		"nombre pventa": "ECONOMIA 9085 - MAJAGUAL (UNIDAD MEDICA)",
		"direccion": "CALLE 5 # 19 - 64 MAJAGUAL- SUCRE",
		"codigo": 9085
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 10060 - SINCELEJO (CLINICA SANTA MARIA)",
		"direccion": "CARRERA 22 NO.16A - 32",
		"codigo": 10060
	},
	{
		"ciudad": "Sincelejo",
		"nombre pventa": "ECONOMIA 10088 - SINCELEJO (BARRIO LOS ALPES)",
		"direccion": "CARRERA 54 # 25 � 16 BARRIO LOS ALPES",
		"codigo": 10088
	},
	{
		"ciudad": "San Marcos",
		"nombre pventa": "ECONOMIA 10118 - SAN MARCOS (CALANCALA)",
		"direccion": "CALLE 19 NO.21-06 BARRIO CALANCALA",
		"codigo": 10118
	},
	{
		"ciudad": "Chin�",
		"nombre pventa": "ECONOMIA 10120 - CHINU (TAKASUAN)",
		"direccion": "CARRERA 7 NO.17-27 BARRIO CENTRO",
		"codigo": 10120
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 4045 - MONTERIA (LA GRANJA)",
		"direccion": "TRANS.5 NO 19-32 LA GRANJA",
		"codigo": 4045
	},
	{
		"ciudad": "Planeta Rica",
		"nombre pventa": "ECONOMIA 4046 - PLANETA RICA (CENTRO)",
		"direccion": "CARRERA 7 NO.19-81",
		"codigo": 4046
	},
	{
		"ciudad": "Montelibano",
		"nombre pventa": "ECONOMIA 4061 - MONTELIBANO (PLAZA)",
		"direccion": "CARRERA 5 NO.16-51",
		"codigo": 4061
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 4095 - MONTERIA (SENA)",
		"direccion": "CARRERA 14 NO 24 - 35 AV. CIRC",
		"codigo": 4095
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 4098 - MONTERIA (SALUDCOOP)",
		"direccion": "CARRERA 6 NO. 30 - 71",
		"codigo": 4098
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 6028 - MONTERIA (CENTRO)",
		"direccion": "CALLE 35 NO. 4 - 04",
		"codigo": 6028
	},
	{
		"ciudad": "Planeta Rica",
		"nombre pventa": "ECONOMIA 6036 - PLANETA RICA (ZONA BANCARIA)",
		"direccion": "CALLE 18 NO. 8 - 06",
		"codigo": 6036
	},
	{
		"ciudad": "Caucasia",
		"nombre pventa": "ECONOMIA 6043 - CAUCASIA (PAJONAL)",
		"direccion": "CALLE 20 NO. 13 -66",
		"codigo": 6043
	},
	{
		"ciudad": "Cerete",
		"nombre pventa": "ECONOMIA 6046 - CERETE (CENTRO)",
		"direccion": "CALLE 14 # 13-41",
		"codigo": 6046
	},
	{
		"ciudad": "Caucasia",
		"nombre pventa": "ECONOMIA 6047 - CAUCASIA (IGLESIA)",
		"direccion": "CARRERA 2  N� 21- 56",
		"codigo": 6047
	},
	{
		"ciudad": "Caucasia",
		"nombre pventa": "ECONOMIA 6048 - CAUCASIA (PUEBLO NUEVO)",
		"direccion": "CALLE 13  N� 11- 04",
		"codigo": 6048
	},
	{
		"ciudad": "Pueblo Nuevo",
		"nombre pventa": "ECONOMIA 6062 - PUEBLO NUEVO (PLAZA)",
		"direccion": "CALLE 13 N� 11-02",
		"codigo": 6062
	},
	{
		"ciudad": "Tierra Alta",
		"nombre pventa": "ECONOMIA 6065 - TIERRA ALTA",
		"direccion": "CALLE 7 # 7-05 CENTRO",
		"codigo": 6065
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 6088 - MONTERIA (ZONA BANCARIA)",
		"direccion": "CARRERA 3 NO.29-43",
		"codigo": 6088
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 6091 - MONTERIA (LA 24)",
		"direccion": "CARRERA 5 #  23 58 ESQUINA",
		"codigo": 6091
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 6092 - MONTERIA (LA CASTELLANA)",
		"direccion": "CALLE 62  NO. 6-13  LOCAL  133",
		"codigo": 6092
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 6093 - MONTERIA (CIRCUNVALAR)",
		"direccion": "CARRERA 14 NO. 33-06",
		"codigo": 6093
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 6099 - MONTERIA (MERCADO CENTRO)",
		"direccion": "CARRERA 3 NO.33-08",
		"codigo": 6099
	},
	{
		"ciudad": "Arboletes",
		"nombre pventa": "ECONOMIA 7089 - ARBOLETES",
		"direccion": "CARRERA 30 NO.27-27",
		"codigo": 7089
	},
	{
		"ciudad": "Planeta Rica",
		"nombre pventa": "ECONOMIA 8030 - PLANETA RICA",
		"direccion": "CARRERA 7 NO. 14 - 92 LOCAL 1 LOS ABETOS",
		"codigo": 8030
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 8053 - MONTERIA EDIFICIO TOLEDO",
		"direccion": "CALLE 22 CARRERA 17D LOCAL 4 EDIFICIO TOLEDO",
		"codigo": 8053
	},
	{
		"ciudad": "Buenavista",
		"nombre pventa": "ECONOMIA 8099 - BUENAVISTA (COMANDO POLICIA)",
		"direccion": "CARRERA 12 NO.10-28",
		"codigo": 8099
	},
	{
		"ciudad": "Caucasia",
		"nombre pventa": "ECONOMIA 9004 - CAUCASIA (MERCADO)",
		"direccion": "CALLE 21 NO. 4-35",
		"codigo": 9004
	},
	{
		"ciudad": "Tierra Alta",
		"nombre pventa": "ECONOMIA 10023 - TIERRA ALTA (CALLE DEL COMERCIO)",
		"direccion": "CARRERA 14 # 8-52  CALLE DEL COMERCIO CENTRO",
		"codigo": 10023
	},
	{
		"ciudad": "Pueblo Nuevo",
		"nombre pventa": "ECONOMIA 10024 - PUEBLO NUEVO (CALLE DEL CAMU)",
		"direccion": "CARRERA 11 NO.13-86",
		"codigo": 10024
	},
	{
		"ciudad": "Montelibano",
		"nombre pventa": "ECONOMIA 10025 - DIAGONAL ALCALDIA",
		"direccion": "CARRERA 13 # 13A - 10 AVENIDA DE LOS ESTUDIANTES",
		"codigo": 10025
	},
	{
		"ciudad": "Cerete",
		"nombre pventa": "ECONOMIA 10026 - CERETE",
		"direccion": "CARRERA 15 NO.9-03 ESQUINA",
		"codigo": 10026
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 10027 - MONTERIA (BARRIO 6 MARZO)",
		"direccion": "DIAGONAL 13 NO.19-05 ESQUINA BARRIO 6 MARZO",
		"codigo": 10027
	},
	{
		"ciudad": "Tierra Alta",
		"nombre pventa": "ECONOMIA 10040 - TIERRA ALTA (CALLE DEL COMERCIO)",
		"direccion": "CARRERA 14#6-68 CENTRO",
		"codigo": 10040
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 10058 - MONTERIA (BARRIO LA PRADERA)",
		"direccion": "MANZANA 62  LOTE NO.1 BARRIO LA PRADERA.",
		"codigo": 10058
	},
	{
		"ciudad": "Monteria",
		"nombre pventa": "ECONOMIA 10083 - MONTERIA (BARRIO MONTEVERDE)",
		"direccion": "CALLE 44 KRA 16 C -40 ESQUINA B/MONTE VERDE",
		"codigo": 10083
	},
	{
		"ciudad": "Fundacion",
		"nombre pventa": "ECONOMIA 4007 - FUNDACION",
		"direccion": "CARRERA 8 NO.5-40",
		"codigo": 4007
	},
	{
		"ciudad": "Plato",
		"nombre pventa": "ECONOMIA 4008 - PLATO",
		"direccion": "CALLE 10 NO.15-06",
		"codigo": 4008
	},
	{
		"ciudad": "El Banco",
		"nombre pventa": "ECONOMIA 4009 - EL BANCO (FRENTE AL RIO)",
		"direccion": "CALLE 2 NO.8-36",
		"codigo": 4009
	},
	{
		"ciudad": "Bosconia",
		"nombre pventa": "ECONOMIA 4014 - BOSCONIA",
		"direccion": "CALLE 18 NO 18A -32",
		"codigo": 4014
	},
	{
		"ciudad": "El Copey",
		"nombre pventa": "ECONOMIA 4017 - EL COPEY",
		"direccion": "CARRERA  14 NO 8A-06",
		"codigo": 4017
	},
	{
		"ciudad": "El Banco",
		"nombre pventa": "ECONOMIA 4021 - EL BANCO (CALLE NUEVA)",
		"direccion": "CALLE 7 NO.2A-50",
		"codigo": 4021
	},
	{
		"ciudad": "El Dif�cil",
		"nombre pventa": "ECONOMIA 5002 - EL DIFICIL",
		"direccion": "CARRERA 7 NO.7-09",
		"codigo": 5002
	},
	{
		"ciudad": "Aracataca",
		"nombre pventa": "ECONOMIA 5003 - ARACATACA",
		"direccion": "CALLE 8 CARRERA 5 ESQUINA",
		"codigo": 5003
	},
	{
		"ciudad": "Chimichagua",
		"nombre pventa": "ECONOMIA 5006 - CHIMICHAGUA (CENTTRO)",
		"direccion": "CALLE 5  NO.3-99",
		"codigo": 5006
	},
	{
		"ciudad": "Fundacion",
		"nombre pventa": "ECONOMIA 6015 - FUNDACION",
		"direccion": "CARRERA 8 NO.4-05",
		"codigo": 6015
	},
	{
		"ciudad": "Plato",
		"nombre pventa": "ECONOMIA 8063 - PLATO",
		"direccion": "CARRERA 15 NO.12-03 LOS GUAYACANES",
		"codigo": 8063
	},
	{
		"ciudad": "El Banco",
		"nombre pventa": "ECONOMIA 8089 - EL BANCO (CHAPINERO)",
		"direccion": "CALLE 7 NO.3-53 BARRIO CHAPINERO",
		"codigo": 8089
	},
	{
		"ciudad": "Astrea",
		"nombre pventa": "ECONOMIA 10091 - ASTREA",
		"direccion": "CALLE 7 NO.4-111",
		"codigo": 10091
	},
	{
		"ciudad": "Fundacion",
		"nombre pventa": "ECONOMIA 13009 - FUNDACION",
		"direccion": "CALLE 3 CARRERA 8 ESQUINA",
		"codigo": 13009
	},
	{
		"ciudad": "Fundacion",
		"nombre pventa": "ECONOMIA 13021 - FUNDACION",
		"direccion": "CARRERA 8 NO.6-36",
		"codigo": 13021
	},
	{
		"ciudad": "La Loma",
		"nombre pventa": "COMFACESAR 5 - LA LOMA",
		"direccion": "CARRERA 11 NO 10-89 PLAZA PRICIPAL LA LOMA DE CALENTURA",
		"codigo": 4083
	},
	{
		"ciudad": "El Paso",
		"nombre pventa": "ECONOMIA 7096 - EL PASO",
		"direccion": "CALLE 3A N� 5 - 82",
		"codigo": 7096
	},
	{
		"ciudad": "Aguachica",
		"nombre pventa": "ECONOMIA 4010 - AGUACHICA (HOSPITAL)",
		"direccion": "CALLE 5 NO 31-73",
		"codigo": 4010
	},
	{
		"ciudad": "Chiriguana",
		"nombre pventa": "ECONOMIA 5001 - CHIRIGUANA",
		"direccion": "CARRERA 5 NO 4-107",
		"codigo": 5001
	},
	{
		"ciudad": "Curumani",
		"nombre pventa": "ECONOMIA 5004 - CURUMANI (CENTRO)",
		"direccion": "CALLE 9 NO 15 -49",
		"codigo": 5004
	},
	{
		"ciudad": "Pelaya",
		"nombre pventa": "ECONOMIA 5005 - PELAYA",
		"direccion": "CARRERA 8 NO 7A-131",
		"codigo": 5005
	},
	{
		"ciudad": "Pailitas",
		"nombre pventa": "ECONOMIA 5007 - PAILITAS",
		"direccion": "CARRERA 7 NO 6-53",
		"codigo": 5007
	},
	{
		"ciudad": "Tamalameque",
		"nombre pventa": "ECONOMIA 5008 - TAMALAMEQUE",
		"direccion": "CALLE 5 NO 5 - 73",
		"codigo": 5008
	},
	{
		"ciudad": "La Jagua",
		"nombre pventa": "ECONOMIA 5010 - LA JAGUA (CARRETERA CENTRAL)",
		"direccion": "CARRERA 7 NO 8-32",
		"codigo": 5010
	},
	{
		"ciudad": "Gamarra",
		"nombre pventa": "ECONOMIA 5011 - GAMARRA",
		"direccion": "CALLE 6 NO.7-05",
		"codigo": 5011
	},
	{
		"ciudad": "Curumani",
		"nombre pventa": "ECONOMIA 6029 - CURUMANI (CENTRO)",
		"direccion": "CALLE 8 CRA 17 LOCAL N.1",
		"codigo": 6029
	},
	{
		"ciudad": "Codazzi",
		"nombre pventa": "ECONOMIA 6053 - CODAZZI (CENTRO)",
		"direccion": "CARRERA 16 # 12 - 81",
		"codigo": 6053
	},
	{
		"ciudad": "San Alberto",
		"nombre pventa": "ECONOMIA 6057 - SAN ALBERTO (CENTRO)",
		"direccion": "CARRERA 3 CALLE 2  ESQUINA",
		"codigo": 6057
	},
	{
		"ciudad": "Becerril",
		"nombre pventa": "ECONOMIA 7080 - BECERRIL",
		"direccion": "CALLE 9 NO 3 -88",
		"codigo": 7080
	},
	{
		"ciudad": "Aguachica",
		"nombre pventa": "ECONOMIA 7086 - AGUACHICA",
		"direccion": "CARRERA 11 N 3 - 131",
		"codigo": 7086
	},
	{
		"ciudad": "Aguachica",
		"nombre pventa": "COMFACESAR 1 - AGUACHICA (CENTRO)",
		"direccion": "CARRERA 18 NO 4-77",
		"codigo": 8001
	},
	{
		"ciudad": "Codazzi",
		"nombre pventa": "COMFACESAR 3 - CODAZZI (CENTRO)",
		"direccion": "CARRERA 16 NO 14-01 ( CENTRO )",
		"codigo": 8003
	},
	{
		"ciudad": "Becerril",
		"nombre pventa": "COMFACESAR 9 - BECERRIL",
		"direccion": "CARRERA 5 NO 12-49 L-1",
		"codigo": 8009
	},
	{
		"ciudad": "La Jagua",
		"nombre pventa": "ECONOMIA 8016 - LA JAGUA",
		"direccion": "DIAGONAL 1 NO 1-198",
		"codigo": 8016
	},
	{
		"ciudad": "La Gloria",
		"nombre pventa": "ECONOMIA 10092 - LA GLORIA (CENTRO)",
		"direccion": "CALLE 2 NO 5-29",
		"codigo": 10092
	},
	{
		"ciudad": "Oca�a",
		"nombre pventa": "ECONOMIA 10119 - OCA�A",
		"direccion": "CARRERA 49 D NO 3-21(KR 39 NO 2-06)L-5",
		"codigo": 10119
	},
	{
		"ciudad": "San Juan del Cesar",
		"nombre pventa": "ECONOMIA 4013 - SAN JUAN DEL CESAR",
		"direccion": "CALLE 6 # 4-02",
		"codigo": 4013
	},
	{
		"ciudad": "La Paz",
		"nombre pventa": "ECONOMIA 4072 - LA PAZ",
		"direccion": "CALLE 6 NO.6-22",
		"codigo": 4072
	},
	{
		"ciudad": "Fonseca",
		"nombre pventa": "ECONOMIA 4074 - FONSECA",
		"direccion": "CALLE 13 # 18-26",
		"codigo": 4074
	},
	{
		"ciudad": "Villanueva",
		"nombre pventa": "ECONOMIA 4075 - VILLANUEVA",
		"direccion": "CALLE 14 NO 10-48 ESQUINA",
		"codigo": 4075
	},
	{
		"ciudad": "Riohacha",
		"nombre pventa": "ECONOMIA 4079 - RIOHACHA",
		"direccion": "CARRERA 7 # 14-01RIOHACHA [GUAJIRA]",
		"codigo": 4079
	},
	{
		"ciudad": "Barrancas",
		"nombre pventa": "ECONOMIA 4084 - BARRANCAS",
		"direccion": "CARRERA 8 NO. 10-59",
		"codigo": 4084
	},
	{
		"ciudad": "Riohacha",
		"nombre pventa": "ECONOMIA 4090 - RIOHACHA",
		"direccion": "CALLE 11 N� 12-72",
		"codigo": 4090
	},
	{
		"ciudad": "Riohacha",
		"nombre pventa": "ECONOMIA 4094 - RIOHACHA",
		"direccion": "CALLE 2  CARRERA 7 ESQ LOCAL 2",
		"codigo": 4094
	},
	{
		"ciudad": "Urumita",
		"nombre pventa": "ECONOMIA 5014 - URUMITA",
		"direccion": "CARRERA 9 NO 11-02",
		"codigo": 5014
	},
	{
		"ciudad": "Hatonuevo",
		"nombre pventa": "ECONOMIA 5015 - HATONUEVO",
		"direccion": "CALLE 15 # 16 - 170",
		"codigo": 5015
	},
	{
		"ciudad": "San Juan del Cesar",
		"nombre pventa": "ECONOMIA 6012 - SAN JUAN DEL CESAR",
		"direccion": "CARRERA 6 N� 1 - 104",
		"codigo": 6012
	},
	{
		"ciudad": "Riohacha",
		"nombre pventa": "ECONOMIA 7081 - RIOHACHA",
		"direccion": "CALLE 15 CRA 15 ESQ LOCAL 101 4 VIAS",
		"codigo": 7081
	},
	{
		"ciudad": "Fonseca",
		"nombre pventa": "ECONOMIA 7082 - FONSECA",
		"direccion": "CALLE 13 N 16 - 62",
		"codigo": 7082
	},
	{
		"ciudad": "Riohacha",
		"nombre pventa": "ECONOMIA 8013 - RIOHACHA",
		"direccion": "CARRERA 13 N 10 - 04",
		"codigo": 8013
	},
	{
		"ciudad": "Albania",
		"nombre pventa": "ECONOMIA 9001 - ALBANIA",
		"direccion": "CENTRO COMERCIAL MAKUIRA LA MINA",
		"codigo": 9001
	},
	{
		"ciudad": "Puerto Bolivar",
		"nombre pventa": "ECONOMIA 9090 - PUERTO BOLIVAR",
		"direccion": "COMPLEJO HABITACIONAL PUERTO BOLIVAR",
		"codigo": 9090
	},
	{
		"ciudad": "Uribia",
		"nombre pventa": "ECONOMIA 10081 - URIBIA",
		"direccion": "CARRERA 10 NO 14A - 09 LC 3",
		"codigo": 10081
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4055 - VALLEDUPAR",
		"direccion": "CALLE 20 NO 13-06 MERCADO",
		"codigo": 4055
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4065 - VALLEDUPAR",
		"direccion": "DIAGONAL 18 NO 17B-20 L - 1 DETR�S DEL HOSPITAL",
		"codigo": 4065
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4068 - VALLEDUPAR (VAJAMAR)",
		"direccion": "CALLE 17 # 11 - 95 GAITAN",
		"codigo": 4068
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4069 - VALLEDUPAR (GALERIA)",
		"direccion": "CALLE 18B NO 7-05 LOCAL 2 GALERIA",
		"codigo": 4069
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4073 - VALLEDUPAR",
		"direccion": "CALLE 16 NO 12-05 LOPERENA",
		"codigo": 4073
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4085 - VALLEDUPAR",
		"direccion": "CARRERA 19 NO 16A-04 TELECOM",
		"codigo": 4085
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4089 - VALLEDUPAR (HOSPITALARIA)",
		"direccion": "CALLE 16 NO 17A-02 HOSPITAL",
		"codigo": 4089
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 4093 - VALLEDUPAR",
		"direccion": "CALLE 16 NO 15-16 GALENOS",
		"codigo": 4093
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 6014 - VALLEDUPAR (PONTE VEDRA)",
		"direccion": "CARRERA 19 NO 7C-61 TRES POSTES",
		"codigo": 6014
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 6067 - VALLEDUPAR (LA 23)",
		"direccion": "CALLE 16 N� 22-65  LA POPA",
		"codigo": 6067
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 7036 - VALLEDUPAR (12 OCTUBRE)",
		"direccion": "CALLE 23 NO. 15 -53  12 OCTUBRE",
		"codigo": 7036
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 7042 - VALLEDUPAR",
		"direccion": "CALLE 1 # 19C - 66 LOCAL 2 URB LOS CORALES",
		"codigo": 7042
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "COMFACESAR 8008 - VALLEDUPAR",
		"direccion": "CARRERA 9  16A - 10  CENTRO",
		"codigo": 8008
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 8090 - VALLEDUPAR (IRACAL)",
		"direccion": "CALLE 11 N�   21 - 136 LOCAL 2 BARRIO IRACAL",
		"codigo": 8090
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 9006 - VALLEDUPAR",
		"direccion": "CARRERA 9 NO 9 - 48 NOVALITO",
		"codigo": 9006
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 9015 - VALLEDUPAR",
		"direccion": "CALLE 16B NO 8-03 CENTRO",
		"codigo": 9015
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 10021 - VALLEDUPAR (12 OCTUBRE)",
		"direccion": "CARRERA 16 # 28 - 06  - 12 DE OCTUBRE",
		"codigo": 10021
	},
	{
		"ciudad": "Valledupar",
		"nombre pventa": "ECONOMIA 10096 - VALLEDUPAR (NUEVA ESPERANZA)",
		"direccion": "CALLE 6 # 25 - 06 NUEVA ESPERANZA",
		"codigo": 10096
	}
]


async function init() {

	let res = await API.GET.getMunicipios();

	let $elem = $("#ciudad-field")

	if (res.error === false) {
		municipios = res.data.municipios.map(item => item.Nombre)
		autocomplete($elem[0], municipios, true);
	}

	$("#email-server").on("change", function (e) {
		let $elem = $(e.currentTarget)
		if ($elem.val() == "otro") {
			$elem.hide(0)
			$("#email2").show(0)
		}
	})

	let $elem2 = $("#sucursal-field")
	let sucuralesmap = sucursales.map(item => item["nombre pventa"] + " - " + item.direccion)

	autocomplete($elem2[0], sucuralesmap, true, true);

}


init()

async function send() {

	let $target = $("#frm-registro")
	let { email, nombres, apellidos, tdocumento, nit, tipo_peticion, cellphone, origen, concepto, descripcion, aceptaradio } = $target[0];

	let fields = {
		email: email.value + "@" + ($("#email-server").val() == "otro" ? $("#email2").val() : $("#email-server").val()),
		nombres: nombres.value,
		apellidos: apellidos.value,
		tdocumento: tdocumento.value,
		nit: nit.value,
		celular: cellphone.value,
		tipo_peticion: tipo_peticion.value,
		origen: origen.value,
		concepto: concepto.value,
		descripcion: descripcion.value,
		asesorando: aceptaradio.checked ? "SI" : "NO",
		ciudad: $("#ciudad-field").val(),
		sucursal: $("#sucursal-field").val(),
	}

	if(!fields.sucursal) fields.sucursal = "N/A"

	// validaciones
	if (!FormValidations.IsValidEmail(fields.email))
		return $("#login-error2").show(200).html("El email no es válido").delay(2500).hide(100)
	if (FormValidations.ContainsLetters(fields.celular) || !FormValidations.IsValidPhoneNumber(fields.celular))
		return $("#login-error2").show(200).html("El número de celular no es válido").delay(2500).hide(100)
	if (FormValidations.ContainsLetters(fields.nit) || FormValidations.ContainsSpecialChars(fields.nit))
		return $("#login-error2").show(200).html("El número de documento no es válido").delay(2500).hide(100)
	if (ValidateInputFormEmpty(fields))
		return $("#login-error2").show(200).html("Debe llenar todos los campos").delay(2500).hide(100)



	let res = await API.POST.setdata(JSON.stringify(fields), "pqrs");

	if (res.error === false && !res.data.error) {

		/*showPopup(ABS_URL_SERVER + "/assets/popup-vidasana.jpg", {
			imageClick: `parent.location='${ABS_URL}'`,
			callToActionLabel: `IR AL INICIO`,
			callToAction: `parent.location='${ABS_URL}'`,
		})*/
		alert("Solicitud guardada correctamente")

	} else {
		alert("Hubo un error al guardar")
	}

}