
## Getting Started
Befor that add .env file containing API url:
NEXT_PUBLIC_API_ENTRYPOINT=https://api.binance.com

Then run the app using
npm run dev

Or go to

https://cloudfide-recruitment-task.vercel.app/


Testing:
To run e2e tests execute

npm run e2e-tests



Adnotation: 

The api refetch interval constant is set in 
constants/api-constants.ts

I decided to use react query with refetching every 5s.
This task could be also solved via using websockets to actively listen to API.

However I decided that for this task (mainly because I've not worked a lot with websockets) to stick to refetching with small interval using react query

