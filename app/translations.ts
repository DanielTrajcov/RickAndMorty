export type Translations = {
  [languageCode: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    "Rick and Morty Characters": "Rick and Morty Characters",
    "All Status": "All Status",
    "Alive": "Alive",
    "Dead": "Dead",
    "Unknown": "Unknown",
    "Filter by species": "Filter by species",
    "Status": "Status",
    "Species": "Species",
    "Gender": "Gender",
    "Origin": "Origin",
    "Male": "Male",
    "Female": "Female",
    "Human": "Human",  
    "Alien": "Alien",  
    "Loading...": "Loading...",
    "Error loading data.": "Error loading data.",
    "Load More": "Load More",
    "Switch Language": "Switch Language",
    "Reset Filters": "Reset Filters", 
  },
  de: {
    "Rick and Morty Characters": "Rick und Morty Charaktere",
    "All Status": "Alle Status",
    "Alive": "Lebendig",
    "Dead": "Tot",
    "Unknown": "Unbekannt",
    "Filter by species": "Nach Arten filtern",
    "Status": "Status",
    "Species": "Arten",
    "Gender": "Geschlecht",
    "Origin": "Herkunft",
    "Male": "Männlich",
    "Female": "Weiblich",
    "Human": "Mensch", 
    "Alien": "Außerirdisch",  
    "Loading...": "Wird geladen...",
    "Error loading data.": "Fehler beim Laden der Daten.",
    "Load More": "Mehr laden",
    "Switch Language": "Sprache wechseln",
    "Reset Filters": "Filter zurücksetzen", 
  },
};
