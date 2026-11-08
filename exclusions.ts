/**
 * Namesakes: lines found by the word "Antipolo" that are not in Antipolo City,
 * Rizal (Barangay Antipolo in Lipa City, Rosario, Pontevedra, Nabua and others;
 * Antipolo Street in Makati and Tondo). Reviewed by hand; the About page lists
 * every one with its reason.
 */
import type { Exclusion } from './src/config';

const NAMESAKE = 'Names a different place called Antipolo, outside Antipolo City, Rizal';

export const exclusions: Exclusion[] = [
  { key: "dpwh:house-reading:12902", reason: NAMESAKE },
  { key: "dpwh:house-reading:12912", reason: NAMESAKE },
  { key: "dpwh:house-reading:8320", reason: NAMESAKE },
  { key: "dpwh:stage:17119", reason: NAMESAKE },
  { key: "dpwh:stage:17415", reason: NAMESAKE },
  // Antipolo Br. (B00197NR) along Jct Pontevedra-La Castellana Rd
  { key: "gaa:18-001|antipolo br b00197nr along jct pontevedrala castellana rd", reason: NAMESAKE },
  // Antipolo Br. (B00224MR) along Calapan South Rd
  { key: "gaa:18-001|antipolo br b00224mr along calapan south rd", reason: NAMESAKE },
  // Antipolo Br. 1 along Camarines Sur - Albay Diversion Road
  { key: "gaa:18-001|antipolo br 1 along camarines sur  albay diversion road", reason: NAMESAKE },
  // Antipolo Br. 2 along Camarines Sur - Albay Diversion Road
  { key: "gaa:18-001|antipolo br 2 along camarines sur  albay diversion road", reason: NAMESAKE },
  // Bank Improvement (Steel Sheet Pile) along South Antipolo Open Canal Phase I, Manila City
  { key: "gaa:18-001|bank improvement steel sheet pile along south antipolo open canal phase i manila city", reason: NAMESAKE },
  // Completion of Bridge at Brgy. Antipolo del Sur, Lipa City, Batangas
  { key: "gaa:18-001|completion of bridge at brgy antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Completion of Multi-Purpose Building (Barangay Hall) Barangay Antipolo, Marihatag, Surigao Del Sur
  { key: "gaa:18-001|completion of multipurpose building barangay hall barangay antipolo marihatag surigao del sur", reason: NAMESAKE },
  // Concreting of Antipolo-Miabas Road, Palanas, Masbate
  { key: "gaa:18-001|concreting of antipolomiabas road palanas masbate", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo FMR, Brgy. Antipolo, Dapitan, Zamboanga Del Norte
  { key: "gaa:05-001|concreting of brgy antipolo fmr brgy antipolo dapitan zamboanga del norte", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo FMR, Brgy. Antipolo, Iriga City, Camarines Sur
  { key: "gaa:05-001|concreting of brgy antipolo fmr brgy antipolo iriga city camarines sur", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo FMR, Brgy. Antipolo, Rosario, Batangas
  { key: "gaa:05-001|concreting of brgy antipolo fmr brgy antipolo rosario batangas", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo FMR, Brgy. Antipolo, Sariaya, Quezon
  { key: "gaa:05-001|concreting of brgy antipolo fmr brgy antipolo sariaya quezon", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo to Brgy. Abijilan FMR, Brgy. Antipolo and Brgy. Abijilan, Garcia Hernandez, Bohol
  { key: "gaa:05-001|concreting of brgy antipolo to brgy abijilan fmr brgy antipolo and brgy abijilan garcia hernandez bohol", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo to Brgy. Mambusao FMR, Brgy. Antipolo and Brgy. Mambusao, Ibajay, Aklan
  { key: "gaa:05-001|concreting of brgy antipolo to brgy mambusao fmr brgy antipolo and brgy mambusao ibajay aklan", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo to Brgy. San Francisco FMR, Brgy. Antipolo to Brgy. San Francisco,  Isabel, Leyte
  { key: "gaa:05-001|concreting of brgy antipolo to brgy san francisco fmr brgy antipolo to brgy san francisco isabel leyte", reason: NAMESAKE },
  // Concreting of Brgy. Antipolo-Tucalan FMR, Brgy. Antipolo-Tucalan, Pagbilao, Quezon
  { key: "gaa:05-001|concreting of brgy antipolotucalan fmr brgy antipolotucalan pagbilao quezon", reason: NAMESAKE },
  // Concreting of Calantas-Antipolo FMR, Rosario, Batangas
  { key: "gaa:05-001|concreting of calantasantipolo fmr rosario batangas", reason: NAMESAKE },
  // Concreting of Jct National Hway - So. Antipolo, Brgy. Mangarin, San Jose, Occidental Mindoro Sta. 0+000 - Sta.
  { key: "gaa:18-001|concreting of jct national hway  so antipolo brgy mangarin san jose occidental mindoro sta 0000  sta 2700", reason: NAMESAKE },
  // Concreting of Kalantantas- Antipolo road, Rosario, Batangas
  { key: "gaa:18-001|concreting of kalantantas antipolo road rosario batangas", reason: NAMESAKE },
  // Concreting of Liong-Antipolo-Libertad Road, Cataingan, Masbate
  { key: "gaa:18-001|concreting of liongantipololibertad road cataingan masbate", reason: NAMESAKE },
  // Concreting of Purok Had. New Kasal-agan-Purok Dam, Brgy. Antipolo FMR, Brgy. Antipolo, Pontevedra, Negros Occi
  { key: "gaa:05-001|concreting of purok had new kasalaganpurok dam brgy antipolo fmr brgy antipolo pontevedra negros occidental", reason: NAMESAKE },
  // Concreting of Road at So. Antipolo, Tagumpay, Baco, Oriental Mindoro
  { key: "gaa:18-001|concreting of road at so antipolo tagumpay baco oriental mindoro", reason: NAMESAKE },
  // Concreting of Sitio Kapatagan, Brgy. Antipolo FMR, Brgy. Antipolo, Llorente, Eastern Samar
  { key: "gaa:05-001|concreting of sitio kapatagan brgy antipolo fmr brgy antipolo llorente eastern samar", reason: NAMESAKE },
  // Concreting of Sitio Naga, Brgy. Tinag-an to Brgy. Antipolo, Albuera, Leyte
  { key: "gaa:05-001|concreting of sitio naga brgy tinagan to brgy antipolo albuera leyte", reason: NAMESAKE },
  // Concreting of Sitio Santa Cruz, Brgy. Antipolo FMR, Brgy. Antipolo, Medellin, Cebu
  { key: "gaa:05-001|concreting of sitio santa cruz brgy antipolo fmr brgy antipolo medellin cebu", reason: NAMESAKE },
  // Construction  ( Completion )  of Multi - Purpose Building  ( Covered Court ) , Barangay Antipolo, San Pascual,
  { key: "gaa:18-001|construction  completion  of multi  purpose building  covered court   barangay antipolo san pascual batangas", reason: NAMESAKE },
  // Construction (Completion) of Multi-Purpose Building (Barangay Hall), Barangay Antipolo, Rosario, Batangas
  { key: "gaa:18-001|construction completion of multipurpose building barangay hall barangay antipolo rosario batangas", reason: NAMESAKE },
  // Construction (Completion) of Multi-Purpose Building, Brgy. Antipolo (Phase 2), Llorente, Eastern Samar
  { key: "gaa:18-001|construction completion of multipurpose building brgy antipolo phase 2 llorente eastern samar", reason: NAMESAKE },
  // Construction (Completion) of Water System Project, Barangay Antipolo, Pagbilao, Quezon
  { key: "gaa:18-001|construction completion of water system project barangay antipolo pagbilao quezon", reason: NAMESAKE },
  // Construction (Completion)of Multi-Purpose Building including Facilities at Barangay Antipolo Del Norte, Lipa C
  { key: "gaa:18-001|construction completionof multipurpose building including facilities at barangay antipolo del norte lipa city batangas", reason: NAMESAKE },
  // Construction Of Multipurpose Building At Barangay Antipolo Del Norte, Lipa City, Batangas (13.922119°, 121.173
  { key: "gaa:18-001|construction of multipurpose building at barangay antipolo del norte lipa city batangas 13922119 121173118", reason: NAMESAKE },
  // Construction of Antipolo - Del Socorro - Salingogon Road, including Slope Protection, Minalabac, Camarines Sur
  { key: "gaa:18-001|construction of antipolo  del socorro  salingogon road including slope protection minalabac camarines sur", reason: NAMESAKE },
  // Construction of Antipolo Road, Brgy. Antipolo, Pasacao, Camarines Sur
  { key: "gaa:18-001|construction of antipolo road brgy antipolo pasacao camarines sur", reason: NAMESAKE },
  // Construction of Bank Protection Structure along Antipolo River, San Francisco Section, Baao, Camarines Sur
  { key: "gaa:18-001|construction of bank protection structure along antipolo river san francisco section baao camarines sur", reason: NAMESAKE },
  // Construction of Barangay Cantuhaon Junction to Barangay Antipolo, Isabel, Leyte
  { key: "gaa:18-001|construction of barangay cantuhaon junction to barangay antipolo isabel leyte", reason: NAMESAKE },
  // Construction of Barangay Road, Antipolo-Tamban (Mabini), Tinambac, Camarines Sur, Sta.0+000 - Sta.2+100
  { key: "gaa:18-001|construction of barangay road antipolotamban mabini tinambac camarines sur sta0000  sta2100", reason: NAMESAKE },
  // Construction of Barit River Flood Mitigation Structure (Antipolo Young Section), Nabua, Camarines Sur
  { key: "gaa:18-001|construction of barit river flood mitigation structure antipolo young section nabua camarines sur", reason: NAMESAKE },
  // Construction of Concrete Bridge, Purok 3, Barangay Antipolo Del Norte, Lipa City, Batangas
  { key: "gaa:18-001|construction of concrete bridge purok 3 barangay antipolo del norte lipa city batangas", reason: NAMESAKE },
  // Construction of Drainage System at Barangay Antipolo del Sur, Lipa City, Batangas
  { key: "gaa:18-001|construction of drainage system at barangay antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Construction of Flood Gate with Booster Pump at the Outlet of South Antipolo Open Canal to Estero de Kabulusan
  { key: "gaa:36-001|construction of flood gate with booster pump at the outlet of south antipolo open canal to estero de kabulusan tondo manila phase i", reason: NAMESAKE },
  // Construction of Flood Mitigation Structure along Barit River (Upstream), Right Side Phase II, Brgy. Antipolo Y
  { key: "gaa:18-001|construction of flood mitigation structure along barit river upstream right side phase ii brgy antipolo young nabua camarines sur", reason: NAMESAKE },
  // Construction of Flood Mitigation Structure along Barit River, Antipolo Old Section, Barangay Antipolo, Nabua, 
  { key: "gaa:18-001|construction of flood mitigation structure along barit river antipolo old section barangay antipolo nabua camarines sur", reason: NAMESAKE },
  // Construction of Flood Mitigation Structure along Barit River, Brgy. Antipolo Old Section, Nabua, Camarines Sur
  { key: "gaa:18-001|construction of flood mitigation structure along barit river brgy antipolo old section nabua camarines sur", reason: NAMESAKE },
  // Construction of Level II Water System, Barangay Antipolo, Ibajay, Aklan
  { key: "gaa:18-001|construction of level ii water system barangay antipolo ibajay aklan", reason: NAMESAKE },
  // Construction of Level II Water System, Brgy. Antipolo, Ibajay, Aklan
  { key: "gaa:18-001|construction of level ii water system brgy antipolo ibajay aklan", reason: NAMESAKE },
  // Construction of Macad-Antipolo Road - Sta. 0+000 - Sta. 1+500, Barangay Macad, Pasacao, Camarines Sur
  { key: "gaa:18-001|construction of macadantipolo road  sta 0000  sta 1500 barangay macad pasacao camarines sur", reason: NAMESAKE },
  // Construction of Macad-Antipolo Road, Brgy. Macad, Pasacao, Camarines Sur
  { key: "gaa:18-001|construction of macadantipolo road brgy macad pasacao camarines sur", reason: NAMESAKE },
  // Construction of Multi - Purpose Building  ( Integrated Government Service Center ) , Barangay Antipolo de Sur,
  { key: "gaa:18-001|construction of multi  purpose building  integrated government service center   barangay antipolo de sur lipa city batangas", reason: NAMESAKE },
  // Construction of Multi - Purpose Building, Barangay Antipolo, Sariaya, Quezon
  { key: "gaa:18-001|construction of multi  purpose building barangay antipolo sariaya quezon", reason: NAMESAKE },
  // Construction of Multi-Purpose Building (Covered Court) at Brgy. Antipolo, Bulan, Sorsogon
  { key: "gaa:18-001|construction of multipurpose building covered court at brgy antipolo bulan sorsogon", reason: NAMESAKE },
  // Construction of Multi-Purpose Building (Covered Court), Barangay Antipolo, Naujan, Oriental Mindoro
  { key: "gaa:18-001|construction of multipurpose building covered court barangay antipolo naujan oriental mindoro", reason: NAMESAKE },
  // Construction of Multi-Purpose Building (Covered Court), Paaralang Elementarya ng Hiniero, Antipolo, Bongabon, 
  { key: "gaa:18-001|construction of multipurpose building covered court paaralang elementarya ng hiniero antipolo bongabon nueva ecija", reason: NAMESAKE },
  // Construction of Multi-Purpose Building (Public Market),  Brgy. Antipolo and Poblacion 1, Sta. Teresita, Batang
  { key: "gaa:18-001|construction of multipurpose building public market brgy antipolo and poblacion 1 sta teresita batangas", reason: NAMESAKE },
  // Construction of Multi-Purpose Building at Antipolo Street (Phase 2), Barangay Guadalupe Nuevo, Makati City
  { key: "gaa:18-001|construction of multipurpose building at antipolo street phase 2 barangay guadalupe nuevo makati city", reason: NAMESAKE },
  // Construction of Multi-Purpose Building at Antipolo Street, Barangay Guadalupe Nuevo, Makati City
  { key: "gaa:18-001|construction of multipurpose building at antipolo street barangay guadalupe nuevo makati city", reason: NAMESAKE },
  // Construction of Multi-Purpose Building at Barangay Antipolo and Poblacion I, Sta. Teresita, Batangas
  { key: "gaa:18-001|construction of multipurpose building at barangay antipolo and poblacion i sta teresita batangas", reason: NAMESAKE },
  // Construction of Multi-Purpose Building at Sitio Antipolo, Barangay Cabay-Angan, Braulio E. Dujali, Davao Del N
  { key: "gaa:18-001|construction of multipurpose building at sitio antipolo barangay cabayangan braulio e dujali davao del norte", reason: NAMESAKE },
  // Construction of Multi-Purpose Building including Facilities at Jose K. Obando Elementary School, Barangay Anti
  { key: "gaa:18-001|construction of multipurpose building including facilities at jose k obando elementary school barangay antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo Old, Nabua, Camarines Sur
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo old nabua camarines sur", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo del Norte, Lipa, Batangas
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo del norte lipa batangas", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo, Del Carmen, Surigao del Norte (9.8144, 126.0131)
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo del carmen surigao del norte 98144 1260131", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo, Gasan, Marinduque
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo gasan marinduque", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo, Marihatag, Surigao del Sur
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo marihatag surigao del sur", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo, Pasacao, Camarines Sur
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo pasacao camarines sur", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo, Pontevedra, Negros Occidental
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo pontevedra negros occidental", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo, Pontevedra, Negros Occidental (10.356114°, 122.9628
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo pontevedra negros occidental 10356114 122962807", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Barangay Antipolo, Sta. Teresita, Batangas
  { key: "gaa:18-001|construction of multipurpose building barangay antipolo sta teresita batangas", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Brgy. Antipolo, Garcia Hernandez, Bohol
  { key: "gaa:18-001|construction of multipurpose building brgy antipolo garcia hernandez bohol", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, Brgy. Antipolo, Medellin, Cebu
  { key: "gaa:18-001|construction of multipurpose building brgy antipolo medellin cebu", reason: NAMESAKE },
  // Construction of Multi-Purpose Building, San Adriano Elementary School (Gym), Barangay Antipolo Del Sur, Lipa C
  { key: "gaa:18-001|construction of multipurpose building san adriano elementary school gym barangay antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Construction of Multipurpose Building in Brgy. Antipolo, Ibajay, Aklan
  { key: "gaa:18-001|construction of multipurpose building in brgy antipolo ibajay aklan", reason: NAMESAKE },
  // Construction of New Public Market at Brgy. Poblacion 1 and Barangay Antipolo, Sta. Teresita, Batangas (Phase 1
  { key: "gaa:18-001|construction of new public market at brgy poblacion 1 and barangay antipolo sta teresita batangas phase 1", reason: NAMESAKE },
  // Construction of Pajo Baguio to Antipolo del Norte Road, Virac, Catanduanes
  { key: "gaa:18-001|construction of pajo baguio to antipolo del norte road virac catanduanes", reason: NAMESAKE },
  // Construction of River Slope Protection along Barit River, Antipolo Old Section, Nabua, Camarines Sur
  { key: "gaa:18-001|construction of river slope protection along barit river antipolo old section nabua camarines sur", reason: NAMESAKE },
  // Construction of Road in Brgy. Antipolo, Rosario, Batangas
  { key: "gaa:18-001|construction of road in brgy antipolo rosario batangas", reason: NAMESAKE },
  // Construction of Road including Slope Protection at Barangay Antipolo del sur, Lipa City, Batangas
  { key: "gaa:18-001|construction of road including slope protection at barangay antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Construction of Road, Antipolo - Public Market, Sports and Community Center, Barangay Antipolo, Municipality o
  { key: "gaa:18-001|construction of road antipolo  public market sports and community center barangay antipolo municipality of pontevedra negros occidental", reason: NAMESAKE },
  // Construction of Road, Barangay Antipolo, Ibajay, Aklan
  { key: "gaa:18-001|construction of road barangay antipolo ibajay aklan", reason: NAMESAKE },
  // Construction of Road, Barangay Antipolo, Pontevedra, Negros Occidental
  { key: "gaa:18-001|construction of road barangay antipolo pontevedra negros occidental", reason: NAMESAKE },
  // Construction of Road, Barangay Antipolo, Rosario, Batangas
  { key: "gaa:18-001|construction of road barangay antipolo rosario batangas", reason: NAMESAKE },
  // Construction of Road, Barangay Antipolo, Sariaya to Barangay Salinas, Lucena City, Quezon
  { key: "gaa:18-001|construction of road barangay antipolo sariaya to barangay salinas lucena city quezon", reason: NAMESAKE },
  // Construction of Road, Barangay Lanao, Barangay Antipolo Del Sur and Barangay Calatagan, Virac, Catanduanes
  { key: "gaa:18-001|construction of road barangay lanao barangay antipolo del sur and barangay calatagan virac catanduanes", reason: NAMESAKE },
  // Construction of Road, Barangay Mahanuhay - Antipolo - Caputatan Norte, Medellin, Cebu
  { key: "gaa:18-001|construction of road barangay mahanuhay  antipolo  caputatan norte medellin cebu", reason: NAMESAKE },
  // Construction of Road, Brgy. Antipolo, San Pascual, Batangas
  { key: "gaa:18-001|construction of road brgy antipolo san pascual batangas", reason: NAMESAKE },
  // Construction of Road, Brgy. Morong-Brgy. Antipolo, Sariaya, Quezon
  { key: "gaa:18-001|construction of road brgy morongbrgy antipolo sariaya quezon", reason: NAMESAKE },
  // Construction of Road, Purok 1C-Purok 6 Antipolo-Purok 2A East Cabayangan, Braulio E. Dujali, Davao del Norte
  { key: "gaa:18-001|construction of road purok 1cpurok 6 antipolopurok 2a east cabayangan braulio e dujali davao del norte", reason: NAMESAKE },
  // Construction of Road, Sitio Camingawan, Barangay Antipolo to Sitio Mansilad, Barangay Gen. Malvar, Pontevedra,
  { key: "gaa:18-001|construction of road sitio camingawan barangay antipolo to sitio mansilad barangay gen malvar pontevedra negros occidental", reason: NAMESAKE },
  // Construction of Road, Sta. 0+000 - Sta. 0+146 (Section 1), Sta. 0+000 - Sta. 0+236 (Section 2), Purok Melendre
  { key: "gaa:18-001|construction of road sta 0000  sta 0146 section 1 sta 0000  sta 0236 section 2 purok melendrez barangay antipolo pontevedra negros occidental", reason: NAMESAKE },
  // Construction of Roads at Barangay Antipolo del Norte, Lipa City, Batangas
  { key: "gaa:18-001|construction of roads at barangay antipolo del norte lipa city batangas", reason: NAMESAKE },
  // Construction of Roads, Brgy. Antipolo, Pontevedra, Negros Occidental
  { key: "gaa:18-001|construction of roads brgy antipolo pontevedra negros occidental", reason: NAMESAKE },
  // Construction of Sitio Sampaguita, Barangay Antipolo to Municipal Government Center Road, Barangay Antipolo, Po
  { key: "gaa:18-001|construction of sitio sampaguita barangay antipolo to municipal government center road barangay antipolo pontevedra negros occidental", reason: NAMESAKE },
  // Construction of Slope Protection at Barangay Antipolo del Sur, Lipa City, Batangas
  { key: "gaa:18-001|construction of slope protection at barangay antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Construction of Slope protection structures at Antipolo Foot Bridge, Barangay Antipolo, Marihatag, Surigao del
  { key: "gaa:18-001|construction of slope protection structures at antipolo foot bridge barangay antipolo marihatag surigao del sur x coordinates 126276888 y coordinates 8775268", reason: NAMESAKE },
  // Construction of Solar Water System, Barangay Antipolo, Bulan, Sorsogon
  { key: "gaa:18-001|construction of solar water system barangay antipolo bulan sorsogon", reason: NAMESAKE },
  // Construction of Water Supply Level II, Brgy. Antipolo, Pagbilao, Quezon
  { key: "gaa:18-001|construction of water supply level ii brgy antipolo pagbilao quezon", reason: NAMESAKE },
  // Construction of Water Supply System Level II, Brgy. Antipolo, Tinambac, Camarines Sur
  { key: "gaa:18-001|construction of water supply system level ii brgy antipolo tinambac camarines sur", reason: NAMESAKE },
  // Construction of Water Supply System in Barangay Antipolo, Rosario, Batangas
  { key: "gaa:18-001|construction of water supply system in barangay antipolo rosario batangas", reason: NAMESAKE },
  // Construction of Water System at Don Leon Dolor Elementary School at Barangay Antipolo del Norte, Lipa City, Ba
  { key: "gaa:18-001|construction of water system at don leon dolor elementary school at barangay antipolo del norte lipa city batangas", reason: NAMESAKE },
  // Construction of Water System at Jose K. Obando Elementary School at Barangay Antipolo del Sur, Lipa City, Bata
  { key: "gaa:18-001|construction of water system at jose k obando elementary school at barangay antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Construction of Water System at San Adriano Elementary School at Brgy. Antipolo del Sur, Lipa City, Batangas
  { key: "gaa:18-001|construction of water system at san adriano elementary school at brgy antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Construction/Rehabilitation of Road at Barangay Antipolo del norte, Lipa City, Batangas
  { key: "gaa:18-001|constructionrehabilitation of road at barangay antipolo del norte lipa city batangas", reason: NAMESAKE },
  // Construction/Rehabilitation/Improvement of Multipurpose Facilities at Barangay Antipolo del Sur, Lipa City, Ba
  { key: "gaa:18-001|constructionrehabilitationimprovement of multipurpose facilities at barangay antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Drainage Improvement along North Antipolo St. and Vicinity (Phase I), Tondo, District II, Manila
  { key: "gaa:36-001|drainage improvement along north antipolo st and vicinity phase i tondo district ii manila", reason: NAMESAKE },
  // Improvement Of Multi-Purpose Building (Barangay Hall) At Barangay Antipolo Del Sur, Lipa City Batangas (13.916
  { key: "gaa:18-001|improvement of multipurpose building barangay hall at barangay antipolo del sur lipa city batangas 13916591 121179127", reason: NAMESAKE },
  // Improvement of Bridge at Brgy. Antipolo del Sur, Lipa City, Batangas
  { key: "gaa:18-001|improvement of bridge at brgy antipolo del sur lipa city batangas", reason: NAMESAKE },
  // Improvement of Multi-Purpose Building, Barangay Antipolo, Del Carmen, Surigao del Norte
  { key: "gaa:18-001|improvement of multipurpose building barangay antipolo del carmen surigao del norte", reason: NAMESAKE },
  // Improvement of Road at Barangay Antipolo, Rosario, Batangas
  { key: "gaa:18-001|improvement of road at barangay antipolo rosario batangas", reason: NAMESAKE },
  // Improvement of Road, Barangay Antipolo Old, Nabua, Camarines Sur
  { key: "gaa:18-001|improvement of road barangay antipolo old nabua camarines sur", reason: NAMESAKE },
  // Improvement of Road, Barangay Antipolo, Baao, Camarines Sur
  { key: "gaa:18-001|improvement of road barangay antipolo baao camarines sur", reason: NAMESAKE },
  // Installation / Application of Signage and Pavement Markings along San Marcelino - San Antonio - San Narciso Ro
  { key: "gaa:18-001|installation  application of signage and pavement markings along san marcelino  san antonio  san narciso road  k0162  400  k0163  382 antipolo poblacion san antonio zambales", reason: NAMESAKE },
  // Jct. Nat'l Rd-Antipolo-Tuboran-Quezon-Mabini Rd - K0009 + (-364) - K0009 + 798
  { key: "gaa:18-001|jct natl rdantipolotuboranquezonmabini rd  k0009  364  k0009  798", reason: NAMESAKE },
  // Jct. Nat'l Rd-Antipolo-Tuboran-Quezon-Mabini Rd - K0009 + (-364) - K0009 + 881.45
  { key: "gaa:18-001|jct natl rdantipolotuboranquezonmabini rd  k0009  364  k0009  88145", reason: NAMESAKE },
  // Jct. Nat'l Rd-Antipolo-Tuboran-Quezon-Mabini Rd - K0011 + 300 - K0011 + 845, K0012 + 233 - K0012 + 400 , K0012
  { key: "gaa:18-001|jct natl rdantipolotuboranquezonmabini rd  k0011  300  k0011  845 k0012  233  k0012  400  k0012  920  k0013  035", reason: NAMESAKE },
  // Minalabac Jct. Natl Road-Antipolo-Del Socorro-Salingogon Road, Minalabac, Camarines Sur
  { key: "gaa:18-001|minalabac jct natl roadantipolodel socorrosalingogon road minalabac camarines sur", reason: NAMESAKE },
  // North Antipolo St  - K0009 + (-418) to K0009 + (-293)
  { key: "gaa:18-001|north antipolo st  k0009  418 to k0009  293", reason: NAMESAKE },
  // North Antipolo St - K0007 + 000 - K0007 + 044, K0008 + 931 - K0007 + 000
  { key: "gaa:18-001|north antipolo st  k0007  000  k0007  044 k0008  931  k0007  000", reason: NAMESAKE },
  // Rehabilitation of Drainage System along North Antipolo Street and Vicinity, Manila City
  { key: "gaa:18-001|rehabilitation of drainage system along north antipolo street and vicinity manila city", reason: NAMESAKE },
  // Rehabilitation of Flood Control Structures and Facilities along Earnshaw St., (Estero de San Miguel to A.H. La
  { key: "gaa:18-001|rehabilitation of flood control structures and facilities along earnshaw st estero de san miguel to ah lacson ave and antipolo st g tuazon to espana blvd manila city", reason: NAMESAKE },
  // Rehabilitation of Flood Control Structures and Facilities along South Antipolo Drainage Main, Sta. 0+000.00 to
  { key: "gaa:18-001|rehabilitation of flood control structures and facilities along south antipolo drainage main sta 000000 to sta099910 manila city", reason: NAMESAKE },
  // Rehabilitation of Multi-Purpose Building at Barangay Antipolo, Rosario, Batangas ( 13.695063°, 121.303427°)
  { key: "gaa:18-001|rehabilitation of multipurpose building at barangay antipolo rosario batangas  13695063 121303427", reason: NAMESAKE },
  // Rehabilitation of Multi-Purpose Building, Barangay Antipolo Del Norte, Lipa City, Batangas
  { key: "gaa:18-001|rehabilitation of multipurpose building barangay antipolo del norte lipa city batangas", reason: NAMESAKE },
  // Rehabilitation of Road, Barangay Antipolo, Llorente, Eastern Samar
  { key: "gaa:18-001|rehabilitation of road barangay antipolo llorente eastern samar", reason: NAMESAKE },
  // Rehabilitation of Spillway, Barangay Antipolo, Albuera, Leyte
  { key: "gaa:18-001|rehabilitation of spillway barangay antipolo albuera leyte", reason: NAMESAKE },
  // Rehabilitation of Water System, Barangay Antipolo, Medellin, Cebu
  { key: "gaa:18-001|rehabilitation of water system barangay antipolo medellin cebu", reason: NAMESAKE },
  // Road Concreting, Barangay Antipolo, Isabel, Leyte
  { key: "gaa:18-001|road concreting barangay antipolo isabel leyte", reason: NAMESAKE },
];
