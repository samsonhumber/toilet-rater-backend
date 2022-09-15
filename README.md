# toilet-rater-backend
Backend for the toilet rater. It should provide the frontend with information about reviews on toilets, details on the toilets added so far, allow users to post reviews.

## Plan for MVP
- Create, populate with example data scripts to set up toilet data
- Get route, given a toilet name and grid reference, to find all the reviews associated.
- Post route, given a toilet name, grid reference, user and review, to upload to the database.
- Delete route perhaps - remove it's functionality for public version until authentication is available
- Bring in Couchbase credentials when available

## Current URL's to activate the routes
- localhost:9000/userreviews?username=samsonhumber
- localhost:9000/toiletreviews?toilet=Yelverton%20WC&gridref=YX241365

