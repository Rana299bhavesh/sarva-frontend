## Architecture Decisions

My main goal was to build a fast, clean, and crash-proof dashboard. Here is how I set it up:

* **Smart Database Queries (MongoDB):** I let the database do the heavy math (counting and grouping) instead of the server. This keeps the app  fast.
* **Efficient AI Integration (Gemini):** Instead of dumping thousands of raw rows into the AI, the backend sends it a clean, pre-calculated summary. This makes the AI response instant and prevents it from getting overwhelmed.
* **Modular Frontend (React + Tailwind):** I broke the UI down into reusable pieces (like the charts and stat cards). This keeps the code neat and easy to maintain.
* **Bulletproof Data Ingestion:** I used the Excel file that was provided with the assignment.

---

## 🔭 How I'd Scale It (Future Improvements)

If this were deployed to a massive school district with millions of records, here is what I would add next:

1. **Caching (Redis):** I'd cache the dashboard stats for 5–15 minutes so the database doesn't get hammered when every admin logs in at 8:00 AM on Monday.
2. **Background Uploads:** For massive Excel files (100k+ rows), I'd move the processing to a background queue (like BullMQ) so the app doesn't freeze while waiting for the upload to finish.
3. **Optimized Indexes:** I would add Compound Indexes to the MongoDB database to guarantee that fetching data stays lightning-fast as the collection grows.
4. **Smarter Dropdowns:** Loading a roster of 10,000 teachers all at once will lag the browser. I'd add backend pagination and frontend virtualization to load the list in small, manageable chunks.



## To run Locally
1. Clone the Frontend code 
2. npm install
3. npm run dev

4. Clone the Backend Code
5. Run  **cd backend**
6. Ingest the data using **node seed.js**
7. Run **node server.js**
