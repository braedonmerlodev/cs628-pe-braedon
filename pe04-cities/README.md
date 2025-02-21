# Input

The input format for this application consists of city information entered by users through a form. Each city requires three key pieces of data:
- City Name
- Country 
- Population 

Each city is stored in a cities array using the useState hook, with localStorage providing data persistence between sessions.

# Process

The application processes city data in several ways:
1. Assigns a unique ID to each city using timestamp 
2. Stores cities in localStorage whenever the cities array changes
3. Loads cities from localStorage when the application starts
4. Manages state for displaying different views (Cities List, Add City, City Details)
5. Handles navigation between different views using conditional rendering

# Output

The application outputs city information in three main views:
1. Main Menu: Displays two buttons for "Cities List" and "Add City"
2. Cities List: Shows all added cities as clickable links
3. City Details: When a city is clicked, displays:
   - City name as a header
   - Country information
   - Population data

