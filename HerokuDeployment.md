# Heroku Deployment

If you are having trouble with Heroku deployment through the terminal, please follow these instructions.

## Procfile

Your procfile should have the following structure:

`web: gunicorn app:app`

## Requirements

Please follow the given directions to create your `requirements.txt` file

## Deployment

1. Push all changes to your repository
2. Open [Heroku](heroku.com)
3. Create a new application or open an existing application
4. Select the **Deploy** menu
5. Scroll down to **Deployment Method** and select **GitHub**
6. Allow access to your GitHub, search for your specific repository and connect to it
7. Scroll all the way down and select **Deploy Branch**

Once complete you will be able to launch your application

### Optional Automatic Deploys

If you want to make changes the future, but don't want to keep coming back to deploy your application, you can enable automatic deploys so that Heroku will deploy your app with the changes as soon as you push to your repository.