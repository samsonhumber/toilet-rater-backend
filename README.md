# toilet-rater-backend
Backend for the toilet rater. It should provide the frontend with information about reviews on toilets, details on the toilets added so far, allow users to post reviews.

## Plan for MVP
- Create, populate with example data scripts to set up toilet data << DONE >>  (for now)
- Get route, given a toilet name and grid reference, to find all the reviews associated. << DONE >>  (for now)
- Post route, given a toilet name, grid reference, user and review, to upload to the database. << WAITING >> (for frontend)
- Delete route perhaps - remove it's functionality for public version until authentication is available
- Bring in Couchbase credentials when available << CANCELLED >>  (using AWS instead)
- Deploy to AWS
- Set up linked table of toilets to store data about those
- Make post route for this
- Make get routes for this
- Alter queries in other requests to allow join table things
- Paginate and randomise the request results

## Current URL's to activate the routes
- localhost:9000/userreviews?username=samsonhumber
- localhost:9000/toiletreviews?toilet=Yelverton%20WC&gridref=YX241365

