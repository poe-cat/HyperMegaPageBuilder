
# Hyper Mega Page Builder

Interaktywny kreator stron internetowych w przeglądarce. Umożliwia tworzenie prostych layoutów HTML za pomocą graficznego interfejsu użytkownika. Użytkownik może dodawać nagłówki, akapity, obrazy i przyciski, edytować ich wygląd, a następnie zapisać projekt lub wyeksportować go jako plik ZIP.

---

## Struktura projektu

```
.
├── index.html       # Główna strona aplikacji
├── script.js        # Logika interaktywna (dodawanie, edycja, eksport)
├── style.css        # Stylowanie interfejsu (edytor, podgląd, kontrolki)
└── README.md        # Dokumentacja
```

---

## Funkcjonalności

- Dodawanie elementów HTML (`<h1>`, `<p>`, `<img>`, `<button>`) do określonych sekcji (`<header>`, `<main>`, `<footer>`).
- Edycja:
  - Treści tekstowych
  - Kolorów (tekst, tło)
  - Rozmiaru czcionki
  - Wyrównania
  - Marginesu
  - Szerokości elementu
  - Wgrywania obrazu (`<img>`)
- Podgląd gotowego layoutu
- Eksport gotowej strony do pliku ZIP (`index.html`)

---

## Użyte technologie

- **HTML5** – struktura dokumentu
- **CSS3 + Bootstrap 5** – stylowanie i layout responsywny
- **JavaScript** – logika dodawania, edycji i eksportu
- **JSZip** – generowanie i pobieranie ZIP z gotową stroną

---

## Struktura danych (JS)

Elementy strony przechowywane są w tablicy `layout`, której elementy mają strukturę:

```js
{
  type: 'h1' | 'p' | 'img' | 'button',
  content: 'tekst' | 'data:image/png;base64,...',
  section: 'header' | 'main' | 'footer',
  styles: {
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: '16px',
    width: '100%',
    textAlign: 'left',
    margin: '0px',
    ...
  }
}
```

---

## Główne funkcje JavaScript

| Funkcja             | Opis                                                                 |
|---------------------|----------------------------------------------------------------------|
| `addElement()`      | Dodaje nowy element do layoutu na podstawie wybranych opcji          |
| `renderLayout()`    | Renderuje wszystkie elementy na stronie edytora                      |
| `selectElement()`   | Aktywuje panel edycji i wypełnia go danymi z wybranego elementu      |
| `applyChanges()`    | Zapisuje zmiany w edytowanym elemencie i odświeża widok              |
| `saveLayout()`      | Przechodzi do trybu podglądu i ukrywa edytor                         |
| `generateFullHTML()`| Tworzy pełną treść HTML gotową do eksportu                           |
| `exportToZip()`     | Tworzy ZIP z wygenerowanym `index.html` i rozpoczyna pobieranie      |
| `editAgain()`       | Wraca z trybu podglądu do edytora                                    |

---

## Stylowanie

- Edytowalne elementy mają obramowanie i przycisk usunięcia (X).
- Elementy są rozmieszczone w trzech sekcjach: nagłówek, treść główna, stopka.
- Stylowanie można ustawić indywidualnie dla każdego elementu przez panel boczny.

---

## Przykładowe zastosowanie

1. Wybierz typ elementu i sekcję (header/main/footer)
2. Kliknij „Dodaj”
3. Kliknij na element w edytorze, by otworzyć panel edycji
4. Zmień treść, kolory, marginesy itd.
5. Kliknij „Zastosuj”
6. Użyj „Zapisz i pokaż” by przejść do podglądu
7. Użyj „Eksportuj do ZIP” by pobrać plik `index.html`

---

## Ograniczenia

- Brak edycji inline – elementy są edytowane tylko przez panel boczny.
- Nie można zmieniać kolejności elementów.
- Brak możliwości cofania zmian (brak historii).

---

## Eksport

Generowany plik `index.html` zawiera:

- Bootstrap z CDN
- Treść podglądu
- Prosty styl CSS zagnieżdżony w `<style>`

---

## Autor

**Katarzyna Szewiel**  
© 2025 – Wszelkie prawa zastrzeżone

---

## Licencja

Projekt stworzony na potrzeby edukacyjne. Nie przeznaczony do komercyjnego wykorzystania bez zgody autorki.

