# Webbtjänst för Projekt i DT207G 
I denna del av projektet så har en webbtjänst skapats som hanterar menyn och användare åt en restaurang. Webbtjänsten är skapad med Express. Den är kopplad till en MongoDB databas skapad via Atlas. 
I webbtjänsten så finns skyddade routes, så som för att ändra menyn. Dessa skyddas genom Json Web Tokens. Lösenorden som sparas ner till databasen hashas med hjälp av Bcrypt så att de inte ska läcka.

Webbtjänsten finns hostad på render under denna address: https://projektbackend.onrender.com 

<h2>Anrop som kan göras till API:et:</h2>
<table>
  <thead>
    <th>Metod</th>
    <th>Ändpunkt</th>
    <th>Beskrivning</th>
  </thead> 
  <tbody>
    <tr>
      <td>GET</td>
      <td>/api/menu</td>
      <td>Hämtar alla rätter som finns sparade i databasen</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/menu</td>
      <td>Lägger till ny maträtt i API:et</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/menu/:_id</td>
      <td>Raderar maträtten med angivet id</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/api/menu/:_id</td>
      <td>Uppdaterar maträtten med angivet id</td>
    </tr> 
    <tr>
      <td>POST</td>
      <td>/api/auth/login</td>
      <td>Loggar in användare om lösenord och användarnamn stämmer</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/register</td>
      <td>Registrerar ny användare med användarnamn och lösenord</td>
    </tr>
  </tbody>
</table> 

## Svar från API:et ser ut som följer: 
``` 
  {
    "_id": "664c37d6a1b8f2a616b80397",
    "dishName": "Dumplings",
    "price": 140,
    "description": "Ångade degknyten fyllda med grönsaker. Serveras med ris och dippsås",
    "allergens": "lök, gluten",
    "__v": 0
  } 
  ```
 
  
