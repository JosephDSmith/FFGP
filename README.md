# Test app for typescript, React, MUI

How to build this:

```shell
pipenv install
npm install --prefix client
npm run build --prefix client
cd server
flask db upgrade head
python seed.py
```

How to run this locally:

```shell
npm start --prefix client
python server/app.py
```
