

#!/usr/bin/env sh

# abort on errors
set -e


git add . 
git commit -am "desplegando  ijonna-ilyricmusic"   
git push heroku master  
heroku git:remote -a ijonna-ilyricmusic