# BabbleSmash-Unit2-GA

**Introduction**

This is my unit2 project for General Assembly. This app is a proof of concept, with full user authentication/authorization, that takes a URL submitted by user and renders it using a data science API. the returned information would then include content tags, sentiment analysis, text summarization, charts, graphs and supplemental article info via additional API queries.

**Foundation**

This project was built with Node.js, Express, Sequelize, and Pug. At the heart and soul of this program is a Data Science API from [Yonder Labs](yonderlabs.com)

**Inspiration**

The inspiration for this project came from a conversation that I had with a friend. "How can we extract knowledge from an article as fast as humanly possible? The fuggin computer can do everything for us as it is, it should be able to read and summarize an article for us as well." That drunken conversation was put to the test here and "BabbleSmash" was born. 

**User experience, API selection, wireframing and the "Smash" process**

**User experience**

I did my best to design the experience using a variety of inspiration that I've accumulated over the years. In a nutshell:

* User Registers for use using a call to action on home page
* They are taken to a profile page where they can see run their URL through the "Smashbar". The profile page is their homepage on the site and contains all the information and resources they will need to use the service
* The user will have full CRUD functionality and data will not be stored on the service unless they specifically save it. 

**Wireframing**

Wireframing was done with careful attention to detail. I had to review and look at several different dashboards and UI panels for inspiration as the information delivered would be very specific and involved. The crown jewel of the site is the results page and I had to make sure that it looked every bit as impressive as the API that supports it

![Results page Wireframe](/img/BabbleSmash_Wireframe.png)

**API Selection**

I spent an extensive amount of time looking for solutions to power this concept, including even making my own. I reviewed several different opportunities for this project and ultimately selected Yonder Labs as the API solution that will be used. 

Yonder Labs is a company out of Trento, Italy that specializes in providing text analytics for their clients. 

**Database Model**

THe database model in use was designed, first hand, for use with the Yonder Labs API and can save all information provided. THe solution will need further development over time to make full use of the database model.

![Database model for BabbleSmash](/img/BabbleSmash_Model.png)

