
# APIFuse Task

This nodejs app syncs Salesforce Accounts objects with Quickbooks customer objects.

## Setup and Usage
- Create developer account on Salesforce and Quickbooks
- Add apps to both accounts that and get creds from it.
- Use those creds to complete missing variables from .env.example file.
- Once the app is setup, start the server using `npm run dev`.
- Default port is `3000`
- You will first need to authenticate Quickbooks SDK. To that simply visit `http://localhost:3000/auth-uri`
- This will redirect you to Quickbooks login.
- Once logged in you will be able to invoke `http://localhost:3000/sync`

Following is the complete cURL request:

    curl --location 'http://localhost:3000/sync' \
    --header 'Content-Type: application/json' \
    --data '{
     "platform": "quickbooks"
    }'

- To sync Customers from Salesforce to Quickbooks, set `platform` as `salesforce` and to sync the other way, set `platform` to `quickbooks`.


Please reach out to me in case of any confusion.