## 🚀 Running the Project

To run the application locally, follow these steps:

### 1. Clone the Repository
### 2. npm install
### 3. npm run dev

🧠 Recommendation Algorithm
-The recommendation algorithm is based on two main things: size compatibility and color matching:
Size-based recommendation: Since clothing items have different sizing standards (e.g., numeric for shoes and pants, lettered for shirts), I created a custom mapping to suggest compatible sizes across categories.

👕 Clothing Item Selection Screen – Design Decisions:
1. Based on the route parameter (type), only items of the corresponding type are shown.
2. Filtering mechanism: The screen includes dropdowns (<Select>) for filtering by color and size, allowing users to refine their search.
3. Recommendation-driven display: The list of items shown is filtered through the recommendation algorithm described above. This ensures that items displayed are contextually relevant to previously chosen items.

🧾 Saved Sets Page – Design Decisions:
1. Once a user completes the selection of a shirt, pants, and shoes, the set is saved both to redux and localStorage.
2. Initializing Saved Sets - On application load, I dispatch initSavedSets() once in Layout.jsx to hydrate Redux state with sets from localStorage.
3.  Deleting a Set - Each card includes a Delete button, which dispatches deleteSet(id) to remove the set from both Redux and localStorage.
