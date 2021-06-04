

#!/usr/bin/env sh

# abort on errors
set -e

git init
git add . 
git commit -m "desplegando  ijonna-ilyricmusic"   

heroku git:remote -a ijonna-ilyricmusic
git push heroku master  