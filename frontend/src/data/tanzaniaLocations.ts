export interface TanzaniaLocation {
  region: string
  districts: {
    district: string
    wards: string[]
  }[]
}

export const TANZANIA_LOCATIONS: TanzaniaLocation[] = [
  {
    region: 'Dar es Salaam',
    districts: [
      {
        district: 'Ilala',
        wards: ['Ilala', 'Kariakoo', 'Gerezani', 'Kivukoni', 'Upanga', 'Kinondoni', 'Magomeni', 'Makumbusho', 'Manzese', 'Mzimuni', 'Ubungo', 'Kawe', 'Mwanyamala', 'Hananasif', 'Kigogo', 'Buguruni', 'Sinza', 'Makurumla', 'Mburahati', 'Tabata', 'Segerea', 'Mabibo', 'Makinduri', 'Keko', 'Lugala', 'Chang\'ombe', 'Ukonga', 'Kitunda', 'Pugu', 'Kinyerezi']
      },
      {
        district: 'Kinondoni',
        wards: ['Kinondoni', 'Masaki', 'Oysterbay', 'Mlimani', 'Mikocheni', 'Regent', 'Mzimuni', 'Makumbusho', 'Kijitonyama', 'Magomeni', 'Manzese', 'Mwanyamala', 'Ubungo', 'Kawe', 'Kigogo', 'Hananasif', 'Buguruni', 'Sinza', 'Mabibo', 'Makinduri', 'Keko', 'Lugala', 'Chang\'ombe', 'Ukonga', 'Kitunda', 'Pugu', 'Kinyerezi', 'Mbezi', 'Luguruni', 'Msasani', 'Kunduchi', 'Kata', 'Kijitonyama', 'Magomeni', 'Mwanyamala', 'Ubungo', 'Kawe', 'Mzimuni', 'Makumbusho', 'Manzese', 'Hananasif', 'Kigogo', 'Buguruni', 'Sinza', 'Mabibo', 'Makinduri', 'Keko', 'Lugala', 'Chang\'ombe', 'Ukonga', 'Kitunda', 'Pugu', 'Kinyerezi']
      },
      {
        district: 'Temeke',
        wards: ['Temeke', 'Mtoni', 'Changani', 'Kijichi', 'Mtoni', 'Toangoma', 'Azimio', 'Chang\'ombe', 'Keko', 'Mbagala', 'Mtoni', 'Changani', 'Kijichi', 'Mtoni', 'Toangoma', 'Azimio', 'Chang\'ombe', 'Keko', 'Mbagala', 'Vijibweni', 'Sandali', 'Charama', 'Mivinjeni', 'Mazizini', 'Mabwepande', 'Buza', 'Mtoni', 'Changani', 'Kijichi', 'Mtoni', 'Toangoma', 'Azimio', 'Chang\'ombe', 'Keko', 'Mbagala']
      }
    ]
  },
  {
    region: 'Arusha',
    districts: [
      {
        district: 'Arusha Urban',
        wards: ['Arusha', 'Soweto', 'Kijenge', 'Kikatiti', 'Elerai', 'Njiro', 'Sanawari', 'Kaloleni', 'Lemara', 'Moshi', 'Uswahilini', 'Olasiti', 'Sekei', 'Mianzini', 'Kijenge', 'Njoro', 'Moshi', 'Uswahilini', 'Olasiti', 'Sekei', 'Mianzini', 'Kijenge', 'Njoro']
      },
      {
        district: 'Arusha Rural',
        wards: ['Maji ya Chai', 'Bwawani', 'Moivaro', 'Nkoaranga', 'Lengijave', 'Oldonyosambu', 'Ilkiding\'a', 'Ngarenanyuki', 'Lashaine', 'Kiserian', 'Kikwe', 'Lengijave', 'Maji ya Chai', 'Bwawani', 'Moivaro', 'Nkoaranga', 'Lengijave', 'Oldonyosambu', 'Ilkiding\'a', 'Ngarenanyuki', 'Lashaine', 'Kiserian', 'Kikwe']
      },
      {
        district: 'Meru',
        wards: ['Ngarenanyuki', 'Lashaine', 'Kiserian', 'Kikwe', 'Maji ya Chai', 'Bwawani', 'Moivaro', 'Nkoaranga', 'Lengijave', 'Oldonyosambu', 'Ilkiding\'a', 'Ngarenanyuki', 'Lashaine', 'Kiserian', 'Kikwe']
      }
    ]
  },
  {
    region: 'Dodoma',
    districts: [
      {
        district: 'Dodoma Urban',
        wards: ['Dodoma', 'Nzuguni', 'Madukani', 'Makulu', 'Msalato', 'Ihilwa', 'Nala', 'Mkowejani', 'Chinangali', 'Hombolo', 'Kikombo', 'Mlanda', 'Mvumi', 'Ihwa', 'Mkonze', 'Lugala', 'Magomeni', 'Makulu', 'Msalato', 'Ihilwa', 'Nala', 'Mkowejani', 'Chinangali', 'Hombolo', 'Kikombo', 'Mlanda', 'Mvumi', 'Ihwa', 'Mkonze', 'Lugala', 'Magomeni']
      },
      {
        district: 'Kondoa',
        wards: ['Kondoa', 'Kondoa Mjini', 'Kolo', 'Bumbi', 'Mriwu', 'Haubi', 'Lere', 'Mondo', 'Mrangeti', 'Safi', 'Mkongo', 'Mako', 'Kisese', 'Mtesua', 'Kachale', 'Mhangwa', 'Chahua', 'Rheea', 'Moleti', 'Bicha', 'Lahoda', 'Makalala', 'Kisese', 'Mtesua', 'Kachale', 'Mhangwa', 'Chahua', 'Rheea', 'Moleti', 'Bicha', 'Lahoda', 'Makalala']
      },
      {
        district: 'Kongwa',
        wards: ['Kongwa', 'Kongwa Mjini', 'Mnyakongo', 'Mnyampanda', 'Mpwapwa', 'Mtemi', 'Ngongwa', 'Manungu', 'Kibakwe', 'Chalinze', 'Misunkilo', 'Dodoma', 'Nzuguni', 'Madukani', 'Makulu', 'Msalato', 'Ihilwa', 'Nala', 'Mkowejani', 'Chinangali', 'Hombolo', 'Kikombo', 'Mlanda', 'Mvumi', 'Ihwa', 'Mkonze', 'Lugala', 'Magomeni']
      }
    ]
  },
  {
    region: 'Mwanza',
    districts: [
      {
        district: 'Ilemela',
        wards: ['Ilemela', 'Nyakato', 'Buswelu', 'Kabangaja', 'Mabatini', 'Igogo', 'Nyamagana', 'Pasco', 'Mkolani', 'Shinyanga', 'Nyegezi', 'Mbugani', 'Isamilo', 'Mchangani', 'Kijichi', 'Magomeni', 'Mabatini', 'Igogo', 'Nyamagana', 'Pasco', 'Mkolani', 'Shinyanga', 'Nyegezi', 'Mbugani', 'Isamilo', 'Mchangani', 'Kijichi', 'Magomeni']
      },
      {
        district: 'Nyamagana',
        wards: ['Nyamagana', 'Mwanza', 'Kapri Point', 'Kirumba', 'Makongoro', 'Mabatini', 'Igogo', 'Nyakato', 'Buswelu', 'Kabangaja', 'Mabatini', 'Igogo', 'Nyamagana', 'Pasco', 'Mkolani', 'Shinyanga', 'Nyegezi', 'Mbugani', 'Isamilo', 'Mchangani', 'Kijichi', 'Magomeni', 'Mabatini', 'Igogo', 'Nyamagana', 'Pasco', 'Mkolani', 'Shinyanga', 'Nyegezi', 'Mbugani', 'Isamilo', 'Mchangani', 'Kijichi', 'Magomeni']
      },
      {
        district: 'Misungwi',
        wards: ['Misungwi', 'Nyamikongo', 'Mwandiga', 'Singo', 'Mwanahuzi', 'Mgama', 'Manduu', 'Kilole', 'Mbarika', 'Nyamisati', 'Kanyelele', 'Kigundu', 'Mbugani', 'Isamilo', 'Mchangani', 'Kijichi', 'Magomeni', 'Mabatini', 'Igogo', 'Nyamagana', 'Pasco', 'Mkolani', 'Shinyanga', 'Nyegezi', 'Mbugani', 'Isamilo', 'Mchangani', 'Kijichi', 'Magomeni']
      }
    ]
  },
  {
    region: 'Mbeya',
    districts: [
      {
        district: 'Mbeya Urban',
        wards: ['Mbeya', 'Iyunga', 'Mabatini', 'Uyole', 'Sisimba', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale']
      },
      {
        district: 'Mbeya Rural',
        wards: ['Rungwe', 'Tukuyu', 'Kyela', 'Busokelo', 'Ileje', 'Mbarali', 'Chunya', 'Mbeya', 'Iyunga', 'Mabatini', 'Uyole', 'Sisimba', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale']
      },
      {
        district: 'Rungwe',
        wards: ['Rungwe', 'Tukuyu', 'Kyela', 'Busokelo', 'Ileje', 'Mbarali', 'Chunya', 'Mbeya', 'Iyunga', 'Mabatini', 'Uyole', 'Sisimba', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale']
      }
    ]
  },
  {
    region: 'Morogoro',
    districts: [
      {
        district: 'Morogoro Urban',
        wards: ['Morogoro', 'Kihonda', 'Mazimbu', 'Magulu', 'Mzinga', 'Boma', 'Mkalama', 'Sabasaba', 'Mafisa', 'Mji Mpya', 'Mafiga', 'Tungi', 'Mabatini', 'Iyunga', 'Uyole', 'Sisimba', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale']
      },
      {
        district: 'Morogoro Rural',
        wards: ['Mvomero', 'Kilosa', 'Mlimba', 'Ifakara', 'Malinyi', 'Ulanga', 'Kilombero', 'Morogoro', 'Kihonda', 'Mazimbu', 'Magulu', 'Mzinga', 'Boma', 'Mkalama', 'Sabasaba', 'Mafisa', 'Mji Mpya', 'Mafiga', 'Tungi', 'Mabatini', 'Iyunga', 'Uyole', 'Sisimba', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale']
      },
      {
        district: 'Mvomero',
        wards: ['Mvomero', 'Kilosa', 'Mlimba', 'Ifakara', 'Malinyi', 'Ulanga', 'Kilombero', 'Morogoro', 'Kihonda', 'Mazimbu', 'Magulu', 'Mzinga', 'Boma', 'Mkalama', 'Sabasaba', 'Mafisa', 'Mji Mpya', 'Mafiga', 'Tungi', 'Mabatini', 'Iyunga', 'Uyole', 'Sisimba', 'Mwambeni', 'Mwanjelwa', 'Mbangwe', 'Nsalaga', 'Kimala', 'Shinangwena', 'Isanga', 'Hamambale']
      }
    ]
  },
  {
    region: 'Tanga',
    districts: [
      {
        district: 'Tanga Urban',
        wards: ['Tanga', 'Mabatini', 'Ngamiani', 'Chumbageni', 'Maweni', 'Nguvu', 'Mzizima', 'Tongoni', 'Kirare', 'Mabokweni', 'Mkuzi', 'Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani', 'Mabatini', 'Ngamiani', 'Chumbageni', 'Maweni', 'Nguvu', 'Mzizima', 'Tongoni', 'Kirare', 'Mabokweni', 'Mkuzi', 'Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani']
      },
      {
        district: 'Tanga Rural',
        wards: ['Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani', 'Mabatini', 'Ngamiani', 'Chumbageni', 'Maweni', 'Nguvu', 'Mzizima', 'Tongoni', 'Kirare', 'Mabokweni', 'Mkuzi', 'Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani', 'Mabatini', 'Ngamiani', 'Chumbageni', 'Maweni', 'Nguvu', 'Mzizima', 'Tongoni', 'Kirare', 'Mabokweni', 'Mkuzi', 'Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani']
      },
      {
        district: 'Mkinga',
        wards: ['Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani', 'Mabatini', 'Ngamiani', 'Chumbageni', 'Maweni', 'Nguvu', 'Mzizima', 'Tongoni', 'Kirare', 'Mabokweni', 'Mkuzi', 'Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani', 'Mabatini', 'Ngamiani', 'Chumbageni', 'Maweni', 'Nguvu', 'Mzizima', 'Tongoni', 'Kirare', 'Mabokweni', 'Mkuzi', 'Mkinga', 'Mnyuzi', 'Mkomazi', 'Mnyamani']
      }
    ]
  },
  {
    region: 'Kigoma',
    districts: [
      {
        district: 'Kigoma Urban',
        wards: ['Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini', 'Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini', 'Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini']
      },
      {
        district: 'Kigoma Rural',
        wards: ['Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini', 'Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini', 'Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini']
      },
      {
        district: 'Buhigwe',
        wards: ['Buhigwe', 'Kibuye', 'Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini', 'Kigoma', 'Mabanda', 'Rusumo', 'Mwese', 'Msimbazi', 'Mwanga', 'Mjini']
      }
    ]
  },
  {
    region: 'Mara',
    districts: [
      {
        district: 'Musoma Urban',
        wards: ['Musoma', 'Buhemba', 'Maremi', 'Nyabisaga', 'Mkenda', 'Nyamatare', 'Nyamongo', 'Bugwema', 'Kigera', 'Mukendo', 'Musoma', 'Buhemba', 'Maremi', 'Nyabisaga', 'Mkenda', 'Nyamatare', 'Nyamongo', 'Bugwema', 'Kigera', 'Mukendo']
      },
      {
        district: 'Musoma Rural',
        wards: ['Musoma', 'Buhemba', 'Maremi', 'Nyabisaga', 'Mkenda', 'Nyamatare', 'Nyamongo', 'Bugwema', 'Kigera', 'Mukendo', 'Musoma', 'Buhemba', 'Maremi', 'Nyabisaga', 'Mkenda', 'Nyamatare', 'Nyamongo', 'Bugwema', 'Kigera', 'Mukendo']
      },
      {
        district: 'Tarime',
        wards: ['Tarime', 'Nyamongo', 'Sirari', 'Ngerenyi', 'Senta', 'Bunda', 'Nyarabanga', 'Kendwa', 'Nyamongo', 'Sirari', 'Ngerenyi', 'Senta', 'Bunda', 'Nyarabanga', 'Kendwa', 'Nyamongo', 'Sirari', 'Ngerenyi', 'Senta', 'Bunda', 'Nyarabanga', 'Kendwa']
      }
    ]
  },
  {
    region: 'Shinyanga',
    districts: [
      {
        district: 'Shinyanga Urban',
        wards: ['Shinyanga', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao']
      },
      {
        district: 'Shinyanga Rural',
        wards: ['Shinyanga', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao']
      },
      {
        district: 'Kahama',
        wards: ['Kahama', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao', 'Ndala', 'Kahama', 'Bukima', 'Ngwangi', 'Malampaka', 'Mwambao']
      }
    ]
  },
  {
    region: 'Tabora',
    districts: [
      {
        district: 'Tabora Urban',
        wards: ['Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge', 'Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge', 'Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge']
      },
      {
        district: 'Tabora Rural',
        wards: ['Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge', 'Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge', 'Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge']
      },
      {
        district: 'Sikonge',
        wards: ['Sikonge', 'Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge', 'Tabora', 'Majengo', 'Ngalula', 'Kigango', 'Sikonge', 'Tabora', 'Majengo', 'Ngalula', 'Kigango']
      }
    ]
  },
  {
    region: 'Singida',
    districts: [
      {
        district: 'Singida Urban',
        wards: ['Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko', 'Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko', 'Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko']
      },
      {
        district: 'Singida Rural',
        wards: ['Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko', 'Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko', 'Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko']
      },
      {
        district: 'Manyoni',
        wards: ['Manyoni', 'Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko', 'Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko', 'Singida', 'Mkunazini', 'Mungunyi', 'Shigamba', 'Mhandu', 'Ilonga', 'Mtinko']
      }
    ]
  },
  {
    region: 'Lindi',
    districts: [
      {
        district: 'Lindi Urban',
        wards: ['Lindi', 'Mikitageni', 'Makangara', 'Nachingwea', 'Lindi', 'Mikitageni', 'Makangara', 'Nachingwea', 'Lindi', 'Mikitageni', 'Makangara', 'Nachingwea']
      },
      {
        district: 'Lindi Rural',
        wards: ['Lindi', 'Mikitageni', 'Makangara', 'Nachingwea', 'Lindi', 'Mikitageni', 'Makangara', 'Nachingwea', 'Lindi', 'Mikitageni', 'Makangara', 'Nachingwea']
      },
      {
        district: 'Nachingwea',
        wards: ['Nachingwea', 'Lindi', 'Mikitageni', 'Makangara', 'Nachingwea', 'Lindi', 'Mikitageni', 'Makangara', 'Nachingwea', 'Lindi', 'Mikitageni', 'Makangara']
      }
    ]
  },
  {
    region: 'Mtwara',
    districts: [
      {
        district: 'Mtwara Urban',
        wards: ['Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira', 'Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira', 'Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira']
      },
      {
        district: 'Mtwara Rural',
        wards: ['Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira', 'Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira', 'Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira']
      },
      {
        district: 'Masasi',
        wards: ['Masasi', 'Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira', 'Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira', 'Mtwara', 'Shangani', 'Mikindani', 'Mkomanzi', 'Mtitimira']
      }
    ]
  },
  {
    region: 'Ruvuma',
    districts: [
      {
        district: 'Songea Urban',
        wards: ['Songea', 'Songea Urban', 'Mjini', 'Matarumbeta', 'Songea', 'Songea Urban', 'Mjini', 'Matarumbeta', 'Songea', 'Songea Urban', 'Mjini', 'Matarumbeta']
      },
      {
        district: 'Songea Rural',
        wards: ['Songea', 'Songea Urban', 'Mjini', 'Matarumbeta', 'Songea', 'Songea Urban', 'Mjini', 'Matarumbeta', 'Songea', 'Songea Urban', 'Mjini', 'Matarumbeta']
      },
      {
        district: 'Tunduru',
        wards: ['Tunduru', 'Songea', 'Songea Urban', 'Mjini', 'Matarumbeta', 'Songea', 'Songea Urban', 'Mjini', 'Matarumbeta', 'Songea', 'Songea Urban', 'Mjini', 'Matarumbeta']
      }
    ]
  },
  {
    region: 'Iringa',
    districts: [
      {
        district: 'Iringa Urban',
        wards: ['Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni']
      },
      {
        district: 'Iringa Rural',
        wards: ['Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni']
      },
      {
        district: 'Mufindi',
        wards: ['Mufindi', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni']
      }
    ]
  },
  {
    region: 'Njombe',
    districts: [
      {
        district: 'Njombe Urban',
        wards: ['Njombe', 'Mjini', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni']
      },
      {
        district: 'Njombe Rural',
        wards: ['Njombe', 'Mjini', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni']
      },
      {
        district: 'Ludewa',
        wards: ['Ludewa', 'Njombe', 'Mjini', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni', 'Iringa', 'Ilala', 'Mkwawa', 'Kihesa', 'Mkulanga', 'Nzuguni']
      }
    ]
  },
  {
    region: 'Pwani',
    districts: [
      {
        district: 'Bagamoyo',
        wards: ['Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji']
      },
      {
        district: 'Kibaha',
        wards: ['Kibaha', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji']
      },
      {
        district: 'Rufiji',
        wards: ['Rufiji', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji', 'Bagamoyo', 'Chalinze', 'Mlandizi', 'Kibaha', 'Mkuranga', 'Rufiji']
      }
    ]
  },
  {
    region: 'Zanzibar',
    districts: [
      {
        district: 'Urban',
        wards: ['Stone Town', 'Mwembeladu', 'Mji Mkongwe', 'Makadara', 'Malindi', 'Mtoni', 'Shangani', 'Stone Town', 'Mwembeladu', 'Mji Mkongwe', 'Makadara', 'Malindi', 'Mtoni', 'Shangani']
      },
      {
        district: 'West',
        wards: ['Fuuoni', 'Makunduchi', 'Kiungani', 'Mbweni', 'Fumba', 'Fuuoni', 'Makunduchi', 'Kiungani', 'Mbweni', 'Fumba', 'Fuuoni', 'Makunduchi', 'Kiungani', 'Mbweni', 'Fumba']
      },
      {
        district: 'North',
        wards: ['Nungwi', 'Matemwe', 'Kiwengwa', 'Paje', 'Mangapwani', 'Nungwi', 'Matemwe', 'Kiwengwa', 'Paje', 'Mangapwani', 'Nungwi', 'Matemwe', 'Kiwengwa', 'Paje', 'Mangapwani']
      }
    ]
  },
  {
    region: 'Kilimanjaro',
    districts: [
      {
        district: 'Moshi Urban',
        wards: ['Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika', 'Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika', 'Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika']
      },
      {
        district: 'Moshi Rural',
        wards: ['Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika', 'Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika', 'Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika']
      },
      {
        district: 'Hai',
        wards: ['Hai', 'Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika', 'Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika', 'Moshi', 'Kariakoo', 'Korongoni', 'Njoro', 'Rau', 'Soweto', 'Kiborolloni', 'Mabatini', 'Mwika']
      }
    ]
  },
  {
    region: 'Geita',
    districts: [
      {
        district: 'Geita Urban',
        wards: ['Geita', 'Nyamigwa', 'Nzera', 'Biharamulo', 'Geita', 'Nyamigwa', 'Nzera', 'Biharamulo', 'Geita', 'Nyamigwa', 'Nzera', 'Biharamulo']
      },
      {
        district: 'Geita Rural',
        wards: ['Geita', 'Nyamigwa', 'Nzera', 'Biharamulo', 'Geita', 'Nyamigwa', 'Nzera', 'Biharamulo', 'Geita', 'Nyamigwa', 'Nzera', 'Biharamulo']
      },
      {
        district: 'Chato',
        wards: ['Chato', 'Geita', 'Nyamigwa', 'Nzera', 'Biharamulo', 'Geita', 'Nyamigwa', 'Nzera', 'Biharamulo', 'Geita', 'Nyamigwa', 'Nzera', 'Biharamulo']
      }
    ]
  },
  {
    region: 'Simiyu',
    districts: [
      {
        district: 'Maswa',
        wards: ['Maswa', 'Bariadi', 'Magu', 'Sengerema', 'Maswa', 'Bariadi', 'Magu', 'Sengerema', 'Maswa', 'Bariadi', 'Magu', 'Sengerema']
      },
      {
        district: 'Bariadi',
        wards: ['Bariadi', 'Maswa', 'Magu', 'Sengerema', 'Maswa', 'Bariadi', 'Magu', 'Sengerema', 'Maswa', 'Bariadi', 'Magu', 'Sengerema']
      },
      {
        district: 'Magu',
        wards: ['Magu', 'Maswa', 'Bariadi', 'Sengerema', 'Maswa', 'Bariadi', 'Magu', 'Sengerema', 'Maswa', 'Bariadi', 'Magu', 'Sengerema']
      }
    ]
  },
  {
    region: 'Katavi',
    districts: [
      {
        district: 'Mpanda',
        wards: ['Mpanda', 'Mpanda Urban', 'Kasege', 'Mpanda', 'Mpanda Urban', 'Kasege', 'Mpanda', 'Mpanda Urban', 'Kasege']
      },
      {
        district: 'Mpanda Rural',
        wards: ['Mpanda', 'Mpanda Urban', 'Kasege', 'Mpanda', 'Mpanda Urban', 'Kasege', 'Mpanda', 'Mpanda Urban', 'Kasege']
      },
      {
        district: 'Mlele',
        wards: ['Mlele', 'Mpanda', 'Mpanda Urban', 'Kasege', 'Mpanda', 'Mpanda Urban', 'Kasege', 'Mpanda', 'Mpanda Urban', 'Kasege']
      }
    ]
  },
  {
    region: 'Manyara',
    districts: [
      {
        district: 'Babati Urban',
        wards: ['Babati', 'Babati Urban', 'Singida', 'Babati', 'Babati Urban', 'Singida', 'Babati', 'Babati Urban', 'Singida']
      },
      {
        district: 'Babati Rural',
        wards: ['Babati', 'Babati Urban', 'Singida', 'Babati', 'Babati Urban', 'Singida', 'Babati', 'Babati Urban', 'Singida']
      },
      {
        district: 'Hanang',
        wards: ['Hanang', 'Babati', 'Babati Urban', 'Singida', 'Babati', 'Babati Urban', 'Singida', 'Babati', 'Babati Urban', 'Singida']
      }
    ]
  },
  {
    region: 'Kagera',
    districts: [
      {
        district: 'Bukoba Urban',
        wards: ['Bukoba', 'Bukoba Urban', 'Kyerwa', 'Bukoba', 'Bukoba Urban', 'Kyerwa', 'Bukoba', 'Bukoba Urban', 'Kyerwa']
      },
      {
        district: 'Bukoba Rural',
        wards: ['Bukoba', 'Bukoba Urban', 'Kyerwa', 'Bukoba', 'Bukoba Urban', 'Kyerwa', 'Bukoba', 'Bukoba Urban', 'Kyerwa']
      },
      {
        district: 'Kyerwa',
        wards: ['Kyerwa', 'Bukoba', 'Bukoba Urban', 'Kyerwa', 'Bukoba', 'Bukoba Urban', 'Kyerwa', 'Bukoba', 'Bukoba Urban', 'Kyerwa']
      }
    ]
  }
]

export function getDistrictsByRegion(region: string): string[] {
  const regionData = TANZANIA_LOCATIONS.find((r) => r.region === region)
  return regionData?.districts.map((d) => d.district) || []
}

export function getWardsByDistrict(region: string, district: string): string[] {
  const regionData = TANZANIA_LOCATIONS.find((r) => r.region === region)
  const districtData = regionData?.districts.find((d) => d.district === district)
  return districtData?.wards || []
}