Application: MockStock

Group Members:
Jack Blackburn
Hampton Walker
Nick Spooner
Jon Gordon
Mirna Masri
Sage Long

Our resources folder contains our css, images, and javascript files. Additionally, it has our database plan labeled "mockstock_test_data.sql". This was not implemented in our application due to testing and time constraints. Instead, we utilize the tables in the file "basicDB.txt". These are the tables that will need to be used to use our application on your local machine. 

The views folder contains all the ejs files for our pages and partials. We have our server file labeled "server.js" in the parent directory. The .env_template is only for personal use to use as guide on how to format the .env file which holds the information that is specific for your machine if you are running a local database.

To get our application working on the local machine, first follow along with the "basicDB.txt" mentioned above which contains the information for our database setup. The database name is "mockstock" and we set the password to "mockstock" as well. If you change the password, you'll need to also change the password for your .env file. Put all of your local machine's DB information in the .env file which you'll need to add yourself. Simply copy and paste the .env_template file and rename it .env. Then, fill in your local machine's information on that file (make sure the .env file is in the parent directory where the .env_template is). This all assumes you are using the .env file. If you are NOT using the .env file, some settings will have to be changed in the server.js file. Refer to the comments in the server.js if that applies to you. However, this shouldn't be necessary if you just fill in your machine's information in the .env file as been suggested above. 

Our application relies on some node and express modules so make sure you have those modules and they are up to date. Assuming that you have correctly edited the .env file, you should be able to go in the same directory as the server.js and run node 'server.js' in the terminal. Now go to a browser and type in 'http:://localhost:8080' (we had it run on port 8080). Now you should see our application!

You should now be able to navigate among the top nav bar to see our different features. To test our implementation of the profile/trade pages, go to trade and select buy. Put in a ticker, quantity, and price, and then submit. Now you can go to the profile page and see these new positions added to the table. Similarly you can go back to the trade page and sell any of the stocks listed in the table on the profile page. Our application does not handle verifying correct ticker symbols or prices at this time. For now, you'll have to go to the search page to lookup the respective ticker symbol and use the closing price for the stock you are attempting to purchase/sell and use .

You can visit our deployment at https://mockstock-web.herokuapp.com/ if you are unable to get the local DB setup configured correctly. As of now, we do not handle user login. Instead any changes to the buy/sell positions are global. We recognize the ramifications of this however the features are still functional with room for much improvement. 


