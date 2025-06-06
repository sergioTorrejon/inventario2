import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class initialData1669054946369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.categoria_empresa
        (id, categoria, codigo, descripcion, status)
        VALUES(1, 'Empresas de Seguros Generales', '100', 'Empresas de Seguros Generales', true),
        (2, 'Empresas de Seguros de Personas', '200', 'Empresas de Seguros de Personas', true),
        (3, 'Empresas de Seguros Prepago', '300', 'Empresas de Seguros Prepago', true),
        (4, 'Empresas de Reaseguros de Seguros Generales', '400', 'Empresas de Reaseguros de Seguros Generales', true),
        (5, 'Empresas de Reaseguros de Seguros de Personas', '500', 'Empresas de Reaseguros de Seguros de Personas', true),
        (6, 'Reaseguros de Seguros de Fianzas', '600', 'Reaseguros de Seguros de Fianzas', true),			
        (7, 'Reaseguros Extranjeras', '700', 'Reaseguros Extranjeras', true),
        (8, 'Corredoras Extranjeras de Reaseguro', '800', 'Corredoras Extranjeras de Reaseguro', true),
        (9, 'Corredoras de Seguros', 'C00', 'Corredoras de Seguros', true),
        (10, 'Corredoras de Reaseguros', 'D00', 'Corredoras de Seguros', true),
        (11, 'Ajustadoras de Seguros', 'E00', 'Ajustadoras de Seguros', true),
        (12, 'Empresas de Seguros Generales y Fianzas', 'S00', 'Empresas de Seguros Generales y Fianzas', true);`);

        await queryRunner.query(`INSERT INTO public.empresas
        (id_tipo_empresa, codigo, nombre, sigla, nro_seprem, nit, email, telefono, direccion, status, usuario_creacion, fecha_creacion, usuario_modificacion, fecha_modificacion)
        VALUES(12,'101', 'La Boliviana Ciacruz de Seguros y Reaseguros S.A.', 'LBC-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'102', 'Seguros y Reaseguros Credinform International S.A.', 'CRI-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(1,'103', 'Delta Insurance Company S.A.', 'DEL-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(1,'104', 'La Fenix Boliviana S.A. de Seguros y Reaseguros S.A.', 'LFB-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'105', 'Seguros Illimani S.A.', 'ILL-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'106', 'Nacional de Seguros y Reaseguros S.A.', 'NAL-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(1,'107', 'Unicruz Compañía de Seguros y Reaseguros S.A.', 'UNI-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'108', 'Alianza Compañía de Seguros y Reaseguros S.A.', 'ALI-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'109', 'Bisa Seguros y Reaseguros S.A.', 'BIS-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'110', 'Cooperativa de Transportes y Seguros 24 de Septiembre Ltda.', '24S-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'111', 'Adriática de Seguros y Reaseguros S.A.', 'ADR-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(1,'112', 'Cooperativa de Seguros Santa Cruz Ltda.', 'SCZ-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'113', 'Compañía de Seguros y Reaseguros Fortaleza S.A.', 'CRU-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'201', 'BUPA Insurance (Bolivia) S.A.', 'BUP-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(1,'202', 'Aseguranza Internacional Compañía de Seguros S.A.', 'ASI-P', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'203', 'La Vitalicia Seguros y Reaseguros de Vida S.A.', 'LVI-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'204', 'La Boliviana Ciacruz Seguros Personales S.A.', 'LBC-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'205', 'Seguros Provida S.A.', 'PRO-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'206', 'Nacional Seguros Vida y Salud S.A.', 'NAL-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'207', 'Alianza Vida de Seguros y Reaseguros S.A.', 'ALI-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(1,'208', 'Unicruz Compañía de Seguros de Vida S.A.', 'UNI-P', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C01', 'Antares S.R.L.', 'ANT-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C02', 'Corredores y Asesores de Seguros ASECOR Ltda.', 'ASE-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C03', 'H.K.A. Corredores y Asesores de Seguros S.R.L.', 'HKA-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C04', 'Guillén Hermanos Ltda.', 'GUH-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C05', 'Consultores de Seguros S.A. Corredores y Asesores', 'CON-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C06', 'Corredora Santa Cruz', 'CSC-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C07', 'V & C', 'V&C-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C08', 'Corredores de Seguros S.R.L. CONSESO Ltda.', 'COR-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C09', 'El Sol', 'ESO-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C10', 'Fides Brokers A.E.C Fides Brokers', 'AEC-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C11', 'Corredora de Seguros G & G Ltda.', 'G&G-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C12', 'Ibero Associates', 'IBE-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C13', 'International Insurance Brokers S.R.L.', 'IIB-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C14', 'Kieffer Asociados S.A.', 'K&A-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C15', 'Saavedra Pacheco Corredores de Seguros S.R.L.', 'SAA-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C16', 'Sudamericana S.R.L. Corredores y Asesores de Seguros', 'SUD-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C17', 'Universal Brokers S.A.', 'UNB-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C18', 'H.P. Brokers y Asesores de Seguros S.R.L.', 'HPB-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C19', 'Euroamérica Corredores y Asesores de Seguros S.R.L.', 'EUR-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C20', 'America Brokers Srl.', 'AME-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C21', 'C.A.S. Corredora de Seguros', 'CAS-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C22', 'PROTG Asesoramiento Profesional Autorizado Ltda.', 'PRO-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C23', 'Previsión S.R.L.', 'PRE-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C24', 'Latina Asesores', 'LAT-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C25', 'Estratégica S.R.L. Corredores y Asesores de Seguros', 'EST-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C26', 'Ugarte y Martinez Asociados S.A.', 'U&M-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C27', 'Elhoin & Asociados S.R.L.', 'E&A-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C28', 'J.R, Rodriguez Broker Ltda.', 'JRR-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C29', 'Quantum Corredores y Asesores de Seguros S.R.L.', 'QUA-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C30', 'Intermed Brokers S.R.L.', 'INB-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C31', 'Consegur S.R.L. Corredores, Asesores de Seguros', 'COS-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C32', 'Hokken S.R.L.', 'HOK-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C33', 'Paradigma Capse S.R.L.', 'PAR-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C34', 'Bravo Asesores', 'BRA-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C35', 'Genera Bolivia Ltda.', 'GEN-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D01', 'Conesa Kieffer & Asociados S.A.', 'COK-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C36', 'A.E.C. Fides Brokers Ltda.', 'FBL-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C37', 'Rodriguez Brokers', 'ROB-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C38', 'Soliz y Asociados', 'SOA-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C39', 'Cabezas S.R.L. Asesores y Corredores de Seguros', 'CAB-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C40', 'Justa S.R.L. Corredores de Seguros', 'JUS-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C41', 'Genesis Brokers Ltda. Corredora de Seguros', 'GEB-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'701', 'COMPAÑÍA SUIZA DE REASEGUROS, ZURICH', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'702', 'ZURICH VERSICHERUNGS - GESELLSCHAFT', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'703', 'EVEREST REINSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'704', 'EMPLOYERS REINSURANCE CORPORATION', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'705', 'ST. PAUL FIRE AND MARINE INSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'706', 'AMERICANA DE REASEGUROS S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'707', 'LA POSITIVA SEGUROS Y REASEGUROS S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'708', 'HANNOVER RUCKVERSICHERUNGS AKTIENGESELLSCHAFT', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'709', 'LA KOLNISCHE RUCK, KOLNISCHE RUCKVERSICHERUNGS – G', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'710', 'REASEGUROS ALIANZA S.A. (MEXICO)', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'711', 'REASEGUROS ALIANZA PANAMA S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'712', 'CAJA REASEGURADORA DE CHILE S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'713', 'AMERICAN RE-INSURANCE COMPANY (CHILE) S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'714', 'P&V ASSURANCE S.C.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'715', 'FOLKSAM INTERNATIONAL INSURANCE CO. LTD.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'716', 'CO-OPERATIVE INSURANCE SOCIETY LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'717', 'MUNCHENER RUCKVERSICHERUNGS-GESELLSCHAFT, ACTIENGE', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'718', 'AMERICAN UNITED LIFE INSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'719', 'GERLING-KONZERN GLOBALE RUCKVERSICHERUNGS-AKTIENGE', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'720', 'REINSURANCE AUSTRALIA CORPORATION LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'721', 'REASEGURADORA PATRIA S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'722', 'SIGNET STAR REINSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'723', 'FOLKSAMERICA REINSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'724', 'ODYSSEY AMERICA REINSURANCE CORPORATION', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'725', 'AMERICAN PIONEER LIFE INSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'726', 'LONDON LIFE REINSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'727', 'ASSICURAZIONI GENERALI S.P.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'728', 'MAPFRE RE. COMPAÑIA DE REASEGUROS S.A. ', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'729', 'EMPLOYERS REASSURANCE CORPORATION', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'730', 'LONDON LIFE AND CASUALTY REINSURANCE CORPORATION', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'731', 'ERC FRANKONA RUCKVERSICHERINGS-AKTIEN-GESELLSCHAFT', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'732', 'EL PACIFICO – PERUANO SUIZA, COMPAÑIA DE SEGUROS Y', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'733', 'LES MUTUELLES DU MANS ASSURANCE', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'734', 'AMERICAN PHOENIX LIFE AND REASSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'735', 'HARTFORD FIRE INSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'736', 'LIBERTY MUTUAL INSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'737', 'SCOR REINSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'738', 'QBE INTERNATIONAL INSURANCE LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'739', 'QBE INSURANCE & REINSURANCE (EUROPE) LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'740', 'COMPAÑIA DE SEGUROS LA REPUBLICA S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'741', 'MAPFRE ASISTENCIA COMPAÑIA INTERNACIONAL DE SEGURO', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'742', 'RGA REINSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'743', 'ALLIANZ AG, MUNICH', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'744', 'REASEGURADORA DE COLOMBIA S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'745', 'WINTERTHUR SWISS INSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'746', 'THE CHIYODA FIRE AND MARINE INSURANCE COMPANY (EUR', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'747', 'MIDDLE SEA INSURANCE COMPANY LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'748', 'EL PACIFICO VIDA COMPAÑÍA DE SEGUROS Y REASEGUROS', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'749', 'AETNA LIFE & CASUALTY (BERMUDA) LTD.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'801', 'PWS INTERNATIONAL LTD.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'802', 'FIRSTCITY INSURANCE SERVICES', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'803', 'C.E. HEATH (SUR) S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'804', 'AMERICAN BROKERS CO. S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'805', 'LA COLONENSE CORREDORES DE REASEGUROS LTDA.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'806', 'SEDWICK REINSURANCE BROKERS LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'807', 'WILLIS FABER & DUMAS LTD.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'808', 'MARSH USA INC. (MARSH & MCLENNAN COMPANIES, INC.)', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'809', 'AON RISK SERVICES INC. OF ILLINOIS (ROLLINS HUDIG ', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'810', 'G.C. INSURANCE BROKERS LTD.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'811', 'ROPNER INSURANCE SERVICES LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'812', 'REATLANTIC REINSURANCE BROKERS CORPORATION LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'813', 'CONESA Y ASOCIADOS LTDA., CORREDORES DE REASEGUROS', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'814', 'SUR BROKER S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'815', 'AON BROKING SERVICES S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'816', 'UNITED INSURANCE BROKERS LTD.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'817', 'SWIRE BLANCH LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'818', 'LAMBERT FENCHURCN INTERNATIONAL GROUP LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'819', 'GUY CARPENTER REINMEX INTERMEDIARIO DE REASEGURO S', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'820', 'BUTCHER, ROBINSON & STAPLES INTERNATIONAL LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'821', 'HRH / AMERICAN PHOENIX CORPORATION', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'822', 'NORMAN BUTCHER & JONES GROUP LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'823', 'LONDON SPECIAL RISKS LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'824', 'JLT RISK SOLUTIONS LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'825', 'AP CORREDORES INTERNACIONALES DE REASEUROS LTDA.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'826', 'PORTSMOUTH INTERNATIONAL MARINE SERVICES AND INSUR', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'827', 'GUY CARPENTER & COMPANY S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'828', 'THE MILLER INSURANCE GROUP LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C42', 'Corredora Boliviana de Seguros Ltda.', 'CBS-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'114', 'Seguros y Reaseguros Generales 24 de Septiembre S.A.', '24S-G', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C45', 'Royal Brokers S.R.L.', 'ROY-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C46', 'Delta Brokers Insurance S.A.', 'DEL-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D04', 'Olsa Bolivia Corredores y Asesores de Reaseguros S.A.', 'OLS-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'115', 'Nacional Seguros Patrimoniales y Fianzas S.A.', 'NAL-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C48', 'Consejeros y Corredores de Seguros Bolivia S.A.', 'CYC-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C44', 'AON Bolivia S.A. Corredores de Seguros', 'AON-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C49', 'Corresur SRL', 'CSU-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'209', 'CREDISEGURO S.A. SEGUROS PERSONALES', 'CRS-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C50', 'Puerto Seguro Corredores y Asesores de Seguros SRL', 'PSE-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'750', 'SHELTER REINSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'751', 'SOCIETE DE REASSURANCES DES ASSURANCES MUTUELLES AGRICOLES S.A.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'752', 'INDUSTRIAL INSURANCE COMPANY LTD.', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'753', 'AMEDEX INSURANCE COMPANY', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(7,'754', 'LE MANS RE', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'829', 'HSBC INSURANCE BROKERS LIMITED', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(8,'830', 'CG & R INSURANCE', '', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C43', 'JR & Asociados S.R.L', 'J&R-S', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D05', 'Iberam Re Corredores Internacionales de Reaseguros S.A.', 'IBE-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C51', 'Patria S.A. Corredores y Asesores de Seguros', 'PAT-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D02', 'Aon Re Bolivia S.A. Corredores de Reaseguros', 'AON-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D03', 'Corredores y Asesores de Reaseguros del Sur S.A. (REASUR S.A.)', 'RSU-R', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C47', 'Previcor Corredores y Asesores de Seguros S.A.', 'PRE-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C53', 'Cubre SRL', 'CUB-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C54', 'I.B.A. Corredores y Asesores de Seguros S.R.L.', 'IBA-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C52', 'ASESCOR S.R.L. - Corredores de Seguros', 'ACS-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'299', 'International Health Insurance Danmarck (Bolivia)', 'IHD-P', '', '', '', '', '',false, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'210', 'Univida S.A.', 'UVD-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'211', 'Seguros de Vida Fortaleza S.A.', 'SVF-P', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C55', 'BCS Brokers Corporativos de Seguros S.R.L.', 'BSC-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C56', 'Tocars Brokers S.R.L.', 'TBR  ', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D06', 'Universal Brokers RE Corredores de Reaseguros', 'UNI-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D07', 'Acces RE Corredora de Reaseguros', 'ACS-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D08', 'Risk Reinsurance Broker S.A.', 'RRB-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'116', 'Unibienes Seguros y Reaseguros Patrimoniales S.A.', 'UNI-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'117', 'Crediseguro S.A. Seguros Generales', 'CRS-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C57', 'Crediseguro S.A. Seguros Generales', 'ECO-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(2,'212', 'Santa Cruz Vida y Salud Seguros y Reaseguros Personales S.A. ', 'SC-P ', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(10,'D09', ' KRINGS REINSURANCE BROKERS S.A', 'KRB-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(9,'C58', 'PROPRESE Corredores de Seguros S.A', 'PRO-S', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(12,'118', 'Mercantil Santa Cruz Seguros y Reaseguros Generales S.A.', 'MSC-G', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(3,'301', 'Innovasalud Servicios en Salud S.A.', 'INN-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now()),
(3,'302', 'Foianini Salud Medicina Prepaga S.A.', 'FSM-R', '', '', '', '', '',true, 'default'::character varying, now(), 'default'::character varying, now())
;`);


await queryRunner.query(`INSERT INTO public.categoria_registro (categoria, codigo, descripcion, status, usuario_creacion, fecha_creacion, usuario_modificacion, fecha_modificacion) VALUES
('baja', '01', 'Retiro por causal ajena a la voluntad del trabajador debido a delitos o infracciones y faltas cometidas con dolo, daño económico reconocido y sin solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '02', 'Retiro por causal ajena a la voluntad del trabajador debido a infracciones y faltas cometidas con dolo, daño económico reconocido y con solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '03', 'Retiro por causal ajena a la voluntad del trabajador debido a contraversiones graves a normas internas o disposiciones legales, por imprudencia o negligencia culposa, con daño económico y con solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '04', 'Retiro por causal ajena a la voluntad del trabajador debido a contraversiones graves a normas internas o disposiciones legales, por imprudencia o negligencia culposa, con daño económico y con formula de solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '05', 'Abandono de funciones por tiempo superior al fijado por ley, con daño económico.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '06', 'Retiro por causal ajena a la voluntad del trabajador debido a contravenciones graves a normas internas o disposiciones legales, por imprudencia o negligencia culposa, sin daño económico.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '07', 'Retiro por causal ajena a la voluntad del trabajador debido a contravenciones leves reiteradas a normas internas o disposicioneslegales, sin daño económico.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '08', 'Abandono de funciones por tiempo superior al fijado por ley, sin daño económico.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '09', 'Retiro por causal ajena a la voluntad del trabajador sin contravención a normas internas o disposiciones legales.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '10', 'Renuncia o cesarión de funciones por finalización de contrato sin contravención a normas internas o disposiciones legales.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '11', 'Suspensión, cancelación o inhabilitación, por determinación de la APS y ante el incumplimiento o infracción de la Ley N° 1883 de Seguros y/o sus reglamentos, mediante Resolución Administrativa, carta o por determinación de la autoridad competente.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja', '18', 'Retiro por daños y perjuicios, en el marco de lo establecido en el Artículo 164 del Código de Comercio.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja_ejecutivos', '12', 'Renuncía o cesación por cumplimiento del periodo de funciones o por fallecimiento.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja_ejecutivos', '13', 'Cesación de funciones por distribución de utilidades en contravención a lo estipulado en el Artículo 168 del Código de Comercio.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja_ejecutivos', '14', 'Cesación de funciones por daños que fueran consecuencia de dolo, fraude, culpa grave o abuso de facultades y de autoridad.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja_ejecutivos', '15', 'Cesación de funciones por imcumplimiento o violación de las leyes, estatutos, reglamentos, normativa de la APS o resoluciones de las juntas de accionistas o de Directorio.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja_ejecutivos', '16', 'Cesación de funciones por daños y perjuicios, como administrador y/o representante, en el marco de lo establecido en el Artículo 164 del Código de Comercio.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('baja_ejecutivos', '17', 'Suspensión, cancelación o inhabilitación, por determinación de la APS y ante el incumplimiento o infracción de la Ley N° 1883 de Seguros y/o sus reglamentos, mediante Resolución Administrativa o por determinación de la autoridad competente.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '151', 'Delitos o infracciones y faltas cometidas con dolo, daño económico reconocido y sin formula de solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '152', 'Infracciones y faltas cometidas con dolo, con daño económico reconocido y con fórmula de solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '153', 'Contravenciones graves a normas internas o disposiciones legales o regulatorias, por imprudencia o negligencia culposa, con daño económico y sin fórmula de solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '154', 'Contravenciones graves a normas internas o disposiciones legales o regulatorias, por imprudencia o negligencia culposa, con daño económico y con fórmula de solución voluntaria.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '155', 'Contravenciones graves a normas internas o disposiciones legales o regulatorias, por imprudencia o negligencia culposa, sin daño económico.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '156', 'Contravenciones graves a normas internas o disposiciones legales o regulatorias, sin daño económico.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '157', 'Contravenciones graves a normas internas o disposiciones legales o regulatorias.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior', '158', 'Suspensión, cancelación o inhabilitación, por determinación de la APS y ante el incumplimiento o infracción de la Ley 1883 y/o sus reglamentos, mediante Resolución Administrativa o por determinación de la autoridad competente.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior_ejecutivo', '171', 'Daños que fueran consecuencia de dolo, fraude, culpa grave o abuso de facultades.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior_ejecutivo', '172', 'Incumplimiento, violación de las leyes, estatutos, reglamentos o resolucionesde las juntas de accionistas.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior_ejecutivo', '173', 'Mal desempeño de sus funciones, conforme a lo dispuesto en el Artículo 164 del Código de Comercio.', true, 'default'::character varying, now(), 'default'::character varying, now()),
('hecho_posterior_ejecutivo', '174', 'Suspensión, cancelación o inhabilitación, por determinación de la APS y ante el incumplimiento o infracción de la Ley 1883 y/o sus reglamentos, mediante Resolución Administrativa o por determinación de la autoridad competente.', true, 'default'::character varying, now(), 'default'::character varying, now());
`);

    await queryRunner.query(`
    INSERT INTO public.persona_natural (nro_identificacion,primer_nombre_persona,segundo_nombre_persona,primer_apellido_persona,segundo_apellido_persona,tipo_identificacion,email,telefono,direccion,status,usuario_creacion,fecha_creacion,usuario_modificacion,fecha_modificacion) VALUES
	 ('1234567','pedro','','pony',NULL,'1','ppony@gmail.com','23232','no se sabe',true,'admin','2022-01-01 00:00:00','default','2022-11-14 00:30:52.790069'),
	 ('7654321','susy','','sheep',NULL,'1','ppony@gmail.com','23232','no se sabe',true,'admin','2022-01-01 00:00:00','default','2022-11-14 00:30:52.790069'),
	 ('2233445','zoey','','cebra',NULL,'1','ppony@gmail.com','23232','no se sabe',true,'admin','2022-01-01 00:00:00','default','2022-11-14 00:30:52.790069');
     `);
    

    await queryRunner.query(`
    INSERT INTO public.catalogo (nivel,categoria,codigo,descripcion,status,usuario_creacion,fecha_creacion,usuario_modificacion,fecha_modificacion) VALUES 
    (1,'tipo_funcionario','funcionario','funcionario',true,'default','2022-11-17 17:15:37.988','default','2022-11-17 17:15:37.988')
    ,(1,'tipo_funcionario','directivo','directivo',true,'default','2022-11-17 17:15:38.007','default','2022-11-17 17:15:38.007');
    `);


}


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE public.empresas CASCADE;`);
        await queryRunner.query(`TRUNCATE TABLE public.categoria_empresa CASCADE;`);
        await queryRunner.query(`TRUNCATE TABLE public.persona_natural CASCADE;`);
        await queryRunner.query(`TRUNCATE TABLE public.categorias_registro CASCADE;`);
    }

}