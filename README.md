# moneylion

# Assessment
![Screenshot 2022-11-11 at 12 57 10 PM](https://user-images.githubusercontent.com/60177090/201266576-a5c1cad5-6c38-4f43-a8b2-02f4b68d5c3a.png)

## Table of Contents

- [How to use Application](#about)
  
  Create a .env file
  add add PORT and DBURL (Connect to MongoDb locally or on MongoDb atlas and acquire the connection string);
  
  ## Create a User with /user
  {
    email: email@email.com
  }
  
  ## Create a feature with /feat
  
  {
  name: someFeatureName
  }
  
  ## Create a userFeature using the user and feature created with /feature
  
  {
  email: email@email.com,
  featureName: someFeatureName,
  enable: true
  }
  
  ## Get a user Feature
  
  /feature?email=email@email.com&featureName=someFeatureName
  
  ## Start Application
  
  npm run start:dev
  
  
