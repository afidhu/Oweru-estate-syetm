import { createContext, useContext, useState, type ReactNode } from 'react'

export type Language = 'sw' | 'en'

const translations: Record<string, string> = {
  'Register Estate': 'Sajili Mali',
  'Register an Estate': 'Sajili Mali Isiyohamishika',
  'Pick the type of property your customer wants to sell.': 'Chagua aina ya mali ambayo mteja wako anataka kuuza.',
  'List property available for sale': 'Orodhesha mali inayouzwa',
  'Unable to load property categories.': 'Imeshindikana kupakia aina za mali.',
  'Loading property categories...': 'Inapakia aina za mali...',
  'House for Sale': 'Nyumba ya Kuuza',
  'Land for Sale': 'Ardhi ya Kuuza',
  'Commercial Area for Sale': 'Eneo la Biashara la Kuuza',
  'Commercial Area': 'Eneo la Biashara',
  'Provide details about the house.': 'Weka maelezo ya nyumba.',
  'Provide details about the land.': 'Weka maelezo ya ardhi.',
  'Provide details about the property.': 'Weka maelezo ya mali.',
  'Property title': 'Jina la mali',
  'Sale price (TZS)': 'Bei ya kuuza (TZS)',
  'Size unit': 'Kipimo cha ukubwa',
  'Size': 'Ukubwa',
  'House type': 'Aina ya nyumba',
  'Land type': 'Aina ya ardhi',
  'Commercial property type': 'Aina ya mali ya biashara',
  'Features & amenities': 'Vipengele na huduma',
  'Broker Info': 'Taarifa za dalali',
  'Owner Info': 'Taarifa za mmiliki',
  'Who holds title to this property.': 'Mwenye hati ya umiliki wa mali hii.',
  'Full name': 'Jina kamili',
  'Search an address or place...': 'Tafuta anwani au mahali...',
  'Search': 'Tafuta',
  'My location': 'Mahali nilipo',
  'Loading map...': 'Inapakia ramani...',
  'Location set:': 'Mahali pamewekwa:',
  'No location set. Click the map, search, or use your location.': 'Hakuna mahali palipowekwa. Bofya ramani, tafuta, au tumia mahali ulipo.',
  'Location & Images': 'Mahali na Picha',
  'Region, GPS and photos': 'Mkoa, GPS na picha',
  'Location': 'Mahali',
  'Description': 'Maelezo',
  'Property images': 'Picha za mali',
  'Add images': 'Ongeza picha',
  'Verified documents': 'Nyaraka zilizothibitishwa',
  'Attach documents': 'Ambatisha nyaraka',
  'Review': 'Kagua',
  'Details': 'Maelezo',
  'Review the details below, then submit — or go back to edit.': 'Kagua maelezo hapa chini, kisha tuma au rudi kuyahariri.',
  'Category': 'Aina',
  'Status': 'Hali',
  'Broker': 'Dalali',
  'Owner': 'Mmiliki',
  'Region / District': 'Mkoa / Wilaya',
  'Ward / Exact location': 'Kata / Mahali halisi',
  'Images': 'Picha',
  'Documents': 'Nyaraka',
  'Features': 'Vipengele',
  'Cancel': 'Ghairi',
  'Back': 'Rudi',
  'Continue': 'Endelea',
  'Save': 'Hifadhi',
  'Estate submitted': 'Mali imetumwa',
  'The listing has been saved and is ready for review.': 'Orodha imehifadhiwa na iko tayari kukaguliwa.',
  'Register another estate': 'Sajili mali nyingine',
  'Please complete the property title, sale price, and property type.': 'Jaza jina la mali, bei ya kuuza, na aina ya mali.',
  'Broker and owner names and phone numbers are required.': 'Majina na namba za simu za dalali na mmiliki zinahitajika.',
  'Failed to submit property. Please try again.': 'Imeshindikana kutuma mali. Tafadhali jaribu tena.',
  'Region': 'Mkoa',
  'District': 'Wilaya',
  'Ward / Area': 'Kata / Eneo',
  'Exact location': 'Mahali halisi',
  'Choose a region first': 'Chagua mkoa kwanza',
  'Choose a district first': 'Chagua wilaya kwanza',
  'Select a district...': 'Chagua wilaya...',
  'Select a ward...': 'Chagua kata...',
  'Select a region...': 'Chagua mkoa...',
  'WhatsApp phone number (+255)': 'Namba ya WhatsApp (+255)',
  'NIDA (optional)': 'NIDA (si lazima)',
  'TIN (optional)': 'TIN (si lazima)',
  'Bedrooms': 'Vyumba vya kulala',
  'Bathrooms': 'Vyumba vya kuoga',
  'English': 'Kiingereza',
  'Kiswahili': 'Kiswahili',
  'Geolocation is not supported by your browser': 'Kivinjari chako hakiwezi kutambua mahali ulipo',
  'Unable to retrieve your location': 'Imeshindikana kupata mahali ulipo',
  'Built from the category, sub-type, size, rooms, amenities, location and price on this form. Edit it if you want to.': 'Maelezo yametokana na aina, kipimo, vyumba, huduma, mahali na bei ya mali hii. Yahariri ukitaka.',
  'Title deed, survey plan, sale agreement — PDF or a photo, up to 15 MB each. They upload when the record is saved, and more can be added later.': 'Hati ya umiliki, mpango wa upimaji, makubaliano ya mauzo, PDF au picha, hadi MB 15 kila moja. Zitapakiwa wakati rekodi inahifadhiwa.',
    'Video must be less than 30 MB.': 'Video lazima iwe chini ya MB 30.',
    'Please select a video file.': 'Tafadhali chagua faili la video.',
    'Video upload failed. Please try again.': 'Upakiaji wa video umeshindikana. Tafadhali jaribu tena.',
    'Property video': 'Video ya mali',
    'Video uploaded': 'Video imepakiwa',
    'Add one video': 'Ongeza video moja',
    'Video upload progress': 'Maendeleo ya upakiaji wa video',
  'Road Access': 'Upatikanaji wa barabara',
  'Electricity': 'Umeme',
  'Water Supply': 'Maji',
  'Parking': 'Maegesho',
  'Security': 'Ulinzi',
  'Fence': 'Uzio',
  'Furnished': 'Imewekewa samani',
  'Garden': 'Bustani',
  'Swimming Pool': 'Bwawa la kuogelea',
  'Other': 'Nyingine',
  'Commercial Land & Building': 'Ardhi na Jengo la Biashara',
  'Buildings and open land plots show different amenities.': 'Majengo na viwanja wazi vina huduma tofauti.',
  'Not set': 'Haijawekwa',
  'Unassigned': 'Hajapangiwa',
  'Not registered': 'Hajasajiliwa',
  'None': 'Hakuna',
}

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  tr: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sw')
  const tr = (text: string) => language === 'sw' ? (translations[text] || text) : text
  return <LanguageContext.Provider value={{ language, setLanguage, tr }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
